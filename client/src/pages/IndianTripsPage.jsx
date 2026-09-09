import React, { useState, useEffect } from 'react';
import axios from 'axios';
import DestinationCard from '../components/DestinationCard';
import { Search, MapPin, Filter, Sparkles, SlidersHorizontal, RefreshCw } from 'lucide-react';

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

  const fetchDestinations = async () => {
    setLoading(true);
    try {
      let query = '/api/destinations?type=indian';
      if (search) query += `&search=${encodeURIComponent(search)}`;
      if (selectedState !== 'All') query += `&state=${encodeURIComponent(selectedState)}`;
      if (selectedCategory !== 'All') query += `&category=${encodeURIComponent(selectedCategory)}`;
      if (maxBudget) query += `&maxBudget=${maxBudget}`;

      const res = await axios.get(query);
      if (res.data?.success) {
        setDestinations(res.data.data);
      }
    } catch (err) {
      console.error('Error fetching Indian destinations:', err);
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
      
      {/* Page Header Banner */}
      <div className="bg-gradient-to-r from-brand-orange via-amber-500 to-brand-golden rounded-3xl p-8 lg:p-10 text-white shadow-glow relative overflow-hidden">
        <div className="relative z-10 space-y-3 max-w-2xl">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/20 backdrop-blur-md text-white text-xs font-bold uppercase tracking-wider">
            <span>🇮🇳</span>
            <span>Discover India</span>
          </div>
          <h1 className="text-3xl sm:text-4xl font-extrabold">Indian Destinations by State & UT</h1>
          <p className="text-sm font-medium text-yellow-100 leading-relaxed">
            Explore major tourist spots across 28 States and 8 Union Territories. Filter by state, budget tier, and travel style.
          </p>
        </div>
      </div>

      {/* Filter Control Bar */}
      <div className="bg-white rounded-3xl p-6 shadow-sm border border-orange-100 space-y-6">
        
        {/* Search Bar & Reset */}
        <form onSubmit={handleSearchSubmit} className="flex flex-col sm:flex-row items-center gap-4">
          <div className="relative flex-1 w-full">
            <Search className="w-5 h-5 text-slate-400 absolute left-4 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search destination e.g. Manali, Goa, Taj Mahal..."
              className="w-full pl-12 pr-4 py-3.5 rounded-2xl bg-slate-50 border border-slate-200 text-slate-900 font-bold text-sm focus:outline-none focus:ring-2 focus:ring-brand-orange"
            />
          </div>

          <div className="flex items-center gap-2 w-full sm:w-auto">
            <button
              type="submit"
              className="flex-1 sm:flex-none px-6 py-3.5 rounded-2xl bg-brand-orange text-white font-bold text-sm shadow-sm hover:bg-brand-orangeHover transition-all"
            >
              Search
            </button>
            
            <button
              type="button"
              onClick={handleResetFilters}
              className="px-4 py-3.5 rounded-2xl bg-slate-100 text-slate-600 font-bold text-xs hover:bg-slate-200 transition-all flex items-center gap-1.5"
              title="Reset Filters"
            >
              <RefreshCw className="w-4 h-4" />
              Reset
            </button>
          </div>
        </form>

        {/* State/UT Dropdown & Category Selector */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 pt-2 border-t border-slate-100">
          
          {/* State / UT Selector */}
          <div className="space-y-2">
            <label className="text-xs font-extrabold uppercase tracking-wider text-slate-700 flex items-center gap-1.5">
              <MapPin className="w-4 h-4 text-brand-orange" />
              Select State / UT
            </label>
            <select
              value={selectedState}
              onChange={(e) => setSelectedState(e.target.value)}
              className="w-full px-4 py-3 rounded-2xl bg-slate-50 border border-slate-200 text-slate-900 font-bold text-xs focus:outline-none focus:ring-2 focus:ring-brand-orange cursor-pointer"
            >
              {statesList.map((st) => (
                <option key={st} value={st}>
                  {st === 'All' ? 'All States & Union Territories' : st}
                </option>
              ))}
            </select>
          </div>

          {/* Category Selector */}
          <div className="space-y-2">
            <label className="text-xs font-extrabold uppercase tracking-wider text-slate-700 flex items-center gap-1.5">
              <Sparkles className="w-4 h-4 text-amber-500" />
              Category
            </label>
            <select
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
              className="w-full px-4 py-3 rounded-2xl bg-slate-50 border border-slate-200 text-slate-900 font-bold text-xs focus:outline-none focus:ring-2 focus:ring-brand-orange cursor-pointer"
            >
              {categories.map((cat) => (
                <option key={cat} value={cat}>
                  {cat === 'All' ? 'All Travel Categories' : cat}
                </option>
              ))}
            </select>
          </div>

          {/* Max Budget Range Slider */}
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <label className="text-xs font-extrabold uppercase tracking-wider text-slate-700">
                Max Budget: ₹{maxBudget.toLocaleString('en-IN')}
              </label>
            </div>
            <input
              type="range"
              min="10000"
              max="50000"
              step="5000"
              value={maxBudget}
              onChange={(e) => setMaxBudget(Number(e.target.value))}
              className="w-full accent-brand-orange cursor-pointer"
            />
          </div>

        </div>

      </div>

      {/* Grid Results Header */}
      <div className="flex items-center justify-between">
        <h2 className="text-xl font-extrabold text-slate-900">
          Showing {destinations.length} Indian Destination(s)
        </h2>
      </div>

      {/* Grid Content */}
      {loading ? (
        <div className="py-20 text-center text-slate-500 font-semibold animate-pulse">
          Loading Indian tourist destinations...
        </div>
      ) : destinations.length === 0 ? (
        <div className="bg-white rounded-3xl p-12 text-center text-slate-500 font-medium space-y-3">
          <p className="text-base font-bold text-slate-700">No destinations found matching your filters.</p>
          <button
            onClick={handleResetFilters}
            className="px-5 py-2.5 rounded-2xl bg-brand-orange text-white text-xs font-bold shadow-sm"
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
