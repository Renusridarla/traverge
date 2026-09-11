import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X, Compass, Home, MapPin, Calendar, Info, Globe } from 'lucide-react';

export default function Navbar() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const location = useLocation();

  const navLinks = [
    { name: 'Home', path: '/', icon: Home },
    { name: 'Explore', path: '/destinations', icon: Globe },
    { name: 'Plan Trip', path: '/itinerary', icon: Calendar },
    { name: 'Destinations', path: '/indian-trips', icon: MapPin },
    { name: 'About', path: '/about', icon: Info },
  ];

  const isActive = (path) => {
    if (path === '/' && location.pathname === '/') return true;
    if (path !== '/' && location.pathname.startsWith(path)) return true;
    return false;
  };

  return (
    <header className="sticky top-0 z-50 bg-[#0B0F14]/85 backdrop-blur-xl border-b border-[#232E3C] shadow-card-dark transition-all">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 sm:h-20">
          
          {/* Logo */}
          <Link to="/" className="flex items-center gap-2.5 group">
            <div className="w-9 h-9 rounded-xl bg-gradient-brand flex items-center justify-center text-[#0B0F14] font-black shadow-glow-yellow group-hover:scale-105 transition-transform">
              <Compass className="w-5 h-5" />
            </div>
            <span className="text-xl font-extrabold tracking-tight text-white group-hover:text-[#FFF449] transition-colors">
              Traverge
            </span>
          </Link>

          {/* Desktop Navigation Links */}
          <nav className="hidden md:flex items-center gap-1.5 bg-[#131920]/80 p-1.5 rounded-xl border border-[#232E3C]">
            {navLinks.map((link) => {
              const active = isActive(link.path);
              const IconComponent = link.icon;
              return (
                <Link
                  key={link.name}
                  to={link.path}
                  className={`px-3.5 py-2 rounded-lg text-xs font-bold transition-all flex items-center gap-2 ${
                    active
                      ? 'text-[#0B0F14] bg-gradient-brand shadow-glow-yellow font-extrabold scale-[1.03]'
                      : 'text-[#F3F4F6]/80 hover:text-[#FFF449] hover:bg-[#1A222C]'
                  }`}
                >
                  <IconComponent className={`w-3.5 h-3.5 ${active ? 'text-[#0B0F14]' : 'text-gray-400'}`} />
                  <span>{link.name}</span>
                </Link>
              );
            })}
          </nav>

          {/* Desktop CTA Button */}
          <div className="hidden md:flex items-center">
            <Link
              to="/itinerary"
              className="px-5 py-2.5 rounded-lg bg-gradient-brand hover:bg-gradient-brand-hover text-[#0B0F14] font-extrabold text-xs shadow-glow-yellow hover:scale-105 active:scale-95 transition-all"
            >
              Plan Your Trip
            </Link>
          </div>

          {/* Mobile Menu Toggle */}
          <div className="md:hidden flex items-center gap-2">
            <Link
              to="/itinerary"
              className="px-3.5 py-1.5 rounded-lg bg-gradient-brand text-[#0B0F14] text-xs font-bold shadow-xs"
            >
              Plan Trip
            </Link>
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 rounded-lg text-white hover:bg-[#131920] transition-colors"
              aria-label="Toggle navigation"
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>

        </div>
      </div>

      {/* Mobile Menu */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-[#0B0F14]/95 backdrop-blur-2xl border-b border-[#232E3C] px-4 pt-2 pb-6 space-y-1 shadow-2xl animate-in slide-in-from-top-2 duration-200">
          {navLinks.map((link) => {
            const active = isActive(link.path);
            const IconComponent = link.icon;
            return (
              <Link
                key={link.name}
                to={link.path}
                onClick={() => setMobileMenuOpen(false)}
                className={`flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-bold transition-all ${
                  active
                    ? 'text-[#0B0F14] bg-gradient-brand shadow-xs'
                    : 'text-[#F3F4F6] hover:bg-[#131920] hover:text-[#FFF449]'
                }`}
              >
                <IconComponent className={`w-4 h-4 ${active ? 'text-[#0B0F14]' : 'text-gray-400'}`} />
                <span>{link.name}</span>
              </Link>
            );
          })}
        </div>
      )}
    </header>
  );
}
