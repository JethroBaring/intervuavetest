
# 📝 Intervuave – Scoring System Cheat Sheet

## 🎯 Main Idea
- We evaluate candidates using **two categories**:
  - **Response Quality** → How they deliver their answers.
  - **Culture Fit** → How their answers align with company values, mission, and vision.

---

## ⚙️ 1. Response Quality

| Metric | Meaning |
|:---|:---|
| Speech Clarity | How clearly the candidate speaks. |
| Confidence | How confident they appear. |
| Emotional Tone | Emotional appropriateness. |
| Engagement | Energy, attention, involvement. |
| Body Language | Posture, gestures, expressions. |

✅ Evaluated **per question** using video/audio analysis.  
✅ Companies **can customize** the weights inside this group.

---

## ⚙️ 2. Culture Fit

| Aspect | Meaning |
|:---|:---|
| Value-Specific Fit | Does the answer show the targeted core value? |
| Mission Alignment | Is the answer consistent with company mission? |
| Vision Alignment | Is the answer consistent with company vision? |
| Culture Fit | Is the answer consistent with company culture overall? |

✅ Evaluated **per question** using **LLM** (semantic analysis of the transcript).

---

## ➗ 3. Final Score Computation

```plaintext
overallFitScore = (0.30 × positionFit) + (0.70 × cultureFitComposite)

cultureFitComposite = (valuesFit + missionAlignment + visionAlignment + cultureFit) / 4
```

✅ **Culture Fit is 70% of the final score** (dominates).  
✅ **Response Quality is 30%** (supports).

---

## 📚 Why This Approach?

- Research shows **cultural alignment** predicts long-term success better than skills or communication alone.
- Studies: Chatman (1989), Kristof (1996), Rivera (2012).

✅ **Culture Fit is prioritized**.  
✅ **Response Quality still matters**, but **cannot outweigh** culture alignment.

---

# 🎤 Quick Phrases You Can Say
> "We separate how the candidate answers from what the candidate believes."

> "Culture fit matters more, so we weight it 70%, and response quality 30%."

> "We use AI and LLMs to check not just speaking skills, but real value alignment."
>
> 
# 📋 Candidate Processing and Evaluation Flow

## 1. Preprocessing Stage

After the interview, the candidate’s video and audio are analyzed to extract the following features:

| Extracted Data | Purpose |
|:---|:---|
| **Transcript** | Captures the spoken words to evaluate content. |
| **Word Timings** | Measures speaking rate, fluency, and pauses. |
| **Emotion Timeline** | Tracks emotional expressions over time. |
| **Posture and Gaze Timeline** | Assesses non-verbal communication (eye contact, posture, gestures). |
| **Speech Features** | Measures speech clarity, volume variation, and filler words. |

This ensures the system captures both **verbal** (what is said) and **non-verbal** (how it is said) signals.

---

## 2. Feature Extraction

From the extracted features, we compute the following **response quality metrics** per question:

| Metric | Based On |
|:---|:---|
| **Speech Clarity** | Word timings, speech rate, filler word usage. |
| **Confidence** | Tone, volume stability, absence of hesitation. |
| **Emotional Tone** | Emotion detection from facial expressions. |
| **Engagement** | Expressiveness and energy consistency. |
| **Body Language** | Posture, gaze, gestures, and movement quality. |

Each metric is scored from **0.0 to 1.0**.

---

## 3. Evaluation Stage (LLM-Based)

The structured metrics and transcript are passed to a **Language Model (LLM)**, which performs two evaluations:

| Area | Evaluation |
|:---|:---|
| **Response Quality** | Considers the five response quality metrics. |
| **Culture Fit** | Evaluates the alignment of the answer with the assigned Core Value, Mission, Vision, or Culture. |

The LLM outputs **per-question feedback** and **scores**.

---

## 4. Result Computation

The final results are computed as follows:

| Output | Computation |
|:---|:---|
| **Per Question Result** | Feedback and scores for each response. |
| **Response Quality Score** | Average of all five response quality metrics across all questions. |
| **Culture Fit Composite Score** | Average of valuesFit, missionAlignment, visionAlignment, and cultureFit. |
| **Total Fit Score** | (Response Quality Score × 30%) + (Culture Fit Composite Score × 70%) |

The **Total Fit Score** is used to determine the candidate’s preliminary AI decision.

---

# 📋 Binary Classification Model (Decision Agreement Model)

## 1. Purpose

After collecting sufficient interview data, a **binary classification model** will be trained to predict whether a company would **approve** or **reject** a candidate.

## 2. Input Features for the Model

| Feature | Description |
|:---|:---|
| **Response Quality Score** | Overall communication quality of the candidate. |
| **Culture Fit Composite Score** | Overall alignment with company values, mission, vision, and culture. |
| **Per-Question Scores** | Detailed performance on each interview question. |
| **Per-Value Alignment** | Alignment scores per core value. |

## 3. Label

| Label | Description |
|:---|:---|
| **Approved (1)** | If the company agrees the candidate is a good fit. |
| **Rejected (0)** | If the company does not approve the candidate. |

Company feedback is captured post-interview to label training data.

## 4. Training Strategy

- Initial model will be trained once **30–50 labeled interviews** are collected.
- Model will be retrained periodically after every **5–10 new labeled interviews**.
- The model helps in **automating decision recommendations** and **analyzing model agreement** with human reviewers.

---

# 📈 Overall System Flow

```text
Video + Audio ➔ Feature Extraction ➔ Metrics Computation ➔ LLM Evaluation ➔ Final Fit Score ➔ AI Decision ➔ (Optional) Human Feedback ➔ Binary Classifier Training
```

---

# 📌 Important Notes

- Core Value and one of Mission, Vision, or Culture alignment are required per question.
- Response Quality contributes **30%** and Culture Fit contributes **70%** to the Total Fit Score.
- The Binary Classification Model enhances decision-making accuracy over time by learning from real-world company decisions.

