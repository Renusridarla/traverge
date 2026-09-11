import React, { useState, useEffect } from 'react';
import axios from 'axios';
import DestinationCard from '../components/DestinationCard';
import { Search, Compass, Globe, MapPin, Sparkles } from 'lucide-react';

export default function DestinationsPage() {
  const [destinations, setDestinations] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');
  const [activeType, setActiveType] = useState('all');

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
      _id: 'ind-3',
      name: 'Jaipur',
      state: 'Rajasthan',
      country: 'India',
      type: 'indian',
      category: 'Heritage',
      estimatedBudgetINR: 20000,
      recommendedDays: 3,
      bestTime: 'Oct - Mar',
      shortDescription: 'The Pink City famous for Hawa Mahal, Amber Fort and City Palace.',
      image: 'https://images.unsplash.com/photo-1477587458883-47145ed94245?auto=format&fit=crop&w=800&q=80',
      rating: 4.8
    },
    {
      _id: 'ind-4',
      name: 'Munnar',
      state: 'Kerala',
      country: 'India',
      type: 'indian',
      category: 'Hill Station',
      estimatedBudgetINR: 22000,
      recommendedDays: 3,
      bestTime: 'Sep - May',
      shortDescription: 'Endless carpet of emerald tea gardens and mist-covered Western Ghats.',
      image: 'https://images.unsplash.com/photo-1516483638261-f4dbaf036963?auto=format&fit=crop&w=800&q=80',
      rating: 4.9
    },
    {
      _id: 'ind-5',
      name: 'Visakhapatnam',
      state: 'Andhra Pradesh',
      country: 'India',
      type: 'indian',
      category: 'Beach & Coastal',
      estimatedBudgetINR: 18000,
      recommendedDays: 3,
      bestTime: 'Oct - Mar',
      shortDescription: 'Jewel of the East Coast with serene beaches and submarine museum.',
      image: 'https://images.unsplash.com/photo-1627894483216-2138af692e32?auto=format&fit=crop&w=800&q=80',
      rating: 4.6
    },
    {
      _id: 'ind-6',
      name: 'Ladakh (Leh)',
      state: 'Ladakh',
      country: 'India',
      type: 'indian',
      category: 'Mountain',
      estimatedBudgetINR: 35000,
      recommendedDays: 6,
      bestTime: 'May - Sep',
      shortDescription: 'Land of high passes, Pangong Tso lake & ancient Buddhist monasteries.',
      image: 'https://images.unsplash.com/photo-1544735716-392fe2489ffa?auto=format&fit=crop&w=800&q=80',
      rating: 4.9
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
    },
    {
      _id: 'int-3',
      name: 'Paris',
      state: 'Île-de-France',
      country: 'France',
      type: 'international',
      category: 'Heritage',
      estimatedBudgetINR: 120000,
      recommendedDays: 5,
      bestTime: 'Apr - Oct',
      shortDescription: 'The City of Light with Eiffel Tower, Louvre Museum & Seine cruises.',
      image: 'https://images.unsplash.com/photo-1502602898657-3e91760cbb34?auto=format&fit=crop&w=800&q=80',
      rating: 4.8
    },
    {
      _id: 'int-4',
      name: 'Dubai',
      state: 'Dubai Emirate',
      country: 'UAE',
      type: 'international',
      category: 'Urban',
      estimatedBudgetINR: 65000,
      recommendedDays: 4,
      bestTime: 'Nov - Mar',
      shortDescription: 'Burj Khalifa skyline, desert safaris & luxury shopping malls.',
      image: 'https://images.unsplash.com/photo-1512453979798-5ea266f8880c?auto=format&fit=crop&w=800&q=80',
      rating: 4.8
    }
  ];

  const getFilteredFallback = () => {
    let list = fallbackDestinations;
    if (activeType !== 'all') {
      list = list.filter(d => d.type === activeType);
    }
    if (search) {
      const s = search.toLowerCase();
      list = list.filter(d =>
        d.name.toLowerCase().includes(s) ||
        (d.state && d.state.toLowerCase().includes(s)) ||
        (d.country && d.country.toLowerCase().includes(s))
      );
    }
    return list;
  };

  const fetchDestinations = async () => {
    setLoading(true);
    try {
      let query = '/api/destinations';
      const params = [];
      if (activeType !== 'all') params.push(`type=${activeType}`);
      if (search) params.push(`search=${encodeURIComponent(search)}`);
      if (params.length > 0) query += `?${params.join('&')}`;

      const res = await axios.get(query);
      if (res.data?.success && res.data.data.length > 0) {
        setDestinations(res.data.data);
      } else {
        setDestinations(getFilteredFallback());
      }
    } catch (err) {
      console.warn('Backend query notice, loading fallback destinations');
      setDestinations(getFilteredFallback());
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchDestinations();
  }, [activeType]);

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    fetchDestinations();
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-8">
      
      {/* Header */}
      <div className="text-center max-w-2xl mx-auto space-y-3">
        <div className="inline-flex items-center gap-1.5 px-4 py-1.5 rounded-full bg-[#131920] border border-[#232E3C] shadow-card-dark text-[#FFF449] text-xs font-extrabold uppercase tracking-wider">
          <Compass className="w-4 h-4 text-[#B2D959]" />
          <span>Global Destination Hub</span>
        </div>
        <h1 className="text-3xl sm:text-4xl font-black text-white">
          Explore All Tourist Destinations
        </h1>
        <p className="text-sm font-normal text-gray-400">
          Find incredible destinations across Indian states, union territories, and top international tourist hotspots.
        </p>
      </div>

      {/* Tabs & Search Controls */}
      <div className="interactive-card bg-[#131920] rounded-3xl p-6 shadow-card-dark border border-[#232E3C] space-y-4">
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
          
          {/* Type Toggle Tabs */}
          <div className="flex items-center gap-2 bg-[#0B0F14] p-1.5 rounded-2xl w-full sm:w-auto border border-[#232E3C]">
            <button
              onClick={() => setActiveType('all')}
              className={`flex-1 sm:flex-none px-4 py-2 rounded-xl text-xs font-bold transition-all ${
                activeType === 'all'
                  ? 'bg-gradient-brand text-[#0B0F14] shadow-glow-yellow'
                  : 'text-gray-400 hover:text-white'
              }`}
            >
              All Destinations
            </button>
            <button
              onClick={() => setActiveType('indian')}
              className={`flex-1 sm:flex-none px-4 py-2 rounded-xl text-xs font-bold transition-all flex items-center justify-center gap-1.5 ${
                activeType === 'indian'
                  ? 'bg-gradient-brand text-[#0B0F14] shadow-glow-yellow'
                  : 'text-gray-400 hover:text-white'
              }`}
            >
              <MapPin className="w-3.5 h-3.5" />
              <span>Indian</span>
            </button>
            <button
              onClick={() => setActiveType('international')}
              className={`flex-1 sm:flex-none px-4 py-2 rounded-xl text-xs font-bold transition-all flex items-center justify-center gap-1.5 ${
                activeType === 'international'
                  ? 'bg-gradient-brand text-[#0B0F14] shadow-glow-yellow'
                  : 'text-gray-400 hover:text-white'
              }`}
            >
              <Globe className="w-3.5 h-3.5" />
              <span>International</span>
            </button>
          </div>

          {/* Search Bar */}
          <form onSubmit={handleSearchSubmit} className="relative w-full sm:w-80">
            <Search className="w-4 h-4 text-[#FFF449] absolute left-3.5 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search destination or state..."
              className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-[#0B0F14] border border-[#232E3C] text-white font-semibold text-xs focus:outline-none focus:ring-2 focus:ring-[#FFF449]"
            />
          </form>

        </div>
      </div>

      {/* Grid Content */}
      {loading ? (
        <div className="py-20 text-center text-gray-400 font-semibold">
          Loading destinations...
        </div>
      ) : destinations.length === 0 ? (
        <div className="bg-[#131920] rounded-3xl p-12 text-center text-gray-400 font-medium border border-[#232E3C]">
          No destinations found matching "{search}".
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {destinations.map((dest) => (
            <DestinationCard key={dest._id || dest.name} destination={dest} />
          ))}
        </div>
      )}

    </div>
  );
}
