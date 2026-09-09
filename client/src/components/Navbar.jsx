import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X, Compass, Sparkles, MapPin, Globe, Building2, Calendar, CloudSun, Info } from 'lucide-react';

export default function Navbar() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const location = useLocation();

  const navLinks = [
    { name: 'Home', path: '/', icon: Compass },
    { name: 'Indian Trips', path: '/indian-trips', icon: MapPin },
    { name: 'International Trips', path: '/international-trips', icon: Globe },
    { name: 'Destinations', path: '/destinations', icon: Sparkles },
    { name: 'Hotels', path: '/hotels', icon: Building2 },
    { name: 'Itinerary', path: '/itinerary', icon: Calendar },
    { name: 'Weather', path: '/weather', icon: CloudSun },
    { name: 'About', path: '/about', icon: Info },
  ];

  const isActive = (path) => {
    if (path === '/' && location.pathname === '/') return true;
    if (path !== '/' && location.pathname.startsWith(path)) return true;
    return false;
  };

  return (
    <header className="sticky top-0 z-50 bg-[#FFF5F5]/90 backdrop-blur-xl border-b border-[#F7D6D0] shadow-sm shadow-[#E2B4BD]/10 transition-all">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          
          {/* Logo */}
          <Link to="/" className="flex items-center gap-3 group">
            <div className="w-11 h-11 rounded-2xl bg-gradient-to-br from-[#E2B4BD] via-[#C7929E] to-[#F7D6D0] flex items-center justify-center text-white text-2xl shadow-md shadow-[#E2B4BD]/30 group-hover:scale-110 group-hover:rotate-3 transition-all duration-300">
              ✈️
            </div>
            <div>
              <span className="text-2xl font-black tracking-tight text-[#4A4A4A] group-hover:text-[#C7929E] transition-colors">
                Traverge
              </span>
              <span className="block text-[10px] font-extrabold uppercase tracking-widest text-[#C7929E] -mt-1">
                Smart Travel Platform
              </span>
            </div>
          </Link>

          {/* Desktop Navigation Links */}
          <nav className="hidden xl:flex items-center gap-1.5 bg-[#F7D6D0]/40 p-1.5 rounded-2xl border border-[#F7D6D0]/60">
            {navLinks.map((link) => {
              const active = isActive(link.path);
              return (
                <Link
                  key={link.name}
                  to={link.path}
                  className={`px-3.5 py-2 rounded-xl text-xs font-extrabold transition-all flex items-center gap-1.5 ${
                    active
                      ? 'bg-[#E2B4BD] text-white shadow-md shadow-[#E2B4BD]/30 scale-[1.03]'
                      : 'text-[#4A4A4A] hover:text-[#C7929E] hover:bg-white/80'
                  }`}
                >
                  <link.icon className={`w-3.5 h-3.5 ${active ? 'text-white' : 'text-[#4A4A4A]/60'}`} />
                  {link.name}
                </Link>
              );
            })}
          </nav>

          {/* Desktop CTA */}
          <div className="hidden xl:flex items-center gap-3">
            <Link
              to="/itinerary"
              className="px-6 py-3 rounded-full bg-[#E2B4BD] hover:bg-[#C7929E] text-white font-extrabold text-xs shadow-md shadow-[#E2B4BD]/30 hover:scale-105 active:scale-95 transition-all flex items-center gap-2"
            >
              <Sparkles className="w-4 h-4 text-white" />
              Plan My Trip
            </Link>
          </div>

          {/* Mobile Menu Button */}
          <div className="xl:hidden flex items-center gap-2">
            <Link
              to="/itinerary"
              className="px-3.5 py-1.5 rounded-full bg-[#E2B4BD] text-white text-xs font-bold shadow-sm"
            >
              Plan Trip
            </Link>
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 rounded-xl text-[#4A4A4A] hover:bg-[#F7D6D0]/50 hover:text-[#C7929E] transition-colors"
              aria-label="Toggle Navigation Menu"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="xl:hidden bg-[#FFF5F5]/95 backdrop-blur-2xl border-b border-[#F7D6D0] px-4 pt-2 pb-6 space-y-1 shadow-2xl animate-in slide-in-from-top-2 duration-200">
          {navLinks.map((link) => {
            const active = isActive(link.path);
            return (
              <Link
                key={link.name}
                to={link.path}
                onClick={() => setMobileMenuOpen(false)}
                className={`flex items-center gap-3 px-4 py-3 rounded-2xl text-sm font-bold transition-all ${
                  active
                    ? 'bg-[#E2B4BD] text-white shadow-sm'
                    : 'text-[#4A4A4A] hover:bg-[#F7D6D0]/40 hover:text-[#C7929E]'
                }`}
              >
                <link.icon className={`w-4 h-4 ${active ? 'text-white' : 'text-[#4A4A4A]/60'}`} />
                {link.name}
              </Link>
            );
          })}
          <div className="pt-3">
            <Link
              to="/itinerary"
              onClick={() => setMobileMenuOpen(false)}
              className="w-full py-3.5 rounded-2xl bg-[#E2B4BD] text-white font-extrabold text-center block shadow-md shadow-[#E2B4BD]/30"
            >
              Plan My Trip ✈️
            </Link>
          </div>
        </div>
      )}
    </header>
  );
}
