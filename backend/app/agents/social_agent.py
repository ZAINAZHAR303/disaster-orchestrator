# app/agents/social_agent.py
import time
from typing import Dict, Any
import random

def dummy_social_triage(payload: Dict[str, Any]) -> Dict[str, Any]:
    """
    Accepts a list of simulated social posts (or uses defaults).
    Extracts lat/lng and urgency heuristics.
    """
    posts = payload.get("posts", None)
    if not posts:
        # return some default mock posts
        posts = [
            {"id":"p1","text":"We're trapped at 24.86,67.00 - please help", "latlng":[24.86,67.00]},
            {"id":"p2","text":"Flooding in Sector B, 3 people", "latlng":[24.87,67.01]},
        ]

    reports = []
    for p in posts:
        urgency_score = random.uniform(0.4, 0.95)  # random for demo
        reports.append({"id": p.get("id"), "latlng": p.get("latlng"), "urgency_score": urgency_score, "text": p.get("text")})

    return {"reports": reports}
    