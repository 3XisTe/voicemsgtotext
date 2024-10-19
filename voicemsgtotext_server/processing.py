import requests
import whisper
from config import WHISPER_MODEL
import subprocess
from loguru import logger

def download_mp4_to_memory(url):
    """Download mp4 file."""
    logger.info("Loading data from URL.")
    response = requests.get(url, stream=True)
    response.raise_for_status()
    logger.info("Data loaded.")
    return response.content

def convert_mp4_to_wav_in_memory(mp4_file: str, wav_file: str):
    """Convert mp4 to wav"""
    logger.info("Converting mp4 into wav file.")
    command = ["ffmpeg", "-y", "-i", mp4_file, wav_file] 
    result = subprocess.run(command, capture_output=True)
    if result.returncode != 0:
        logger.info(result.stderr)
        raise Exception("Could not convert the audio file.")

def process_whisper(wav_file: str) -> str:
    """Process audio to text.""" 
    logger.info("Loading whisper model.")
    model = whisper.load_model(WHISPER_MODEL)
    logger.info("Loading audio.")
    audio = whisper.load_audio(wav_file)
    audio = whisper.pad_or_trim(audio)

    logger.info("Transcribing audio.")
    result = model.transcribe(audio)

    return result["text"]
