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
    { label: 'Accommodation Stays', amount: breakdown.accommodation, icon: Building, color: 'bg-[#FFF449]', percent: Math.round((breakdown.accommodation / breakdown.totalEstimated) * 100) || 35 },
    { label: 'Food & Dining', amount: breakdown.food, icon: Utensils, color: 'bg-[#B2D959]', percent: Math.round((breakdown.food / breakdown.totalEstimated) * 100) || 25 },
    { label: 'Transport', amount: breakdown.transport, icon: Car, color: 'bg-[#7EC151]', percent: Math.round((breakdown.transport / breakdown.totalEstimated) * 100) || 15 },
    { label: 'Activities', amount: breakdown.activities, icon: Ticket, color: 'bg-[#FED24F]', percent: Math.round((breakdown.activities / breakdown.totalEstimated) * 100) || 18 },
    { label: 'Other Expenses', amount: breakdown.miscellaneous, icon: Info, color: 'bg-gray-500', percent: Math.round((breakdown.miscellaneous / breakdown.totalEstimated) * 100) || 7 }
  ];

  return (
    <div className="interactive-card bg-[#131920]/90 backdrop-blur-xl rounded-2xl p-6 sm:p-8 shadow-card-dark border border-[#232E3C] hover:border-[#FFF449]/50 transition-all duration-300 space-y-6">
      
      {/* Header */}
      <div className="flex items-center justify-between pb-4 border-b border-[#232E3C]">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-gradient-brand text-[#0B0F14] flex items-center justify-center font-bold shadow-glow-yellow">
            <PieChart className="w-5 h-5" />
          </div>
          <div>
            <h3 className="text-lg font-bold text-white">Trip Budget Summary</h3>
            <p className="text-xs text-gray-400 font-medium">{durationDays} Days • {travelersCount} Traveler(s)</p>
          </div>
        </div>

        <span className="text-[11px] font-extrabold bg-[#0B0F14] text-[#B2D959] px-3 py-1 rounded-lg border border-[#232E3C]">
          Estimated Trip Cost
        </span>
      </div>

      {/* Visual Progress Bar */}
      <div className="space-y-2">
        <div className="h-3 w-full bg-[#0B0F14] rounded-full overflow-hidden flex border border-[#232E3C]">
          {categories.map((cat, idx) => (
            <div
              key={idx}
              style={{ width: `${cat.percent}%` }}
              className={`${cat.color}`}
              title={`${cat.label}: ${cat.percent}%`}
            />
          ))}
        </div>
        <div className="flex items-center justify-between text-[10px] text-gray-400 font-semibold px-1">
          <span>Stays {categories[0].percent}%</span>
          <span>Food {categories[1].percent}%</span>
          <span>Transport {categories[2].percent}%</span>
          <span>Activities {categories[3].percent}%</span>
        </div>
      </div>

      {/* Itemized List */}
      <div className="space-y-2.5 pt-1">
        {categories.map((cat, idx) => (
          <div key={idx} className="flex items-center justify-between p-3 rounded-xl bg-[#0B0F14] border border-[#232E3C] hover:border-[#232E3C]/80 transition-colors">
            <div className="flex items-center gap-3">
              <div className={`w-8 h-8 rounded-lg text-[#0B0F14] ${cat.color} flex items-center justify-center font-bold`}>
                <cat.icon className="w-4 h-4" />
              </div>
              <span className="text-xs font-bold text-white">{cat.label}</span>
            </div>
            
            <div className="text-xs font-extrabold text-white flex items-center">
              <IndianRupee className="w-3.5 h-3.5 text-[#FFF449] inline" />
              {Number(cat.amount).toLocaleString('en-IN')}
            </div>
          </div>
        ))}
      </div>

      {/* Total Card */}
      <div className="p-5 rounded-2xl bg-gradient-brand text-[#0B0F14] flex items-center justify-between shadow-glow-yellow">
        <div>
          <span className="text-[10px] font-extrabold uppercase tracking-wider block opacity-80">Estimated Total</span>
          <span className="text-2xl font-black">₹{Number(breakdown.totalEstimated).toLocaleString('en-IN')}</span>
        </div>
        <div className="text-right">
          <span className="text-xs font-extrabold block">Per Person ~ ₹{Math.round(breakdown.totalEstimated / travelersCount).toLocaleString('en-IN')}</span>
        </div>
      </div>

    </div>
  );
}
