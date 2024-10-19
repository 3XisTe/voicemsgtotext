from config import RABBITMQ_HOST, RABBITMQ_BACKEND
from pydantic import BaseModel
from fastapi import FastAPI
from celery.result import AsyncResult
from celery import Celery 

app = FastAPI()

celery_app = Celery('api', broker=RABBITMQ_HOST, backend=RABBITMQ_BACKEND)

class TranscribeRequest(BaseModel):
    url: str

@app.post("/transcribe")
async def transcribe_audio(request: TranscribeRequest):
    task = celery_app.send_task('queues.transcribe_task', args=[request.url])
    return {"task_id": task.id}

@app.get("/result/{task_id}")
async def get_transcription_result(task_id: str):
    task_result = AsyncResult(task_id, app=celery_app)
    if task_result.state == 'PENDING':
        return {"status": "Processing"}
    elif task_result.state == 'SUCCESS':
        return {"status": "Completed", "result": task_result.result}
    else:
        return {"status": task_result.state}

