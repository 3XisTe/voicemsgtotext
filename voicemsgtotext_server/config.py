RABBITMQ_HOST = 'rabbitmq'
RABBITMQ_USER = 'guest'
RABBITMQ_PW = 'guest'
RABBITMQ_PORT = '5467'
RABBITMQ_URL = f"pyamqp://{RABBITMQ_USER}:{RABBITMQ_PW}@{RABBITMQ_HOST}:{RABBITMQ_PORT}"

RABBITMQ_QUEUE = 'tasks'
RABBITMQ_BACKEND = 'rpc://'

WHISPER_MODEL = 'base'
