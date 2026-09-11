import React from 'react';
import WeatherWidget from '../components/WeatherWidget';
import { Sun, CloudSun, MapPin, Sparkles, CloudRain, Snowflake } from 'lucide-react';

export default function WeatherPage() {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-8">
      
      {/* Header Banner */}
      <div className="interactive-card bg-[#131920] rounded-3xl p-8 lg:p-10 text-white shadow-card-dark border border-[#232E3C] space-y-3">
        <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-[#0B0F14] text-[#FFF449] border border-[#232E3C] text-xs font-extrabold uppercase tracking-wider">
          <CloudSun className="w-4 h-4 text-[#B2D959]" />
          <span>Weather Intelligence</span>
        </div>
        <h1 className="text-3xl sm:text-4xl font-black">Destination Weather & Recommendations</h1>
        <p className="text-sm font-normal text-gray-400 leading-relaxed max-w-3xl">
          Check real-time weather forecasts for any Indian or International travel spot and receive tailored outdoor vs indoor activity recommendations.
        </p>
      </div>

      {/* Main Interactive Weather Component */}
      <WeatherWidget initialCity="Manali" />

      {/* Seasonal Weather Tips */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="interactive-card bg-[#131920] rounded-3xl p-6 shadow-card-dark border border-[#232E3C] hover:border-[#FFF449]/50 transition-all duration-300 space-y-3">
          <div className="w-10 h-10 rounded-xl bg-gradient-brand text-[#0B0F14] flex items-center justify-center font-bold shadow-glow-yellow">
            <Sun className="w-5 h-5" />
          </div>
          <h3 className="text-lg font-bold text-white">Sunny Day Planning</h3>
          <p className="text-xs text-gray-400 font-normal leading-relaxed">
            Ideal for beach watersports, high-altitude trekking, architectural photo walks, and open-air sunset views.
          </p>
        </div>

        <div className="interactive-card bg-[#131920] rounded-3xl p-6 shadow-card-dark border border-[#232E3C] hover:border-[#B2D959]/50 transition-all duration-300 space-y-3">
          <div className="w-10 h-10 rounded-xl bg-gradient-brand text-[#0B0F14] flex items-center justify-center font-bold shadow-glow-yellow">
            <CloudRain className="w-5 h-5" />
          </div>
          <h3 className="text-lg font-bold text-white">Rainy Day Planning</h3>
          <p className="text-xs text-gray-400 font-normal leading-relaxed">
            Best suited for heritage museum tours, covered artisan craft bazaars, indoor theater, and cozy coffee tasting cafes.
          </p>
        </div>

        <div className="interactive-card bg-[#131920] rounded-3xl p-6 shadow-card-dark border border-[#232E3C] hover:border-[#7EC151]/50 transition-all duration-300 space-y-3">
          <div className="w-10 h-10 rounded-xl bg-gradient-brand text-[#0B0F14] flex items-center justify-center font-bold shadow-glow-yellow">
            <Snowflake className="w-5 h-5" />
          </div>
          <h3 className="text-lg font-bold text-white">Cold Weather Planning</h3>
          <p className="text-xs text-gray-400 font-normal leading-relaxed">
            Great for mountain panoramic viewpoints, hot thermal springs, fireside lounges, and steaming local culinary food walks.
          </p>
        </div>
      </div>

    </div>
  );
}
