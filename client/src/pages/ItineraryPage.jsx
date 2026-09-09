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
      <div className="bg-gradient-to-r from-brand-orange via-amber-500 to-brand-golden rounded-3xl p-8 lg:p-10 text-white shadow-glow flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div className="space-y-2">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/20 backdrop-blur-md text-white text-xs font-bold uppercase tracking-wider">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Smart Itinerary Engine</span>
          </div>
          <h1 className="text-3xl sm:text-4xl font-extrabold">Personalized Day-Wise Itinerary</h1>
          <p className="text-sm font-medium text-yellow-100">
            Tailored schedule considering destination, budget, weather suitability, and travel style.
          </p>
        </div>

        {/* Action Buttons */}
        {itineraryData && (
          <div className="flex items-center gap-3">
            <button
              onClick={handlePrint}
              className="px-4 py-3 rounded-2xl bg-white text-slate-800 font-extrabold text-xs shadow-md hover:bg-yellow-50 transition-all flex items-center gap-2"
            >
              <Printer className="w-4 h-4 text-brand-orange" />
              Print Itinerary
            </button>
            <button
              onClick={handleSaveTrip}
              className="px-5 py-3 rounded-2xl bg-slate-900 text-white font-extrabold text-xs shadow-md hover:bg-slate-800 transition-all flex items-center gap-2"
            >
              <Save className="w-4 h-4 text-amber-400" />
              {savedSuccess ? 'Saved to My Trips!' : 'Save Trip'}
            </button>
          </div>
        )}
      </div>

      {savedSuccess && (
        <div className="bg-emerald-50 text-emerald-800 p-4 rounded-2xl border border-emerald-200 text-xs font-bold flex items-center gap-2 animate-in fade-in duration-300">
          <CheckCircle className="w-5 h-5 text-emerald-600 shrink-0" />
          Trip saved successfully! You can retrieve it anytime in your saved trip history.
        </div>
      )}

      {/* Planner Controls Form */}
      <TripPlanner onPlanSubmit={handlePlanSubmit} />

      {/* Content Grid */}
      {loading ? (
        <div className="py-20 text-center text-slate-500 font-semibold animate-pulse">
          Generating personalized day-wise itinerary & budget breakdown...
        </div>
      ) : !itineraryData ? (
        <div className="bg-white rounded-3xl p-12 text-center text-slate-500 font-medium">
          Fill out the form above to generate your custom itinerary.
        </div>
      ) : (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          
          {/* Main Timeline Column */}
          <div className="lg:col-span-7 space-y-8">
            <div className="flex items-center justify-between bg-white p-6 rounded-3xl border border-orange-100 shadow-sm">
              <div>
                <span className="text-xs font-extrabold uppercase tracking-wider text-brand-orange">
                  Destination Guide
                </span>
                <h2 className="text-2xl font-extrabold text-slate-900">
                  {itineraryData.destination}, {itineraryData.country}
                </h2>
                <p className="text-xs text-slate-500 font-semibold mt-0.5">
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
