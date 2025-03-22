#!/bin/bash
celery -A app.tasks.evaluate worker --loglevel=info
