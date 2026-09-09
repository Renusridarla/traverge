import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import HeroSection from '../components/HeroSection';
import TripPlanner from '../components/TripPlanner';
import WhyTraverge from '../components/WhyTraverge';
import HowItWorks from '../components/HowItWorks';
import DestinationCard from '../components/DestinationCard';
import HotelCard from '../components/HotelCard';
import WeatherWidget from '../components/WeatherWidget';
import { Sparkles, ArrowRight, MapPin, Globe, Building2, Sun, Star } from 'lucide-react';

export default function HomePage() {
  const navigate = useNavigate();

  const [indianDestinations, setIndianDestinations] = useState([]);
  const [internationalDestinations, setInternationalDestinations] = useState([]);
  const [hotels, setHotels] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [indRes, intRes, hotelRes] = await Promise.all([
          axios.get('/api/destinations?type=indian&popular=true'),
          axios.get('/api/destinations?type=international&popular=true'),
          axios.get('/api/hotels?sort=rating')
        ]);

        if (indRes.data?.success) setIndianDestinations(indRes.data.data.slice(0, 4));
        if (intRes.data?.success) setInternationalDestinations(intRes.data.data.slice(0, 4));
        if (hotelRes.data?.success) setHotels(hotelRes.data.data.slice(0, 3));
      } catch (err) {
        console.error('Failed to fetch home page data:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const testimonials = [
    {
      name: 'Aarav Sharma',
      role: 'Software Engineer',
      location: 'Bengaluru',
      comment: 'Traverge planned our 4-day Manali trip in seconds! The weather-based activity suggestions and visual budget breakdown were spot on.',
      avatar: '👨‍💻',
      rating: 5
    },
    {
      name: 'Priya Nair',
      role: 'UI Designer',
      location: 'Kochi',
      comment: 'I love how easy it is to switch between Indian destinations and international trips like Bali. The hotel recommendations are super clean!',
      avatar: '👩‍🎨',
      rating: 5
    },
    {
      name: 'Rohan Mehta',
      role: 'Product Manager',
      location: 'Mumbai',
      comment: 'The day-wise itinerary generator saved me hours of planning for our Maldives getaway. A portfolio project that feels like a real tech startup!',
      avatar: '👨‍💼',
      rating: 5
    }
  ];

  return (
    <div className="space-y-16 pb-12">
      
      {/* 1. Hero Section */}
      <HeroSection />

      {/* 2. Trip Planner Form Container */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 -mt-10 lg:-mt-20 relative z-20">
        <TripPlanner />
      </div>

      {/* 3. Why Traverge? Section */}
      <WhyTraverge />

      {/* 4. Popular Indian Destinations Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
          <div>
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-orange-100 text-brand-orange text-xs font-extrabold uppercase tracking-wider mb-2">
              <MapPin className="w-3.5 h-3.5" />
              Explore Incredible India
            </div>
            <h2 className="text-3xl font-extrabold text-slate-900">Popular Indian Trips</h2>
            <p className="text-sm font-medium text-slate-600">Top tourist destinations across Indian states and union territories.</p>
          </div>

          <Link
            to="/indian-trips"
            className="px-5 py-2.5 rounded-xl bg-orange-50 text-brand-orange hover:bg-brand-orange hover:text-white font-bold text-xs transition-all flex items-center gap-2 self-start sm:self-auto border border-orange-200"
          >
            <span>View All 36 States & UTs</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {indianDestinations.map((dest) => (
            <DestinationCard key={dest._id || dest.name} destination={dest} />
          ))}
        </div>
      </section>

      {/* 5. Popular International Destinations Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
          <div>
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-100 text-amber-800 text-xs font-extrabold uppercase tracking-wider mb-2">
              <Globe className="w-3.5 h-3.5" />
              Global Adventures
            </div>
            <h2 className="text-3xl font-extrabold text-slate-900">Popular International Trips</h2>
            <p className="text-sm font-medium text-slate-600">Maldives, Bangkok, Bali, Paris, Switzerland, Japan, Dubai & more.</p>
          </div>

          <Link
            to="/international-trips"
            className="px-5 py-2.5 rounded-xl bg-amber-50 text-amber-800 hover:bg-amber-500 hover:text-white font-bold text-xs transition-all flex items-center gap-2 self-start sm:self-auto border border-amber-200"
          >
            <span>Explore All International Countries</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {internationalDestinations.map((dest) => (
            <DestinationCard key={dest._id || dest.name} destination={dest} />
          ))}
        </div>
      </section>

      {/* 6. Weather-Based Travel Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <WeatherWidget initialCity="Manali" />
      </section>

      {/* 7. Recommended Hotels Preview */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
          <div>
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-yellow-100 text-yellow-800 text-xs font-extrabold uppercase tracking-wider mb-2">
              <Building2 className="w-3.5 h-3.5" />
              Curated Accommodations
            </div>
            <h2 className="text-3xl font-extrabold text-slate-900">Top Recommended Hotels & Stays</h2>
            <p className="text-sm font-medium text-slate-600">Sample luxury resorts, 5-star hotels, and budget stays with INR rates.</p>
          </div>

          <Link
            to="/hotels"
            className="px-5 py-2.5 rounded-xl bg-yellow-50 text-amber-800 hover:bg-brand-golden hover:text-white font-bold text-xs transition-all flex items-center gap-2 self-start sm:self-auto border border-yellow-200"
          >
            <span>Search All Hotels</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {hotels.map((hotel) => (
            <HotelCard key={hotel._id || hotel.name} hotel={hotel} />
          ))}
        </div>
      </section>

      {/* 8. How It Works Section */}
      <HowItWorks />

      {/* 9. Testimonials Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        <div className="text-center max-w-2xl mx-auto space-y-2">
          <span className="text-xs font-extrabold uppercase tracking-wider text-brand-orange">
            Loved By Travelers
          </span>
          <h2 className="text-3xl font-extrabold text-slate-900">What Our Users Say</h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {testimonials.map((t, idx) => (
            <div
              key={idx}
              className="bg-white rounded-3xl p-6 shadow-sm border border-orange-100 space-y-4 hover:shadow-card-hover transition-all"
            >
              <div className="flex items-center gap-1 text-amber-400">
                {[...Array(t.rating)].map((_, i) => (
                  <Star key={i} className="w-4 h-4 fill-amber-400" />
                ))}
              </div>
              <p className="text-xs text-slate-600 font-medium italic leading-relaxed">
                "{t.comment}"
              </p>
              <div className="flex items-center gap-3 pt-3 border-t border-slate-100">
                <span className="text-3xl">{t.avatar}</span>
                <div>
                  <h4 className="text-sm font-extrabold text-slate-900">{t.name}</h4>
                  <p className="text-[11px] text-slate-500 font-semibold">{t.role} • {t.location}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* 10. Call to Action Banner */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-gradient-to-r from-brand-orange via-amber-500 to-brand-golden rounded-3xl p-8 lg:p-12 text-white text-center space-y-6 shadow-glow relative overflow-hidden">
          <div className="max-w-2xl mx-auto space-y-3 relative z-10">
            <h2 className="text-3xl sm:text-4xl font-extrabold">Ready for Your Next Unforgettable Journey?</h2>
            <p className="text-sm font-medium text-yellow-100">
              Generate a full day-wise itinerary, check live destination weather, and find ideal hotel options in under a minute.
            </p>
            <div className="pt-4 flex justify-center">
              <Link
                to="/itinerary"
                className="px-8 py-4 rounded-2xl bg-white text-brand-orange font-extrabold text-base shadow-lg hover:bg-yellow-50 hover:scale-105 transition-all flex items-center gap-2"
              >
                <Sparkles className="w-5 h-5 text-brand-golden" />
                Create My Itinerary
              </Link>
            </div>
          </div>
        </div>
      </section>

    </div>
  );
}
