# app/agents/imagery_agent.py
import io
from typing import Dict, Any
from PIL import Image, ImageStat
import numpy as np
import base64
import uuid

def _load_image_from_base64(b64: str) -> Image.Image:
    data = base64.b64decode(b64)
    return Image.open(io.BytesIO(data)).convert("RGB")

def dummy_imagery_classifier(payload: Dict[str, Any]) -> Dict[str, Any]:
    """
    Very simple dummy classifier:
    - Accepts either an 'image_b64' (base64 string) or 'image_path' in payload.
    - Returns a list of 'zones' with fake severity scores and centers.
    This is quick to run and perfect for MVP/demo simulation.
    """

    image = None
    if "image_b64" in payload:
        image = _load_image_from_base64(payload["image_b64"])
    elif "image_path" in payload:
        image = Image.open(payload["image_path"]).convert("RGB")
    else:
        # if nothing provided, return a static sample
        return {
            "zones": [
                {"id": "Z-A", "center": [24.8607, 67.0011], "severity": 0.85, "bbox": [67.0,24.8,67.1,24.9]},
                {"id": "Z-B", "center": [24.8707, 67.0111], "severity": 0.6, "bbox": [67.01,24.86,67.02,24.87]},
            ]
        }

    # Heuristic: compute "blue intensity ratio" as a lightweight proxy for water presence
    arr = np.array(image).astype(np.float32)
    r_mean = arr[..., 0].mean()
    g_mean = arr[..., 1].mean()
    b_mean = arr[..., 2].mean()

    # compute a normalized water-likeness score
    water_score = max(0.0, min(1.0, (b_mean - (r_mean+g_mean)/2) / 50.0 + 0.5))

    # derive some dummy zones based on image features
    # (in real model you'd run segmentation and extract bounding boxes)
    zone_id = "Z-" + uuid.uuid4().hex[:6]
    zone = {
        "id": zone_id,
        "center": [24.86 + (b_mean % 0.01), 67.00 + (r_mean % 0.01)],
        "severity": float(round(water_score, 3)),
        "bbox": [67.00, 24.85, 67.02, 24.87]
    }
    return {"zones": [zone], "image_stats": {"r_mean": float(r_mean), "g_mean": float(g_mean), "b_mean": float(b_mean)}}
