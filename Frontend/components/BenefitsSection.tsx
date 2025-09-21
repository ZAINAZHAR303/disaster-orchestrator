'use client'

import { Clock, Target, RefreshCw, Users } from 'lucide-react'

const benefits = [
  {
    icon: Clock,
    title: 'Faster Decision Making',
    description: 'AI-powered analysis delivers critical insights in seconds, not hours'
  },
  {
    icon: Target,
    title: 'Actionable Insights',
    description: 'Transform raw data into clear, prioritized action items for responders'
  },
  {
    icon: RefreshCw,
    title: 'Real-Time Updates',
    description: 'Continuous monitoring and instant alerts for evolving situations'
  },
  {
    icon: Users,
    title: 'Supports Disaster Teams',
    description: 'Coordinated workflows that enhance team collaboration and efficiency'
  }
]

export default function BenefitsSection() {
  return (
    <section className="bg-slate-800 py-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
            Why Disaster Response Orchestrator?
          </h2>
          <div className="w-20 h-1 bg-gradient-to-r from-cyan-400 to-teal-500 mx-auto rounded-full"></div>
        </div>
        
        <div className="grid md:grid-cols-2 gap-8">
          {benefits.map((benefit, index) => (
            <div
              key={index}
              className="group relative bg-slate-900/50 p-8 rounded-xl border border-slate-700 hover:border-cyan-500/50 transition-all duration-300 hover:shadow-xl hover:shadow-cyan-400/10"
            >
              <div className="absolute inset-0 bg-gradient-to-r from-cyan-400/5 to-teal-500/5 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              <div className="relative">
                <div className="w-12 h-12 bg-cyan-500/20 rounded-lg flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300">
                  <benefit.icon className="w-6 h-6 text-cyan-400" />
                </div>
                <h3 className="text-xl font-semibold text-white mb-3">
                  {benefit.title}
                </h3>
                <p className="text-slate-300 leading-relaxed">
                  {benefit.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}