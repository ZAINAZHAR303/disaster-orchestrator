'use client'

import { Github, Linkedin, Twitter } from 'lucide-react'

export default function Footer() {
  return (
    <footer className="bg-slate-950 border-t border-slate-800 py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center">
          <h3 className="text-2xl font-bold text-white mb-2">
            Disaster Response Orchestrator
          </h3>
          <p className="text-slate-400 mb-8">
            Empowering emergency response teams with AI-driven coordination
          </p>
          
          <div className="flex justify-center space-x-6 mb-8">
            <a
              href="#"
              className="w-10 h-10 bg-slate-800 hover:bg-cyan-600 rounded-full flex items-center justify-center transition-all duration-300 hover:scale-110 hover:shadow-lg hover:shadow-cyan-400/25"
            >
              <Github className="w-5 h-5 text-slate-300 hover:text-white" />
            </a>
            <a
              href="#"
              className="w-10 h-10 bg-slate-800 hover:bg-cyan-600 rounded-full flex items-center justify-center transition-all duration-300 hover:scale-110 hover:shadow-lg hover:shadow-cyan-400/25"
            >
              <Linkedin className="w-5 h-5 text-slate-300 hover:text-white" />
            </a>
            <a
              href="#"
              className="w-10 h-10 bg-slate-800 hover:bg-cyan-600 rounded-full flex items-center justify-center transition-all duration-300 hover:scale-110 hover:shadow-lg hover:shadow-cyan-400/25"
            >
              <Twitter className="w-5 h-5 text-slate-300 hover:text-white" />
            </a>
          </div>
          
          <div className="text-slate-500 text-sm">
            <p className="mb-2">© 2025 Disaster Response Orchestrator. All rights reserved.</p>
            <p>Built with ❤️ for emergency response teams worldwide</p>
          </div>
        </div>
      </div>
    </footer>
  )
}