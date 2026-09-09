import React, { useState, useEffect } from 'react';
import axios from 'axios';
import HotelCard from '../components/HotelCard';
import { Search, Building2, Filter, AlertCircle, ArrowUpDown, RefreshCw, CheckSquare } from 'lucide-react';

export default function HotelsPage() {
  const [hotels, setHotels] = useState([]);
  const [loading, setLoading] = useState(true);

  // Filters state
  const [search, setSearch] = useState('');
  const [selectedDestination, setSelectedDestination] = useState('All');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [minRating, setMinRating] = useState('0');
  const [sort, setSort] = useState('popularity');
  const [maxPrice, setMaxPrice] = useState(80000);

  const categories = ['All', 'Budget', '3-Star', '4-Star', '5-Star', 'Luxury', 'Resort', 'Boutique', 'Hostel'];
  
  const destinationsList = [
    'All', 'North Goa', 'South Goa', 'Manali', 'Jaipur', 'Munnar', 'Alleppey & Wayanad',
    'Ladakh (Leh)', 'Maldives', 'Bangkok & Phuket', 'Bali & Ubud', 'Singapore', 'Dubai & Abu Dhabi', 'Paris', 'Switzerland (Interlaken & Zurich)'
  ];

  const fetchHotels = async () => {
    setLoading(true);
    try {
      let query = '/api/hotels?';
      const params = [];
      if (search) params.push(`search=${encodeURIComponent(search)}`);
      if (selectedDestination !== 'All') params.push(`destination=${encodeURIComponent(selectedDestination)}`);
      if (selectedCategory !== 'All') params.push(`category=${encodeURIComponent(selectedCategory)}`);
      if (minRating !== '0') params.push(`minRating=${minRating}`);
      if (maxPrice) params.push(`maxPrice=${maxPrice}`);
      if (sort) params.push(`sort=${sort}`);

      query += params.join('&');

      const res = await axios.get(query);
      if (res.data?.success) {
        setHotels(res.data.data);
      }
    } catch (err) {
      console.error('Error fetching hotels:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchHotels();
  }, [selectedDestination, selectedCategory, minRating, sort, maxPrice]);

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    fetchHotels();
  };

  const handleResetFilters = () => {
    setSearch('');
    setSelectedDestination('All');
    setSelectedCategory('All');
    setMinRating('0');
    setSort('popularity');
    setMaxPrice(80000);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-8">
      
      {/* Header Banner */}
      <div className="bg-gradient-to-r from-brand-orange via-amber-500 to-brand-golden rounded-3xl p-8 lg:p-10 text-white shadow-glow relative overflow-hidden">
        <div className="relative z-10 space-y-3 max-w-3xl">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/20 backdrop-blur-md text-white text-xs font-bold uppercase tracking-wider">
            <Building2 className="w-3.5 h-3.5" />
            <span>Accommodation Discovery</span>
          </div>
          <h1 className="text-3xl sm:text-4xl font-extrabold">Hotels, Resorts & Stays</h1>
          <p className="text-sm font-medium text-yellow-100 leading-relaxed">
            Browse representative luxury resorts, 5-star hotels, boutique stays, and backpacker hostels across popular domestic and international destinations.
          </p>

          {/* Disclaimer Pill */}
          <div className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-slate-900/70 text-yellow-200 text-xs font-semibold border border-white/20">
            <AlertCircle className="w-4 h-4 text-amber-400 shrink-0" />
            <span>Note: Prices shown are estimated rates for development/demo purposes and not live booking data.</span>
          </div>
        </div>
      </div>

      {/* Filter Control Bar */}
      <div className="bg-white rounded-3xl p-6 shadow-sm border border-orange-100 space-y-6">
        
        {/* Search & Sort */}
        <form onSubmit={handleSearchSubmit} className="flex flex-col sm:flex-row items-center gap-4">
          <div className="relative flex-1 w-full">
            <Search className="w-5 h-5 text-slate-400 absolute left-4 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search hotel name, location, or destination..."
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
            >
              <RefreshCw className="w-4 h-4" />
              Reset
            </button>
          </div>
        </form>

        {/* Filter Dropdowns Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4 pt-2 border-t border-slate-100">
          
          {/* Destination */}
          <div className="space-y-1.5">
            <label className="text-[11px] font-extrabold uppercase tracking-wider text-slate-700">Destination</label>
            <select
              value={selectedDestination}
              onChange={(e) => setSelectedDestination(e.target.value)}
              className="w-full px-3 py-2.5 rounded-xl bg-slate-50 border border-slate-200 text-slate-900 font-bold text-xs focus:outline-none focus:ring-2 focus:ring-brand-orange cursor-pointer"
            >
              {destinationsList.map((d) => (
                <option key={d} value={d}>{d === 'All' ? 'All Destinations' : d}</option>
              ))}
            </select>
          </div>

          {/* Category */}
          <div className="space-y-1.5">
            <label className="text-[11px] font-extrabold uppercase tracking-wider text-slate-700">Category</label>
            <select
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
              className="w-full px-3 py-2.5 rounded-xl bg-slate-50 border border-slate-200 text-slate-900 font-bold text-xs focus:outline-none focus:ring-2 focus:ring-brand-orange cursor-pointer"
            >
              {categories.map((c) => (
                <option key={c} value={c}>{c === 'All' ? 'All Hotel Categories' : c}</option>
              ))}
            </select>
          </div>

          {/* Rating */}
          <div className="space-y-1.5">
            <label className="text-[11px] font-extrabold uppercase tracking-wider text-slate-700">Min Rating</label>
            <select
              value={minRating}
              onChange={(e) => setMinRating(e.target.value)}
              className="w-full px-3 py-2.5 rounded-xl bg-slate-50 border border-slate-200 text-slate-900 font-bold text-xs focus:outline-none focus:ring-2 focus:ring-brand-orange cursor-pointer"
            >
              <option value="0">Any Rating</option>
              <option value="4.0">4.0+ Stars ⭐</option>
              <option value="4.5">4.5+ Stars ⭐⭐</option>
              <option value="4.8">4.8+ Stars ⭐⭐⭐</option>
            </select>
          </div>

          {/* Sort By */}
          <div className="space-y-1.5">
            <label className="text-[11px] font-extrabold uppercase tracking-wider text-slate-700 flex items-center gap-1">
              <ArrowUpDown className="w-3 h-3 text-brand-orange" />
              Sort By
            </label>
            <select
              value={sort}
              onChange={(e) => setSort(e.target.value)}
              className="w-full px-3 py-2.5 rounded-xl bg-slate-50 border border-slate-200 text-slate-900 font-bold text-xs focus:outline-none focus:ring-2 focus:ring-brand-orange cursor-pointer"
            >
              <option value="popularity">Popularity & Rating</option>
              <option value="price_asc">Price: Low to High</option>
              <option value="price_desc">Price: High to Low</option>
              <option value="rating">Highest Rated</option>
            </select>
          </div>

        </div>

      </div>

      {/* Grid Results Header */}
      <div className="flex items-center justify-between">
        <h2 className="text-xl font-extrabold text-slate-900">
          Showing {hotels.length} Hotel Record(s)
        </h2>
      </div>

      {/* Hotel Cards Grid */}
      {loading ? (
        <div className="py-20 text-center text-slate-500 font-semibold animate-pulse">
          Loading hotel options...
        </div>
      ) : hotels.length === 0 ? (
        <div className="bg-white rounded-3xl p-12 text-center text-slate-500 font-medium space-y-3">
          <p className="text-base font-bold text-slate-700">No hotels found matching your filter selection.</p>
          <button
            onClick={handleResetFilters}
            className="px-5 py-2.5 rounded-2xl bg-brand-orange text-white text-xs font-bold shadow-sm"
          >
            Reset Filters
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {hotels.map((hotel) => (
            <HotelCard key={hotel._id || hotel.name} hotel={hotel} />
          ))}
        </div>
      )}

    </div>
  );
}
