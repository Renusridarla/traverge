import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Footer from './components/Footer';

import HomePage from './pages/HomePage';
import IndianTripsPage from './pages/IndianTripsPage';
import InternationalTripsPage from './pages/InternationalTripsPage';
import DestinationsPage from './pages/DestinationsPage';
import DestinationDetailPage from './pages/DestinationDetailPage';
import HotelsPage from './pages/HotelsPage';
import WeatherPage from './pages/WeatherPage';
import ItineraryPage from './pages/ItineraryPage';
import AboutPage from './pages/AboutPage';

export default function App() {
  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-br from-amber-50/80 via-orange-50/40 to-yellow-50/60 text-slate-800 relative overflow-x-hidden selection:bg-brand-orange selection:text-white">
      
      {/* Dynamic Animated Background Floating Orbs & Meshes */}
      <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden">
        {/* Orb 1: Top Left Orange Glowing Blob */}
        <div className="absolute -top-24 -left-24 w-96 h-96 bg-gradient-to-br from-orange-400/25 to-amber-300/30 rounded-full blur-3xl animate-float-slow" />
        
        {/* Orb 2: Top Right Golden Yellow Blob */}
        <div className="absolute top-1/4 -right-20 w-[30rem] h-[30rem] bg-gradient-to-bl from-yellow-400/20 via-amber-300/20 to-orange-300/15 rounded-full blur-3xl animate-float-reverse" />
        
        {/* Orb 3: Center Ambient Glow Pulse */}
        <div className="absolute top-1/2 left-1/3 -translate-x-1/2 w-[36rem] h-[36rem] bg-gradient-to-tr from-rose-300/15 via-orange-400/15 to-amber-300/20 rounded-full blur-3xl animate-pulse-glow" />

        {/* Orb 4: Bottom Right Warm Amber Orb */}
        <div className="absolute -bottom-32 right-1/4 w-[28rem] h-[28rem] bg-gradient-to-tl from-amber-400/20 to-orange-400/20 rounded-full blur-3xl animate-float-slow" />
      </div>

      {/* Foreground Content */}
      <div className="relative z-10 flex flex-col min-h-screen">
        <Navbar />
        <main className="flex-grow">
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/indian-trips" element={<IndianTripsPage />} />
            <Route path="/international-trips" element={<InternationalTripsPage />} />
            <Route path="/destinations" element={<DestinationsPage />} />
            <Route path="/destinations/:id" element={<DestinationDetailPage />} />
            <Route path="/hotels" element={<HotelsPage />} />
            <Route path="/weather" element={<WeatherPage />} />
            <Route path="/itinerary" element={<ItineraryPage />} />
            <Route path="/about" element={<AboutPage />} />
          </Routes>
        </main>
        <Footer />
      </div>

    </div>
  );
}
