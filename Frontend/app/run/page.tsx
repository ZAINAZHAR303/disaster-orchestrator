'use client';

import { Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
import RunForm from '@/components/RunForm';
import { Skeleton } from '@/components/ui/skeleton';

function RunAgentContent() {
  const searchParams = useSearchParams();
  const agentId = searchParams.get('agent');

  return (
    <div className="space-y-8">
      <div className="text-center space-y-4">
        <h1 className="text-3xl font-bold text-gray-900">Run Agent</h1>
        <p className="text-lg text-gray-600 max-w-2xl mx-auto">
          Select an agent and provide input to execute disaster response tasks. 
          Monitor the execution and view results in real-time.
        </p>
      </div>
      
      <RunForm initialAgentId={agentId || undefined} />
    </div>
  );
}

export default function RunPage() {
  return (
    <Suspense fallback={
      <div className="space-y-8">
        <div className="text-center space-y-4">
          <Skeleton className="h-8 w-64 mx-auto" />
          <Skeleton className="h-6 w-96 mx-auto" />
        </div>
        <div className="max-w-2xl mx-auto">
          <Skeleton className="h-64 w-full" />
        </div>
      </div>
    }>
      <RunAgentContent />
    </Suspense>
  );
}