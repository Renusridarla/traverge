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

  const fallbackDestinations = [
    {
      _id: 'ind-1',
      name: 'Manali',
      state: 'Himachal Pradesh',
      country: 'India',
      type: 'indian',
      category: 'Hill Station',
      estimatedBudgetINR: 22000,
      recommendedDays: 4,
      bestTime: 'Oct - Jun',
      description: 'High-altitude Himalayan resort town known for snow adventures in Solang Valley, Hadimba Temple, and scenic pine-scented Old Manali cafes.',
      shortDescription: 'High-altitude mountain resort with snow adventures in Solang Valley.',
      activities: ['Solang Valley Paragliding', 'Atal Tunnel Drive', 'Hadimba Temple Visit', 'Mall Road Shopping', 'Jogini Waterfall Trek'],
      attractions: [
        { name: 'Solang Valley Snow Point', category: 'Adventure', estimatedCost: 1500, weatherSuitability: 'Cold' },
        { name: 'Hadimba Devi Temple', category: 'Heritage', estimatedCost: 50, weatherSuitability: 'All Weather' },
        { name: 'Old Manali Cafe Hop', category: 'Food', estimatedCost: 800, weatherSuitability: 'Indoor' }
      ],
      image: 'https://images.unsplash.com/photo-1626621341517-bbf3d9990a23?auto=format&fit=crop&w=800&q=80',
      rating: 4.8
    },
    {
      _id: 'ind-2',
      name: 'Goa',
      state: 'Goa',
      country: 'India',
      type: 'indian',
      category: 'Beach & Coastal',
      estimatedBudgetINR: 25000,
      recommendedDays: 4,
      bestTime: 'Nov - Feb',
      description: "India's premier party and beach destination famous for Fort Aguada sunsets, Calangute watersports, Portuguese architecture, and vibrant flea markets.",
      shortDescription: "India's premier party and beach destination with Fort Aguada sunsets.",
      activities: ['Calangute Watersports', 'Aguada Fort Sunset', 'Baga Beach Nightlife', 'Anjuna Flea Market', 'Spice Plantation'],
      attractions: [
        { name: 'Baga & Calangute Beach Strip', category: 'Beach', estimatedCost: 500, weatherSuitability: 'Sunny' },
        { name: 'Fort Aguada & Lighthouse', category: 'Heritage', estimatedCost: 100, weatherSuitability: 'Sunny' },
        { name: 'Dudhsagar Waterfalls Trip', category: 'Nature', estimatedCost: 2000, weatherSuitability: 'Outdoor' }
      ],
      image: 'https://images.unsplash.com/photo-1512343879784-a960bf40e7f2?auto=format&fit=crop&w=800&q=80',
      rating: 4.8
    },
    {
      _id: 'int-1',
      name: 'Maldives',
      state: 'Malé Atoll',
      country: 'Maldives',
      type: 'international',
      category: 'Resort',
      estimatedBudgetINR: 85000,
      recommendedDays: 4,
      bestTime: 'Nov - Apr',
      description: 'Luxury overwater villas, private reefs, crystal turquoise lagoons, world-class scuba diving, and romantic island sunset cruises.',
      shortDescription: 'Luxury overwater villas, private reefs & crystal turquoise lagoons.',
      activities: ['Overwater Villa Stay', 'Coral Reef Snorkeling', 'Sunset Dolphin Cruise', 'Underwater Dining'],
      attractions: [
        { name: 'Banana Reef Diving Point', category: 'Adventure', estimatedCost: 4000, weatherSuitability: 'Sunny' },
        { name: 'Malé Island Cultural Walk', category: 'Culture', estimatedCost: 500, weatherSuitability: 'All Weather' }
      ],
      image: 'https://images.unsplash.com/photo-1514282401047-d79a71a590e8?auto=format&fit=crop&w=800&q=80',
      rating: 4.9
    }
  ];

  useEffect(() => {
    const fetchDetail = async () => {
      setLoading(true);
      setError(null);
      try {
        const destRes = await axios.get(`/api/destinations/${encodeURIComponent(id)}`);
        if (destRes.data?.success && destRes.data.data) {
          const destData = destRes.data.data;
          setDestination(destData);

          try {
            const hotelRes = await axios.get(`/api/hotels?destination=${encodeURIComponent(destData.name)}`);
            if (hotelRes.data?.success) {
              setHotels(hotelRes.data.data);
            }
          } catch (hErr) {
            console.warn('Hotels load notice');
          }
        } else {
          findFallbackDestination();
        }
      } catch (err) {
        findFallbackDestination();
      } finally {
        setLoading(false);
      }
    };

    const findFallbackDestination = () => {
      const idDecoded = decodeURIComponent(id || '').toLowerCase();
      const match = fallbackDestinations.find(
        d => d.name.toLowerCase() === idDecoded || d.name.toLowerCase().includes(idDecoded)
      ) || fallbackDestinations[0];

      setDestination(match);
    };

    fetchDetail();
  }, [id]);

  if (loading) {
    return (
      <div className="max-w-7xl mx-auto px-4 py-20 text-center text-gray-400 font-semibold">
        Loading destination guide...
      </div>
    );
  }

  if (error || !destination) {
    return (
      <div className="max-w-7xl mx-auto px-4 py-20 text-center space-y-4">
        <p className="text-xl font-bold text-red-400">{error || 'Destination not found'}</p>
        <Link to="/destinations" className="px-5 py-2.5 rounded-xl bg-gradient-brand text-[#0B0F14] text-xs font-extrabold inline-block shadow-glow-yellow">
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
        className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-[#131920] text-gray-200 font-bold text-xs shadow-card-dark border border-[#232E3C] hover:text-[#FFF449] transition-colors"
      >
        <ArrowLeft className="w-4 h-4" />
        Back
      </button>

      {/* Hero Cover */}
      <div className="relative rounded-3xl overflow-hidden shadow-card-dark border border-[#232E3C] bg-[#0B0F14] text-white min-h-[380px] lg:min-h-[460px] flex items-end p-6 sm:p-10 group">
        <img
          src={destination.image}
          alt={destination.name}
          className="absolute inset-0 w-full h-full object-cover opacity-60 group-hover:scale-105 transition-transform duration-700"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#0B0F14] via-[#0B0F14]/60 to-transparent" />

        <div className="relative z-10 space-y-4 max-w-3xl">
          <div className="flex flex-wrap items-center gap-2">
            <span className="px-3.5 py-1 rounded-full bg-[#0B0F14]/85 text-white font-extrabold text-xs uppercase tracking-wider border border-[#232E3C] flex items-center gap-1.5">
              <MapPin className="w-3.5 h-3.5 text-[#B2D959]" />
              <span>{destination.type === 'international' ? destination.country : (destination.state || destination.country)}</span>
            </span>
            <span className="px-3.5 py-1 rounded-full bg-[#1A222C] text-[#FFF449] font-extrabold text-xs border border-[#232E3C]">
              {destination.category}
            </span>
            <span className="px-3 py-1 rounded-full bg-[#0B0F14]/85 text-[#FFF449] border border-[#232E3C] font-extrabold text-xs flex items-center gap-1">
              <Star className="w-3.5 h-3.5 fill-[#FFF449] text-[#FFF449]" />
              {destination.rating || 4.8}
            </span>
          </div>

          <h1 className="text-4xl sm:text-5xl font-black text-white tracking-tight leading-tight">
            {destination.name}
          </h1>

          <p className="text-sm sm:text-base font-normal text-gray-300 leading-relaxed">
            {destination.description}
          </p>

          {/* Key Quick Stats */}
          <div className="flex flex-wrap items-center gap-6 pt-4 border-t border-[#232E3C] text-xs">
            <div className="flex items-center gap-2">
              <Calendar className="w-4 h-4 text-[#B2D959]" />
              <span>Recommended: <strong className="text-white">{destination.recommendedDays || 3} Days</strong></span>
            </div>
            <div className="flex items-center gap-2">
              <Sun className="w-4 h-4 text-[#FFF449]" />
              <span>Best Time: <strong className="text-white">{destination.bestTime || 'Oct - Mar'}</strong></span>
            </div>
            <div className="flex items-center gap-2">
              <IndianRupee className="w-4 h-4 text-[#7EC151]" />
              <span>Est. Budget: <strong className="text-white">₹{Number(destination.estimatedBudgetINR).toLocaleString('en-IN')} / person</strong></span>
            </div>
          </div>
        </div>

        {/* CTA Button Top-Right overlay on desktop */}
        <div className="absolute top-6 right-6 hidden md:block">
          <button
            onClick={handleCreateItinerary}
            className="px-6 py-3.5 rounded-xl bg-gradient-brand hover:bg-gradient-brand-hover text-[#0B0F14] font-black text-sm shadow-glow-yellow hover:scale-105 transition-all flex items-center gap-2"
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
            <div className="interactive-card bg-[#131920] rounded-3xl p-6 sm:p-8 shadow-card-dark border border-[#232E3C] space-y-4">
              <div className="flex items-center gap-2.5">
                <Compass className="w-5 h-5 text-[#FFF449]" />
                <h2 className="text-xl font-bold text-white">Popular Attractions</h2>
              </div>

              <div className="grid grid-cols-1 gap-4">
                {destination.attractions.map((attr, idx) => (
                  <div key={idx} className="p-4 rounded-xl bg-[#0B0F14] border border-[#232E3C] flex items-start justify-between gap-4">
                    <div>
                      <h3 className="text-sm font-bold text-white">{attr.name}</h3>
                      <p className="text-xs text-gray-400 font-normal mt-0.5">{attr.category || 'Sightseeing spot'}</p>
                    </div>
                    <div className="text-right shrink-0">
                      <span className="text-xs font-bold text-[#B2D959] bg-[#1A222C] border border-[#232E3C] px-2.5 py-1 rounded-lg block">
                        ₹{attr.estimatedCost || 200}
                      </span>
                      <span className="text-[10px] text-gray-400 font-semibold mt-1 block">{attr.weatherSuitability || 'All Weather'}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Activities List */}
          {destination.activities && destination.activities.length > 0 && (
            <div className="interactive-card bg-[#131920] rounded-3xl p-6 sm:p-8 shadow-card-dark border border-[#232E3C] space-y-4">
              <div className="flex items-center gap-2.5">
                <Sparkles className="w-5 h-5 text-[#B2D959]" />
                <h2 className="text-xl font-bold text-white">Top Things To Do & Activities</h2>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {destination.activities.map((act, idx) => (
                  <div key={idx} className="flex items-center gap-2.5 p-3.5 rounded-xl bg-[#0B0F14] border border-[#232E3C] text-xs font-bold text-gray-200">
                    <CheckCircle className="w-4 h-4 text-[#7EC151] shrink-0" />
                    <span>{act}</span>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Local Food & Travel Tips */}
          <div className="interactive-card bg-[#131920] rounded-3xl p-6 sm:p-8 shadow-card-dark border border-[#232E3C] space-y-4">
            <div className="flex items-center gap-2.5">
              <Utensils className="w-5 h-5 text-[#FFF449]" />
              <h2 className="text-xl font-bold text-white">Local Cuisine & Travel Tips</h2>
            </div>
            
            <div className="space-y-3 text-xs text-gray-300 font-normal leading-relaxed">
              <p>• <strong className="text-white">Food Highlights:</strong> Sample regional authentic specialties at local heritage eateries and vibrant night bazaars.</p>
              <p>• <strong className="text-white">Getting Around:</strong> Local cabs, auto rickshaws, or rental two-wheelers are widely available throughout the main tourist belt.</p>
              <p>• <strong className="text-white">Traveler Tip:</strong> Book popular attraction permits and high-demand stays 2-3 weeks in advance during peak season ({destination.bestTime || 'Oct - Mar'}).</p>
            </div>
          </div>

        </div>

        {/* Right Column: Live Weather & Recommended Stays */}
        <div className="lg:col-span-5 space-y-8">
          
          {/* Integrated Weather Widget */}
          <WeatherWidget initialCity={destination.name} />

          {/* Sticky CTA Card */}
          <div className="bg-[#131920] p-6 rounded-3xl text-white shadow-card-dark border border-[#232E3C] space-y-3 text-center">
            <h3 className="text-lg font-bold">Ready to explore {destination.name}?</h3>
            <p className="text-xs text-gray-400 font-normal">Generate a dynamic day-wise itinerary with visual budget breakdown instantly.</p>
            <button
              onClick={handleCreateItinerary}
              className="w-full py-3.5 rounded-xl bg-gradient-brand hover:bg-gradient-brand-hover text-[#0B0F14] font-black text-xs shadow-glow-yellow hover:scale-105 transition-all flex items-center justify-center gap-2"
            >
              <Sparkles className="w-4 h-4" />
              Create My Custom Itinerary
            </button>
          </div>

        </div>

      </div>

      {/* Recommended Hotels for this Destination */}
      <div className="space-y-6 pt-6 border-t border-[#232E3C]">
        <h2 className="text-2xl font-black text-white">Recommended Hotels in {destination.name}</h2>
        {hotels.length === 0 ? (
          <p className="text-xs text-gray-400 font-semibold">No specific hotel records listed for {destination.name} yet. Check out our main Hotels page!</p>
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
