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
    },
    {
      _id: 'hot-3',
      name: 'Soneva Jani Resort Maldives',
      destination: 'Maldives',
      location: 'Noonu Atoll',
      pricePerNight: 85000,
      rating: 4.9,
      reviewsCount: 410,
      amenities: ['Private Pool', 'Overwater Slide', 'Personal Butler', 'Underwater Dining'],
      roomType: '1-Bedroom Water Retreat with Slide',
      category: 'Luxury',
      image: 'https://images.unsplash.com/photo-1540555700478-4be289fbecef?auto=format&fit=crop&w=800&q=80',
      distanceFromCenter: 'Atoll Private Lagoon'
    },
    {
      _id: 'hot-4',
      name: 'Rambagh Palace Jaipur',
      destination: 'Jaipur',
      location: 'Bhawani Singh Road, Jaipur',
      pricePerNight: 35000,
      rating: 4.9,
      reviewsCount: 520,
      amenities: ['Royal Gardens', 'Jharokha Dining', 'Jiva Grande Spa', 'Peacock Courtyard'],
      roomType: 'Palace Room',
      category: 'Luxury',
      image: 'https://images.unsplash.com/photo-1566073771259-6a8506099945?auto=format&fit=crop&w=800&q=80',
      distanceFromCenter: '2.5 km from City Palace'
    }
  ];

  const getFilteredFallback = () => {
    let list = fallbackHotels;
    if (selectedDestination !== 'All') {
      list = list.filter(h => h.destination && h.destination.toLowerCase().includes(selectedDestination.toLowerCase()));
    }
    if (selectedCategory !== 'All') {
      list = list.filter(h => h.category && h.category.toLowerCase().includes(selectedCategory.toLowerCase()));
    }
    if (minRating !== '0') {
      list = list.filter(h => h.rating >= Number(minRating));
    }
    if (search) {
      const s = search.toLowerCase();
      list = list.filter(h =>
        h.name.toLowerCase().includes(s) ||
        (h.destination && h.destination.toLowerCase().includes(s))
      );
    }
    return list;
  };

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
      if (res.data?.success && res.data.data.length > 0) {
        setHotels(res.data.data);
      } else {
        setHotels(getFilteredFallback());
      }
    } catch (err) {
      console.warn('Backend hotel query notice, loading fallback hotels');
      setHotels(getFilteredFallback());
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
      <div className="interactive-card bg-[#131920] rounded-3xl p-8 lg:p-10 text-white shadow-card-dark border border-[#232E3C] space-y-3">
        <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-[#0B0F14] text-[#FFF449] border border-[#232E3C] text-xs font-extrabold uppercase tracking-wider">
          <Building2 className="w-4 h-4 text-[#B2D959]" />
          <span>Accommodation Discovery</span>
        </div>
        <h1 className="text-3xl sm:text-4xl font-black">Hotels, Resorts & Stays</h1>
        <p className="text-sm font-normal text-gray-400 leading-relaxed max-w-3xl">
          Browse luxury resorts, 5-star hotels, boutique stays, and backpacker hostels across popular domestic and international destinations with estimated rates in INR.
        </p>

        {/* Disclaimer Pill */}
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-xl bg-[#0B0F14] text-gray-300 text-xs font-medium border border-[#232E3C]">
          <AlertCircle className="w-4 h-4 text-[#FFF449] shrink-0" />
          <span>Note: Prices shown are estimated rates for development/demo purposes.</span>
        </div>
      </div>

      {/* Filter Control Bar */}
      <div className="interactive-card bg-[#131920] rounded-3xl p-6 shadow-card-dark border border-[#232E3C] space-y-6">
        
        {/* Search & Sort */}
        <form onSubmit={handleSearchSubmit} className="flex flex-col sm:flex-row items-center gap-4">
          <div className="relative flex-1 w-full">
            <Search className="w-4 h-4 text-[#FFF449] absolute left-4 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search hotel name, location, or destination..."
              className="w-full pl-11 pr-4 py-3.5 rounded-xl bg-[#0B0F14] border border-[#232E3C] text-white font-semibold text-xs focus:outline-none focus:ring-2 focus:ring-[#FFF449]"
            />
          </div>

          <div className="flex items-center gap-2 w-full sm:w-auto">
            <button
              type="submit"
              className="flex-1 sm:flex-none px-6 py-3.5 rounded-xl bg-gradient-brand hover:bg-gradient-brand-hover text-[#0B0F14] font-extrabold text-xs shadow-glow-yellow hover:scale-105 transition-all"
            >
              Search
            </button>
            
            <button
              type="button"
              onClick={handleResetFilters}
              className="px-4 py-3.5 rounded-xl bg-[#1A222C] text-white font-bold text-xs hover:bg-[#232E3C] transition-all flex items-center gap-1.5 border border-[#232E3C]"
            >
              <RefreshCw className="w-4 h-4 text-[#B2D959]" />
              Reset
            </button>
          </div>
        </form>

        {/* Filter Dropdowns Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4 pt-4 border-t border-[#232E3C]">
          
          {/* Destination */}
          <div className="space-y-1.5">
            <label className="text-[11px] font-extrabold uppercase tracking-wider text-gray-300">Destination</label>
            <select
              value={selectedDestination}
              onChange={(e) => setSelectedDestination(e.target.value)}
              className="w-full px-3 py-2.5 rounded-xl bg-[#0B0F14] border border-[#232E3C] text-white font-semibold text-xs focus:outline-none focus:ring-2 focus:ring-[#FFF449] cursor-pointer"
            >
              {destinationsList.map((d) => (
                <option key={d} value={d}>{d === 'All' ? 'All Destinations' : d}</option>
              ))}
            </select>
          </div>

          {/* Category */}
          <div className="space-y-1.5">
            <label className="text-[11px] font-extrabold uppercase tracking-wider text-gray-300">Category</label>
            <select
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
              className="w-full px-3 py-2.5 rounded-xl bg-[#0B0F14] border border-[#232E3C] text-white font-semibold text-xs focus:outline-none focus:ring-2 focus:ring-[#FFF449] cursor-pointer"
            >
              {categories.map((c) => (
                <option key={c} value={c}>{c === 'All' ? 'All Hotel Categories' : c}</option>
              ))}
            </select>
          </div>

          {/* Rating */}
          <div className="space-y-1.5">
            <label className="text-[11px] font-extrabold uppercase tracking-wider text-gray-300">Min Rating</label>
            <select
              value={minRating}
              onChange={(e) => setMinRating(e.target.value)}
              className="w-full px-3 py-2.5 rounded-xl bg-[#0B0F14] border border-[#232E3C] text-white font-semibold text-xs focus:outline-none focus:ring-2 focus:ring-[#FFF449] cursor-pointer"
            >
              <option value="0">Any Rating</option>
              <option value="4.0">4.0+ Stars</option>
              <option value="4.5">4.5+ Stars</option>
              <option value="4.8">4.8+ Stars</option>
            </select>
          </div>

          {/* Sort By */}
          <div className="space-y-1.5">
            <label className="text-[11px] font-extrabold uppercase tracking-wider text-gray-300 flex items-center gap-1">
              <ArrowUpDown className="w-3.5 h-3.5 text-[#B2D959]" />
              Sort By
            </label>
            <select
              value={sort}
              onChange={(e) => setSort(e.target.value)}
              className="w-full px-3 py-2.5 rounded-xl bg-[#0B0F14] border border-[#232E3C] text-white font-semibold text-xs focus:outline-none focus:ring-2 focus:ring-[#FFF449] cursor-pointer"
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
        <h2 className="text-xl font-bold text-white">
          Showing {hotels.length} Hotel Record(s)
        </h2>
      </div>

      {/* Hotel Cards Grid */}
      {loading ? (
        <div className="py-20 text-center text-gray-400 font-semibold">
          Loading hotel options...
        </div>
      ) : hotels.length === 0 ? (
        <div className="bg-[#131920] rounded-3xl p-12 text-center text-gray-400 font-medium space-y-4 border border-[#232E3C]">
          <p className="text-sm font-bold text-white">No hotels found matching your filter selection.</p>
          <button
            onClick={handleResetFilters}
            className="px-5 py-2.5 rounded-xl bg-gradient-brand text-[#0B0F14] text-xs font-extrabold shadow-glow-yellow"
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
