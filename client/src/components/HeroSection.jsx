import React from 'react';
import { Link } from 'react-router-dom';
import { Compass, Sparkles, MapPin, Sun, ShieldCheck, Star } from 'lucide-react';

export default function HeroSection() {
  return (
    <div className="relative overflow-hidden bg-gradient-to-b from-orange-50/60 via-amber-50/30 to-brand-cream py-12 lg:py-20">
      {/* Decorative ambient background glows */}
      <div className="absolute top-10 left-1/2 -translate-x-1/2 w-96 h-96 bg-gradient-to-tr from-orange-400/20 to-yellow-300/30 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute top-40 right-10 w-72 h-72 bg-amber-400/10 rounded-full blur-2xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          
          {/* Left Text Column */}
          <div className="lg:col-span-7 space-y-6 text-center lg:text-left">
            
            {/* Tagline Badge */}
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/90 border border-orange-200 shadow-sm text-brand-orange text-xs sm:text-sm font-bold">
              <span className="flex h-2 w-2 rounded-full bg-brand-orange animate-ping" />
              <Sparkles className="w-4 h-4 text-brand-golden" />
              Smart AI-Powered Travel Planning
            </div>

            {/* Main Heading */}
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-slate-900 tracking-tight leading-[1.15]">
              Plan Your Perfect Trip with{' '}
              <span className="bg-gradient-to-r from-brand-orange via-amber-500 to-brand-golden bg-clip-text text-transparent">
                Traverge
              </span>
            </h1>

            {/* Subtitle */}
            <p className="text-lg sm:text-xl text-slate-600 font-medium max-w-2xl leading-relaxed">
              Discover destinations, find the right stay, check the weather, and get a personalized day-wise itinerary — all in one place.
            </p>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4 pt-2">
              <Link
                to="/itinerary"
                className="w-full sm:w-auto px-8 py-4 rounded-2xl bg-gradient-to-r from-brand-orange via-amber-500 to-brand-golden text-white font-bold text-base shadow-glow hover:shadow-glow-yellow hover:scale-[1.03] transition-all flex items-center justify-center gap-2.5"
              >
                <Sparkles className="w-5 h-5" />
                Start Planning Now
              </Link>

              <Link
                to="/destinations"
                className="w-full sm:w-auto px-8 py-4 rounded-2xl bg-white text-slate-800 font-bold text-base border-2 border-orange-200/80 hover:border-brand-orange hover:bg-orange-50/50 shadow-sm hover:scale-[1.02] transition-all flex items-center justify-center gap-2.5"
              >
                <Compass className="w-5 h-5 text-brand-orange" />
                Explore Destinations
              </Link>
            </div>

            {/* Trust Badges */}
            <div className="pt-6 border-t border-orange-200/60 grid grid-cols-3 gap-4 text-center lg:text-left">
              <div className="space-y-1">
                <div className="flex items-center justify-center lg:justify-start gap-1 text-brand-orange font-extrabold text-xl">
                  <span>36+</span> <MapPin className="w-4 h-4" />
                </div>
                <p className="text-xs font-semibold text-slate-500">Indian States & UTs</p>
              </div>

              <div className="space-y-1">
                <div className="flex items-center justify-center lg:justify-start gap-1 text-amber-500 font-extrabold text-xl">
                  <span>20+</span> <Sun className="w-4 h-4" />
                </div>
                <p className="text-xs font-semibold text-slate-500">International Hubs</p>
              </div>

              <div className="space-y-1">
                <div className="flex items-center justify-center lg:justify-start gap-1 text-yellow-500 font-extrabold text-xl">
                  <span>4.9/5</span> <Star className="w-4 h-4 fill-amber-400" />
                </div>
                <p className="text-xs font-semibold text-slate-500">Traveler Satisfaction</p>
              </div>
            </div>
          </div>

          {/* Right Hero Image Card */}
          <div className="lg:col-span-5 relative">
            <div className="relative mx-auto max-w-md lg:max-w-none">
              
              {/* Main Scenic Card */}
              <div className="relative rounded-3xl overflow-hidden shadow-card-hover border-4 border-white bg-white group">
                <img
                  src="https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=800&q=80"
                  alt="Scenic Beach Travel"
                  className="w-full h-[420px] object-cover group-hover:scale-105 transition-transform duration-700"
                />

                {/* Floating Weather Overlay */}
                <div className="absolute top-4 left-4 bg-white/90 backdrop-blur-md px-3.5 py-2 rounded-2xl shadow-md border border-white flex items-center gap-2.5">
                  <div className="w-8 h-8 rounded-xl bg-amber-100 flex items-center justify-center text-amber-600 font-bold text-sm">
                    ☀️
                  </div>
                  <div>
                    <p className="text-xs font-extrabold text-slate-800">Manali • 22°C</p>
                    <p className="text-[10px] font-semibold text-emerald-600">Sunny • Best Time to Visit</p>
                  </div>
                </div>

                {/* Floating Itinerary Preview Overlay */}
                <div className="absolute bottom-4 right-4 bg-white/95 backdrop-blur-md p-3.5 rounded-2xl shadow-lg border border-orange-100 max-w-[240px]">
                  <div className="flex items-center justify-between pb-1.5 border-b border-slate-100">
                    <span className="text-xs font-extrabold text-brand-orange">Day 1 Itinerary</span>
                    <span className="text-[10px] bg-orange-100 text-brand-orange font-bold px-2 py-0.5 rounded-full">₹25,000</span>
                  </div>
                  <p className="text-xs font-bold text-slate-800 pt-1.5 truncate">🏖️ Beach Walk & Watersports</p>
                  <p className="text-[11px] text-slate-500">Morning 09:30 AM • Solang Valley</p>
                </div>
              </div>

              {/* Decorative accent element */}
              <div className="absolute -bottom-6 -left-6 bg-gradient-to-r from-brand-orange to-brand-golden p-4 rounded-2xl text-white font-bold text-sm shadow-glow flex items-center gap-2">
                <ShieldCheck className="w-5 h-5 text-yellow-200" />
                Verified Sample Hotels & Stays
              </div>

            </div>
          </div>

        </div>
      </div>
    </div>
  );
}
