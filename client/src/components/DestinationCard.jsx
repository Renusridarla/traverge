import React from 'react';
import { Link } from 'react-router-dom';
import { Calendar, Star, ArrowRight, Sun, IndianRupee } from 'lucide-react';

export default function DestinationCard({ destination }) {
  const {
    name,
    state,
    country,
    type,
    image,
    flagEmoji = '🇮🇳',
    estimatedBudgetINR,
    recommendedDays,
    rating = 4.7,
    category,
    shortDescription,
    bestTime
  } = destination;

  return (
    <div className="bg-white/85 backdrop-blur-xl rounded-3xl overflow-hidden shadow-lg shadow-orange-500/5 hover:shadow-2xl hover:shadow-orange-500/15 border border-white/90 hover:border-brand-orange/60 hover:-translate-y-2 transition-all duration-300 group flex flex-col h-full">
      
      {/* Card Image Cover */}
      <div className="relative h-56 overflow-hidden">
        <img
          src={image}
          alt={name}
          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-slate-950/70 via-transparent to-transparent opacity-80" />
        
        {/* Type / Flag Badge */}
        <div className="absolute top-3 left-3 bg-white/90 backdrop-blur-xl px-3 py-1 rounded-full shadow-md flex items-center gap-1.5 border border-white">
          <span className="text-sm">{flagEmoji}</span>
          <span className="text-[11px] font-black text-slate-800 uppercase tracking-wider">
            {type === 'international' ? country : (state || country)}
          </span>
        </div>

        {/* Rating Badge */}
        <div className="absolute top-3 right-3 bg-slate-900/85 backdrop-blur-xl text-amber-400 px-2.5 py-1 rounded-full text-xs font-black flex items-center gap-1 shadow-md border border-white/10">
          <Star className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
          <span>{rating}</span>
        </div>

        {/* Category Pill */}
        <div className="absolute bottom-3 left-3 bg-gradient-to-r from-brand-orange via-amber-500 to-yellow-500 text-white text-[11px] font-black px-3 py-1 rounded-xl shadow-md">
          {category}
        </div>
      </div>

      {/* Card Body */}
      <div className="p-5 flex flex-col flex-grow justify-between space-y-4">
        <div>
          <h3 className="text-xl font-black text-slate-900 group-hover:text-brand-orange transition-colors">
            {name}
          </h3>

          <p className="text-xs text-slate-600 font-semibold line-clamp-2 mt-1.5 leading-relaxed">
            {shortDescription || 'Discover iconic sights, local food, and day-wise travel itineraries.'}
          </p>
        </div>

        {/* Features & Price Stats */}
        <div className="pt-3 border-t border-slate-200/60 space-y-2 text-xs">
          <div className="flex items-center justify-between text-slate-600 font-extrabold">
            <span className="flex items-center gap-1">
              <Calendar className="w-3.5 h-3.5 text-brand-orange" />
              {recommendedDays || 3} Days Trip
            </span>
            <span className="flex items-center gap-1 text-slate-500">
              <Sun className="w-3.5 h-3.5 text-amber-500" />
              {bestTime || 'Oct - Mar'}
            </span>
          </div>

          <div className="flex items-center justify-between pt-2">
            <div>
              <span className="text-[10px] font-black text-slate-400 uppercase tracking-wider block">Estimated Cost</span>
              <span className="text-base font-black text-slate-900 flex items-center">
                <IndianRupee className="w-3.5 h-3.5 text-emerald-600 inline" />
                {Number(estimatedBudgetINR).toLocaleString('en-IN')}
                <span className="text-[10px] font-normal text-slate-500 ml-1">/ person</span>
              </span>
            </div>

            <Link
              to={`/destinations/${encodeURIComponent(name)}`}
              className="px-4 py-2.5 rounded-2xl bg-gradient-to-r from-brand-orange to-amber-500 text-white font-extrabold text-xs shadow-sm hover:shadow-glow hover:scale-105 transition-all flex items-center gap-1 group/btn"
            >
              <span>Explore</span>
              <ArrowRight className="w-3.5 h-3.5 group-hover/btn:translate-x-1 transition-transform" />
            </Link>
          </div>
        </div>

      </div>

    </div>
  );
}
