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
      
      {/* Header */}
      <div className="bg-[#2C2C2C] rounded-2xl p-8 text-white shadow-card space-y-2">
        <span className="text-xs font-bold text-[#E2B4BD] uppercase tracking-wider block">
          India Catalog
        </span>
        <h1 className="text-3xl font-extrabold">Indian Destinations by State & UT</h1>
        <p className="text-xs font-normal text-gray-300 max-w-2xl">
          Browse tourist destinations across 28 States and 8 Union Territories in India. Filter by state, budget tier, and category.
        </p>
      </div>

      {/* Filter Control Bar */}
      <div className="bg-white rounded-2xl p-6 shadow-xs border border-gray-200/80 space-y-6">
        
        {/* Search Bar */}
        <form onSubmit={handleSearchSubmit} className="flex flex-col sm:flex-row items-center gap-4">
          <div className="relative flex-1 w-full">
            <Search className="w-4 h-4 text-gray-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search destination e.g. Manali, Goa, Jaipur..."
              className="w-full pl-10 pr-4 py-2.5 rounded-lg bg-[#F3F4F4] border border-gray-300 text-[#2C2C2C] font-semibold text-xs focus:outline-none focus:ring-2 focus:ring-[#853953]"
            />
          </div>

          <div className="flex items-center gap-2 w-full sm:w-auto">
            <button
              type="submit"
              className="flex-1 sm:flex-none px-5 py-2.5 rounded-lg bg-[#853953] text-white font-semibold text-xs shadow-xs hover:opacity-90 transition-all"
            >
              Search
            </button>
            
            <button
              type="button"
              onClick={handleResetFilters}
              className="px-3.5 py-2.5 rounded-lg bg-[#F3F4F4] text-[#2C2C2C] font-semibold text-xs hover:bg-gray-200 transition-all flex items-center gap-1 border border-gray-300"
            >
              <RefreshCw className="w-3.5 h-3.5 text-[#853953]" />
              Reset
            </button>
          </div>
        </form>

        {/* Dropdowns */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 pt-2 border-t border-gray-100">
          
          {/* State / UT */}
          <div className="space-y-1.5">
            <label className="text-xs font-bold text-[#2C2C2C] flex items-center gap-1">
              <MapPin className="w-3.5 h-3.5 text-[#853953]" />
              Select State / UT
            </label>
            <select
              value={selectedState}
              onChange={(e) => setSelectedState(e.target.value)}
              className="w-full px-3 py-2 rounded-lg bg-[#F3F4F4] border border-gray-300 text-[#2C2C2C] font-semibold text-xs focus:outline-none focus:ring-2 focus:ring-[#853953] cursor-pointer"
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
            <label className="text-xs font-bold text-[#2C2C2C] flex items-center gap-1">
              <Filter className="w-3.5 h-3.5 text-[#853953]" />
              Category
            </label>
            <select
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
              className="w-full px-3 py-2 rounded-lg bg-[#F3F4F4] border border-gray-300 text-[#2C2C2C] font-semibold text-xs focus:outline-none focus:ring-2 focus:ring-[#853953] cursor-pointer"
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
            <label className="text-xs font-bold text-[#2C2C2C] block">
              Max Budget: ₹{maxBudget.toLocaleString('en-IN')}
            </label>
            <input
              type="range"
              min="10000"
              max="50000"
              step="5000"
              value={maxBudget}
              onChange={(e) => setMaxBudget(Number(e.target.value))}
              className="w-full accent-[#853953] cursor-pointer mt-1"
            />
          </div>

        </div>

      </div>

      {/* Results Header */}
      <div className="flex items-center justify-between">
        <h2 className="text-lg font-bold text-[#2C2C2C]">
          Showing {destinations.length} Indian Destination(s)
        </h2>
      </div>

      {/* Grid Content */}
      {loading ? (
        <div className="py-16 text-center text-xs text-[#2C2C2C]/60 font-medium">
          Loading Indian tourist destinations...
        </div>
      ) : destinations.length === 0 ? (
        <div className="bg-white rounded-2xl p-12 text-center text-xs text-[#2C2C2C]/70 font-medium space-y-3 border border-gray-200">
          <p className="font-bold text-[#2C2C2C]">No destinations found matching your filters.</p>
          <button
            onClick={handleResetFilters}
            className="px-4 py-2 rounded-lg bg-[#853953] text-white text-xs font-semibold"
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
