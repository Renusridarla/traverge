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
    <section className="py-20 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        <div className="text-center max-w-2xl mx-auto space-y-3 mb-14">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/90 backdrop-blur-xl border border-orange-200/80 shadow-md text-brand-orange text-xs font-black uppercase tracking-wider">
            <span>Simple 4-Step Process</span>
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-slate-900 tracking-tight">
            How Traverge Works
          </h2>
          <p className="text-sm sm:text-base font-semibold text-slate-600">
            From destination discovery to a complete day-wise plan in under 60 seconds.
          </p>
        </div>

        {/* Steps Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 relative">
          {steps.map((s, idx) => (
            <div
              key={idx}
              className="bg-white/85 backdrop-blur-2xl rounded-3xl p-6 shadow-lg shadow-orange-500/5 border border-white/90 hover:border-brand-orange/60 hover:shadow-2xl hover:-translate-y-2 transition-all duration-300 relative flex flex-col justify-between space-y-4 group"
            >
              <div>
                <div className="flex items-center justify-between mb-4">
                  <span className="text-4xl font-black bg-gradient-to-r from-brand-orange to-amber-500 bg-clip-text text-transparent opacity-80">
                    {s.step}
                  </span>
                  <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-brand-orange to-amber-500 text-white flex items-center justify-center font-bold shadow-md group-hover:rotate-12 transition-transform">
                    <s.icon className="w-6 h-6" />
                  </div>
                </div>

                <h3 className="text-lg font-black text-slate-900 mb-1.5 group-hover:text-brand-orange transition-colors">{s.title}</h3>
                <p className="text-xs text-slate-600 font-semibold leading-relaxed">{s.desc}</p>
              </div>

              {idx < steps.length - 1 && (
                <div className="hidden lg:block absolute -right-3 top-1/2 -translate-y-1/2 z-10 text-brand-orange/60">
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
