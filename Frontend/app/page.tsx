import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Bot, Users, Play, Shield } from 'lucide-react';
import Link from 'next/link';

export default function Home() {
  return (
    <div className="space-y-12">
      {/* Hero Section */}
      <div className="text-center space-y-6">
        <div className="flex justify-center">
          <Bot className="h-16 w-16 text-blue-600" />
        </div>
        <h1 className="text-4xl font-bold text-gray-900 sm:text-5xl">
          Disaster Orchestrator Frontend
        </h1>
        <p className="text-xl text-gray-600 max-w-3xl mx-auto">
          A powerful interface for managing and coordinating disaster response agents. 
          Streamline emergency operations with intelligent automation and real-time execution.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link href="/agents">
            <Button size="lg" className="bg-blue-600 hover:bg-blue-700">
              <Users className="w-5 h-5 mr-2" />
              View Agents
            </Button>
          </Link>
          <Link href="/run">
            <Button size="lg" variant="outline">
              <Play className="w-5 h-5 mr-2" />
              Run Agent
            </Button>
          </Link>
        </div>
      </div>

      {/* Features Section */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        <Card className="text-center">
          <CardHeader>
            <div className="flex justify-center mb-4">
              <Users className="h-12 w-12 text-blue-600" />
            </div>
            <CardTitle>Agent Management</CardTitle>
            <CardDescription>
              Browse and manage your disaster response agents with detailed information and capabilities.
            </CardDescription>
          </CardHeader>
        </Card>

        <Card className="text-center">
          <CardHeader>
            <div className="flex justify-center mb-4">
              <Play className="h-12 w-12 text-green-600" />
            </div>
            <CardTitle>Execute Tasks</CardTitle>
            <CardDescription>
              Run agents with custom inputs and receive real-time results for disaster response scenarios.
            </CardDescription>
          </CardHeader>
        </Card>

        <Card className="text-center">
          <CardHeader>
            <div className="flex justify-center mb-4">
              <Shield className="h-12 w-12 text-purple-600" />
            </div>
            <CardTitle>Reliable Operations</CardTitle>
            <CardDescription>
              Built with modern web technologies to ensure stable and responsive disaster coordination.
            </CardDescription>
          </CardHeader>
        </Card>
      </div>

      {/* About Section */}
      <Card className="bg-gradient-to-r from-blue-50 to-indigo-50 border-blue-200">
        <CardHeader>
          <CardTitle className="text-2xl text-center">About Disaster Orchestrator</CardTitle>
        </CardHeader>
        <CardContent className="text-center space-y-4">
          <p className="text-gray-700 max-w-4xl mx-auto">
            The Disaster Orchestrator is a comprehensive system designed to coordinate and manage 
            emergency response operations through intelligent agents. Each agent is specialized 
            for specific disaster scenarios and can be executed with custom parameters to handle 
            real-world emergency situations effectively.
          </p>
          <p className="text-gray-700 max-w-4xl mx-auto">
            This frontend provides an intuitive interface to interact with your backend agents, 
            monitor their execution, and manage disaster response workflows with ease and reliability.
          </p>
        </CardContent>
      </Card>
    </div>
  );
}