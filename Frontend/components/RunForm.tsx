'use client';

import { useState, useEffect } from 'react';
import { Agent } from '@/types/agent';
import { fetchAgents, runAgent } from '@/lib/api';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Skeleton } from '@/components/ui/skeleton';
import { Play, AlertCircle, CheckCircle } from 'lucide-react';

interface RunFormProps {
  initialAgentId?: string;
}

export default function RunForm({ initialAgentId }: RunFormProps) {
  const [agents, setAgents] = useState<Agent[]>([]);
  const [selectedAgentId, setSelectedAgentId] = useState<string>(initialAgentId || '');
  const [input, setInput] = useState('');
  const [result, setResult] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);
  const [running, setRunning] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function loadAgents() {
      try {
        setLoading(true);
        setError(null);
        const fetchedAgents = await fetchAgents();
        setAgents(fetchedAgents);
        
        // If initialAgentId is provided and valid, use it
        if (initialAgentId && fetchedAgents.some((agent: Agent) => agent.id === initialAgentId)) {
          setSelectedAgentId(initialAgentId);
        }
      } catch (err) {
        setError('Failed to load agents. Please make sure the backend server is running.');
        console.error('Error loading agents:', err);
      } finally {
        setLoading(false);
      }
    }

    loadAgents();
  }, [initialAgentId]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!selectedAgentId || !input.trim()) {
      setError('Please select an agent and provide input.');
      return;
    }

    try {
      setRunning(true);
      setError(null);
      setResult(null);
      
      const response = await runAgent(selectedAgentId, input.trim());
      setResult(response.result);
    } catch (err) {
      setError('Failed to run agent. Please check your connection and try again.');
      console.error('Error running agent:', err);
    } finally {
      setRunning(false);
    }
  };

  if (loading) {
    return (
      <div className="max-w-2xl mx-auto space-y-6">
        <Skeleton className="h-8 w-64" />
        <Skeleton className="h-20 w-full" />
        <Skeleton className="h-32 w-full" />
        <Skeleton className="h-10 w-32" />
      </div>
    );
  }

  const selectedAgent = agents.find(agent => agent.id === selectedAgentId);

  return (
    <div className="max-w-2xl mx-auto space-y-6">
      <form onSubmit={handleSubmit} className="space-y-6">
        <Card>
          <CardHeader>
            <CardTitle>Run Agent</CardTitle>
            <CardDescription>
              Select an agent and provide input to execute a task.
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="agent-select">Select Agent</Label>
              <Select value={selectedAgentId} onValueChange={setSelectedAgentId}>
                <SelectTrigger id="agent-select">
                  <SelectValue placeholder="Choose an agent..." />
                </SelectTrigger>
                <SelectContent>
                  {agents.map((agent) => (
                    <SelectItem key={agent.id} value={agent.id}>
                      {agent.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              {selectedAgent && (
                <p className="text-sm text-gray-600">{selectedAgent.description}</p>
              )}
            </div>

            <div className="space-y-2">
              <Label htmlFor="input-textarea">Input</Label>
              <Textarea
                id="input-textarea"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder="Enter your input for the agent..."
                className="min-h-32"
                disabled={running}
              />
            </div>

            <Button 
              type="submit" 
              className="w-full bg-blue-600 hover:bg-blue-700" 
              disabled={running || !selectedAgentId || !input.trim()}
            >
              {running ? (
                <>
                  <div className="w-4 h-4 mr-2 border-2 border-white border-t-transparent rounded-full animate-spin" />
                  Running Agent...
                </>
              ) : (
                <>
                  <Play className="w-4 h-4 mr-2" />
                  Run Agent
                </>
              )}
            </Button>
          </CardContent>
        </Card>
      </form>

      {error && (
        <Alert className="border-red-200 bg-red-50">
          <AlertCircle className="h-4 w-4 text-red-600" />
          <AlertDescription className="text-red-800">
            {error}
          </AlertDescription>
        </Alert>
      )}

      {result && (
        <Card className="border-green-200 bg-green-50">
          <CardHeader>
            <CardTitle className="flex items-center text-green-800">
              <CheckCircle className="w-5 h-5 mr-2" />
              Agent Result
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="bg-white p-4 rounded-lg border">
              <pre className="whitespace-pre-wrap text-sm text-gray-800 font-mono">
                {result}
              </pre>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
}