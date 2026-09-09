import React from 'react';
import { Link } from 'react-router-dom';
import { MapPin, Calendar, Star, ArrowRight, Sun, IndianRupee } from 'lucide-react';

export default function DestinationCard({ destination }) {
  const {
    _id,
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
    <div className="bg-white rounded-3xl overflow-hidden shadow-sm hover:shadow-card-hover border border-orange-100/80 transition-all duration-300 group flex flex-col h-full">
      
      {/* Card Image Cover */}
      <div className="relative h-56 overflow-hidden">
        <img
          src={image}
          alt={name}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
        />
        
        {/* Type / Flag Badge */}
        <div className="absolute top-3 left-3 bg-white/90 backdrop-blur-md px-3 py-1 rounded-full shadow-sm flex items-center gap-1.5 border border-white">
          <span className="text-sm">{flagEmoji}</span>
          <span className="text-xs font-bold text-slate-800 uppercase tracking-wider">
            {type === 'international' ? country : (state || country)}
          </span>
        </div>

        {/* Rating Badge */}
        <div className="absolute top-3 right-3 bg-slate-900/80 backdrop-blur-md text-amber-400 px-2.5 py-1 rounded-full text-xs font-bold flex items-center gap-1">
          <Star className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
          <span>{rating}</span>
        </div>

        {/* Category Pill */}
        <div className="absolute bottom-3 left-3 bg-gradient-to-r from-brand-orange to-amber-500 text-white text-[11px] font-extrabold px-3 py-1 rounded-lg shadow-sm">
          {category}
        </div>
      </div>

      {/* Card Body */}
      <div className="p-5 flex flex-col flex-grow justify-between space-y-4">
        <div>
          <div className="flex items-center justify-between gap-2">
            <h3 className="text-xl font-extrabold text-slate-900 group-hover:text-brand-orange transition-colors">
              {name}
            </h3>
          </div>

          <p className="text-xs text-slate-600 font-medium line-clamp-2 mt-1.5">
            {shortDescription || 'Discover iconic sights, local food, and day-wise travel itineraries.'}
          </p>
        </div>

        {/* Features & Price Stats */}
        <div className="pt-3 border-t border-orange-100 space-y-2 text-xs">
          <div className="flex items-center justify-between text-slate-600 font-semibold">
            <span className="flex items-center gap-1">
              <Calendar className="w-3.5 h-3.5 text-brand-orange" />
              {recommendedDays || 3} Days Trip
            </span>
            <span className="flex items-center gap-1 text-slate-500">
              <Sun className="w-3.5 h-3.5 text-amber-500" />
              {bestTime || 'Oct - Mar'}
            </span>
          </div>

          <div className="flex items-center justify-between pt-1">
            <div>
              <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block">Estimated Cost</span>
              <span className="text-base font-extrabold text-slate-900 flex items-center">
                <IndianRupee className="w-3.5 h-3.5 text-emerald-600 inline" />
                {Number(estimatedBudgetINR).toLocaleString('en-IN')}
                <span className="text-[10px] font-normal text-slate-500 ml-1">/ person</span>
              </span>
            </div>

            <Link
              to={`/destinations/${encodeURIComponent(name)}`}
              className="px-4 py-2 rounded-xl bg-orange-50 text-brand-orange hover:bg-brand-orange hover:text-white font-bold text-xs transition-all flex items-center gap-1 group/btn shadow-xs"
            >
              <span>Explore</span>
              <ArrowRight className="w-3.5 h-3.5 group-hover/btn:translate-x-0.5 transition-transform" />
            </Link>
          </div>
        </div>

      </div>

    </div>
  );
}
