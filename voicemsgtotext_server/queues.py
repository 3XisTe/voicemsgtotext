from config import RABBITMQ_HOST, RABBITMQ_BACKEND
import processing as p
from celery import Celery
import tempfile

celery_app = Celery('whisper_worker', broker=RABBITMQ_HOST, backend=RABBITMQ_BACKEND)

@celery_app.task(name='queues.transcribe_task') 
def transcribe_task(url):

    mp4_data_raw = p.download_mp4_to_memory(url) 
    with tempfile.NamedTemporaryFile(suffix=".mp4") as temp_mp4:
        temp_mp4.write(mp4_data_raw)
        with tempfile.NamedTemporaryFile(suffix=".wav") as temp_wav:
           p.convert_mp4_to_wav_in_memory(temp_mp4.name, temp_wav.name)
           text = p.process_whisper(temp_wav.name)
           return text

