import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import HeroSection from '../components/HeroSection';
import TripPlanner from '../components/TripPlanner';
import HowItWorks from '../components/HowItWorks';
import WhyTraverge from '../components/WhyTraverge';
import SmartPlanningFeatures from '../components/SmartPlanningFeatures';
import DestinationCard from '../components/DestinationCard';
import HotelCard from '../components/HotelCard';
import { ArrowRight, MapPin, Building2, ArrowUpRight } from 'lucide-react';

export default function HomePage() {
  const [popularDestinations, setPopularDestinations] = useState([]);
  const [hotels, setHotels] = useState([]);
  const [loading, setLoading] = useState(true);

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
      shortDescription: 'High-altitude mountain resort with snow adventures in Solang Valley.',
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
      shortDescription: "India's premier party and beach destination with Fort Aguada sunsets.",
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
      shortDescription: 'Luxury overwater villas, private reefs & crystal turquoise lagoons.',
      image: 'https://images.unsplash.com/photo-1514282401047-d79a71a590e8?auto=format&fit=crop&w=800&q=80',
      rating: 4.9
    },
    {
      _id: 'int-2',
      name: 'Bali',
      state: 'Bali',
      country: 'Indonesia',
      type: 'international',
      category: 'Nature',
      estimatedBudgetINR: 50000,
      recommendedDays: 5,
      bestTime: 'Apr - Oct',
      shortDescription: 'Emerald rice terraces, spiritual water temples & beach clubs.',
      image: 'https://images.unsplash.com/photo-1537996194471-e657df975ab4?auto=format&fit=crop&w=800&q=80',
      rating: 4.9
    }
  ];

  const fallbackHotels = [
    {
      _id: 'hot-1',
      name: 'Taj Fort Aguada Resort & Spa',
      destination: 'Goa',
      location: 'Sinquerim Beach, Candolim',
      pricePerNight: 16500,
      rating: 4.8,
      reviewsCount: 340,
      amenities: ['Ocean View Pool', 'Private Beach', 'Ayurveda Spa', 'Fine Dining'],
      roomType: 'Sea View Deluxe Cottage',
      category: 'Luxury',
      image: 'https://images.unsplash.com/photo-1566073771259-6a8506099945?auto=format&fit=crop&w=800&q=80',
      distanceFromCenter: '0.2 km from beach'
    },
    {
      _id: 'hot-2',
      name: 'The Grand Dragon & Spa Manali',
      destination: 'Manali',
      location: 'Log Huts Area, Old Manali',
      pricePerNight: 9500,
      rating: 4.7,
      reviewsCount: 290,
      amenities: ['Mountain View Balcony', 'Heated Pool', 'Fireside Lounge', 'Spa'],
      roomType: 'Luxury Snow View Suite',
      category: '5-Star',
      image: 'https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?auto=format&fit=crop&w=800&q=80',
      distanceFromCenter: '1.2 km from Mall Road'
    }
  ];

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [destRes, hotelRes] = await Promise.all([
          axios.get('/api/destinations?popular=true'),
          axios.get('/api/hotels?sort=rating')
        ]);

        if (destRes.data?.success && destRes.data.data.length > 0) {
          setPopularDestinations(destRes.data.data.slice(0, 4));
        } else {
          setPopularDestinations(fallbackDestinations);
        }

        if (hotelRes.data?.success && hotelRes.data.data.length > 0) {
          setHotels(hotelRes.data.data.slice(0, 2));
        } else {
          setHotels(fallbackHotels);
        }
      } catch (err) {
        setPopularDestinations(fallbackDestinations);
        setHotels(fallbackHotels);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  return (
    <div className="space-y-16 pb-16">
      
      {/* 1. Hero Section */}
      <HeroSection />

      {/* 2. Trip Planner Interactive Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 -mt-8 relative z-20">
        <TripPlanner />
      </section>

      {/* 3. How It Works Section */}
      <HowItWorks />

      {/* 4. Popular Destinations Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
          <div>
            <span className="text-xs font-extrabold text-[#FFF449] uppercase tracking-wider block">
              Featured Locations
            </span>
            <h2 className="text-2xl sm:text-3xl font-black text-white">Popular Destinations</h2>
            <p className="text-sm font-normal text-gray-400">Discover top domestic and international travel spots.</p>
          </div>

          <Link
            to="/destinations"
            className="px-4 py-2.5 rounded-xl bg-[#131920] text-white border border-[#232E3C] hover:border-[#FFF449] font-bold text-xs transition-all flex items-center gap-1.5 self-start sm:self-auto shadow-card-dark hover:scale-105"
          >
            <span>Explore All Destinations</span>
            <ArrowUpRight className="w-4 h-4 text-[#B2D959]" />
          </Link>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {popularDestinations.map((dest) => (
            <DestinationCard key={dest._id || dest.name} destination={dest} />
          ))}
        </div>
      </section>

      {/* 5. Why Traverge Section */}
      <WhyTraverge />

      {/* 6. Smart Travel Planning Capabilities */}
      <SmartPlanningFeatures />

      {/* 7. Popular Hotels Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
          <div>
            <span className="text-xs font-extrabold text-[#FFF449] uppercase tracking-wider block">
              Accommodations
            </span>
            <h2 className="text-2xl sm:text-3xl font-black text-white">Popular Hotels</h2>
            <p className="text-sm font-normal text-gray-400">Curated selection of stays with estimated rates.</p>
          </div>

          <Link
            to="/hotels"
            className="px-4 py-2.5 rounded-xl bg-[#131920] text-white border border-[#232E3C] hover:border-[#FFF449] font-bold text-xs transition-all flex items-center gap-1.5 self-start sm:self-auto shadow-card-dark hover:scale-105"
          >
            <span>View All Hotels</span>
            <ArrowUpRight className="w-4 h-4 text-[#B2D959]" />
          </Link>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {hotels.map((hotel) => (
            <HotelCard key={hotel._id || hotel.name} hotel={hotel} />
          ))}
        </div>
      </section>

      {/* 8. Final CTA Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="interactive-card bg-[#131920] rounded-3xl p-8 lg:p-14 text-white text-center space-y-6 shadow-card-dark border border-[#232E3C] relative overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-tr from-[#FFF449]/05 via-[#B2D959]/05 to-transparent pointer-events-none" />
          <div className="max-w-xl mx-auto space-y-4 relative z-10">
            <h2 className="text-3xl sm:text-4xl font-black text-white">Ready to plan your next trip?</h2>
            <p className="text-sm font-normal text-gray-400 leading-relaxed">
              Create a personalized day-wise itinerary tailored to your budget, travel preferences, and weather forecasts.
            </p>
            <div className="pt-2 flex justify-center">
              <Link
                to="/itinerary"
                className="px-8 py-4 rounded-xl bg-gradient-brand hover:bg-gradient-brand-hover text-[#0B0F14] font-black text-sm shadow-glow-yellow hover:scale-105 active:scale-95 transition-all flex items-center gap-2.5"
              >
                <span>Plan Your Trip</span>
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </div>
        </div>
      </section>

    </div>
  );
}
