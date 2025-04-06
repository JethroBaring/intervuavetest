
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
