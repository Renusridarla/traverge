import React from 'react';
import { Link } from 'react-router-dom';
import { Compass, Sparkles, MapPin, Sun, ShieldCheck, Star, ArrowRight, Flame } from 'lucide-react';

export default function HeroSection() {
  return (
    <div className="relative overflow-hidden py-12 lg:py-24">
      
      {/* Background Multi-Color Gradients & Floating Color Meshes */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full max-w-7xl pointer-events-none">
        <div className="absolute top-10 left-10 w-96 h-96 bg-[#E2B4BD]/35 rounded-full blur-3xl animate-float-slow" />
        <div className="absolute bottom-10 right-10 w-[32rem] h-[32rem] bg-[#F7D6D0]/40 rounded-full blur-3xl animate-float-reverse" />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          
          {/* Left Text Column */}
          <div className="lg:col-span-7 space-y-8 text-center lg:text-left">
            
            {/* Tagline Badge */}
            <div className="inline-flex items-center gap-2.5 px-4 py-2 rounded-full bg-white/90 backdrop-blur-xl border border-[#F7D6D0] shadow-sm text-[#C7929E] text-xs sm:text-sm font-extrabold">
              <span className="flex h-2.5 w-2.5 rounded-full bg-[#E2B4BD] animate-ping" />
              <Flame className="w-4 h-4 text-[#E2B4BD] fill-[#F7D6D0]" />
              <span>Smart AI-Powered Travel Planning</span>
            </div>

            {/* Main Heading */}
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black text-[#4A4A4A] tracking-tight leading-[1.12]">
              Plan Your Perfect Trip with{' '}
              <span className="bg-gradient-to-r from-[#C7929E] via-[#E2B4BD] to-[#4A4A4A] bg-clip-text text-transparent">
                Traverge
              </span>
            </h1>

            {/* Subtitle */}
            <p className="text-base sm:text-lg lg:text-xl text-[#4A4A4A]/80 font-semibold max-w-2xl leading-relaxed">
              Discover destinations, find the right stay, check the weather, and get a personalized day-wise itinerary — all in one place.
            </p>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4 pt-2">
              <Link
                to="/itinerary"
                className="w-full sm:w-auto px-8 py-4 rounded-2xl bg-[#E2B4BD] hover:bg-[#C7929E] text-white font-extrabold text-base shadow-md shadow-[#E2B4BD]/30 hover:scale-105 active:scale-95 transition-all flex items-center justify-center gap-3 group"
              >
                <Sparkles className="w-5 h-5 group-hover:rotate-12 transition-transform" />
                <span>Start Planning</span>
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </Link>

              <Link
                to="/destinations"
                className="w-full sm:w-auto px-8 py-4 rounded-2xl bg-white/90 backdrop-blur-xl text-[#4A4A4A] font-extrabold text-base border-2 border-[#F7D6D0] hover:border-[#E2B4BD] hover:bg-[#F7D6D0]/30 shadow-sm hover:scale-105 transition-all flex items-center justify-center gap-2.5"
              >
                <Compass className="w-5 h-5 text-[#E2B4BD]" />
                Explore Destinations
              </Link>
            </div>

            {/* Trust Badges */}
            <div className="pt-8 border-t border-[#F7D6D0] grid grid-cols-3 gap-4 text-center lg:text-left">
              <div className="p-3 rounded-2xl bg-white/80 backdrop-blur-md border border-[#F7D6D0] shadow-xs">
                <div className="flex items-center justify-center lg:justify-start gap-1 text-[#C7929E] font-black text-2xl">
                  <span>36+</span> <MapPin className="w-4 h-4" />
                </div>
                <p className="text-xs font-bold text-[#4A4A4A]/70">Indian States & UTs</p>
              </div>

              <div className="p-3 rounded-2xl bg-white/80 backdrop-blur-md border border-[#F7D6D0] shadow-xs">
                <div className="flex items-center justify-center lg:justify-start gap-1 text-[#E2B4BD] font-black text-2xl">
                  <span>20+</span> <Sun className="w-4 h-4" />
                </div>
                <p className="text-xs font-bold text-[#4A4A4A]/70">International Hubs</p>
              </div>

              <div className="p-3 rounded-2xl bg-white/80 backdrop-blur-md border border-[#F7D6D0] shadow-xs">
                <div className="flex items-center justify-center lg:justify-start gap-1 text-[#C7929E] font-black text-2xl">
                  <span>4.9/5</span> <Star className="w-4 h-4 fill-[#E2B4BD]" />
                </div>
                <p className="text-xs font-bold text-[#4A4A4A]/70">User Rating</p>
              </div>
            </div>
          </div>

          {/* Right Hero Image Showcase */}
          <div className="lg:col-span-5 relative">
            <div className="relative mx-auto max-w-md lg:max-w-none">
              
              {/* Main Scenic Card */}
              <div className="relative rounded-3xl overflow-hidden shadow-xl shadow-[#E2B4BD]/20 border-4 border-white bg-white group">
                <img
                  src="https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=800&q=80"
                  alt="Scenic Beach Travel"
                  className="w-full h-[450px] object-cover group-hover:scale-105 transition-transform duration-700"
                />

                {/* Floating Glass Weather Overlay */}
                <div className="absolute top-4 left-4 bg-white/90 backdrop-blur-xl px-4 py-2.5 rounded-2xl shadow-md border border-[#F7D6D0] flex items-center gap-3 animate-float-slow">
                  <div className="w-9 h-9 rounded-xl bg-[#F7D6D0]/80 text-[#C7929E] flex items-center justify-center font-bold text-base shadow-xs">
                    ☀️
                  </div>
                  <div>
                    <p className="text-xs font-extrabold text-[#4A4A4A]">Manali • 22°C</p>
                    <p className="text-[10px] font-bold text-[#C7929E]">Sunny • Ideal Travel Day</p>
                  </div>
                </div>

                {/* Floating Glass Itinerary Preview Overlay */}
                <div className="absolute bottom-6 right-4 bg-white/95 backdrop-blur-xl p-4 rounded-2xl shadow-lg border border-[#F7D6D0] max-w-[260px] animate-float-reverse">
                  <div className="flex items-center justify-between pb-2 border-b border-[#F7D6D0]/50">
                    <span className="text-xs font-black text-[#C7929E]">Day 1 Itinerary</span>
                    <span className="text-[10px] bg-[#E2B4BD] text-white font-extrabold px-2.5 py-0.5 rounded-full shadow-xs">
                      ₹25,000
                    </span>
                  </div>
                  <p className="text-xs font-extrabold text-[#4A4A4A] pt-2 truncate">🏖️ Beach Walk & Solang Valley</p>
                  <p className="text-[11px] font-semibold text-[#4A4A4A]/70">Morning 09:30 AM • 3 Hours</p>
                </div>
              </div>

              {/* Bottom Shield Badge */}
              <div className="absolute -bottom-6 -left-6 bg-[#E2B4BD] p-4 rounded-2xl text-white font-extrabold text-xs shadow-md shadow-[#E2B4BD]/30 flex items-center gap-2.5 border border-white/50">
                <ShieldCheck className="w-5 h-5 text-[#FFF5F5]" />
                <span>Verified Sample Stays & Weather Data</span>
              </div>

            </div>
          </div>

        </div>
      </div>
    </div>
  );
}
