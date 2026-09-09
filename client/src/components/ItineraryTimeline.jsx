import React from 'react';
import { Clock, MapPin, IndianRupee, Sun, Cloud } from 'lucide-react';

export default function ItineraryTimeline({ daysItinerary }) {
  if (!daysItinerary || daysItinerary.length === 0) {
    return (
      <div className="py-12 text-center text-xs text-[#2C2C2C]/60 font-semibold">
        No itinerary generated yet. Select a destination and click "Generate Trip Plan".
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
        <div key={day.dayNumber} className="bg-white rounded-2xl p-6 shadow-card border border-gray-200/80">
          
          {/* Day Header */}
          <div className="flex items-center gap-3 pb-4 mb-6 border-b border-gray-100">
            <div className="px-3 py-1 rounded-lg bg-gradient-to-r from-[#853953] to-[#612D53] text-white font-bold text-sm">
              Day {day.dayNumber}
            </div>
            <h3 className="text-lg font-bold text-[#2C2C2C]">{day.title}</h3>
          </div>

          {/* Timeline Stack */}
          <div className="relative pl-6 border-l-2 border-[#853953]/30 space-y-6">
            {day.activities.map((activity, idx) => {
              const displayTime = defaultTimeSlots[activity.timeSlot] || '09:00 AM';
              return (
                <div key={idx} className="relative group">
                  
                  {/* Timeline Dot */}
                  <div className="absolute -left-[31px] top-1.5 w-3.5 h-3.5 rounded-full bg-[#853953] border-2 border-white shadow-xs" />

                  <div className="bg-[#F3F4F4] p-4 rounded-xl border border-gray-200 space-y-2">
                    
                    {/* Header */}
                    <div className="flex flex-wrap items-center justify-between gap-2">
                      <div className="flex items-center gap-2">
                        <span className="text-xs font-bold text-[#853953] bg-[#853953]/10 px-2.5 py-0.5 rounded">
                          {displayTime} — {activity.timeSlot}
                        </span>
                        <span className="text-xs text-[#2C2C2C]/60 font-medium flex items-center gap-1">
                          <Clock className="w-3.5 h-3.5 text-[#2C2C2C]/40" />
                          {activity.duration}
                        </span>
                      </div>

                      <div className="flex items-center gap-2">
                        <span className="text-[11px] font-semibold px-2 py-0.5 rounded bg-white text-[#2C2C2C] border border-gray-200">
                          {activity.weatherSuitability}
                        </span>
                        <span className="text-xs font-bold text-[#2C2C2C] bg-white px-2.5 py-0.5 rounded border border-gray-200">
                          ₹{Number(activity.estimatedCost).toLocaleString('en-IN')}
                        </span>
                      </div>
                    </div>

                    {/* Title & Location */}
                    <div>
                      <h4 className="text-sm font-bold text-[#2C2C2C]">
                        {activity.title}
                      </h4>
                      <p className="text-xs text-[#2C2C2C]/60 font-medium flex items-center gap-1 mt-0.5">
                        <MapPin className="w-3 h-3 text-[#853953] shrink-0" />
                        {activity.place}
                      </p>
                    </div>

                    {/* Description */}
                    <p className="text-xs text-[#2C2C2C]/80 font-normal leading-relaxed">
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
