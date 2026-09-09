import React from 'react';
import { Star, MapPin, Check } from 'lucide-react';

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
    <div className="bg-white rounded-xl overflow-hidden shadow-xs hover:shadow-card border border-gray-200/80 transition-all duration-200 group flex flex-col md:flex-row h-full">
      
      {/* Image */}
      <div className="relative md:w-2/5 h-48 md:h-auto overflow-hidden bg-gray-100">
        <img
          src={image}
          alt={name}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
        />
        <div className="absolute top-3 left-3 bg-[#2C2C2C]/80 text-white text-[10px] font-semibold px-2.5 py-0.5 rounded">
          {category}
        </div>
      </div>

      {/* Info */}
      <div className="p-5 md:w-3/5 flex flex-col justify-between space-y-4">
        <div>
          <div className="flex items-start justify-between gap-2">
            <div>
              <span className="text-[10px] font-bold uppercase tracking-wider text-[#853953] block">
                {destination}
              </span>
              <h3 className="text-base font-bold text-[#2C2C2C] group-hover:text-[#853953] transition-colors">
                {name}
              </h3>
            </div>
            
            <div className="flex items-center gap-1 bg-[#F3F4F4] text-[#2C2C2C] px-2 py-0.5 rounded text-xs font-semibold border border-gray-200">
              <Star className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
              <span>{rating}</span>
            </div>
          </div>

          <div className="flex items-center gap-1 text-xs text-[#2C2C2C]/70 font-medium mt-1">
            <MapPin className="w-3 h-3 text-[#2C2C2C]/50 shrink-0" />
            <span className="truncate">{location} • {distanceFromCenter}</span>
          </div>

          {/* Amenities */}
          <div className="flex flex-wrap gap-1.5 mt-3">
            {amenities.slice(0, 4).map((amenity, idx) => (
              <span
                key={idx}
                className="text-[10px] font-semibold bg-[#F3F4F4] text-[#2C2C2C]/80 px-2 py-0.5 rounded flex items-center gap-1"
              >
                <Check className="w-3 h-3 text-[#853953]" />
                {amenity}
              </span>
            ))}
          </div>
        </div>

        {/* Footer */}
        <div className="pt-3 border-t border-gray-100 flex items-center justify-between">
          <div>
            <span className="text-[10px] font-semibold text-[#2C2C2C]/60 uppercase tracking-wider block">
              Estimated Price / Night
            </span>
            <div className="text-base font-bold text-[#2C2C2C]">
              ₹{Number(pricePerNight).toLocaleString('en-IN')}
            </div>
          </div>

          <button className="px-3.5 py-2 rounded-lg bg-gradient-to-r from-[#853953] to-[#612D53] text-white font-semibold text-xs shadow-2xs hover:opacity-95 transition-all">
            View Details
          </button>
        </div>

      </div>

    </div>
  );
}
