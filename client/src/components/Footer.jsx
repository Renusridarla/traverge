import React from 'react';
import { Link } from 'react-router-dom';
import { Compass } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="bg-[#2C2C2C] text-[#F3F4F4] pt-12 pb-8 border-t border-gray-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        
        {/* Main Footer Row */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 pb-8 border-b border-gray-800">
          
          {/* Logo & Tagline */}
          <div className="space-y-1.5">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-[#853953] to-[#612D53] flex items-center justify-center text-white">
                <Compass className="w-4 h-4" />
              </div>
              <span className="text-xl font-bold tracking-tight text-white">Traverge</span>
            </div>
            <p className="text-xs text-[#F3F4F4]/70 font-normal">
              Smart travel planning made simple.
            </p>
          </div>

          {/* Links */}
          <nav className="flex flex-wrap items-center gap-6 text-xs font-semibold text-[#F3F4F4]/80">
            <Link to="/destinations" className="hover:text-[#E2B4BD] transition-colors">Destinations</Link>
            <Link to="/hotels" className="hover:text-[#E2B4BD] transition-colors">Hotels</Link>
            <Link to="/indian-trips" className="hover:text-[#E2B4BD] transition-colors">Trips</Link>
            <Link to="/weather" className="hover:text-[#E2B4BD] transition-colors">Weather</Link>
            <Link to="/about" className="hover:text-[#E2B4BD] transition-colors">About</Link>
          </nav>

        </div>

        {/* Copyright */}
        <div className="flex flex-col sm:flex-row items-center justify-between text-xs text-[#F3F4F4]/60 font-normal gap-2">
          <p>© 2026 Traverge. All rights reserved.</p>
          <p>Portfolio Travel-Tech Demonstration Platform</p>
        </div>

      </div>
    </footer>
  );
}
