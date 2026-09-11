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
      title: 'Check Weather & Stays',
      desc: 'Get live weather insights & curated hotel options tailored to your stay.',
      icon: Sun
    },
    {
      step: '04',
      title: 'Personalized Schedule',
      desc: 'Receive a full day-wise schedule with cost breakdown visualizer.',
      icon: Sparkles
    }
  ];

  return (
    <section className="py-20 relative bg-[#0B0F14] border-b border-[#232E3C]/60">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        <div className="text-center max-w-2xl mx-auto space-y-3 mb-14">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#131920] border border-[#232E3C] shadow-card-dark text-[#FFF449] text-xs font-extrabold uppercase tracking-wider">
            <span>Simple 4-Step Process</span>
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-white tracking-tight">
            How Traverge Works
          </h2>
          <p className="text-sm sm:text-base font-normal text-gray-400">
            From destination discovery to a complete day-wise plan in under 60 seconds.
          </p>
        </div>

        {/* Steps Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 relative">
          {steps.map((s, idx) => (
            <div
              key={idx}
              className="interactive-card bg-[#131920] rounded-2xl p-6 shadow-card-dark border border-[#232E3C] hover:border-[#B2D959]/50 hover:shadow-glow-yellow transition-all duration-300 relative flex flex-col justify-between space-y-6 group"
            >
              <div>
                <div className="flex items-center justify-between mb-4">
                  <span className="text-4xl font-black text-gradient-brand">
                    {s.step}
                  </span>
                  <div className="w-12 h-12 rounded-xl bg-gradient-brand text-[#0B0F14] flex items-center justify-center font-bold shadow-glow-yellow group-hover:rotate-12 transition-transform">
                    <s.icon className="w-6 h-6" />
                  </div>
                </div>

                <h3 className="text-lg font-bold text-white mb-2 group-hover:text-[#FFF449] transition-colors">{s.title}</h3>
                <p className="text-xs text-gray-400 font-normal leading-relaxed">{s.desc}</p>
              </div>

              {idx < steps.length - 1 && (
                <div className="hidden lg:block absolute -right-3 top-1/2 -translate-y-1/2 z-10 text-[#B2D959]">
                  <ArrowRight className="w-5 h-5" />
                </div>
              )}
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}
