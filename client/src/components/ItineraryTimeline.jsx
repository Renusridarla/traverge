import React from 'react';
import { Sun, Clock, MapPin, IndianRupee, Shield, Sparkles, CheckCircle } from 'lucide-react';

export default function ItineraryTimeline({ daysItinerary }) {
  if (!daysItinerary || daysItinerary.length === 0) {
    return (
      <div className="py-12 text-center text-slate-500 font-semibold">
        No itinerary generated yet. Select a destination and click "Plan My Trip".
      </div>
    );
  }

  const slotIcons = {
    Morning: '🌅',
    Afternoon: '☀️',
    Evening: '🌙'
  };

  const slotBadgeColors = {
    Morning: 'bg-amber-100 text-amber-800 border-amber-200',
    Afternoon: 'bg-orange-100 text-orange-800 border-orange-200',
    Evening: 'bg-indigo-100 text-indigo-800 border-indigo-200'
  };

  return (
    <div className="space-y-10">
      {daysItinerary.map((day) => (
        <div key={day.dayNumber} className="bg-white rounded-3xl p-6 sm:p-8 shadow-glow border border-orange-100 relative">
          
          {/* Day Header */}
          <div className="flex items-center gap-3 pb-6 mb-6 border-b border-slate-100">
            <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-brand-orange to-brand-golden text-white font-extrabold text-xl flex items-center justify-center shadow-md">
              D{day.dayNumber}
            </div>
            <div>
              <h3 className="text-xl font-extrabold text-slate-900">{day.title}</h3>
              <p className="text-xs font-semibold text-brand-orange">Personalized Day-Wise Timeline</p>
            </div>
          </div>

          {/* Activities Timeline Stack */}
          <div className="relative pl-6 border-l-2 border-orange-200 space-y-8">
            {day.activities.map((activity, idx) => (
              <div key={idx} className="relative group">
                
                {/* Timeline Dot */}
                <div className="absolute -left-[31px] top-1.5 w-4 h-4 rounded-full bg-brand-orange border-4 border-white shadow-md group-hover:scale-125 transition-transform" />

                <div className="bg-slate-50 hover:bg-orange-50/40 p-5 rounded-2xl border border-slate-200/80 transition-all space-y-3">
                  
                  {/* Slot Header */}
                  <div className="flex flex-wrap items-center justify-between gap-2">
                    <div className="flex items-center gap-2">
                      <span className={`px-3 py-1 rounded-full text-xs font-extrabold border flex items-center gap-1.5 ${slotBadgeColors[activity.timeSlot] || 'bg-slate-100 text-slate-800'}`}>
                        <span>{slotIcons[activity.timeSlot]}</span>
                        <span>{activity.timeSlot}</span>
                      </span>
                      <span className="text-xs font-bold text-slate-500 flex items-center gap-1">
                        <Clock className="w-3.5 h-3.5 text-slate-400" />
                        {activity.duration}
                      </span>
                    </div>

                    <div className="flex items-center gap-2">
                      <span className="text-[11px] font-extrabold px-2.5 py-1 rounded-full bg-emerald-50 text-emerald-700 border border-emerald-200">
                        {activity.weatherSuitability}
                      </span>
                      <span className="text-xs font-extrabold text-slate-900 bg-white px-3 py-1 rounded-xl shadow-xs border border-slate-200">
                        ₹{Number(activity.estimatedCost).toLocaleString('en-IN')}
                      </span>
                    </div>
                  </div>

                  {/* Title & Location */}
                  <div>
                    <h4 className="text-base font-extrabold text-slate-900 group-hover:text-brand-orange transition-colors">
                      {activity.title}
                    </h4>
                    <p className="text-xs font-semibold text-slate-500 flex items-center gap-1 mt-0.5">
                      <MapPin className="w-3.5 h-3.5 text-brand-orange shrink-0" />
                      {activity.place}
                    </p>
                  </div>

                  {/* Description */}
                  <p className="text-xs text-slate-600 font-medium leading-relaxed">
                    {activity.description}
                  </p>

                </div>

              </div>
            ))}
          </div>

        </div>
      ))}
    </div>
  );
}
