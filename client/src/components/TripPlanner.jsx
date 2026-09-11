import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Search, IndianRupee, Calendar, Users, Sliders, Check, Sparkles } from 'lucide-react';

export default function TripPlanner({ onPlanSubmit }) {
  const navigate = useNavigate();

  const [destination, setDestination] = useState('Manali');
  const [tripType, setTripType] = useState('domestic');
  const [budget, setBudget] = useState('25000');
  const [startDate, setStartDate] = useState('2026-10-15');
  const [endDate, setEndDate] = useState('2026-10-18');
  const [adults, setAdults] = useState(2);
  const [children, setChildren] = useState(0);
  const [selectedStyles, setSelectedStyles] = useState(['Nature', 'Adventure']);

  const budgetOptions = [
    { label: '₹10,000', value: '10000' },
    { label: '₹25,000', value: '25000' },
    { label: '₹50,000', value: '50000' },
    { label: '₹1,00,000', value: '100000' },
    { label: '₹2,00,000+', value: '200000' }
  ];

  const preferencesList = [
    'Adventure', 'Nature', 'Beaches', 'Culture', 'Food', 'Shopping', 'Relaxation', 'Luxury'
  ];

  const toggleStyle = (styleName) => {
    if (selectedStyles.includes(styleName)) {
      if (selectedStyles.length > 1) {
        setSelectedStyles(selectedStyles.filter((s) => s !== styleName));
      }
    } else {
      setSelectedStyles([...selectedStyles, styleName]);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const tripParams = {
      destination,
      tripType,
      budget,
      startDate,
      endDate,
      duration: calculateDuration(startDate, endDate),
      travelers: { adults, children },
      travelStyles: selectedStyles
    };

    if (onPlanSubmit) {
      onPlanSubmit(tripParams);
    } else {
      navigate('/itinerary', { state: tripParams });
    }
  };

  const calculateDuration = (start, end) => {
    if (!start || !end) return 3;
    const d1 = new Date(start);
    const d2 = new Date(end);
    const diffTime = Math.abs(d2 - d1);
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    return diffDays > 0 ? diffDays : 3;
  };

  return (
    <div className="interactive-card bg-[#131920]/90 backdrop-blur-xl rounded-2xl p-6 sm:p-8 shadow-card-dark border border-[#232E3C] hover:border-[#FFF449]/50 transition-all duration-300">
      
      <div className="flex items-center gap-3 mb-6 pb-4 border-b border-[#232E3C]">
        <div className="w-10 h-10 rounded-xl bg-gradient-brand text-[#0B0F14] flex items-center justify-center font-black shadow-glow-yellow">
          <Sliders className="w-5 h-5" />
        </div>
        <div>
          <h2 className="text-xl font-bold text-white">Smart Travel Dashboard</h2>
          <p className="text-xs font-normal text-gray-400">Configure parameters for AI itinerary and budget calculation</p>
        </div>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        
        {/* Domestic / International Toggle */}
        <div className="flex items-center gap-3">
          <span className="text-xs font-bold uppercase tracking-wider text-[#B2D959]">Type:</span>
          <div className="inline-flex bg-[#0B0F14] p-1 rounded-lg border border-[#232E3C]">
            <button
              type="button"
              onClick={() => { setTripType('domestic'); setDestination('Manali'); }}
              className={`px-4 py-1.5 rounded-md text-xs font-bold transition-all ${
                tripType === 'domestic'
                  ? 'bg-gradient-brand text-[#0B0F14] shadow-xs'
                  : 'text-gray-400 hover:text-white'
              }`}
            >
              Domestic (India)
            </button>
            <button
              type="button"
              onClick={() => { setTripType('international'); setDestination('Maldives'); }}
              className={`px-4 py-1.5 rounded-md text-xs font-bold transition-all ${
                tripType === 'international'
                  ? 'bg-gradient-brand text-[#0B0F14] shadow-xs'
                  : 'text-gray-400 hover:text-white'
              }`}
            >
              International
            </button>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          
          {/* Destination */}
          <div className="space-y-1.5">
            <label className="text-xs font-bold text-gray-300 flex items-center gap-1.5">
              <Search className="w-3.5 h-3.5 text-[#FFF449]" />
              Destination
            </label>
            <select
              value={destination}
              onChange={(e) => setDestination(e.target.value)}
              className="w-full px-3.5 py-2.5 rounded-lg bg-[#0B0F14] border border-[#232E3C] text-white font-semibold text-xs focus:outline-none focus:ring-2 focus:ring-[#FFF449] transition-all cursor-pointer"
            >
              {tripType === 'domestic' ? (
                <>
                  <option value="Manali">Manali (Himachal Pradesh)</option>
                  <option value="North Goa">Goa (North & South)</option>
                  <option value="Jaipur">Jaipur (Rajasthan)</option>
                  <option value="Munnar">Munnar (Kerala)</option>
                  <option value="Visakhapatnam">Visakhapatnam (Andhra Pradesh)</option>
                  <option value="Tawang">Tawang (Arunachal Pradesh)</option>
                  <option value="Kaziranga National Park">Kaziranga (Assam)</option>
                  <option value="Coorg & Chikmagalur">Coorg (Karnataka)</option>
                  <option value="Udaipur & Jaisalmer">Udaipur & Jaisalmer (Rajasthan)</option>
                  <option value="Shillong & Cherrapunji">Shillong & Cherrapunji (Meghalaya)</option>
                  <option value="Ladakh (Leh)">Leh Ladakh</option>
                  <option value="Srinagar & Gulmarg">Srinagar & Gulmarg (J&K)</option>
                  <option value="Andaman & Nicobar (Havelock)">Andaman Islands</option>
                  <option value="Puducherry">Puducherry</option>
                </>
              ) : (
                <>
                  <option value="Maldives">Maldives</option>
                  <option value="Bangkok & Phuket">Thailand (Bangkok & Phuket)</option>
                  <option value="Bali & Ubud">Indonesia (Bali & Ubud)</option>
                  <option value="Singapore">Singapore</option>
                  <option value="Dubai & Abu Dhabi">UAE (Dubai & Abu Dhabi)</option>
                  <option value="Kuala Lumpur & Langkawi">Malaysia</option>
                  <option value="Paris">France (Paris)</option>
                  <option value="Switzerland (Interlaken & Zurich)">Switzerland</option>
                  <option value="Tokyo & Kyoto">Japan (Tokyo & Kyoto)</option>
                  <option value="Santorini & Athens">Greece (Santorini & Athens)</option>
                  <option value="Istanbul & Cappadocia">Turkey</option>
                  <option value="London & Edinburgh">United Kingdom</option>
                  <option value="Sydney & Melbourne">Australia</option>
                  <option value="New York & Las Vegas">United States</option>
                </>
              )}
            </select>
          </div>

          {/* Budget */}
          <div className="space-y-1.5">
            <label className="text-xs font-bold text-gray-300 flex items-center gap-1.5">
              <IndianRupee className="w-3.5 h-3.5 text-[#B2D959]" />
              Budget (INR)
            </label>
            <select
              value={budget}
              onChange={(e) => setBudget(e.target.value)}
              className="w-full px-3.5 py-2.5 rounded-lg bg-[#0B0F14] border border-[#232E3C] text-white font-semibold text-xs focus:outline-none focus:ring-2 focus:ring-[#FFF449] transition-all cursor-pointer"
            >
              {budgetOptions.map((b) => (
                <option key={b.value} value={b.value}>
                  {b.label}
                </option>
              ))}
            </select>
          </div>

          {/* Dates */}
          <div className="space-y-1.5">
            <label className="text-xs font-bold text-gray-300 flex items-center gap-1.5">
              <Calendar className="w-3.5 h-3.5 text-[#7EC151]" />
              Dates ({calculateDuration(startDate, endDate)} Days)
            </label>
            <div className="grid grid-cols-2 gap-2">
              <input
                type="date"
                value={startDate}
                onChange={(e) => setStartDate(e.target.value)}
                className="w-full px-2 py-2 rounded-lg bg-[#0B0F14] border border-[#232E3C] text-white font-semibold text-xs focus:outline-none focus:ring-2 focus:ring-[#FFF449]"
              />
              <input
                type="date"
                value={endDate}
                onChange={(e) => setEndDate(e.target.value)}
                className="w-full px-2 py-2 rounded-lg bg-[#0B0F14] border border-[#232E3C] text-white font-semibold text-xs focus:outline-none focus:ring-2 focus:ring-[#FFF449]"
              />
            </div>
          </div>

          {/* Travelers */}
          <div className="space-y-1.5">
            <label className="text-xs font-bold text-gray-300 flex items-center gap-1.5">
              <Users className="w-3.5 h-3.5 text-[#FFF449]" />
              Travelers
            </label>
            <div className="flex items-center gap-3 bg-[#0B0F14] p-2 rounded-lg border border-[#232E3C] justify-between">
              <div className="flex items-center gap-2">
                <span className="text-xs font-semibold text-gray-300">Adults:</span>
                <input
                  type="number"
                  min="1"
                  max="10"
                  value={adults}
                  onChange={(e) => setAdults(parseInt(e.target.value) || 1)}
                  className="w-12 text-center py-1 rounded bg-[#131920] border border-[#232E3C] text-white font-bold text-xs"
                />
              </div>
              <div className="flex items-center gap-2">
                <span className="text-xs font-semibold text-gray-300">Kids:</span>
                <input
                  type="number"
                  min="0"
                  max="10"
                  value={children}
                  onChange={(e) => setChildren(parseInt(e.target.value) || 0)}
                  className="w-12 text-center py-1 rounded bg-[#131920] border border-[#232E3C] text-white font-bold text-xs"
                />
              </div>
            </div>
          </div>

        </div>

        {/* Preferences */}
        <div className="space-y-2 pt-2">
          <label className="text-xs font-bold text-gray-300 block">
            Travel Preferences:
          </label>
          <div className="flex flex-wrap gap-2">
            {preferencesList.map((pref) => {
              const selected = selectedStyles.includes(pref);
              return (
                <button
                  type="button"
                  key={pref}
                  onClick={() => toggleStyle(pref)}
                  className={`px-3.5 py-1.5 rounded-lg text-xs font-bold transition-all flex items-center gap-1.5 ${
                    selected
                      ? 'bg-gradient-brand text-[#0B0F14] shadow-glow-yellow scale-[1.03]'
                      : 'bg-[#0B0F14] text-gray-300 hover:bg-[#1A222C] border border-[#232E3C]'
                  }`}
                >
                  <span>{pref}</span>
                  {selected && <Check className="w-3.5 h-3.5 stroke-[3]" />}
                </button>
              );
            })}
          </div>
        </div>

        {/* Generate Trip Plan CTA */}
        <div className="pt-2 flex justify-end">
          <button
            type="submit"
            className="w-full sm:w-auto px-8 py-3.5 rounded-xl bg-gradient-brand hover:bg-gradient-brand-hover text-[#0B0F14] font-black text-sm shadow-glow-yellow hover:scale-105 transition-all flex items-center justify-center gap-2"
          >
            <Sparkles className="w-4 h-4" />
            Generate Trip Plan
          </button>
        </div>

      </form>
    </div>
  );
}
