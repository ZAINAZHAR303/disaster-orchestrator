export interface Agent {
  id: string;
  name: string;
  description: string;
}

export interface RunAgentRequest {
  agent_id: string;
  input: string;
}

export interface RunAgentResponse {
  result: string;
}