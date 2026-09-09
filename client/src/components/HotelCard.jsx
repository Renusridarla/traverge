import React from 'react';
import { Star, MapPin, CheckCircle2 } from 'lucide-react';

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
    <div className="bg-white/85 backdrop-blur-xl rounded-3xl overflow-hidden shadow-lg shadow-orange-500/5 hover:shadow-2xl hover:shadow-orange-500/15 border border-white/90 hover:border-brand-orange/60 transition-all duration-300 group flex flex-col md:flex-row h-full">
      
      {/* Image Container */}
      <div className="relative md:w-2/5 h-52 md:h-auto overflow-hidden">
        <img
          src={image}
          alt={name}
          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
        />
        <div className="absolute top-3 left-3 bg-slate-900/85 backdrop-blur-md text-white text-[11px] font-black px-3 py-1 rounded-full border border-white/10 shadow-md">
          {category}
        </div>
      </div>

      {/* Info Body */}
      <div className="p-5 md:w-3/5 flex flex-col justify-between space-y-4">
        <div>
          <div className="flex items-start justify-between gap-2">
            <div>
              <span className="text-[10px] font-black uppercase tracking-wider text-brand-orange block">
                {destination}
              </span>
              <h3 className="text-lg font-black text-slate-900 group-hover:text-brand-orange transition-colors">
                {name}
              </h3>
            </div>
            
            <div className="flex items-center gap-1 bg-amber-50 text-amber-800 px-2.5 py-1 rounded-xl text-xs font-black border border-amber-200/80 shadow-xs">
              <Star className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
              <span>{rating}</span>
              <span className="text-[10px] text-slate-400 font-bold">({reviewsCount})</span>
            </div>
          </div>

          {/* Location & Distance */}
          <div className="flex items-center gap-1.5 text-xs text-slate-500 font-semibold mt-1">
            <MapPin className="w-3.5 h-3.5 text-slate-400 shrink-0" />
            <span className="truncate">{location} • {distanceFromCenter}</span>
          </div>

          <p className="text-xs font-black text-slate-700 mt-2">
            Room: <span className="font-semibold text-slate-600">{roomType}</span>
          </p>

          {/* Amenities Pills */}
          <div className="flex flex-wrap gap-1.5 mt-3">
            {amenities.slice(0, 4).map((amenity, idx) => (
              <span
                key={idx}
                className="text-[10px] font-extrabold bg-slate-100/90 text-slate-700 px-2.5 py-1 rounded-xl flex items-center gap-1 border border-slate-200/60"
              >
                <CheckCircle2 className="w-3 h-3 text-emerald-500" />
                {amenity}
              </span>
            ))}
            {amenities.length > 4 && (
              <span className="text-[10px] font-black bg-orange-100 text-brand-orange px-2 py-1 rounded-xl">
                +{amenities.length - 4} more
              </span>
            )}
          </div>
        </div>

        {/* Footer & Price */}
        <div className="pt-3 border-t border-slate-100 flex items-center justify-between">
          <div>
            <span className="text-[10px] font-black text-slate-400 uppercase tracking-wider block">
              Estimated Rate / Night
            </span>
            <div className="text-lg font-black text-slate-900">
              ₹{Number(pricePerNight).toLocaleString('en-IN')}
              <span className="text-[10px] font-normal text-slate-500"> + taxes</span>
            </div>
          </div>

          <button className="px-4 py-2.5 rounded-2xl bg-gradient-to-r from-brand-orange via-amber-500 to-yellow-500 text-white font-extrabold text-xs shadow-md hover:scale-105 transition-all">
            View Details
          </button>
        </div>

      </div>

    </div>
  );
}
