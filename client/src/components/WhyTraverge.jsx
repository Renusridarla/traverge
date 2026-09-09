import React from 'react';
import { Sparkles } from 'lucide-react';

export default function WhyTraverge() {
  const features = [
    {
      icon: '💰',
      title: 'Budget Friendly',
      description: 'Find destinations, hotels, and custom travel packages aligned precisely with your budget in INR.',
      gradient: 'from-amber-400 to-yellow-500'
    },
    {
      icon: '🌤️',
      title: 'Weather Smart',
      description: 'Dynamic weather API integration that adjusts activity recommendations for sunny, rainy, or cold days.',
      gradient: 'from-orange-400 to-brand-orange'
    },
    {
      icon: '🏨',
      title: 'Hotel Suggestions',
      description: 'Explore curated stays from budget hostels to 5-star luxury resorts with transparent estimated prices.',
      gradient: 'from-yellow-400 to-amber-500'
    },
    {
      icon: '📅',
      title: 'Smart Itinerary',
      description: 'Get an instant personalized morning, afternoon, and evening day-wise itinerary for any trip.',
      gradient: 'from-brand-orange to-red-500'
    },
    {
      icon: '🌎',
      title: 'Domestic + International',
      description: 'Comprehensive guide covering 36 Indian States & UTs and over 20+ top global country destinations.',
      gradient: 'from-amber-500 to-brand-golden'
    }
  ];

  return (
    <section className="py-20 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Header */}
        <div className="text-center max-w-2xl mx-auto space-y-3 mb-14">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/90 backdrop-blur-xl border border-orange-200/80 shadow-md text-brand-orange text-xs font-black uppercase tracking-wider">
            <Sparkles className="w-4 h-4 text-brand-golden" />
            <span>Platform Highlights</span>
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-slate-900 tracking-tight">
            Why Choose Traverge?
          </h2>
          <p className="text-sm sm:text-base font-semibold text-slate-600">
            Everything you need for seamless destination discovery, stay recommendations, live weather, and dynamic day-wise itineraries.
          </p>
        </div>

        {/* Feature Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-6">
          {features.map((feat, idx) => (
            <div
              key={idx}
              className="bg-white/85 backdrop-blur-2xl rounded-3xl p-6 border border-white/90 hover:border-brand-orange/60 shadow-lg shadow-orange-500/5 hover:shadow-2xl hover:shadow-orange-500/15 hover:-translate-y-2 transition-all duration-300 flex flex-col justify-between group"
            >
              <div className="space-y-4">
                <div className={`w-14 h-14 rounded-2xl bg-gradient-to-br ${feat.gradient} text-white text-3xl flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform duration-300`}>
                  {feat.icon}
                </div>
                <h3 className="text-lg font-black text-slate-900 group-hover:text-brand-orange transition-colors">{feat.title}</h3>
                <p className="text-xs text-slate-600 font-semibold leading-relaxed">
                  {feat.description}
                </p>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}
