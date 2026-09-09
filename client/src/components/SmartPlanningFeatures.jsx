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
    <section className="py-16 bg-[#F3F4F4]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="text-center max-w-xl mx-auto mb-12 space-y-2">
          <span className="text-xs font-bold text-[#853953] uppercase tracking-wider">
            Smart Capabilities
          </span>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-[#2C2C2C]">
            Smart Travel Planning
          </h2>
          <p className="text-sm font-normal text-[#2C2C2C]/75">
            Core features designed to streamline travel planning from discovery to itinerary.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {capabilities.map((cap, idx) => {
            const IconComponent = cap.icon;
            return (
              <div
                key={idx}
                className="bg-white rounded-xl p-6 shadow-xs border border-gray-200/80 space-y-3"
              >
                <div className="w-10 h-10 rounded-lg bg-[#853953]/10 text-[#853953] flex items-center justify-center font-bold">
                  <IconComponent className="w-5 h-5" />
                </div>
                <h3 className="text-base font-bold text-[#2C2C2C]">{cap.title}</h3>
                <p className="text-xs text-[#2C2C2C]/75 font-normal leading-relaxed">
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
