def evaluate_response(transcript, values, meta=None):
    return f"LLM feedback on response: '{transcript}' with values: {values}"

def score_fit(transcript, values):
    return {
        "positionFit": 0.84,
        "valuesFit": 0.91,
        "sentiment": "confident"
    }
