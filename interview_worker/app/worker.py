from app.queue.celery_app import celery

if __name__ == "__main__":
    celery.worker_main(["worker", "--loglevel=info"])
