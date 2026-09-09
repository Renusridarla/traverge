import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X, Home, MapPin, Building2, Briefcase, CloudSun, Info, Compass } from 'lucide-react';

export default function Navbar() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const location = useLocation();

  const navLinks = [
    { name: 'Home', path: '/', icon: Home },
    { name: 'Destinations', path: '/destinations', icon: MapPin },
    { name: 'Hotels', path: '/hotels', icon: Building2 },
    { name: 'Trips', path: '/indian-trips', icon: Briefcase },
    { name: 'Weather', path: '/weather', icon: CloudSun },
    { name: 'About', path: '/about', icon: Info },
  ];

  const isActive = (path) => {
    if (path === '/' && location.pathname === '/') return true;
    if (path !== '/' && location.pathname.startsWith(path)) return true;
    return false;
  };

  return (
    <header className="sticky top-0 z-50 bg-white border-b border-gray-200/80 shadow-xs">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 sm:h-20">
          
          {/* Logo */}
          <Link to="/" className="flex items-center gap-2.5 group">
            <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-[#853953] to-[#612D53] flex items-center justify-center text-white shadow-xs group-hover:scale-105 transition-transform">
              <Compass className="w-5 h-5" />
            </div>
            <span className="text-xl font-bold tracking-tight text-[#2C2C2C] group-hover:text-[#853953] transition-colors">
              Traverge
            </span>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center gap-1">
            {navLinks.map((link) => {
              const active = isActive(link.path);
              const IconComponent = link.icon;
              return (
                <Link
                  key={link.name}
                  to={link.path}
                  className={`px-3.5 py-2 rounded-lg text-sm font-semibold transition-colors flex items-center gap-2 ${
                    active
                      ? 'text-[#853953] bg-[#853953]/10 font-bold'
                      : 'text-[#2C2C2C]/80 hover:text-[#853953] hover:bg-gray-100/60'
                  }`}
                >
                  <IconComponent className={`w-4 h-4 ${active ? 'text-[#853953]' : 'text-[#2C2C2C]/60'}`} />
                  <span>{link.name}</span>
                </Link>
              );
            })}
          </nav>

          {/* Desktop CTA Button */}
          <div className="hidden md:flex items-center">
            <Link
              to="/itinerary"
              className="px-5 py-2.5 rounded-lg bg-gradient-to-r from-[#853953] to-[#612D53] text-white font-semibold text-sm shadow-xs hover:opacity-95 transition-all"
            >
              Plan a Trip
            </Link>
          </div>

          {/* Mobile Menu Toggle */}
          <div className="md:hidden flex items-center gap-2">
            <Link
              to="/itinerary"
              className="px-3.5 py-1.5 rounded-lg bg-gradient-to-r from-[#853953] to-[#612D53] text-white text-xs font-semibold"
            >
              Plan a Trip
            </Link>
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 rounded-lg text-[#2C2C2C] hover:bg-gray-100 transition-colors"
              aria-label="Toggle navigation"
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>

        </div>
      </div>

      {/* Mobile Menu */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-white border-b border-gray-200 px-4 pt-2 pb-6 space-y-1 shadow-md">
          {navLinks.map((link) => {
            const active = isActive(link.path);
            const IconComponent = link.icon;
            return (
              <Link
                key={link.name}
                to={link.path}
                onClick={() => setMobileMenuOpen(false)}
                className={`flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium ${
                  active
                    ? 'text-[#853953] bg-[#853953]/10 font-semibold'
                    : 'text-[#2C2C2C] hover:bg-gray-50'
                }`}
              >
                <IconComponent className={`w-4 h-4 ${active ? 'text-[#853953]' : 'text-[#2C2C2C]/60'}`} />
                <span>{link.name}</span>
              </Link>
            );
          })}
        </div>
      )}
    </header>
  );
}
