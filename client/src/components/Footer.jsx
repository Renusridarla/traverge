import React from 'react';
import { Link } from 'react-router-dom';
import { Heart, Sparkles, MapPin, Globe, Mail, Phone, ShieldCheck } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="bg-slate-900 text-white pt-16 pb-12 border-t-4 border-brand-orange">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        
        {/* Top Footer Row */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8">
          
          {/* Brand Column */}
          <div className="lg:col-span-2 space-y-4">
            <div className="flex items-center gap-2.5">
              <div className="w-10 h-10 rounded-2xl bg-gradient-to-br from-brand-orange to-brand-golden flex items-center justify-center text-white text-xl font-bold shadow-md">
                ✈️
              </div>
              <span className="text-2xl font-extrabold tracking-tight">Traverge</span>
            </div>

            <p className="text-sm font-bold text-amber-400">
              Explore ✈ Plan ✈ Travel ✈ Repeat
            </p>

            <p className="text-xs text-slate-400 font-medium leading-relaxed max-w-md">
              Traverge is a modern travel technology platform bringing destination discovery, stay recommendations, live weather forecasts, and dynamic day-wise itineraries into one seamless platform.
            </p>
          </div>

          {/* Quick Links Column */}
          <div className="space-y-3">
            <h4 className="text-sm font-extrabold uppercase tracking-wider text-amber-400">
              Quick Navigation
            </h4>
            <ul className="space-y-2 text-xs font-semibold text-slate-300">
              <li><Link to="/" className="hover:text-brand-orange transition-colors">Home</Link></li>
              <li><Link to="/indian-trips" className="hover:text-brand-orange transition-colors">Indian Trips</Link></li>
              <li><Link to="/international-trips" className="hover:text-brand-orange transition-colors">International Trips</Link></li>
              <li><Link to="/destinations" className="hover:text-brand-orange transition-colors">All Destinations</Link></li>
              <li><Link to="/hotels" className="hover:text-brand-orange transition-colors">Hotels & Stays</Link></li>
            </ul>
          </div>

          {/* Planning Tools Column */}
          <div className="space-y-3">
            <h4 className="text-sm font-extrabold uppercase tracking-wider text-amber-400">
              Travel Tools
            </h4>
            <ul className="space-y-2 text-xs font-semibold text-slate-300">
              <li><Link to="/itinerary" className="hover:text-brand-orange transition-colors">Itinerary Generator</Link></li>
              <li><Link to="/weather" className="hover:text-brand-orange transition-colors">Weather API & Activities</Link></li>
              <li><Link to="/about" className="hover:text-brand-orange transition-colors">About Traverge</Link></li>
              <li><a href="#contact" className="hover:text-brand-orange transition-colors">Developer Portfolio</a></li>
            </ul>
          </div>

          {/* Contact / Info Column */}
          <div className="space-y-3">
            <h4 className="text-sm font-extrabold uppercase tracking-wider text-amber-400">
              Platform Info
            </h4>
            <div className="space-y-2 text-xs font-medium text-slate-300">
              <p className="flex items-center gap-2">
                <ShieldCheck className="w-4 h-4 text-emerald-400" />
                Full-Stack Portfolio Project
              </p>
              <p className="flex items-center gap-2">
                <Globe className="w-4 h-4 text-brand-orange" />
                36 States/UTs & 20+ Countries
              </p>
              <p className="flex items-center gap-2 text-slate-400 pt-2">
                Sample hotel rates & simulated/live weather endpoints.
              </p>
            </div>
          </div>

        </div>

        {/* Bottom Bar */}
        <div className="pt-8 border-t border-slate-800 flex flex-col sm:flex-row items-center justify-between text-xs text-slate-400 font-medium gap-4">
          <p>© {new Date().getFullYear()} Traverge — Smart Travel Planning Platform. All rights reserved.</p>
          <p className="flex items-center gap-1">
            Built with <Heart className="w-3.5 h-3.5 text-red-500 fill-red-500 inline" /> using Node.js, Express, MongoDB & React.
          </p>
        </div>

      </div>
    </footer>
  );
}
