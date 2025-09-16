# app/agents/imagery_agent.py
import os
import json
import httpx
import base64
from dotenv import load_dotenv

load_dotenv()

# MISTRAL_API_KEY = os.getenv("MISTRAL_API_KEY", "")
MISTRAL_API_KEY = "myzTuyqMiU1MMYLhX8ZprzKA4079BdW1"
MISTRAL_API_URL = "https://api.mistral.ai/v1/chat/completions"


async def imagery_triage_agent(payload: dict):
    """
    Imagery triage agent:
    - Accepts {"image_b64": "..."} or {"image_url": "..."}
    - Sends a text-only prompt to Mistral (safe fallback)
    - Returns a simple classification like {"category": "flood"} etc.
    """
    image_url = payload.get("image_url")
    image_b64 = payload.get("image_b64")

    # Construct user prompt
    if image_url:
        user_prompt = f"Analyze this disaster image from URL: {image_url}\nClassify into one of: [flood, earthquake, fire, landslide, other] and respond with JSON."
    elif image_b64:
        # ⚠ Mistral does not accept base64 input directly, so we just tell the model that an image is provided
        user_prompt = (
            "An image has been provided in base64 format (not visible to you). "
            "Assume it is a disaster image and classify it into one of: "
            "[flood, earthquake, fire, landslide, other] and respond with JSON."
        )
    else:
        return {"error": "No image provided"}

    payload_json = {
        "model": "mistral-small",  # safer model than mistral-tiny
        "messages": [
            {"role": "system", "content": "You are a disaster imagery triage assistant."},
            {"role": "user", "content": user_prompt},
        ],
        "temperature": 0.2,
        "max_tokens": 200
    }

    # Debug logging (you can comment this later)
    print("=== Sending to Mistral ===")
    print(json.dumps(payload_json, indent=2))
    print("=========================")

    async with httpx.AsyncClient(timeout=20.0) as client:
        resp = await client.post(
            MISTRAL_API_URL,
            headers={
                "Authorization": f"Bearer {MISTRAL_API_KEY}",
                "Content-Type": "application/json"
            },
            json=payload_json
        )

        # Log response text if there's an error
        if resp.status_code >= 400:
            print("=== Mistral Error Response ===")
            print(resp.text)

        resp.raise_for_status()
        data = resp.json()

    # Extract model's reply safely
    try:
        reply = data["choices"][0]["message"]["content"]
        return {"classification": reply}
    except Exception:
        return {"error": "Could not parse Mistral response", "raw": data}
