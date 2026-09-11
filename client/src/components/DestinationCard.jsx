import React from 'react';
import { Link } from 'react-router-dom';
import { Calendar, Star, ArrowRight, IndianRupee, MapPin } from 'lucide-react';

export default function DestinationCard({ destination }) {
  const {
    name,
    state,
    country,
    type,
    image,
    estimatedBudgetINR,
    recommendedDays,
    rating = 4.7,
    category,
    shortDescription
  } = destination;

  return (
    <div className="interactive-card bg-[#131920] rounded-2xl overflow-hidden shadow-card-dark border border-[#232E3C] hover:border-[#B2D959]/50 hover:shadow-glow-yellow transition-all duration-300 group flex flex-col h-full">
      
      {/* Image Container */}
      <div className="relative h-48 overflow-hidden bg-[#0B0F14]">
        <img
          src={image}
          alt={name}
          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700 opacity-90 group-hover:opacity-100"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#131920] via-transparent to-black/30" />
        
        {/* Type / Location Badge */}
        <div className="absolute top-3 left-3 bg-[#0B0F14]/85 backdrop-blur-md px-3 py-1 rounded-lg border border-[#232E3C] flex items-center gap-1.5 shadow-md">
          <MapPin className="w-3 h-3 text-[#B2D959]" />
          <span className="text-[11px] font-bold text-white tracking-wide">
            {type === 'international' ? country : (state || country)}
          </span>
        </div>

        {/* Rating */}
        <div className="absolute top-3 right-3 bg-[#0B0F14]/85 backdrop-blur-md text-[#FFF449] border border-[#232E3C] px-2.5 py-1 rounded-lg text-[11px] font-extrabold flex items-center gap-1 shadow-md">
          <Star className="w-3 h-3 fill-[#FFF449] text-[#FFF449]" />
          <span>{rating}</span>
        </div>
      </div>

      {/* Body */}
      <div className="p-5 flex flex-col flex-grow justify-between space-y-4">
        <div>
          <div className="flex items-center justify-between gap-2">
            <h3 className="text-lg font-bold text-white group-hover:text-[#FFF449] transition-colors">
              {name}
            </h3>
            <span className="text-[10px] font-bold bg-[#1A222C] text-[#B2D959] border border-[#232E3C] px-2.5 py-0.5 rounded-full uppercase tracking-wider shrink-0">
              {category}
            </span>
          </div>

          <p className="text-xs text-gray-400 font-normal line-clamp-2 mt-2 leading-relaxed">
            {shortDescription || 'Discover iconic sights, local food, and day-wise travel itineraries.'}
          </p>
        </div>

        {/* Details Footer */}
        <div className="pt-4 border-t border-[#232E3C] space-y-3">
          <div className="flex items-center justify-between text-xs text-gray-300 font-medium">
            <span className="flex items-center gap-1.5 text-gray-300">
              <Calendar className="w-3.5 h-3.5 text-[#7EC151]" />
              {recommendedDays || 3} Days Trip
            </span>
            <span className="flex items-center font-extrabold text-white">
              <IndianRupee className="w-3.5 h-3.5 text-[#FFF449] inline" />
              {Number(estimatedBudgetINR).toLocaleString('en-IN')}
              <span className="text-[10px] font-normal text-gray-400 ml-0.5">/ person</span>
            </span>
          </div>

          <Link
            to={`/destinations/${encodeURIComponent(name)}`}
            className="w-full py-2.5 rounded-xl bg-[#1A222C] hover:bg-gradient-brand text-gray-200 hover:text-[#0B0F14] font-bold text-xs transition-all flex items-center justify-center gap-1.5 border border-[#232E3C] hover:border-transparent group/btn shadow-xs"
          >
            <span>View Details</span>
            <ArrowRight className="w-3.5 h-3.5 group-hover/btn:translate-x-1 transition-transform" />
          </Link>
        </div>

      </div>

    </div>
  );
}
