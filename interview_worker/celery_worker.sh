#!/bin/bash
celery -A app.tasks.interview_job worker --loglevel=info
