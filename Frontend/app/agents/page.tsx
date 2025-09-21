// import AgentList from '@/components/AgentList';

export default function AgentsPage() {
  return (
    <div className="space-y-8">
      <div className="text-center space-y-4">
        <h1 className="text-3xl font-bold text-gray-900">Available Agents</h1>
        <p className="text-lg text-gray-600 max-w-2xl mx-auto">
          Browse through our collection of disaster response agents. Each agent is designed 
          for specific emergency scenarios and can be executed with custom inputs.
        </p>
      </div>
      
      {/* <AgentList /> */}
    </div>
  );
}