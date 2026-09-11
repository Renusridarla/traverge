import React, { useState, useEffect } from 'react';
import axios from 'axios';
import DestinationCard from '../components/DestinationCard';
import { Search, Globe, Filter, RefreshCw } from 'lucide-react';

export default function InternationalTripsPage() {
  const [destinations, setDestinations] = useState([]);
  const [loading, setLoading] = useState(true);

  // Filters state
  const [search, setSearch] = useState('');
  const [selectedCountry, setSelectedCountry] = useState('All');
  const [selectedCategory, setSelectedCategory] = useState('All');

  const countryList = [
    'All', 'Maldives', 'Thailand', 'Indonesia', 'Singapore', 'UAE', 'Malaysia',
    'France', 'Switzerland', 'Japan', 'Greece', 'Turkey', 'United Kingdom', 'Australia', 'USA'
  ];

  const categories = ['All', 'Resort', 'Beach & Coastal', 'Nature', 'Urban', 'Heritage', 'Mountain', 'Culture'];

  const fallbackInternationalDestinations = [
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
    },
    {
      _id: 'int-5',
      name: 'Singapore',
      state: 'Singapore',
      country: 'Singapore',
      type: 'international',
      category: 'Urban',
      estimatedBudgetINR: 70000,
      recommendedDays: 4,
      bestTime: 'Year-Round',
      shortDescription: 'Gardens by the Bay supertrees, Marina Bay Sands & Universal Studios.',
      image: 'https://images.unsplash.com/photo-1525625293386-3f8f99389edd?auto=format&fit=crop&w=800&q=80',
      rating: 4.8
    },
    {
      _id: 'int-6',
      name: 'Swiss Alps (Interlaken)',
      state: 'Bernese Oberland',
      country: 'Switzerland',
      type: 'international',
      category: 'Mountain',
      estimatedBudgetINR: 150000,
      recommendedDays: 5,
      bestTime: 'Year-Round',
      shortDescription: 'Jungfraujoch Top of Europe, alpine skiing & panoramic mountain trains.',
      image: 'https://images.unsplash.com/photo-1530122037265-a5f1f91d3b99?auto=format&fit=crop&w=800&q=80',
      rating: 4.9
    }
  ];

  const getFilteredFallback = () => {
    let list = fallbackInternationalDestinations;
    if (selectedCountry !== 'All') {
      list = list.filter(d => d.country && d.country.toLowerCase().includes(selectedCountry.toLowerCase()));
    }
    if (selectedCategory !== 'All') {
      list = list.filter(d => d.category && d.category.toLowerCase().includes(selectedCategory.toLowerCase()));
    }
    if (search) {
      const s = search.toLowerCase();
      list = list.filter(d =>
        d.name.toLowerCase().includes(s) ||
        (d.country && d.country.toLowerCase().includes(s))
      );
    }
    return list;
  };

  const fetchDestinations = async () => {
    setLoading(true);
    try {
      let query = '/api/destinations?type=international';
      if (search) query += `&search=${encodeURIComponent(search)}`;
      if (selectedCountry !== 'All') query += `&country=${encodeURIComponent(selectedCountry)}`;
      if (selectedCategory !== 'All') query += `&category=${encodeURIComponent(selectedCategory)}`;

      const res = await axios.get(query);
      if (res.data?.success && res.data.data.length > 0) {
        setDestinations(res.data.data);
      } else {
        setDestinations(getFilteredFallback());
      }
    } catch (err) {
      console.warn('Backend query notice, loading fallback International destinations');
      setDestinations(getFilteredFallback());
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchDestinations();
  }, [selectedCountry, selectedCategory]);

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    fetchDestinations();
  };

  const handleResetFilters = () => {
    setSearch('');
    setSelectedCountry('All');
    setSelectedCategory('All');
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-8">
      
      {/* Header Banner */}
      <div className="interactive-card bg-[#131920] rounded-3xl p-8 text-white shadow-card-dark border border-[#232E3C] space-y-2">
        <span className="text-xs font-extrabold text-[#FFF449] uppercase tracking-wider block">
          Worldwide Destinations
        </span>
        <h1 className="text-3xl font-black">Popular International Trips</h1>
        <p className="text-xs font-normal text-gray-400 max-w-2xl leading-relaxed">
          Explore top international countries including Maldives, Thailand, Bali, Singapore, Dubai, Paris, Switzerland, Japan, and USA with estimated prices in INR.
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
              placeholder="Search country or city e.g. Maldives, Paris, Tokyo..."
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
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-4 border-t border-[#232E3C]">
          
          {/* Country */}
          <div className="space-y-1.5">
            <label className="text-xs font-bold text-gray-300 flex items-center gap-1.5">
              <Globe className="w-3.5 h-3.5 text-[#B2D959]" />
              Select Country
            </label>
            <select
              value={selectedCountry}
              onChange={(e) => setSelectedCountry(e.target.value)}
              className="w-full px-3.5 py-2.5 rounded-xl bg-[#0B0F14] border border-[#232E3C] text-white font-semibold text-xs focus:outline-none focus:ring-2 focus:ring-[#FFF449] cursor-pointer"
            >
              {countryList.map((c) => (
                <option key={c} value={c}>
                  {c === 'All' ? 'All International Countries' : c}
                </option>
              ))}
            </select>
          </div>

          {/* Category */}
          <div className="space-y-1.5">
            <label className="text-xs font-bold text-gray-300 flex items-center gap-1.5">
              <Filter className="w-3.5 h-3.5 text-[#7EC151]" />
              Category Style
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

        </div>

      </div>

      {/* Grid Header */}
      <div className="flex items-center justify-between">
        <h2 className="text-lg font-bold text-white">
          Showing {destinations.length} International Destination(s)
        </h2>
      </div>

      {/* Grid Content */}
      {loading ? (
        <div className="py-16 text-center text-xs text-gray-400 font-medium">
          Loading international travel destinations...
        </div>
      ) : destinations.length === 0 ? (
        <div className="bg-[#131920] rounded-2xl p-12 text-center text-xs text-gray-400 font-medium space-y-4 border border-[#232E3C]">
          <p className="font-bold text-white text-sm">No international destinations found matching your filters.</p>
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
