from app.queue.celery_app import celery
from app.services.llm import evaluate_response, score_fit

@celery.task(name="evaluate_candidate")
def evaluate_candidate(transcript, expected_values, question_meta=None):
    feedback = evaluate_response(transcript, expected_values, question_meta)
    scores = score_fit(transcript, expected_values)
    return {
        "llmFeedback": feedback,
        "positionFit": scores.get("positionFit"),
        "valuesFit": scores.get("valuesFit"),
        "sentiment": scores.get("sentiment")
    }
