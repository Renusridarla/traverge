import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import CustomCursor from './components/CustomCursor';
import StarfieldBackground from './components/StarfieldBackground';

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
    <div className="min-h-screen flex flex-col bg-[#0B0F14] text-[#F3F4F6] font-sans antialiased selection:bg-[#FFF449] selection:text-[#0B0F14] relative overflow-x-hidden">
      
      {/* Custom Circular Cursor */}
      <CustomCursor />

      {/* Animated Starfield Background Canvas */}
      <StarfieldBackground />

      {/* Futuristic Dark Ambient Radial Glowing Meshes */}
      <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden">
        {/* Top-Left Bright Yellow Glow Blob */}
        <div className="absolute -top-32 -left-32 w-[34rem] h-[34rem] bg-gradient-to-br from-[#FFF449]/12 via-[#B2D959]/08 to-transparent rounded-full blur-3xl animate-float-slow" />
        
        {/* Top-Right Lime Green Glow Blob */}
        <div className="absolute top-1/4 -right-24 w-[32rem] h-[32rem] bg-gradient-to-bl from-[#7EC151]/12 via-[#B2D959]/08 to-transparent rounded-full blur-3xl animate-float-reverse" />
        
        {/* Center Glow Radial Pulse */}
        <div className="absolute top-1/2 left-1/3 -translate-x-1/2 w-[38rem] h-[38rem] bg-gradient-to-tr from-[#FFF449]/08 via-[#7EC151]/06 to-transparent rounded-full blur-3xl animate-pulse-glow" />

        {/* Bottom Ambient Fresh Green Glow */}
        <div className="absolute -bottom-40 right-1/4 w-[30rem] h-[30rem] bg-gradient-to-tl from-[#7EC151]/12 to-[#FFF449]/08 rounded-full blur-3xl animate-float-slow" />
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
