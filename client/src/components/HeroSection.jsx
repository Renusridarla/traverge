import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Compass, MapPin, Globe, Sparkles } from 'lucide-react';

export default function HeroSection() {
  return (
    <section className="relative overflow-hidden py-16 lg:py-24 border-b border-[#232E3C]/60">
      
      {/* Subtle Background Glows */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full max-w-7xl pointer-events-none">
        <div className="absolute top-10 left-10 w-96 h-96 bg-gradient-to-tr from-[#FFF449]/10 via-[#B2D959]/08 to-transparent rounded-full blur-3xl animate-float-slow" />
        <div className="absolute bottom-10 right-10 w-[32rem] h-[32rem] bg-gradient-to-bl from-[#7EC151]/10 via-[#FFF449]/06 to-transparent rounded-full blur-3xl animate-float-reverse" />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          
          {/* Left Column: Heading & CTAs */}
          <div className="lg:col-span-7 space-y-6 text-center lg:text-left">
            
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#131920] border border-[#232E3C] shadow-card-dark text-[#FFF449] text-xs font-bold">
              <span className="w-2 h-2 rounded-full bg-[#B2D959] animate-ping" />
              <span>Futuristic Travel-Tech Companion</span>
            </div>

            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black text-white tracking-tight leading-tight">
              Plan Less.{' '}
              <span className="text-gradient-brand">
                Travel More.
              </span>
            </h1>

            <p className="text-base sm:text-lg text-[#F3F4F6]/80 font-normal max-w-2xl leading-relaxed">
              Your intelligent travel companion for personalized destinations, stays, budgets, weather insights, and day-wise itineraries.
            </p>

            <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4 pt-2">
              <Link
                to="/itinerary"
                className="w-full sm:w-auto px-8 py-4 rounded-xl bg-gradient-brand hover:bg-gradient-brand-hover text-[#0B0F14] font-black text-sm shadow-glow-yellow hover:scale-105 active:scale-95 transition-all flex items-center justify-center gap-2.5 group"
              >
                <span>Plan Your Trip</span>
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </Link>

              <Link
                to="/destinations"
                className="w-full sm:w-auto px-8 py-4 rounded-xl bg-[#131920] text-white font-bold text-sm border border-[#232E3C] hover:border-[#FFF449] hover:bg-[#1A222C] shadow-card-dark hover:scale-105 transition-all flex items-center justify-center gap-2.5"
              >
                <Compass className="w-4 h-4 text-[#B2D959]" />
                <span>Explore Destinations</span>
              </Link>
            </div>

            {/* Quick Stats Strip */}
            <div className="pt-8 border-t border-[#232E3C] grid grid-cols-3 gap-4 text-center lg:text-left">
              <div className="p-3 rounded-xl bg-[#131920]/80 backdrop-blur-md border border-[#232E3C]">
                <div className="flex items-center justify-center lg:justify-start gap-1 text-[#FFF449] font-black text-2xl">
                  <span>36+</span> <MapPin className="w-4 h-4 text-[#B2D959]" />
                </div>
                <p className="text-xs font-semibold text-gray-400">Indian States & UTs</p>
              </div>

              <div className="p-3 rounded-xl bg-[#131920]/80 backdrop-blur-md border border-[#232E3C]">
                <div className="flex items-center justify-center lg:justify-start gap-1 text-[#B2D959] font-black text-2xl">
                  <span>20+</span> <Globe className="w-4 h-4 text-[#7EC151]" />
                </div>
                <p className="text-xs font-semibold text-gray-400">International Hubs</p>
              </div>

              <div className="p-3 rounded-xl bg-[#131920]/80 backdrop-blur-md border border-[#232E3C]">
                <div className="flex items-center justify-center lg:justify-start gap-1 text-[#7EC151] font-black text-2xl">
                  <span>100%</span> <Sparkles className="w-4 h-4 text-[#FFF449]" />
                </div>
                <p className="text-xs font-semibold text-gray-400">Smart Itineraries</p>
              </div>
            </div>

          </div>

          {/* Right Column: Dark Futuristic World Map / Route Lines Visual */}
          <div className="lg:col-span-5">
            <div className="relative mx-auto max-w-md lg:max-w-none">
              
              <div className="relative rounded-2xl overflow-hidden shadow-card-dark border border-[#232E3C] bg-[#131920] group p-2">
                <img
                  src="https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=800&q=80"
                  alt="Cinematic Destination"
                  className="w-full h-[400px] lg:h-[440px] object-cover rounded-xl group-hover:scale-105 transition-transform duration-700 opacity-85"
                />
                
                <div className="absolute inset-0 bg-gradient-to-t from-[#0B0F14] via-[#0B0F14]/20 to-transparent" />

                {/* Floating Location Overlay */}
                <div className="absolute bottom-6 left-6 right-6 p-4 rounded-xl bg-[#131920]/90 backdrop-blur-xl border border-[#232E3C] flex items-center justify-between">
                  <div>
                    <span className="text-[10px] font-bold uppercase tracking-wider text-[#B2D959]">Live Route Highlight</span>
                    <h3 className="text-sm font-extrabold text-white">Manali & Solang Valley Route</h3>
                  </div>
                  <div className="w-8 h-8 rounded-lg bg-gradient-brand text-[#0B0F14] flex items-center justify-center font-bold text-xs shadow-glow-yellow">
                    22°C
                  </div>
                </div>

              </div>

            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
