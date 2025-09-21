'use client'

import { AlertTriangle, Router } from 'lucide-react'
import { useRouter } from 'next/navigation'

export default function HeroSection() {
  const router = useRouter()

  const handleRunAgent = () => {
    router.push('/run')
  }

  return (
    <section className="relative bg-gradient-to-br from-slate-900 via-blue-900 to-slate-900 py-20 overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-10 left-10 w-32 h-32 border border-cyan-400 rounded-full"></div>
        <div className="absolute top-40 right-20 w-48 h-48 border border-cyan-400/30 rounded-full"></div>
        <div className="absolute bottom-20 left-1/4 w-24 h-24 border border-teal-400 rounded-full"></div>
      </div>
      
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <div className="mb-8">
          <h2 className="text-4xl md:text-6xl font-bold text-white mb-6 leading-tight">
            Orchestrate Emergency
            <span className="block bg-gradient-to-r from-cyan-400 to-teal-500 bg-clip-text text-transparent">
              Response Operations
            </span>
          </h2>
          <p className="text-xl text-slate-300 max-w-3xl mx-auto mb-8">
            Deploy AI-powered agents to coordinate disaster response, analyze real-time data, 
            and provide actionable insights for life-saving decisions.
          </p>
        </div>
        
        <button 
          onClick={handleRunAgent}
          className="group relative inline-flex items-center gap-3 px-8 py-4 bg-blue-800 hover:bg-blue-700 text-white font-semibold rounded-lg transition-all duration-300 hover:shadow-xl hover:shadow-cyan-400/25 hover:scale-105"
        >
          <AlertTriangle className="w-5 h-5 text-cyan-400" />
          <span className="text-lg">Run Agent</span>
          <div className="absolute inset-0 rounded-lg bg-gradient-to-r from-cyan-400/20 to-teal-500/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
        </button>
      </div>
    </section>
  )
}