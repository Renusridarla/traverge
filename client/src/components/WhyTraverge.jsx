import React from 'react';
import { IndianRupee, Sun, Building2, Calendar, Globe, Sparkles } from 'lucide-react';

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
    <section className="py-16 bg-white border-y border-orange-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="text-center max-w-2xl mx-auto space-y-3 mb-12">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-orange-100 text-brand-orange text-xs font-extrabold uppercase tracking-wider">
            <Sparkles className="w-3.5 h-3.5" />
            Platform Highlights
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900">
            Why Choose Traverge?
          </h2>
          <p className="text-sm font-medium text-slate-600">
            Everything you need for seamless destination discovery, stay recommendations, live weather, and dynamic day-wise itineraries.
          </p>
        </div>

        {/* Feature Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-6">
          {features.map((feat, idx) => (
            <div
              key={idx}
              className="bg-brand-cream/60 rounded-3xl p-6 border border-orange-100/80 hover:border-brand-orange hover:shadow-card-hover hover:-translate-y-1 transition-all duration-300 flex flex-col justify-between"
            >
              <div className="space-y-4">
                <div className={`w-12 h-12 rounded-2xl bg-gradient-to-br ${feat.gradient} text-white text-2xl flex items-center justify-center shadow-md`}>
                  {feat.icon}
                </div>
                <h3 className="text-lg font-extrabold text-slate-900">{feat.title}</h3>
                <p className="text-xs text-slate-600 font-medium leading-relaxed">
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
