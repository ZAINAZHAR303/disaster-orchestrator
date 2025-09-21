'use client'

export default function Header() {
  return (
    <header className="bg-slate-900 border-b border-slate-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        <div className="text-center">
          <h1 className="text-3xl md:text-4xl font-bold text-white mb-2">
            Disaster Response Orchestrator
          </h1>
          <div className="w-24 h-1 bg-gradient-to-r from-cyan-400 to-teal-500 mx-auto mb-3 rounded-full"></div>
          <p className="text-slate-300 text-lg">
            AI-powered platform for disaster management
          </p>
        </div>
      </div>
    </header>
  )
}