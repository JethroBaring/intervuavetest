from celery import Celery
from app.core.config import RABBITMQ_BROKER_URL

celery = Celery("evaluation_worker", broker=RABBITMQ_BROKER_URL)
