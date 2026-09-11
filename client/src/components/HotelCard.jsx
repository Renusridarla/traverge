import React from 'react';
import { Star, MapPin, Check, Building, ArrowRight } from 'lucide-react';

export default function HotelCard({ hotel }) {
  const {
    name,
    destination,
    location,
    pricePerNight,
    rating = 4.5,
    reviewsCount = 120,
    amenities = [],
    roomType = 'Deluxe Room',
    category = '3-Star',
    image,
    distanceFromCenter = '1.2 km from center'
  } = hotel;

  return (
    <div className="interactive-card bg-[#131920] rounded-2xl overflow-hidden shadow-card-dark border border-[#232E3C] hover:border-[#B2D959]/50 hover:shadow-glow-green transition-all duration-300 group flex flex-col md:flex-row h-full">
      
      {/* Image */}
      <div className="relative md:w-2/5 h-48 md:h-auto overflow-hidden bg-[#0B0F14]">
        <img
          src={image}
          alt={name}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 opacity-90 group-hover:opacity-100"
        />
        <div className="absolute top-3 left-3 bg-[#0B0F14]/85 backdrop-blur-md text-[#FFF449] border border-[#232E3C] text-[10px] font-extrabold px-2.5 py-1 rounded-lg">
          {category}
        </div>
      </div>

      {/* Info */}
      <div className="p-5 md:w-3/5 flex flex-col justify-between space-y-4">
        <div>
          <div className="flex items-start justify-between gap-2">
            <div>
              <span className="text-[10px] font-extrabold uppercase tracking-wider text-[#B2D959] block">
                {destination}
              </span>
              <h3 className="text-base font-bold text-white group-hover:text-[#FFF449] transition-colors mt-0.5">
                {name}
              </h3>
            </div>
            
            <div className="flex items-center gap-1 bg-[#0B0F14] text-[#FFF449] px-2.5 py-1 rounded-lg text-xs font-extrabold border border-[#232E3C] shrink-0">
              <Star className="w-3.5 h-3.5 fill-[#FFF449] text-[#FFF449]" />
              <span>{rating}</span>
            </div>
          </div>

          <div className="flex items-center gap-1.5 text-xs text-gray-400 font-medium mt-2">
            <MapPin className="w-3.5 h-3.5 text-[#7EC151] shrink-0" />
            <span className="truncate">{location} • {distanceFromCenter}</span>
          </div>

          {/* Amenities */}
          <div className="flex flex-wrap gap-1.5 mt-3">
            {amenities.slice(0, 4).map((amenity, idx) => (
              <span
                key={idx}
                className="text-[10px] font-semibold bg-[#1A222C] text-gray-300 border border-[#232E3C] px-2.5 py-0.5 rounded-md flex items-center gap-1"
              >
                <Check className="w-3 h-3 text-[#B2D959]" />
                {amenity}
              </span>
            ))}
          </div>
        </div>

        {/* Footer */}
        <div className="pt-3 border-t border-[#232E3C] flex items-center justify-between">
          <div>
            <span className="text-[10px] font-semibold text-gray-400 uppercase tracking-wider block">
              Estimated Price / Night
            </span>
            <div className="text-lg font-extrabold text-white">
              ₹{Number(pricePerNight).toLocaleString('en-IN')}
            </div>
          </div>

          <button className="px-4 py-2 rounded-xl bg-gradient-brand hover:bg-gradient-brand-hover text-[#0B0F14] font-extrabold text-xs shadow-glow-yellow hover:scale-105 active:scale-95 transition-all flex items-center gap-1">
            <span>View Details</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>

      </div>

    </div>
  );
}
