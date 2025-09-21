'use client'

import { Waves, Factory, Building2, Globe } from 'lucide-react'

const applications = [
  {
    icon: Waves,
    title: 'Flood Rescue Operations',
    description: 'Coordinate evacuation routes, resource allocation, and emergency shelter management during flooding events'
  },
  {
    icon: Factory,
    title: 'Industrial Accidents',
    description: 'Rapid response protocols for chemical spills, explosions, and workplace emergencies with safety prioritization'
  },
  {
    icon: Building2,
    title: 'NGOs & Governments',
    description: 'Multi-agency coordination tools for humanitarian aid distribution and government emergency response'
  },
  {
    icon: Globe,
    title: 'Global Crisis Management',
    description: 'International disaster response coordination with real-time communication and resource sharing'
  }
]

export default function ApplicationsSection() {
  return (
    <section className="bg-slate-900 py-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
            Applications
          </h2>
          <div className="w-20 h-1 bg-gradient-to-r from-cyan-400 to-teal-500 mx-auto rounded-full"></div>
        </div>
        
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {applications.map((app, index) => (
            <div
              key={index}
              className="group relative bg-slate-800/50 p-6 rounded-xl border border-slate-700 hover:border-teal-500/50 transition-all duration-300 hover:shadow-xl hover:shadow-teal-400/10 hover:-translate-y-1"
            >
              <div className="absolute inset-0 bg-gradient-to-b from-teal-400/5 to-cyan-500/5 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              <div className="relative">
                <div className="w-16 h-16 bg-teal-500/20 rounded-xl flex items-center justify-center mb-6 mx-auto group-hover:scale-110 transition-transform duration-300">
                  <app.icon className="w-8 h-8 text-teal-400" />
                </div>
                <h3 className="text-lg font-semibold text-white mb-4 text-center">
                  {app.title}
                </h3>
                <p className="text-slate-300 text-sm leading-relaxed text-center">
                  {app.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}