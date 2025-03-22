import os

RABBITMQ_BROKER_URL = os.getenv("RABBITMQ_BROKER_URL", "amqp://guest:guest@localhost//")
