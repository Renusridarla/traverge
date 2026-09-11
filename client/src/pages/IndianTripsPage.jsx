import React, { useState, useEffect } from 'react';
import axios from 'axios';
import DestinationCard from '../components/DestinationCard';
import { Search, MapPin, RefreshCw, Filter } from 'lucide-react';

export default function IndianTripsPage() {
  const [destinations, setDestinations] = useState([]);
  const [loading, setLoading] = useState(true);

  // Filters state
  const [search, setSearch] = useState('');
  const [selectedState, setSelectedState] = useState('All');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [maxBudget, setMaxBudget] = useState(50000);

  const statesList = [
    'All', 'Andhra Pradesh', 'Arunachal Pradesh', 'Assam', 'Bihar', 'Chhattisgarh',
    'Goa', 'Gujarat', 'Haryana', 'Himachal Pradesh', 'Jharkhand', 'Karnataka',
    'Kerala', 'Madhya Pradesh', 'Maharashtra', 'Meghalaya', 'Odisha', 'Punjab',
    'Rajasthan', 'Sikkim', 'Tamil Nadu', 'Telangana', 'Uttar Pradesh', 'Uttarakhand',
    'West Bengal', 'Ladakh', 'Jammu & Kashmir', 'Andaman & Nicobar', 'Puducherry'
  ];

  const categories = ['All', 'Beach & Coastal', 'Hill Station', 'Heritage', 'Nature', 'Wildlife', 'Adventure', 'Urban', 'Resort', 'Culture'];

  const fallbackIndianDestinations = [
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
    }
  ];

  const getFilteredFallback = () => {
    let list = fallbackIndianDestinations;
    if (selectedState !== 'All') {
      list = list.filter(d => d.state && d.state.toLowerCase().includes(selectedState.toLowerCase()));
    }
    if (selectedCategory !== 'All') {
      list = list.filter(d => d.category && d.category.toLowerCase().includes(selectedCategory.toLowerCase()));
    }
    if (search) {
      const s = search.toLowerCase();
      list = list.filter(d =>
        d.name.toLowerCase().includes(s) ||
        (d.state && d.state.toLowerCase().includes(s))
      );
    }
    if (maxBudget) {
      list = list.filter(d => d.estimatedBudgetINR <= maxBudget);
    }
    return list;
  };

  const fetchDestinations = async () => {
    setLoading(true);
    try {
      let query = '/api/destinations?type=indian';
      if (search) query += `&search=${encodeURIComponent(search)}`;
      if (selectedState !== 'All') query += `&state=${encodeURIComponent(selectedState)}`;
      if (selectedCategory !== 'All') query += `&category=${encodeURIComponent(selectedCategory)}`;
      if (maxBudget) query += `&maxBudget=${maxBudget}`;

      const res = await axios.get(query);
      if (res.data?.success && res.data.data.length > 0) {
        setDestinations(res.data.data);
      } else {
        setDestinations(getFilteredFallback());
      }
    } catch (err) {
      console.warn('Backend query notice, loading fallback Indian destinations');
      setDestinations(getFilteredFallback());
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchDestinations();
  }, [selectedState, selectedCategory, maxBudget]);

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    fetchDestinations();
  };

  const handleResetFilters = () => {
    setSearch('');
    setSelectedState('All');
    setSelectedCategory('All');
    setMaxBudget(50000);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-8">
      
      {/* Header */}
      <div className="interactive-card bg-[#131920] rounded-3xl p-8 text-white shadow-card-dark border border-[#232E3C] space-y-2">
        <span className="text-xs font-extrabold text-[#FFF449] uppercase tracking-wider block">
          India Catalog
        </span>
        <h1 className="text-3xl font-black">Indian Destinations by State & UT</h1>
        <p className="text-xs font-normal text-gray-400 max-w-2xl leading-relaxed">
          Browse tourist destinations across 28 States and 8 Union Territories in India. Filter by state, budget tier, and category.
        </p>
      </div>

      {/* Filter Control Bar */}
      <div className="interactive-card bg-[#131920] rounded-2xl p-6 shadow-card-dark border border-[#232E3C] space-y-6">
        
        {/* Search Bar */}
        <form onSubmit={handleSearchSubmit} className="flex flex-col sm:flex-row items-center gap-4">
          <div className="relative flex-1 w-full">
            <Search className="w-4 h-4 text-[#FFF449] absolute left-3.5 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search destination e.g. Manali, Goa, Jaipur..."
              className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-[#0B0F14] border border-[#232E3C] text-white font-semibold text-xs focus:outline-none focus:ring-2 focus:ring-[#FFF449] transition-all"
            />
          </div>

          <div className="flex items-center gap-2 w-full sm:w-auto">
            <button
              type="submit"
              className="flex-1 sm:flex-none px-6 py-2.5 rounded-xl bg-gradient-brand hover:bg-gradient-brand-hover text-[#0B0F14] font-extrabold text-xs shadow-glow-yellow hover:scale-105 transition-all"
            >
              Search
            </button>
            
            <button
              type="button"
              onClick={handleResetFilters}
              className="px-4 py-2.5 rounded-xl bg-[#1A222C] text-white font-bold text-xs hover:bg-[#232E3C] transition-all flex items-center gap-1.5 border border-[#232E3C]"
            >
              <RefreshCw className="w-3.5 h-3.5 text-[#B2D959]" />
              Reset
            </button>
          </div>
        </form>

        {/* Dropdowns */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 pt-4 border-t border-[#232E3C]">
          
          {/* State / UT */}
          <div className="space-y-1.5">
            <label className="text-xs font-bold text-gray-300 flex items-center gap-1.5">
              <MapPin className="w-3.5 h-3.5 text-[#B2D959]" />
              Select State / UT
            </label>
            <select
              value={selectedState}
              onChange={(e) => setSelectedState(e.target.value)}
              className="w-full px-3.5 py-2.5 rounded-xl bg-[#0B0F14] border border-[#232E3C] text-white font-semibold text-xs focus:outline-none focus:ring-2 focus:ring-[#FFF449] cursor-pointer"
            >
              {statesList.map((st) => (
                <option key={st} value={st}>
                  {st === 'All' ? 'All States & Union Territories' : st}
                </option>
              ))}
            </select>
          </div>

          {/* Category */}
          <div className="space-y-1.5">
            <label className="text-xs font-bold text-gray-300 flex items-center gap-1.5">
              <Filter className="w-3.5 h-3.5 text-[#7EC151]" />
              Category
            </label>
            <select
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
              className="w-full px-3.5 py-2.5 rounded-xl bg-[#0B0F14] border border-[#232E3C] text-white font-semibold text-xs focus:outline-none focus:ring-2 focus:ring-[#FFF449] cursor-pointer"
            >
              {categories.map((cat) => (
                <option key={cat} value={cat}>
                  {cat === 'All' ? 'All Categories' : cat}
                </option>
              ))}
            </select>
          </div>

          {/* Max Budget Slider */}
          <div className="space-y-1.5">
            <label className="text-xs font-bold text-gray-300 block">
              Max Budget: <span className="text-[#FFF449]">₹{maxBudget.toLocaleString('en-IN')}</span>
            </label>
            <input
              type="range"
              min="10000"
              max="50000"
              step="5000"
              value={maxBudget}
              onChange={(e) => setMaxBudget(Number(e.target.value))}
              className="w-full accent-[#B2D959] cursor-pointer mt-1"
            />
          </div>

        </div>

      </div>

      {/* Results Header */}
      <div className="flex items-center justify-between">
        <h2 className="text-lg font-bold text-white">
          Showing {destinations.length} Indian Destination(s)
        </h2>
      </div>

      {/* Grid Content */}
      {loading ? (
        <div className="py-16 text-center text-xs text-gray-400 font-medium">
          Loading Indian tourist destinations...
        </div>
      ) : destinations.length === 0 ? (
        <div className="bg-[#131920] rounded-2xl p-12 text-center text-xs text-gray-400 font-medium space-y-4 border border-[#232E3C]">
          <p className="font-bold text-white text-sm">No destinations found matching your filters.</p>
          <button
            onClick={handleResetFilters}
            className="px-5 py-2.5 rounded-xl bg-gradient-brand text-[#0B0F14] text-xs font-extrabold shadow-glow-yellow"
          >
            Reset Filters
          </button>
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
