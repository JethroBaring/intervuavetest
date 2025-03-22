from app.queue.celery_app import celery
from app.services import deepface_service, whisper_service, mediapipe_service, sentiment_service

@celery.task(name="interview_pipeline")
def run_interview_pipeline(video_path: str):
    emotions = deepface_service.analyze_emotions(video_path)
    transcript = whisper_service.transcribe_audio(video_path)
    gestures = mediapipe_service.analyze_gestures(video_path)
    sentiment = sentiment_service.analyze_sentiment(transcript)

    return {
        "transcript": transcript,
        "emotions": emotions,
        "gestures": gestures,
        "sentiment": sentiment
    }
