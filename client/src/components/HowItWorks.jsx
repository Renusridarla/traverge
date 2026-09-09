import React from 'react';
import { MapPin, Calendar, Sun, Sparkles, ArrowRight } from 'lucide-react';

export default function HowItWorks() {
  const steps = [
    {
      step: '01',
      title: 'Choose Destination',
      desc: 'Browse across 36 Indian States & UTs or 20+ top international countries.',
      icon: MapPin
    },
    {
      step: '02',
      title: 'Set Budget & Dates',
      desc: 'Select your budget in INR, travel dates, and travelers count.',
      icon: Calendar
    },
    {
      step: '03',
      title: 'Check Weather & Hotels',
      desc: 'Get live weather insights & curated hotel options tailored to your stay.',
      icon: Sun
    },
    {
      step: '04',
      title: 'Get Personalized Itinerary',
      desc: 'Receive a full day-wise schedule with cost breakdown visualizer.',
      icon: Sparkles
    }
  ];

  return (
    <section className="py-16 bg-gradient-to-b from-brand-cream to-orange-50/40">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="text-center max-w-2xl mx-auto space-y-3 mb-12">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-100 text-amber-800 text-xs font-extrabold uppercase tracking-wider">
            Simple 4-Step Process
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900">
            How Traverge Works
          </h2>
          <p className="text-sm font-medium text-slate-600">
            From destination discovery to a complete day-wise plan in under 60 seconds.
          </p>
        </div>

        {/* Steps Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 relative">
          {steps.map((s, idx) => (
            <div
              key={idx}
              className="bg-white rounded-3xl p-6 shadow-sm border border-orange-100/80 hover:shadow-card-hover hover:-translate-y-1 transition-all relative flex flex-col justify-between space-y-4"
            >
              <div>
                <div className="flex items-center justify-between mb-4">
                  <span className="text-3xl font-black text-brand-orange/30">
                    {s.step}
                  </span>
                  <div className="w-10 h-10 rounded-2xl bg-orange-50 text-brand-orange flex items-center justify-center font-bold">
                    <s.icon className="w-5 h-5" />
                  </div>
                </div>

                <h3 className="text-lg font-extrabold text-slate-900 mb-1.5">{s.title}</h3>
                <p className="text-xs text-slate-600 font-medium leading-relaxed">{s.desc}</p>
              </div>

              {idx < steps.length - 1 && (
                <div className="hidden lg:block absolute -right-3 top-1/2 -translate-y-1/2 z-10 text-orange-300">
                  <ArrowRight className="w-6 h-6" />
                </div>
              )}
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}
