import React, { useState, useEffect } from 'react';
import axios from 'axios';
import DestinationCard from '../components/DestinationCard';
import { Search, Compass, Globe, MapPin, Sparkles } from 'lucide-react';

export default function DestinationsPage() {
  const [destinations, setDestinations] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');
  const [activeType, setActiveType] = useState('all');

  const fetchDestinations = async () => {
    setLoading(true);
    try {
      let query = '/api/destinations';
      const params = [];
      if (activeType !== 'all') params.push(`type=${activeType}`);
      if (search) params.push(`search=${encodeURIComponent(search)}`);
      if (params.length > 0) query += `?${params.join('&')}`;

      const res = await axios.get(query);
      if (res.data?.success) {
        setDestinations(res.data.data);
      }
    } catch (err) {
      console.error('Error fetching destinations:', err);
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
