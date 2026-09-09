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
    <div className="bg-white rounded-xl overflow-hidden shadow-xs hover:shadow-card border border-gray-200/80 transition-all duration-200 group flex flex-col h-full">
      
      {/* Image */}
      <div className="relative h-48 overflow-hidden bg-gray-100">
        <img
          src={image}
          alt={name}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
        />
        
        {/* Type / Location Badge */}
        <div className="absolute top-3 left-3 bg-white/90 backdrop-blur-md px-2.5 py-1 rounded-md shadow-2xs flex items-center gap-1 border border-gray-100">
          <MapPin className="w-3 h-3 text-[#853953]" />
          <span className="text-[11px] font-semibold text-[#2C2C2C]">
            {type === 'international' ? country : (state || country)}
          </span>
        </div>

        {/* Rating */}
        <div className="absolute top-3 right-3 bg-[#2C2C2C]/80 text-white px-2 py-0.5 rounded-md text-[11px] font-semibold flex items-center gap-1">
          <Star className="w-3 h-3 fill-amber-400 text-amber-400" />
          <span>{rating}</span>
        </div>
      </div>

      {/* Body */}
      <div className="p-5 flex flex-col flex-grow justify-between space-y-4">
        <div>
          <div className="flex items-center justify-between">
            <h3 className="text-lg font-bold text-[#2C2C2C] group-hover:text-[#853953] transition-colors">
              {name}
            </h3>
            <span className="text-[10px] font-semibold bg-[#F3F4F4] text-[#853953] px-2 py-0.5 rounded">
              {category}
            </span>
          </div>

          <p className="text-xs text-[#2C2C2C]/75 font-normal line-clamp-2 mt-1.5 leading-relaxed">
            {shortDescription || 'Discover iconic sights, local food, and day-wise travel itineraries.'}
          </p>
        </div>

        {/* Details Footer */}
        <div className="pt-3 border-t border-gray-100 space-y-3">
          <div className="flex items-center justify-between text-xs text-[#2C2C2C]/80 font-medium">
            <span className="flex items-center gap-1">
              <Calendar className="w-3.5 h-3.5 text-[#853953]" />
              {recommendedDays || 3} Days Trip
            </span>
            <span className="flex items-center font-bold text-[#2C2C2C]">
              <IndianRupee className="w-3.5 h-3.5 text-[#853953] inline" />
              {Number(estimatedBudgetINR).toLocaleString('en-IN')}
              <span className="text-[10px] font-normal text-[#2C2C2C]/60 ml-0.5">/ person</span>
            </span>
          </div>

          <Link
            to={`/destinations/${encodeURIComponent(name)}`}
            className="w-full py-2 rounded-lg bg-[#F3F4F4] hover:bg-gradient-to-r hover:from-[#853953] hover:to-[#612D53] text-[#853953] hover:text-white font-semibold text-xs transition-all flex items-center justify-center gap-1 group/btn border border-gray-200"
          >
            <span>View Details</span>
            <ArrowRight className="w-3.5 h-3.5 group-hover/btn:translate-x-0.5 transition-transform" />
          </Link>
        </div>

      </div>

    </div>
  );
}
