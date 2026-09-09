import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import HeroSection from '../components/HeroSection';
import TripPlanner from '../components/TripPlanner';
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

      {/* 3. Popular Destinations Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
          <div>
            <span className="text-xs font-bold text-[#853953] uppercase tracking-wider block">
              Featured Locations
            </span>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-[#2C2C2C]">Popular Destinations</h2>
            <p className="text-sm font-normal text-[#2C2C2C]/75">Discover top domestic and international travel spots.</p>
          </div>

          <Link
            to="/destinations"
            className="px-4 py-2 rounded-lg bg-white text-[#853953] border border-gray-300 hover:border-[#853953] font-semibold text-xs transition-all flex items-center gap-1.5 self-start sm:self-auto"
          >
            <span>Explore All Destinations</span>
            <ArrowUpRight className="w-4 h-4" />
          </Link>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {popularDestinations.map((dest) => (
            <DestinationCard key={dest._id || dest.name} destination={dest} />
          ))}
        </div>
      </section>

      {/* 4. Smart Travel Planning Capabilities */}
      <SmartPlanningFeatures />

      {/* 5. Popular Hotels Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
          <div>
            <span className="text-xs font-bold text-[#853953] uppercase tracking-wider block">
              Accommodations
            </span>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-[#2C2C2C]">Popular Hotels</h2>
            <p className="text-sm font-normal text-[#2C2C2C]/75">Curated selection of stays with estimated rates.</p>
          </div>

          <Link
            to="/hotels"
            className="px-4 py-2 rounded-lg bg-white text-[#853953] border border-gray-300 hover:border-[#853953] font-semibold text-xs transition-all flex items-center gap-1.5 self-start sm:self-auto"
          >
            <span>View All Hotels</span>
            <ArrowUpRight className="w-4 h-4" />
          </Link>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {hotels.map((hotel) => (
            <HotelCard key={hotel._id || hotel.name} hotel={hotel} />
          ))}
        </div>
      </section>

      {/* 6. Final CTA Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-[#2C2C2C] rounded-2xl p-8 lg:p-12 text-white text-center space-y-6 shadow-card">
          <div className="max-w-xl mx-auto space-y-3">
            <h2 className="text-2xl sm:text-3xl font-extrabold text-[#F3F4F4]">Ready to plan your next trip?</h2>
            <p className="text-sm font-normal text-[#F3F4F4]/80">
              Create a personalized day-wise itinerary tailored to your budget and preferences.
            </p>
            <div className="pt-2 flex justify-center">
              <Link
                to="/itinerary"
                className="px-7 py-3 rounded-lg bg-gradient-to-r from-[#853953] to-[#612D53] text-white font-semibold text-sm shadow-xs hover:opacity-95 transition-all flex items-center gap-2"
              >
                <span>Plan a Trip</span>
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </div>
        </div>
      </section>

    </div>
  );
}
