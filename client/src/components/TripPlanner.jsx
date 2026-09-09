import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Search, IndianRupee, Calendar, Users, Sparkles, Check, Compass, Sliders } from 'lucide-react';

export default function TripPlanner({ onPlanSubmit }) {
  const navigate = useNavigate();

  const [destination, setDestination] = useState('Manali');
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

  const travelStylesList = [
    { name: 'Adventure', icon: '🥾' },
    { name: 'Nature', icon: '🌲' },
    { name: 'Beaches', icon: '🏖️' },
    { name: 'Historical', icon: '🏰' },
    { name: 'Culture', icon: '🎨' },
    { name: 'Food', icon: '🍲' },
    { name: 'Shopping', icon: '🛍️' },
    { name: 'Luxury', icon: '💎' },
    { name: 'Relaxation', icon: '♨️' },
    { name: 'Family', icon: '👨‍👩‍👧‍👦' },
    { name: 'Honeymoon', icon: '💖' },
    { name: 'Backpacking', icon: '🎒' }
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
    <div className="bg-white/85 backdrop-blur-2xl rounded-3xl p-6 sm:p-8 lg:p-10 shadow-2xl shadow-orange-500/10 border border-white/90 relative overflow-hidden">
      
      {/* Top Accent Gradient Border */}
      <div className="absolute top-0 left-0 right-0 h-2 bg-gradient-to-r from-brand-orange via-amber-500 to-brand-golden" />

      <div className="flex items-center gap-3.5 mb-8">
        <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-brand-orange to-amber-500 text-white flex items-center justify-center font-extrabold shadow-md">
          <Sliders className="w-6 h-6" />
        </div>
        <div>
          <h2 className="text-2xl font-black text-slate-900">Plan Your Custom Trip</h2>
          <p className="text-xs font-bold text-slate-500">Specify your budget, dates, and preferences for AI itinerary generation</p>
        </div>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          
          {/* Destination Selection */}
          <div className="space-y-2">
            <label className="text-xs font-extrabold uppercase tracking-wider text-slate-700 flex items-center gap-1.5">
              <Search className="w-4 h-4 text-brand-orange" />
              Where do you want to go?
            </label>
            <div className="relative">
              <select
                value={destination}
                onChange={(e) => setDestination(e.target.value)}
                className="w-full px-4 py-3.5 rounded-2xl bg-slate-50/90 border border-slate-200/80 text-slate-900 font-extrabold text-sm focus:outline-none focus:ring-2 focus:ring-brand-orange focus:bg-white transition-all appearance-none cursor-pointer shadow-xs"
              >
                <optgroup label="🇮🇳 Popular Indian Destinations">
                  <option value="Manali">Manali (Himachal Pradesh)</option>
                  <option value="North Goa">Goa (North & South)</option>
                  <option value="Jaipur">Jaipur (Rajasthan)</option>
                  <option value="Munnar">Munnar (Kerala)</option>
                  <option value="Visakhapatnam">Visakhapatnam (Andhra Pradesh)</option>
                  <option value="Tawang">Tawang (Arunachal Pradesh)</option>
                  <option value="Kaziranga National Park">Kaziranga (Assam)</option>
                  <option value="Statue of Unity & Rann of Kutch">Statue of Unity & Rann of Kutch (Gujarat)</option>
                  <option value="Coorg & Chikmagalur">Coorg (Karnataka)</option>
                  <option value="Udaipur & Jaisalmer">Udaipur & Jaisalmer (Rajasthan)</option>
                  <option value="Shillong & Cherrapunji">Shillong & Cherrapunji (Meghalaya)</option>
                  <option value="Darjeeling & Kalimpong">Darjeeling (West Bengal)</option>
                  <option value="Ladakh (Leh)">Leh Ladakh</option>
                  <option value="Srinagar & Gulmarg">Srinagar & Gulmarg (J&K)</option>
                  <option value="Andaman & Nicobar (Havelock)">Andaman & Havelock</option>
                  <option value="Puducherry">Puducherry</option>
                </optgroup>
                <optgroup label="🌎 Popular International Trips">
                  <option value="Maldives">Maldives 🇲🇻</option>
                  <option value="Bangkok & Phuket">Thailand (Bangkok & Phuket) 🇹🇭</option>
                  <option value="Bali & Ubud">Bali (Indonesia) 🇮🇩</option>
                  <option value="Singapore">Singapore 🇸🇬</option>
                  <option value="Dubai & Abu Dhabi">Dubai & UAE 🇦🇪</option>
                  <option value="Kuala Lumpur & Langkawi">Malaysia 🇲🇾</option>
                  <option value="Paris">Paris (France) 🇫🇷</option>
                  <option value="Switzerland (Interlaken & Zurich)">Switzerland 🇨🇭</option>
                  <option value="Tokyo & Kyoto">Japan (Tokyo & Kyoto) 🇯🇵</option>
                  <option value="Santorini & Athens">Greece (Santorini & Athens) 🇬🇷</option>
                  <option value="Istanbul & Cappadocia">Turkey 🇹🇷</option>
                  <option value="London & Edinburgh">United Kingdom 🇬🇧</option>
                  <option value="Sydney & Melbourne">Australia 🇦🇺</option>
                  <option value="New York & Las Vegas">USA (New York & Vegas) 🇺🇸</option>
                </optgroup>
              </select>
              <div className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none text-slate-400 font-bold text-xs">
                ▼
              </div>
            </div>
          </div>

          {/* Budget Selection */}
          <div className="space-y-2">
            <label className="text-xs font-extrabold uppercase tracking-wider text-slate-700 flex items-center gap-1.5">
              <IndianRupee className="w-4 h-4 text-emerald-600" />
              Trip Budget (INR)
            </label>
            <select
              value={budget}
              onChange={(e) => setBudget(e.target.value)}
              className="w-full px-4 py-3.5 rounded-2xl bg-slate-50/90 border border-slate-200/80 text-slate-900 font-extrabold text-sm focus:outline-none focus:ring-2 focus:ring-brand-orange focus:bg-white transition-all cursor-pointer shadow-xs"
            >
              {budgetOptions.map((b) => (
                <option key={b.value} value={b.value}>
                  {b.label}
                </option>
              ))}
            </select>
          </div>

          {/* Travel Dates */}
          <div className="space-y-2">
            <label className="text-xs font-extrabold uppercase tracking-wider text-slate-700 flex items-center gap-1.5">
              <Calendar className="w-4 h-4 text-brand-orange" />
              Travel Dates ({calculateDuration(startDate, endDate)} Days)
            </label>
            <div className="grid grid-cols-2 gap-2">
              <input
                type="date"
                value={startDate}
                onChange={(e) => setStartDate(e.target.value)}
                className="w-full px-3 py-3 rounded-2xl bg-slate-50/90 border border-slate-200/80 text-slate-900 font-bold text-xs focus:outline-none focus:ring-2 focus:ring-brand-orange shadow-xs"
              />
              <input
                type="date"
                value={endDate}
                onChange={(e) => setEndDate(e.target.value)}
                className="w-full px-3 py-3 rounded-2xl bg-slate-50/90 border border-slate-200/80 text-slate-900 font-bold text-xs focus:outline-none focus:ring-2 focus:ring-brand-orange shadow-xs"
              />
            </div>
          </div>

          {/* Number of Travelers */}
          <div className="space-y-2">
            <label className="text-xs font-extrabold uppercase tracking-wider text-slate-700 flex items-center gap-1.5">
              <Users className="w-4 h-4 text-amber-500" />
              Travelers Count
            </label>
            <div className="flex items-center gap-3 bg-slate-50/90 p-2.5 rounded-2xl border border-slate-200/80 justify-between shadow-xs">
              <div className="flex items-center gap-2">
                <span className="text-xs font-extrabold text-slate-600">Adults:</span>
                <input
                  type="number"
                  min="1"
                  max="10"
                  value={adults}
                  onChange={(e) => setAdults(parseInt(e.target.value) || 1)}
                  className="w-12 text-center py-1 rounded-xl bg-white border border-slate-300 font-bold text-xs"
                />
              </div>
              <div className="flex items-center gap-2">
                <span className="text-xs font-extrabold text-slate-600">Kids:</span>
                <input
                  type="number"
                  min="0"
                  max="10"
                  value={children}
                  onChange={(e) => setChildren(parseInt(e.target.value) || 0)}
                  className="w-12 text-center py-1 rounded-xl bg-white border border-slate-300 font-bold text-xs"
                />
              </div>
            </div>
          </div>

        </div>

        {/* Travel Style Multi-select */}
        <div className="space-y-3 pt-2">
          <label className="text-xs font-extrabold uppercase tracking-wider text-slate-700 block">
            Select Travel Style & Preferences (Multiple Allowed):
          </label>
          <div className="flex flex-wrap gap-2">
            {travelStylesList.map((style) => {
              const selected = selectedStyles.includes(style.name);
              return (
                <button
                  type="button"
                  key={style.name}
                  onClick={() => toggleStyle(style.name)}
                  className={`px-4 py-2 rounded-xl text-xs font-extrabold transition-all flex items-center gap-2 ${
                    selected
                      ? 'bg-gradient-to-r from-brand-orange via-amber-500 to-yellow-500 text-white shadow-md scale-[1.04]'
                      : 'bg-slate-100/90 text-slate-700 hover:bg-orange-50 hover:text-brand-orange border border-slate-200/60'
                  }`}
                >
                  <span>{style.icon}</span>
                  <span>{style.name}</span>
                  {selected && <Check className="w-3.5 h-3.5 stroke-[3]" />}
                </button>
              );
            })}
          </div>
        </div>

        {/* Submit Button */}
        <div className="pt-4 flex justify-end">
          <button
            type="submit"
            className="w-full sm:w-auto px-10 py-4 rounded-2xl bg-gradient-to-r from-brand-orange via-amber-500 to-brand-golden text-white font-black text-base shadow-glow hover:shadow-glow-yellow hover:scale-105 active:scale-95 transition-all flex items-center justify-center gap-2.5"
          >
            <Sparkles className="w-5 h-5 animate-pulse" />
            Plan My Trip Now
          </button>
        </div>

      </form>
    </div>
  );
}
