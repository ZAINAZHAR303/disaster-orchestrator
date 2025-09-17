'use client';

import { Agent } from '@/types/agent';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Play } from 'lucide-react';
import Link from 'next/link';

interface AgentCardProps {
  agent: Agent;
}

export default function AgentCard({ agent }: AgentCardProps) {
  return (
    <Card className="h-full flex flex-col transition-all duration-200 hover:shadow-lg hover:-translate-y-1">
      <CardHeader>
        <CardTitle className="text-lg font-semibold text-gray-900">
          {agent.name}
        </CardTitle>
        <CardDescription className="text-gray-600 text-sm line-clamp-3">
          {agent.description}
        </CardDescription>
      </CardHeader>
      <CardContent className="flex-1 flex flex-col justify-end">
        <Link href={`/run?agent=${agent.id}`} className="w-full">
          <Button className="w-full bg-blue-600 hover:bg-blue-700 text-white">
            <Play className="w-4 h-4 mr-2" />
            Run Agent
          </Button>
        </Link>
      </CardContent>
    </Card>
  );
}