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
    <header className="sticky top-0 z-50 bg-white/85 backdrop-blur-xl border-b border-orange-200/50 shadow-md shadow-orange-500/5 transition-all">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          
          {/* Logo */}
          <Link to="/" className="flex items-center gap-3 group">
            <div className="w-11 h-11 rounded-2xl bg-gradient-to-br from-brand-orange via-amber-500 to-brand-golden flex items-center justify-center text-white text-2xl shadow-glow group-hover:scale-110 group-hover:rotate-3 transition-all duration-300">
              ✈️
            </div>
            <div>
              <span className="text-2xl font-black tracking-tight text-slate-900 group-hover:text-brand-orange transition-colors">
                Traverge
              </span>
              <span className="block text-[10px] font-extrabold uppercase tracking-widest bg-gradient-to-r from-brand-orange to-amber-500 bg-clip-text text-transparent -mt-1">
                Smart Travel Platform
              </span>
            </div>
          </Link>

          {/* Desktop Navigation Links */}
          <nav className="hidden xl:flex items-center gap-1.5 bg-slate-100/70 p-1.5 rounded-2xl border border-white/60 shadow-inner">
            {navLinks.map((link) => {
              const active = isActive(link.path);
              return (
                <Link
                  key={link.name}
                  to={link.path}
                  className={`px-3 py-2 rounded-xl text-xs font-extrabold transition-all flex items-center gap-1.5 ${
                    active
                      ? 'bg-gradient-to-r from-brand-orange to-amber-500 text-white shadow-glow scale-[1.03]'
                      : 'text-slate-700 hover:text-brand-orange hover:bg-white/80'
                  }`}
                >
                  <link.icon className={`w-3.5 h-3.5 ${active ? 'text-white' : 'text-slate-400'}`} />
                  {link.name}
                </Link>
              );
            })}
          </nav>

          {/* Desktop CTA */}
          <div className="hidden xl:flex items-center gap-3">
            <Link
              to="/itinerary"
              className="px-6 py-3 rounded-full bg-gradient-to-r from-brand-orange via-amber-500 to-brand-golden text-white font-extrabold text-xs shadow-glow hover:shadow-glow-yellow hover:scale-105 active:scale-95 transition-all flex items-center gap-2"
            >
              <Sparkles className="w-4 h-4 animate-spin-slow" />
              Plan My Trip
            </Link>
          </div>

          {/* Mobile Menu Button */}
          <div className="xl:hidden flex items-center gap-2">
            <Link
              to="/itinerary"
              className="px-3.5 py-1.5 rounded-full bg-gradient-to-r from-brand-orange to-amber-500 text-white text-xs font-bold shadow-sm"
            >
              Plan Trip
            </Link>
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 rounded-xl text-slate-700 hover:bg-orange-50 hover:text-brand-orange transition-colors"
              aria-label="Toggle Navigation Menu"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="xl:hidden bg-white/95 backdrop-blur-2xl border-b border-orange-100 px-4 pt-2 pb-6 space-y-1 shadow-2xl animate-in slide-in-from-top-2 duration-200">
          {navLinks.map((link) => {
            const active = isActive(link.path);
            return (
              <Link
                key={link.name}
                to={link.path}
                onClick={() => setMobileMenuOpen(false)}
                className={`flex items-center gap-3 px-4 py-3 rounded-2xl text-sm font-bold transition-all ${
                  active
                    ? 'bg-gradient-to-r from-brand-orange to-amber-500 text-white shadow-sm'
                    : 'text-slate-700 hover:bg-orange-50 hover:text-brand-orange'
                }`}
              >
                <link.icon className={`w-4 h-4 ${active ? 'text-white' : 'text-slate-400'}`} />
                {link.name}
              </Link>
            );
          })}
          <div className="pt-3">
            <Link
              to="/itinerary"
              onClick={() => setMobileMenuOpen(false)}
              className="w-full py-3.5 rounded-2xl bg-gradient-to-r from-brand-orange via-amber-500 to-brand-golden text-white font-extrabold text-center block shadow-glow"
            >
              Plan My Trip ✈️
            </Link>
          </div>
        </div>
      )}
    </header>
  );
}
