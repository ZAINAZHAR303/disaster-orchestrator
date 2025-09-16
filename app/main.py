# app/main.py
import os
import uvicorn
from fastapi import FastAPI, UploadFile, File, HTTPException
from .orchestrator import Orchestrator
from .agents.imagery_agent import dummy_imagery_classifier
from .agents.social_agent import dummy_social_triage
from .agents.logistics_agent import simple_logistics_optimizer
from .coral_integration import register_responder_agent
import base64

app = FastAPI(title="Disaster Response Orchestrator (MVP)")

# Initialize orchestrator
ORCH = Orchestrator(langgraph_api_key=os.getenv("LANGGRAPH_API_KEY"))

# Register local agents for local-mode testing
ORCH.register_agent("imagery_triage", dummy_imagery_classifier)
ORCH.register_agent("social_triage", dummy_social_triage)
ORCH.register_agent("logistics_optimizer", simple_logistics_optimizer)

# Simple in-memory store for last run results (swap with MongoDB later)
LAST_RUN = {}

@app.post("/api/simulate")
async def simulate_disaster(file: UploadFile = File(None), resources: dict = None):
    """
    POST /api/simulate
    - file: optional image upload (satellite / drone image)
    - resources: optional JSON body with available rescue resources
    Returns orchestration output.
    """
    image_b64 = None
    if file:
        content = await file.read()
        image_b64 = base64.b64encode(content).decode("utf-8")

    inputs = {
        "image_payload": {"image_b64": image_b64} if image_b64 else {},
        "social_payload": {"posts": [
            {"id":"s1","text":"People trapped near river bank", "latlng":[24.86,67.00]},
            {"id":"s2","text":"Bridge collapsed at X", "latlng":[24.87,67.02]}
        ]},
        "resources": resources or {"boats": 2, "trucks": 3}
    }

    result = await ORCH.orchestrate(inputs)
    LAST_RUN["result"] = result
    return {"status": "ok", "result": result}

@app.get("/api/result")
def get_last_result():
    if "result" not in LAST_RUN:
        raise HTTPException(status_code=404, detail="No run found")
    return LAST_RUN["result"]

@app.post("/api/register_coral")
def register_agent_on_coral(name: str):
    """
    Example endpoint to register an agent on Coral Registry (placeholder).
    """
    spec = {
        "name": name,
        "description": "Responder agent for disaster demo",
        "contact": "team@example.com",
        "capabilities": ["imagery-triage", "social-triage", "logistics"]
    }
    resp = register_responder_agent(spec)
    return resp

if __name__ == "__main__":
    uvicorn.run("app.main:app", host=os.getenv("HOST", "127.0.0.1"), port=int(os.getenv("PORT", 8000)), reload=True)
