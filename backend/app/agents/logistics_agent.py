# app/agents/logistics_agent.py
from typing import Dict, Any
import math

def simple_logistics_optimizer(payload: Dict[str, Any]) -> Dict[str, Any]:
    """
    Very simple routing allocation:
    - Input: priorities (list with latlng and severity), resources: {boats: n, trucks: n}
    - Output: assigned_routes: [{resource_type, id, route: [latlng,...], eta_minutes}]
    """
    priorities = payload.get("priorities", [])
    resources = payload.get("resources", {"boats": 2, "trucks": 3})

    assignments = []
    # naive assignment: top severity -> boats (if severity > 0.7), else trucks
    boat_id = 1
    truck_id = 1
    for p in priorities:
        if p["severity"] >= 0.7 and boat_id <= resources.get("boats", 0):
            assignments.append({"resource_type": "boat", "id": f"boat-{boat_id}", "route": [p["latlng"]], "eta_minutes": 12})
            boat_id += 1
        elif truck_id <= resources.get("trucks", 0):
            assignments.append({"resource_type": "truck", "id": f"truck-{truck_id}", "route": [p["latlng"]], "eta_minutes": 25})
            truck_id += 1
        else:
            assignments.append({"resource_type": "unassigned", "id": None, "route": [p["latlng"]], "eta_minutes": None})

    return {"assignments": assignments}
