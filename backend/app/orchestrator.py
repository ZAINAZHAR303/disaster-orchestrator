# app/orchestrator.py
import asyncio
import logging
from typing import Dict, Any, List
import os
import requests  # Added: to make API calls to Mistral

# Load your API key from environment (secure way)
MISTRAL_KEY = os.getenv("MISTRAL_IOA_API_KEY")

logger = logging.getLogger(__name__)

class Orchestrator:
    """
    Orchestrator that manages agents and runs them in parallel.
    Uses Mistral Internet of Agents API where needed.
    """

    def __init__(self, langgraph_api_key: str = None):
        self.langgraph_api_key = langgraph_api_key or MISTRAL_KEY
        self.registered_agents = {}  # name -> callable function (local mode)
        self.running_tasks = {}

    def register_agent(self, name: str, handler_callable):
        """Register a local python handler for quick local testing."""
        self.registered_agents[name] = handler_callable
        logger.info(f"Agent registered: {name}")

    async def run_agent(self, agent_name: str, payload: Dict[str, Any]) -> Dict[str, Any]:
        """
        Runs the registered agent. 
        If not registered locally, falls back to Mistral Internet of Agents API.
        """
        if agent_name in self.registered_agents:
            handler = self.registered_agents[agent_name]
            if asyncio.iscoroutinefunction(handler):
                return await handler(payload)
            else:
                loop = asyncio.get_event_loop()
                return await loop.run_in_executor(None, handler, payload)
        
        # Fallback: call Mistral IOA API directly
        logger.info(f"Calling Mistral API for agent: {agent_name}")
        response = requests.post(
            "https://api.mistral.ai/v1/agents/run",
            headers={"Authorization": f"Bearer {self.langgraph_api_key}"},
            json={"agent": agent_name, "payload": payload},
            timeout=20
        )
        if response.status_code == 200:
            return response.json()
        else:
            logger.error(f"Mistral API error [{response.status_code}]: {response.text}")
            return {"error": f"Failed to run agent {agent_name}"}

    async def orchestrate(self, inputs: Dict[str, Any]) -> Dict[str, Any]:
        """
        Example orchestration logic:
         - Launch imagery triage & social triage in parallel
         - Merge priorities
         - Call logistics optimizer
        """
        logger.info("Orchestration started.")
        tasks = [
            self.run_agent("imagery_triage", inputs.get("image_payload", {})),
            self.run_agent("social_triage", inputs.get("social_payload", {}))
        ]

        imagery_res, social_res = await asyncio.gather(*tasks)

        # Build priority list
        priorities: List[Dict[str, Any]] = []
        for z in imagery_res.get("zones", []):
            priorities.append({
                "zone_id": z.get("id"),
                "latlng": z.get("center"),
                "severity": z.get("severity"),
                "source": "imagery"
            })
        for r in social_res.get("reports", []):
            priorities.append({
                "zone_id": f"report-{r.get('id')}",
                "latlng": r.get("latlng"),
                "severity": r.get("urgency_score", 0.5),
                "source": "social"
            })

        priorities.sort(key=lambda x: x["severity"], reverse=True)
        top = priorities[:10]

        logistics_res = await self.run_agent(
            "logistics_optimizer",
            {"priorities": top, "resources": inputs.get("resources", {})}
        )

        result = {
            "imagery": imagery_res,
            "social": social_res,
            "priorities": top,
            "logistics": logistics_res
        }
        logger.info("Orchestration completed.")
        return result
