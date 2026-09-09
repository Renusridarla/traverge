import React from 'react';
import { Star, MapPin, Wifi, Coffee, Sparkles, Building2, CheckCircle2 } from 'lucide-react';

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
    <div className="bg-white rounded-3xl overflow-hidden shadow-sm hover:shadow-card-hover border border-orange-100 transition-all duration-300 group flex flex-col md:flex-row h-full">
      
      {/* Image Container */}
      <div className="relative md:w-2/5 h-52 md:h-auto overflow-hidden">
        <img
          src={image}
          alt={name}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
        />
        <div className="absolute top-3 left-3 bg-slate-900/80 backdrop-blur-md text-white text-[11px] font-bold px-3 py-1 rounded-full">
          {category}
        </div>
      </div>

      {/* Info Body */}
      <div className="p-5 md:w-3/5 flex flex-col justify-between space-y-4">
        <div>
          <div className="flex items-start justify-between gap-2">
            <div>
              <span className="text-[10px] font-extrabold uppercase tracking-wider text-brand-orange">
                {destination}
              </span>
              <h3 className="text-lg font-extrabold text-slate-900 group-hover:text-brand-orange transition-colors">
                {name}
              </h3>
            </div>
            
            <div className="flex items-center gap-1 bg-amber-50 text-amber-700 px-2.5 py-1 rounded-xl text-xs font-bold border border-amber-200/60">
              <Star className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
              <span>{rating}</span>
              <span className="text-[10px] text-slate-400">({reviewsCount})</span>
            </div>
          </div>

          {/* Location & Distance */}
          <div className="flex items-center gap-1.5 text-xs text-slate-500 font-medium mt-1">
            <MapPin className="w-3.5 h-3.5 text-slate-400 shrink-0" />
            <span className="truncate">{location} • {distanceFromCenter}</span>
          </div>

          <p className="text-xs font-bold text-slate-700 mt-2">
            Room: <span className="font-normal text-slate-600">{roomType}</span>
          </p>

          {/* Amenities Pills */}
          <div className="flex flex-wrap gap-1.5 mt-3">
            {amenities.slice(0, 4).map((amenity, idx) => (
              <span
                key={idx}
                className="text-[10px] font-bold bg-slate-100 text-slate-600 px-2.5 py-1 rounded-lg flex items-center gap-1"
              >
                <CheckCircle2 className="w-3 h-3 text-emerald-500" />
                {amenity}
              </span>
            ))}
            {amenities.length > 4 && (
              <span className="text-[10px] font-bold bg-orange-50 text-brand-orange px-2 py-1 rounded-lg">
                +{amenities.length - 4} more
              </span>
            )}
          </div>
        </div>

        {/* Footer & Price */}
        <div className="pt-3 border-t border-slate-100 flex items-center justify-between">
          <div>
            <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block">
              Estimated Price / Night
            </span>
            <div className="text-lg font-extrabold text-slate-900">
              ₹{Number(pricePerNight).toLocaleString('en-IN')}
              <span className="text-[10px] font-normal text-slate-500"> + taxes</span>
            </div>
          </div>

          <button className="px-4 py-2 rounded-xl bg-gradient-to-r from-brand-orange to-brand-golden text-white font-bold text-xs shadow-sm hover:scale-105 transition-all">
            View Details
          </button>
        </div>

      </div>

    </div>
  );
}
