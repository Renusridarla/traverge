import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Search, IndianRupee, Calendar, Users, Sliders, Check } from 'lucide-react';

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
    <div className="bg-white rounded-2xl p-6 sm:p-8 shadow-card border border-gray-200/80">
      
      <div className="flex items-center gap-3 mb-6 pb-4 border-b border-gray-100">
        <div className="w-10 h-10 rounded-xl bg-[#853953]/10 text-[#853953] flex items-center justify-center font-bold">
          <Sliders className="w-5 h-5" />
        </div>
        <div>
          <h2 className="text-xl font-bold text-[#2C2C2C]">Trip Planner</h2>
          <p className="text-xs font-normal text-[#2C2C2C]/70">Enter your preferences to build a custom itinerary</p>
        </div>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        
        {/* Trip Type Toggle */}
        <div className="flex items-center gap-3">
          <span className="text-xs font-bold uppercase tracking-wider text-[#2C2C2C]">Trip Type:</span>
          <div className="inline-flex bg-[#F3F4F4] p-1 rounded-lg border border-gray-200">
            <button
              type="button"
              onClick={() => { setTripType('domestic'); setDestination('Manali'); }}
              className={`px-4 py-1.5 rounded-md text-xs font-semibold transition-all ${
                tripType === 'domestic'
                  ? 'bg-white text-[#853953] shadow-xs font-bold'
                  : 'text-[#2C2C2C]/70 hover:text-[#2C2C2C]'
              }`}
            >
              Domestic (India)
            </button>
            <button
              type="button"
              onClick={() => { setTripType('international'); setDestination('Maldives'); }}
              className={`px-4 py-1.5 rounded-md text-xs font-semibold transition-all ${
                tripType === 'international'
                  ? 'bg-white text-[#853953] shadow-xs font-bold'
                  : 'text-[#2C2C2C]/70 hover:text-[#2C2C2C]'
              }`}
            >
              International
            </button>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          
          {/* Destination */}
          <div className="space-y-1.5">
            <label className="text-xs font-bold text-[#2C2C2C] flex items-center gap-1.5">
              <Search className="w-3.5 h-3.5 text-[#853953]" />
              Destination
            </label>
            <select
              value={destination}
              onChange={(e) => setDestination(e.target.value)}
              className="w-full px-3.5 py-2.5 rounded-lg bg-[#F3F4F4] border border-gray-300 text-[#2C2C2C] font-semibold text-xs focus:outline-none focus:ring-2 focus:ring-[#853953] focus:bg-white transition-all cursor-pointer"
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
            <label className="text-xs font-bold text-[#2C2C2C] flex items-center gap-1.5">
              <IndianRupee className="w-3.5 h-3.5 text-[#853953]" />
              Budget (INR)
            </label>
            <select
              value={budget}
              onChange={(e) => setBudget(e.target.value)}
              className="w-full px-3.5 py-2.5 rounded-lg bg-[#F3F4F4] border border-gray-300 text-[#2C2C2C] font-semibold text-xs focus:outline-none focus:ring-2 focus:ring-[#853953] focus:bg-white transition-all cursor-pointer"
            >
              {budgetOptions.map((b) => (
                <option key={b.value} value={b.value}>
                  {b.label}
                </option>
              ))}
            </select>
          </div>

          {/* Travel Dates */}
          <div className="space-y-1.5">
            <label className="text-xs font-bold text-[#2C2C2C] flex items-center gap-1.5">
              <Calendar className="w-3.5 h-3.5 text-[#853953]" />
              Travel Dates ({calculateDuration(startDate, endDate)} Days)
            </label>
            <div className="grid grid-cols-2 gap-2">
              <input
                type="date"
                value={startDate}
                onChange={(e) => setStartDate(e.target.value)}
                className="w-full px-2.5 py-2 rounded-lg bg-[#F3F4F4] border border-gray-300 text-[#2C2C2C] font-semibold text-xs focus:outline-none focus:ring-2 focus:ring-[#853953]"
              />
              <input
                type="date"
                value={endDate}
                onChange={(e) => setEndDate(e.target.value)}
                className="w-full px-2.5 py-2 rounded-lg bg-[#F3F4F4] border border-gray-300 text-[#2C2C2C] font-semibold text-xs focus:outline-none focus:ring-2 focus:ring-[#853953]"
              />
            </div>
          </div>

          {/* Travelers */}
          <div className="space-y-1.5">
            <label className="text-xs font-bold text-[#2C2C2C] flex items-center gap-1.5">
              <Users className="w-3.5 h-3.5 text-[#853953]" />
              Travelers
            </label>
            <div className="flex items-center gap-3 bg-[#F3F4F4] p-2 rounded-lg border border-gray-300 justify-between">
              <div className="flex items-center gap-2">
                <span className="text-xs font-semibold text-[#2C2C2C]">Adults:</span>
                <input
                  type="number"
                  min="1"
                  max="10"
                  value={adults}
                  onChange={(e) => setAdults(parseInt(e.target.value) || 1)}
                  className="w-12 text-center py-1 rounded bg-white border border-gray-300 font-semibold text-xs"
                />
              </div>
              <div className="flex items-center gap-2">
                <span className="text-xs font-semibold text-[#2C2C2C]">Children:</span>
                <input
                  type="number"
                  min="0"
                  max="10"
                  value={children}
                  onChange={(e) => setChildren(parseInt(e.target.value) || 0)}
                  className="w-12 text-center py-1 rounded bg-white border border-gray-300 font-semibold text-xs"
                />
              </div>
            </div>
          </div>

        </div>

        {/* Preferences */}
        <div className="space-y-2 pt-2">
          <label className="text-xs font-bold text-[#2C2C2C] block">
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
                  className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all flex items-center gap-1.5 ${
                    selected
                      ? 'bg-[#853953] text-white shadow-xs'
                      : 'bg-[#F3F4F4] text-[#2C2C2C] hover:bg-gray-200 border border-gray-300/60'
                  }`}
                >
                  <span>{pref}</span>
                  {selected && <Check className="w-3.5 h-3.5 stroke-[2.5]" />}
                </button>
              );
            })}
          </div>
        </div>

        {/* Submit CTA */}
        <div className="pt-2 flex justify-end">
          <button
            type="submit"
            className="w-full sm:w-auto px-8 py-3.5 rounded-lg bg-gradient-to-r from-[#853953] to-[#612D53] text-white font-semibold text-sm shadow-xs hover:opacity-95 transition-all"
          >
            Generate Trip Plan
          </button>
        </div>

      </form>
    </div>
  );
}
