import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Compass } from 'lucide-react';

export default function HeroSection() {
  return (
    <section className="bg-[#F3F4F4] py-12 lg:py-20 border-b border-gray-200/60">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          
          {/* Left Column: Heading & CTAs */}
          <div className="lg:col-span-7 space-y-6 text-center lg:text-left">
            
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white border border-gray-200 shadow-2xs text-[#853953] text-xs font-semibold">
              <span className="w-2 h-2 rounded-full bg-[#853953]" />
              Smart Travel Planning Platform
            </div>

            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-[#2C2C2C] tracking-tight leading-tight">
              Plan Your Journey,{' '}
              <span className="bg-gradient-to-r from-[#853953] to-[#612D53] bg-clip-text text-transparent">
                Your Way.
              </span>
            </h1>

            <p className="text-base sm:text-lg text-[#2C2C2C]/80 font-normal max-w-2xl leading-relaxed">
              Discover destinations, find the right stay, check the weather, and create a personalized travel itinerary based on your budget and preferences.
            </p>

            <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4 pt-2">
              <Link
                to="/itinerary"
                className="w-full sm:w-auto px-7 py-3.5 rounded-lg bg-gradient-to-r from-[#853953] to-[#612D53] text-white font-semibold text-sm shadow-xs hover:opacity-95 transition-all flex items-center justify-center gap-2"
              >
                <span>Plan a Trip</span>
                <ArrowRight className="w-4 h-4" />
              </Link>

              <Link
                to="/destinations"
                className="w-full sm:w-auto px-7 py-3.5 rounded-lg bg-white text-[#2C2C2C] font-semibold text-sm border border-[#853953]/40 hover:border-[#853953] hover:bg-[#853953]/5 transition-all flex items-center justify-center gap-2"
              >
                <Compass className="w-4 h-4 text-[#853953]" />
                <span>Explore Destinations</span>
              </Link>
            </div>

          </div>

          {/* Right Column: Clean Professional Image */}
          <div className="lg:col-span-5">
            <div className="relative mx-auto max-w-md lg:max-w-none">
              <div className="rounded-2xl overflow-hidden shadow-card border border-white/80 bg-white">
                <img
                  src="https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=800&q=80"
                  alt="Scenic Destination"
                  className="w-full h-[380px] lg:h-[420px] object-cover"
                />
              </div>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
