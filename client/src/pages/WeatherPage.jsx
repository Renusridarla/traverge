import React from 'react';
import WeatherWidget from '../components/WeatherWidget';
import { Sun, CloudSun, MapPin, Sparkles } from 'lucide-react';

export default function WeatherPage() {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-8">
      
      {/* Header Banner */}
      <div className="bg-gradient-to-r from-amber-400 via-orange-500 to-brand-golden rounded-3xl p-8 lg:p-10 text-white shadow-glow relative overflow-hidden">
        <div className="relative z-10 space-y-3 max-w-2xl">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/20 backdrop-blur-md text-white text-xs font-bold uppercase tracking-wider">
            <CloudSun className="w-3.5 h-3.5" />
            <span>Weather Intelligence</span>
          </div>
          <h1 className="text-3xl sm:text-4xl font-extrabold">Destination Weather & Recommendations</h1>
          <p className="text-sm font-medium text-yellow-100 leading-relaxed">
            Check real-time weather forecasts for any Indian or International travel spot and receive tailored outdoor vs indoor activity recommendations.
          </p>
        </div>
      </div>

      {/* Main Interactive Weather Component */}
      <WeatherWidget initialCity="Manali" />

      {/* Seasonal Weather Tips */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white rounded-3xl p-6 shadow-sm border border-orange-100 space-y-3">
          <div className="text-3xl">☀️</div>
          <h3 className="text-lg font-extrabold text-slate-900">Sunny Day Planning</h3>
          <p className="text-xs text-slate-600 font-medium leading-relaxed">
            Ideal for beach watersports, high-altitude trekking, architectural photo walks, and open-air sunset views.
          </p>
        </div>

        <div className="bg-white rounded-3xl p-6 shadow-sm border border-orange-100 space-y-3">
          <div className="text-3xl">🌧️</div>
          <h3 className="text-lg font-extrabold text-slate-900">Rainy Day Planning</h3>
          <p className="text-xs text-slate-600 font-medium leading-relaxed">
            Best suited for heritage museum tours, covered artisan craft bazaars, indoor theater, and cozy coffee tasting cafes.
          </p>
        </div>

        <div className="bg-white rounded-3xl p-6 shadow-sm border border-orange-100 space-y-3">
          <div className="text-3xl">❄️</div>
          <h3 className="text-lg font-extrabold text-slate-900">Cold Weather Planning</h3>
          <p className="text-xs text-slate-600 font-medium leading-relaxed">
            Great for mountain panoramic viewpoints, hot thermal springs, fireside lounges, and steaming local culinary food walks.
          </p>
        </div>
      </div>

    </div>
  );
}
