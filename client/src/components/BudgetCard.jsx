import React from 'react';
import { IndianRupee, PieChart, Building, Utensils, Car, Ticket, Info } from 'lucide-react';

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
    { label: 'Accommodation Stays', amount: breakdown.accommodation, icon: Building, color: 'bg-[#853953]', percent: Math.round((breakdown.accommodation / breakdown.totalEstimated) * 100) || 35 },
    { label: 'Food & Dining', amount: breakdown.food, icon: Utensils, color: 'bg-[#612D53]', percent: Math.round((breakdown.food / breakdown.totalEstimated) * 100) || 25 },
    { label: 'Transport', amount: breakdown.transport, icon: Car, color: 'bg-[#2C2C2C]', percent: Math.round((breakdown.transport / breakdown.totalEstimated) * 100) || 15 },
    { label: 'Activities', amount: breakdown.activities, icon: Ticket, color: 'bg-rose-700', percent: Math.round((breakdown.activities / breakdown.totalEstimated) * 100) || 18 },
    { label: 'Other Expenses', amount: breakdown.miscellaneous, icon: Info, color: 'bg-gray-500', percent: Math.round((breakdown.miscellaneous / breakdown.totalEstimated) * 100) || 7 }
  ];

  return (
    <div className="bg-white rounded-2xl p-6 shadow-card border border-gray-200/80 space-y-6">
      
      {/* Header */}
      <div className="flex items-center justify-between pb-4 border-b border-gray-100">
        <div className="flex items-center gap-2.5">
          <div className="w-9 h-9 rounded-lg bg-[#853953]/10 text-[#853953] flex items-center justify-center font-bold">
            <PieChart className="w-5 h-5" />
          </div>
          <div>
            <h3 className="text-lg font-bold text-[#2C2C2C]">Trip Budget Summary</h3>
            <p className="text-xs text-[#2C2C2C]/60 font-medium">{durationDays} Days • {travelersCount} Traveler(s)</p>
          </div>
        </div>

        <span className="text-[11px] font-semibold bg-[#F3F4F4] text-[#853953] px-2.5 py-1 rounded border border-gray-200">
          Estimated Trip Cost
        </span>
      </div>

      {/* Visual Progress Bar */}
      <div className="space-y-1.5">
        <div className="h-3 w-full bg-gray-100 rounded-full overflow-hidden flex shadow-inner">
          {categories.map((cat, idx) => (
            <div
              key={idx}
              style={{ width: `${cat.percent}%` }}
              className={`${cat.color}`}
              title={`${cat.label}: ${cat.percent}%`}
            />
          ))}
        </div>
        <div className="flex items-center justify-between text-[10px] text-[#2C2C2C]/60 font-semibold px-1">
          <span>Stays {categories[0].percent}%</span>
          <span>Food {categories[1].percent}%</span>
          <span>Transport {categories[2].percent}%</span>
          <span>Activities {categories[3].percent}%</span>
        </div>
      </div>

      {/* Itemized List */}
      <div className="space-y-2.5 pt-1">
        {categories.map((cat, idx) => (
          <div key={idx} className="flex items-center justify-between p-2.5 rounded-lg bg-[#F3F4F4] border border-gray-200/60">
            <div className="flex items-center gap-2.5">
              <div className={`w-7 h-7 rounded text-white ${cat.color} flex items-center justify-center`}>
                <cat.icon className="w-3.5 h-3.5" />
              </div>
              <span className="text-xs font-semibold text-[#2C2C2C]">{cat.label}</span>
            </div>
            
            <div className="text-xs font-bold text-[#2C2C2C] flex items-center">
              <IndianRupee className="w-3 h-3 text-[#853953] inline" />
              {Number(cat.amount).toLocaleString('en-IN')}
            </div>
          </div>
        ))}
      </div>

      {/* Total Card */}
      <div className="p-4 rounded-xl bg-gradient-to-r from-[#853953] to-[#612D53] text-white flex items-center justify-between shadow-xs">
        <div>
          <span className="text-[10px] font-semibold text-gray-200 uppercase tracking-wider block">Estimated Total</span>
          <span className="text-xl font-bold">₹{Number(breakdown.totalEstimated).toLocaleString('en-IN')}</span>
        </div>
        <div className="text-right">
          <span className="text-[10px] text-gray-200 block">Per Person ~ ₹{Math.round(breakdown.totalEstimated / travelersCount).toLocaleString('en-IN')}</span>
        </div>
      </div>

    </div>
  );
}
