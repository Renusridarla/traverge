import React from 'react';
import { Sparkles, IndianRupee, CloudSun, Building, Calendar, Globe } from 'lucide-react';

export default function WhyTraverge() {
  const features = [
    {
      icon: IndianRupee,
      title: 'Budget Friendly',
      description: 'Find destinations, hotels, and custom travel packages aligned precisely with your budget in INR.'
    },
    {
      icon: CloudSun,
      title: 'Weather Smart',
      description: 'Dynamic weather API integration that adjusts activity recommendations for sunny, rainy, or cold days.'
    },
    {
      icon: Building,
      title: 'Hotel Suggestions',
      description: 'Explore curated stays from budget hostels to 5-star luxury resorts with transparent estimated prices.'
    },
    {
      icon: Calendar,
      title: 'Smart Itinerary',
      description: 'Get an instant personalized morning, afternoon, and evening day-wise itinerary for any trip.'
    },
    {
      icon: Globe,
      title: 'Domestic + Global',
      description: 'Comprehensive guide covering 36 Indian States & UTs and over 20+ top global country destinations.'
    }
  ];

  return (
    <section className="py-20 relative bg-[#0B0F14] border-b border-[#232E3C]/60">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Header */}
        <div className="text-center max-w-2xl mx-auto space-y-3 mb-14">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#131920] border border-[#232E3C] shadow-card-dark text-[#FFF449] text-xs font-extrabold uppercase tracking-wider">
            <Sparkles className="w-4 h-4 text-[#B2D959]" />
            <span>Platform Highlights</span>
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-white tracking-tight">
            Why Choose Traverge?
          </h2>
          <p className="text-sm sm:text-base font-normal text-gray-400">
            Everything you need for seamless destination discovery, stay recommendations, live weather, and dynamic day-wise itineraries.
          </p>
        </div>

        {/* Feature Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-6">
          {features.map((feat, idx) => {
            const IconComponent = feat.icon;
            return (
              <div
                key={idx}
                className="interactive-card bg-[#131920] rounded-2xl p-6 border border-[#232E3C] hover:border-[#FFF449]/50 shadow-card-dark hover:shadow-glow-green transition-all duration-300 flex flex-col justify-between group"
              >
                <div className="space-y-4">
                  <div className="w-12 h-12 rounded-xl bg-gradient-brand text-[#0B0F14] flex items-center justify-center font-bold shadow-glow-yellow group-hover:scale-110 transition-transform duration-300">
                    <IconComponent className="w-6 h-6" />
                  </div>
                  <h3 className="text-base font-bold text-white group-hover:text-[#FFF449] transition-colors">{feat.title}</h3>
                  <p className="text-xs text-gray-400 font-normal leading-relaxed">
                    {feat.description}
                  </p>
                </div>
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
}
