import React from 'react';
import { Link } from 'react-router-dom';
import { Compass, Globe, MapPin, Sparkles } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="bg-[#0B0F14] text-[#F3F4F6] pt-14 pb-8 border-t border-[#232E3C]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
        
        {/* Main Footer Row */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-8 pb-10 border-b border-[#232E3C]">
          
          {/* Logo & Tagline */}
          <div className="space-y-2">
            <Link to="/" className="flex items-center gap-2.5 group">
              <div className="w-9 h-9 rounded-xl bg-gradient-brand flex items-center justify-center text-[#0B0F14] font-black shadow-glow-yellow group-hover:scale-105 transition-transform">
                <Compass className="w-5 h-5" />
              </div>
              <span className="text-2xl font-extrabold tracking-tight text-white group-hover:text-[#FFF449] transition-colors">
                Traverge
              </span>
            </Link>
            <p className="text-xs text-gray-400 font-normal max-w-sm">
              Minimal + Futuristic + Premium travel-tech startup platform for intelligent trip planning and stay discovery.
            </p>
          </div>

          {/* Links */}
          <nav className="flex flex-wrap items-center gap-6 text-xs font-bold text-gray-300">
            <Link to="/destinations" className="hover:text-[#FFF449] transition-colors">Destinations</Link>
            <Link to="/hotels" className="hover:text-[#FFF449] transition-colors">Hotels</Link>
            <Link to="/indian-trips" className="hover:text-[#FFF449] transition-colors">Indian Trips</Link>
            <Link to="/international-trips" className="hover:text-[#FFF449] transition-colors">International</Link>
            <Link to="/weather" className="hover:text-[#FFF449] transition-colors">Weather</Link>
            <Link to="/about" className="hover:text-[#FFF449] transition-colors">About</Link>
          </nav>

        </div>

        {/* Copyright */}
        <div className="flex flex-col sm:flex-row items-center justify-between text-xs text-gray-500 font-medium gap-2">
          <p>© 2026 Traverge. All rights reserved.</p>
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-[#B2D959]" />
            <span>Developer Portfolio & Interview Demonstration Platform</span>
          </div>
        </div>

      </div>
    </footer>
  );
}
