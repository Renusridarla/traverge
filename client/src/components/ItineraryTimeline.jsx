import React from 'react';
import { Clock, MapPin, IndianRupee, Sun, Cloud, Calendar } from 'lucide-react';

export default function ItineraryTimeline({ daysItinerary }) {
  if (!daysItinerary || daysItinerary.length === 0) {
    return (
      <div className="py-12 text-center text-xs text-gray-400 font-semibold bg-[#131920] rounded-2xl border border-[#232E3C]">
        No itinerary generated yet. Select a destination and click "Plan Your Trip".
      </div>
    );
  }

  const defaultTimeSlots = {
    Morning: '09:00 AM',
    Afternoon: '01:00 PM',
    Evening: '06:00 PM'
  };

  return (
    <div className="space-y-8">
      {daysItinerary.map((day) => (
        <div key={day.dayNumber} className="interactive-card bg-[#131920] rounded-2xl p-6 sm:p-8 shadow-card-dark border border-[#232E3C]">
          
          {/* Day Header */}
          <div className="flex items-center gap-3 pb-4 mb-6 border-b border-[#232E3C]">
            <div className="px-4 py-1.5 rounded-xl bg-gradient-brand text-[#0B0F14] font-black text-sm shadow-glow-yellow">
              Day {day.dayNumber}
            </div>
            <h3 className="text-xl font-extrabold text-white">{day.title}</h3>
          </div>

          {/* Timeline Stack */}
          <div className="relative pl-6 border-l-2 border-[#B2D959]/30 space-y-6">
            {day.activities.map((activity, idx) => {
              const displayTime = defaultTimeSlots[activity.timeSlot] || '09:00 AM';
              return (
                <div key={idx} className="relative group">
                  
                  {/* Timeline Dot */}
                  <div className="absolute -left-[31px] top-2 w-4 h-4 rounded-full bg-[#FFF449] border-2 border-[#0B0F14] shadow-glow-yellow" />

                  <div className="bg-[#0B0F14] p-5 rounded-xl border border-[#232E3C] hover:border-[#B2D959]/50 transition-colors space-y-3">
                    
                    {/* Header */}
                    <div className="flex flex-wrap items-center justify-between gap-2">
                      <div className="flex items-center gap-2">
                        <span className="text-xs font-extrabold text-[#0B0F14] bg-gradient-brand px-3 py-1 rounded-md shadow-xs">
                          {displayTime} — {activity.timeSlot}
                        </span>
                        <span className="text-xs text-gray-400 font-medium flex items-center gap-1">
                          <Clock className="w-3.5 h-3.5 text-[#B2D959]" />
                          {activity.duration}
                        </span>
                      </div>

                      <div className="flex items-center gap-2">
                        <span className="text-[11px] font-bold px-2.5 py-0.5 rounded-md bg-[#1A222C] text-[#B2D959] border border-[#232E3C]">
                          {activity.weatherSuitability}
                        </span>
                        <span className="text-xs font-extrabold text-white bg-[#1A222C] px-3 py-1 rounded-md border border-[#232E3C]">
                          ₹{Number(activity.estimatedCost).toLocaleString('en-IN')}
                        </span>
                      </div>
                    </div>

                    {/* Title & Location */}
                    <div>
                      <h4 className="text-base font-bold text-white group-hover:text-[#FFF449] transition-colors">
                        {activity.title}
                      </h4>
                      <p className="text-xs text-gray-400 font-medium flex items-center gap-1 mt-1">
                        <MapPin className="w-3.5 h-3.5 text-[#7EC151] shrink-0" />
                        {activity.place}
                      </p>
                    </div>

                    {/* Description */}
                    <p className="text-xs text-gray-300 font-normal leading-relaxed">
                      {activity.description}
                    </p>

                  </div>

                </div>
              );
            })}
          </div>

        </div>
      ))}
    </div>
  );
}
