import json
import re

with open("../data/keywords.json", "r") as f:
    raw = json.load(f)

# Normalize keywords format: support both old flat mapping and new mapping with explanation+severity
KEYWORDS = {}
if len(raw) > 0 and isinstance(next(iter(raw.values())), dict):
    KEYWORDS = raw
else:
    # backward compatibility: convert flat strings to objects with HIGH severity
    for k, v in raw.items():
        KEYWORDS[k] = {"explanation": v, "severity": "HIGH"}


def detect_risks(text):
    results = []
    sentences = re.split(r'(?<=[.!?])\s+', text)

    for s in sentences:
        for key, meta in KEYWORDS.items():
            if key.lower() in s.lower():
                severity = meta.get("severity", "MEDIUM")
                results.append({
                    "sentence": s.strip(),
                    "explanation": meta.get("explanation", ""),
                    "risk": severity
                })
    return results