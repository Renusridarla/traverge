import React, { useState, useEffect } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import axios from 'axios';
import WeatherWidget from '../components/WeatherWidget';
import HotelCard from '../components/HotelCard';
import { MapPin, Calendar, IndianRupee, Star, Sparkles, Sun, Utensils, Compass, ArrowLeft, CheckCircle } from 'lucide-react';

export default function DestinationDetailPage() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [destination, setDestination] = useState(null);
  const [hotels, setHotels] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchDetail = async () => {
      setLoading(true);
      setError(null);
      try {
        const destRes = await axios.get(`/api/destinations/${encodeURIComponent(id)}`);
        if (destRes.data?.success) {
          const destData = destRes.data.data;
          setDestination(destData);

          // Fetch matching hotels
          const hotelRes = await axios.get(`/api/hotels?destination=${encodeURIComponent(destData.name)}`);
          if (hotelRes.data?.success) {
            setHotels(hotelRes.data.data);
          }
        } else {
          setError('Destination not found.');
        }
      } catch (err) {
        setError('Error loading destination details.');
      } finally {
        setLoading(false);
      }
    };

    fetchDetail();
  }, [id]);

  if (loading) {
    return (
      <div className="max-w-7xl mx-auto px-4 py-20 text-center text-slate-500 font-semibold animate-pulse">
        Loading destination guide...
      </div>
    );
  }

  if (error || !destination) {
    return (
      <div className="max-w-7xl mx-auto px-4 py-20 text-center space-y-4">
        <p className="text-xl font-bold text-red-500">{error || 'Destination not found'}</p>
        <Link to="/destinations" className="px-5 py-2.5 rounded-xl bg-brand-orange text-white text-xs font-bold inline-block">
          Back to Destinations
        </Link>
      </div>
    );
  }

  const handleCreateItinerary = () => {
    navigate('/itinerary', {
      state: {
        destination: destination.name,
        budget: destination.estimatedBudgetINR,
        duration: destination.recommendedDays || 3
      }
    });
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-12">
      
      {/* Back button */}
      <button
        onClick={() => navigate(-1)}
        className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-white text-slate-700 font-bold text-xs shadow-xs border border-orange-100 hover:text-brand-orange transition-colors"
      >
        <ArrowLeft className="w-4 h-4" />
        Back
      </button>

      {/* Hero Cover */}
      <div className="relative rounded-3xl overflow-hidden shadow-glow border-4 border-white bg-slate-900 text-white min-h-[380px] lg:min-h-[460px] flex items-end p-6 sm:p-10 group">
        <img
          src={destination.image}
          alt={destination.name}
          className="absolute inset-0 w-full h-full object-cover opacity-75 group-hover:scale-105 transition-transform duration-700"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/40 to-transparent" />

        <div className="relative z-10 space-y-4 max-w-3xl">
          <div className="flex flex-wrap items-center gap-2">
            <span className="px-3.5 py-1 rounded-full bg-white/90 text-slate-900 font-bold text-xs uppercase tracking-wider backdrop-blur-md flex items-center gap-1.5">
              <span>{destination.flagEmoji || '🇮🇳'}</span>
              <span>{destination.type === 'international' ? destination.country : (destination.state || destination.country)}</span>
            </span>
            <span className="px-3.5 py-1 rounded-full bg-brand-orange text-white font-extrabold text-xs">
              {destination.category}
            </span>
            <span className="px-3 py-1 rounded-full bg-amber-400/90 text-slate-950 font-bold text-xs flex items-center gap-1">
              <Star className="w-3.5 h-3.5 fill-slate-950 text-slate-950" />
              {destination.rating || 4.8}
            </span>
          </div>

          <h1 className="text-4xl sm:text-5xl font-extrabold text-white tracking-tight leading-tight">
            {destination.name}
          </h1>

          <p className="text-sm sm:text-base font-medium text-slate-200 leading-relaxed">
            {destination.description}
          </p>

          {/* Key Quick Stats */}
          <div className="flex flex-wrap items-center gap-6 pt-4 border-t border-white/20 text-xs">
            <div className="flex items-center gap-2">
              <Calendar className="w-4 h-4 text-brand-golden" />
              <span>Recommended: <strong>{destination.recommendedDays || 3} Days</strong></span>
            </div>
            <div className="flex items-center gap-2">
              <Sun className="w-4 h-4 text-amber-400" />
              <span>Best Time: <strong>{destination.bestTime || 'Oct - Mar'}</strong></span>
            </div>
            <div className="flex items-center gap-2">
              <IndianRupee className="w-4 h-4 text-emerald-400" />
              <span>Est. Budget: <strong>₹{Number(destination.estimatedBudgetINR).toLocaleString('en-IN')} / person</strong></span>
            </div>
          </div>
        </div>

        {/* CTA Button Top-Right overlay on desktop */}
        <div className="absolute top-6 right-6 hidden md:block">
          <button
            onClick={handleCreateItinerary}
            className="px-6 py-3.5 rounded-2xl bg-gradient-to-r from-brand-orange via-amber-500 to-brand-golden text-white font-extrabold text-sm shadow-glow hover:scale-105 transition-all flex items-center gap-2"
          >
            <Sparkles className="w-4 h-4" />
            Create My Itinerary
          </button>
        </div>
      </div>

      {/* Main Details Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        
        {/* Left Column: Attractions, Activities, Food & Travel Tips */}
        <div className="lg:col-span-7 space-y-8">
          
          {/* Top Attractions */}
          {destination.attractions && destination.attractions.length > 0 && (
            <div className="bg-white rounded-3xl p-6 sm:p-8 shadow-sm border border-orange-100 space-y-4">
              <div className="flex items-center gap-2">
                <Compass className="w-5 h-5 text-brand-orange" />
                <h2 className="text-xl font-extrabold text-slate-900">Popular Attractions</h2>
              </div>

              <div className="grid grid-cols-1 gap-4">
                {destination.attractions.map((attr, idx) => (
                  <div key={idx} className="p-4 rounded-2xl bg-slate-50 border border-slate-200/80 flex items-start justify-between gap-4">
                    <div>
                      <h3 className="text-sm font-extrabold text-slate-900">{attr.name}</h3>
                      <p className="text-xs text-slate-500 font-medium mt-0.5">{attr.category || 'Sightseeing spot'}</p>
                    </div>
                    <div className="text-right shrink-0">
                      <span className="text-xs font-bold text-emerald-700 bg-emerald-50 border border-emerald-200 px-2.5 py-1 rounded-lg block">
                        ₹{attr.estimatedCost || 200}
                      </span>
                      <span className="text-[10px] text-slate-400 font-semibold mt-1 block">{attr.weatherSuitability || 'All Weather'}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Activities List */}
          {destination.activities && destination.activities.length > 0 && (
            <div className="bg-white rounded-3xl p-6 sm:p-8 shadow-sm border border-orange-100 space-y-4">
              <div className="flex items-center gap-2">
                <Sparkles className="w-5 h-5 text-amber-500" />
                <h2 className="text-xl font-extrabold text-slate-900">Top Things To Do & Activities</h2>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {destination.activities.map((act, idx) => (
                  <div key={idx} className="flex items-center gap-2.5 p-3 rounded-2xl bg-orange-50/60 border border-orange-100 text-xs font-bold text-slate-800">
                    <CheckCircle className="w-4 h-4 text-brand-orange shrink-0" />
                    <span>{act}</span>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Local Food & Travel Tips */}
          <div className="bg-white rounded-3xl p-6 sm:p-8 shadow-sm border border-orange-100 space-y-4">
            <div className="flex items-center gap-2">
              <Utensils className="w-5 h-5 text-rose-500" />
              <h2 className="text-xl font-extrabold text-slate-900">Local Cuisine & Travel Tips</h2>
            </div>
            
            <div className="space-y-3 text-xs text-slate-600 font-medium leading-relaxed">
              <p>• <strong>Food Highlights:</strong> Sample regional authentic specialties at local heritage eateries and vibrant night bazaars.</p>
              <p>• <strong>Getting Around:</strong> Local cabs, auto rickshaws, or rental two-wheelers are widely available throughout the main tourist belt.</p>
              <p>• <strong>Traveler Tip:</strong> Book popular attraction permits and high-demand stays 2-3 weeks in advance during peak season ({destination.bestTime || 'Oct - Mar'}).</p>
            </div>
          </div>

        </div>

        {/* Right Column: Live Weather & Recommended Stays */}
        <div className="lg:col-span-5 space-y-8">
          
          {/* Integrated Weather Widget */}
          <WeatherWidget initialCity={destination.name} />

          {/* Sticky CTA Card */}
          <div className="bg-gradient-to-r from-brand-orange via-amber-500 to-brand-golden p-6 rounded-3xl text-white shadow-glow space-y-3 text-center">
            <h3 className="text-lg font-extrabold">Ready to explore {destination.name}?</h3>
            <p className="text-xs text-yellow-100 font-medium">Generate a dynamic day-wise itinerary with visual budget breakdown instantly.</p>
            <button
              onClick={handleCreateItinerary}
              className="w-full py-3.5 rounded-2xl bg-white text-slate-900 font-extrabold text-xs shadow-md hover:bg-yellow-50 transition-all flex items-center justify-center gap-2"
            >
              <Sparkles className="w-4 h-4 text-brand-orange" />
              Create My Custom Itinerary
            </button>
          </div>

        </div>

      </div>

      {/* Recommended Hotels for this Destination */}
      <div className="space-y-6 pt-6 border-t border-orange-100">
        <h2 className="text-2xl font-extrabold text-slate-900">Recommended Hotels in {destination.name}</h2>
        {hotels.length === 0 ? (
          <p className="text-xs text-slate-500 font-semibold">No specific hotel records listed for {destination.name} yet. Check out our main Hotels page!</p>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {hotels.map((hotel) => (
              <HotelCard key={hotel._id || hotel.name} hotel={hotel} />
            ))}
          </div>
        )}
      </div>

    </div>
  );
}
