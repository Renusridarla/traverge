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
    <div className="min-h-screen flex flex-col bg-[#F3F4F4] text-[#2C2C2C] font-sans antialiased selection:bg-[#853953] selection:text-white">
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
  );
}
