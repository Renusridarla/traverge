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
    <div className="min-h-screen flex flex-col bg-[#FFF5F5] text-[#4A4A4A] relative overflow-x-hidden selection:bg-[#E2B4BD] selection:text-white font-sans">
      
      {/* Dynamic Animated Ambient Background Orbs with #F7D6D0 and #E2B4BD */}
      <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden">
        {/* Orb 1: Top Left #E2B4BD Glowing Blob */}
        <div className="absolute -top-24 -left-24 w-[30rem] h-[30rem] bg-[#E2B4BD]/30 rounded-full blur-3xl animate-float-slow" />
        
        {/* Orb 2: Top Right #F7D6D0 Blob */}
        <div className="absolute top-1/4 -right-20 w-[32rem] h-[32rem] bg-[#F7D6D0]/40 rounded-full blur-3xl animate-float-reverse" />
        
        {/* Orb 3: Center Ambient Glow Pulse */}
        <div className="absolute top-1/2 left-1/3 -translate-x-1/2 w-[36rem] h-[36rem] bg-[#E2B4BD]/20 rounded-full blur-3xl animate-pulse-glow" />

        {/* Orb 4: Bottom Right #F7D6D0 Orb */}
        <div className="absolute -bottom-32 right-1/4 w-[28rem] h-[28rem] bg-[#F7D6D0]/35 rounded-full blur-3xl animate-float-slow" />
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
