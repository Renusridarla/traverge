import React from 'react';
import { IndianRupee, PieChart, Info, Building, Utensils, Car, Ticket, AlertCircle } from 'lucide-react';

export default function BudgetCard({ costBreakdown, travelersCount = 2, durationDays = 3 }) {
  const breakdown = costBreakdown || {
    accommodation: 8000,
    food: 4000,
    transport: 3000,
    activities: 5000,
    miscellaneous: 2000,
    totalEstimated: 22000
  };

  const categories = [
    { label: 'Accommodation Stays', amount: breakdown.accommodation, icon: Building, color: 'bg-amber-500', percent: Math.round((breakdown.accommodation / breakdown.totalEstimated) * 100) || 35 },
    { label: 'Food & Dining', amount: breakdown.food, icon: Utensils, color: 'bg-orange-500', percent: Math.round((breakdown.food / breakdown.totalEstimated) * 100) || 25 },
    { label: 'Local Transport', amount: breakdown.transport, icon: Car, color: 'bg-yellow-500', percent: Math.round((breakdown.transport / breakdown.totalEstimated) * 100) || 15 },
    { label: 'Activities & Sightseeing', amount: breakdown.activities, icon: Ticket, color: 'bg-rose-500', percent: Math.round((breakdown.activities / breakdown.totalEstimated) * 100) || 18 },
    { label: 'Misc & Emergency', amount: breakdown.miscellaneous, icon: Info, color: 'bg-slate-400', percent: Math.round((breakdown.miscellaneous / breakdown.totalEstimated) * 100) || 7 }
  ];

  return (
    <div className="bg-white rounded-3xl p-6 sm:p-8 shadow-glow border border-orange-100 space-y-6">
      
      {/* Header Badge */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <div className="w-9 h-9 rounded-2xl bg-emerald-100 text-emerald-700 flex items-center justify-center font-bold">
            <PieChart className="w-5 h-5" />
          </div>
          <div>
            <h3 className="text-xl font-extrabold text-slate-900">Trip Budget Breakdown</h3>
            <p className="text-xs text-slate-500 font-medium">{durationDays} Days • {travelersCount} Traveler(s)</p>
          </div>
        </div>

        <div className="inline-flex items-center gap-1 px-3 py-1 rounded-full bg-orange-100 text-brand-orange text-[11px] font-extrabold uppercase tracking-wider">
          <AlertCircle className="w-3.5 h-3.5" />
          Estimated Cost
        </div>
      </div>

      {/* Visual Progress Bar */}
      <div className="space-y-2">
        <div className="h-4 w-full bg-slate-100 rounded-full overflow-hidden flex shadow-inner">
          {categories.map((cat, idx) => (
            <div
              key={idx}
              style={{ width: `${cat.percent}%` }}
              className={`${cat.color} transition-all duration-500`}
              title={`${cat.label}: ${cat.percent}%`}
            />
          ))}
        </div>
        <div className="flex items-center justify-between text-[11px] text-slate-400 font-semibold px-1">
          <span>Stays {categories[0].percent}%</span>
          <span>Food {categories[1].percent}%</span>
          <span>Activities {categories[3].percent}%</span>
        </div>
      </div>

      {/* Itemized List */}
      <div className="space-y-3 pt-2">
        {categories.map((cat, idx) => (
          <div key={idx} className="flex items-center justify-between p-3 rounded-2xl bg-slate-50 hover:bg-orange-50/50 transition-colors">
            <div className="flex items-center gap-3">
              <div className={`w-8 h-8 rounded-xl text-white ${cat.color} flex items-center justify-center`}>
                <cat.icon className="w-4 h-4" />
              </div>
              <div>
                <span className="text-xs font-bold text-slate-800 block">{cat.label}</span>
                <span className="text-[10px] text-slate-500 font-medium">{cat.percent}% of total budget</span>
              </div>
            </div>
            
            <div className="text-sm font-extrabold text-slate-900 flex items-center">
              <IndianRupee className="w-3.5 h-3.5 text-emerald-600 inline" />
              {Number(cat.amount).toLocaleString('en-IN')}
            </div>
          </div>
        ))}
      </div>

      {/* Total Card Footer */}
      <div className="p-4 rounded-2xl bg-gradient-to-r from-brand-orange to-brand-golden text-white flex items-center justify-between shadow-md">
        <div>
          <span className="text-xs font-bold text-yellow-100 uppercase tracking-wider block">Estimated Total Cost</span>
          <span className="text-2xl font-extrabold">₹{Number(breakdown.totalEstimated).toLocaleString('en-IN')}</span>
        </div>
        <div className="text-right">
          <span className="text-[10px] font-medium text-yellow-100 block">Per Person ~ ₹{Math.round(breakdown.totalEstimated / travelersCount).toLocaleString('en-IN')}</span>
          <span className="text-[10px] font-bold bg-white/20 px-2 py-0.5 rounded-full inline-block mt-1">Non-binding Estimate</span>
        </div>
      </div>

    </div>
  );
}
