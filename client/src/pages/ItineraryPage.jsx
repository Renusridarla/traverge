import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import axios from 'axios';
import TripPlanner from '../components/TripPlanner';
import ItineraryTimeline from '../components/ItineraryTimeline';
import BudgetCard from '../components/BudgetCard';
import WeatherWidget from '../components/WeatherWidget';
import { Sparkles, Printer, Save, CheckCircle, Calendar, MapPin } from 'lucide-react';

export default function ItineraryPage() {
  const location = useLocation();
  const initialParams = location.state || {
    destination: 'Manali',
    budget: '25000',
    duration: 3,
    travelers: { adults: 2, children: 0 },
    travelStyles: ['Nature', 'Adventure']
  };

  const [itineraryData, setItineraryData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [savedSuccess, setSavedSuccess] = useState(false);

  const fetchItinerary = async (params) => {
    setLoading(true);
    setSavedSuccess(false);
    try {
      const res = await axios.post('/api/itinerary', params);
      if (res.data?.success) {
        setItineraryData(res.data.data);
      }
    } catch (err) {
      console.error('Error generating itinerary:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchItinerary(initialParams);
  }, []);

  const handlePlanSubmit = (newParams) => {
    fetchItinerary(newParams);
  };

  const handlePrint = () => {
    window.print();
  };

  const handleSaveTrip = async () => {
    if (!itineraryData) return;
    try {
      const payload = {
        destinationName: itineraryData.destination,
        budgetINR: itineraryData.costBreakdown?.totalEstimated || 25000,
        durationDays: itineraryData.durationDays,
        travelers: { adults: itineraryData.travelersCount, children: 0 },
        travelStyles: itineraryData.travelStyles,
        weatherCondition: itineraryData.weatherCondition,
        itinerary: itineraryData.itinerary,
        costBreakdown: itineraryData.costBreakdown
      };
      await axios.post('/api/trips', payload);
      setSavedSuccess(true);
      setTimeout(() => setSavedSuccess(false), 4000);
    } catch (err) {
      console.error('Failed to save trip:', err);
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-10">
      
      {/* Header Banner */}
      <div className="interactive-card bg-[#131920] rounded-3xl p-8 lg:p-10 text-white shadow-card-dark border border-[#232E3C] flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div className="space-y-2">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-[#0B0F14] text-[#FFF449] border border-[#232E3C] text-xs font-extrabold uppercase tracking-wider">
            <Sparkles className="w-4 h-4 text-[#B2D959]" />
            <span>Smart Itinerary Engine</span>
          </div>
          <h1 className="text-3xl sm:text-4xl font-black">Personalized Day-Wise Itinerary</h1>
          <p className="text-sm font-normal text-gray-400">
            Tailored schedule considering destination, budget, weather suitability, and travel style.
          </p>
        </div>

        {/* Action Buttons */}
        {itineraryData && (
          <div className="flex items-center gap-3">
            <button
              onClick={handlePrint}
              className="px-4 py-3 rounded-xl bg-[#1A222C] text-white font-bold text-xs shadow-card-dark hover:bg-[#232E3C] border border-[#232E3C] transition-all flex items-center gap-2"
            >
              <Printer className="w-4 h-4 text-[#FFF449]" />
              Print Itinerary
            </button>
            <button
              onClick={handleSaveTrip}
              className="px-5 py-3 rounded-xl bg-gradient-brand hover:bg-gradient-brand-hover text-[#0B0F14] font-extrabold text-xs shadow-glow-yellow hover:scale-105 transition-all flex items-center gap-2"
            >
              <Save className="w-4 h-4" />
              {savedSuccess ? 'Saved to My Trips!' : 'Save Trip'}
            </button>
          </div>
        )}
      </div>

      {savedSuccess && (
        <div className="bg-[#131920] text-[#B2D959] p-4 rounded-2xl border border-[#B2D959]/40 text-xs font-bold flex items-center gap-2 shadow-card-dark">
          <CheckCircle className="w-5 h-5 text-[#B2D959] shrink-0" />
          Trip saved successfully! You can retrieve it anytime in your saved trip history.
        </div>
      )}

      {/* Planner Controls Form */}
      <TripPlanner onPlanSubmit={handlePlanSubmit} />

      {/* Content Grid */}
      {loading ? (
        <div className="py-20 text-center text-gray-400 font-semibold">
          Generating personalized day-wise itinerary & budget breakdown...
        </div>
      ) : !itineraryData ? (
        <div className="bg-[#131920] rounded-3xl p-12 text-center text-gray-400 font-medium border border-[#232E3C]">
          Fill out the form above to generate your custom itinerary.
        </div>
      ) : (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          
          {/* Main Timeline Column */}
          <div className="lg:col-span-7 space-y-8">
            <div className="flex items-center justify-between bg-[#131920] p-6 rounded-3xl border border-[#232E3C] shadow-card-dark">
              <div>
                <span className="text-xs font-extrabold uppercase tracking-wider text-[#B2D959]">
                  Destination Guide
                </span>
                <h2 className="text-2xl font-black text-white">
                  {itineraryData.destination}, {itineraryData.country}
                </h2>
                <p className="text-xs text-gray-400 font-semibold mt-1">
                  {itineraryData.durationDays} Days • {itineraryData.travelersCount} Traveler(s) • Style: {itineraryData.travelStyles.join(', ')}
                </p>
              </div>
            </div>

            {/* Timeline Component */}
            <ItineraryTimeline daysItinerary={itineraryData.itinerary} />
          </div>

          {/* Right Sidebar: Visual Budget & Weather */}
          <div className="lg:col-span-5 space-y-8">
            
            {/* Visual Budget Breakdown Card */}
            <BudgetCard
              costBreakdown={itineraryData.costBreakdown}
              travelersCount={itineraryData.travelersCount}
              durationDays={itineraryData.durationDays}
            />

            {/* Live Weather Widget */}
            <WeatherWidget initialCity={itineraryData.destination} />

          </div>

        </div>
      )}

    </div>
  );
}
