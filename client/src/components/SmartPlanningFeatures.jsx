import React from 'react';
import { IndianRupee, CloudSun, Calendar } from 'lucide-react';

export default function SmartPlanningFeatures() {
  const capabilities = [
    {
      icon: IndianRupee,
      title: 'Budget-Based Planning',
      desc: 'Set your trip budget in INR and receive customized destination, hotel, and activity options matching your target.'
    },
    {
      icon: CloudSun,
      title: 'Weather-Aware Recommendations',
      desc: 'Integrates real-time weather forecasts to recommend sunny outdoor sightseeing or indoor cultural experiences.'
    },
    {
      icon: Calendar,
      title: 'Day-Wise Itineraries',
      desc: 'Generates structured morning, afternoon, and evening timelines complete with estimated costs for each activity.'
    }
  ];

  return (
    <section className="py-16 bg-[#0B0F14] border-b border-[#232E3C]/60">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="text-center max-w-xl mx-auto mb-12 space-y-2">
          <span className="text-xs font-extrabold text-[#FFF449] uppercase tracking-wider px-3 py-1 rounded-full bg-[#131920] border border-[#232E3C] inline-block">
            Smart Capabilities
          </span>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-white">
            Smart Travel Planning
          </h2>
          <p className="text-sm font-normal text-gray-400">
            Core features designed to streamline travel planning from discovery to itinerary.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {capabilities.map((cap, idx) => {
            const IconComponent = cap.icon;
            return (
              <div
                key={idx}
                className="interactive-card bg-[#131920] rounded-2xl p-6 shadow-card-dark border border-[#232E3C] hover:border-[#B2D959]/50 hover:shadow-glow-yellow transition-all duration-300 space-y-4"
              >
                <div className="w-12 h-12 rounded-xl bg-gradient-brand text-[#0B0F14] flex items-center justify-center font-bold shadow-glow-yellow">
                  <IconComponent className="w-6 h-6" />
                </div>
                <h3 className="text-base font-bold text-white">{cap.title}</h3>
                <p className="text-xs text-gray-400 font-normal leading-relaxed">
                  {cap.desc}
                </p>
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
}
