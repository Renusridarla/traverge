import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Sun, CloudRain, Snowflake, Wind, Droplets, MapPin, Cloud, Compass } from 'lucide-react';

export default function WeatherWidget({ initialCity = 'Manali' }) {
  const [city, setCity] = useState(initialCity);
  const [searchCity, setSearchCity] = useState(initialCity);
  const [weather, setWeather] = useState(null);
  const [loading, setLoading] = useState(true);

  const fetchWeather = async (cityName) => {
    setLoading(true);
    try {
      const res = await axios.get(`/api/weather/${encodeURIComponent(cityName)}`);
      if (res.data?.success) {
        setWeather(res.data.data);
      }
    } catch (err) {
      console.warn('Weather fetch failed, using sample data');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchWeather(city);
  }, [city]);

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    if (searchCity.trim()) setCity(searchCity.trim());
  };

  return (
    <div className="bg-white rounded-2xl p-6 shadow-card border border-gray-200/80 space-y-6">
      
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-gray-100">
        <div>
          <span className="text-xs font-bold text-[#853953] uppercase tracking-wider block">
            Weather Intelligence
          </span>
          <h2 className="text-xl font-bold text-[#2C2C2C]">Destination Weather</h2>
        </div>

        <form onSubmit={handleSearchSubmit} className="flex items-center gap-2">
          <div className="relative">
            <MapPin className="w-3.5 h-3.5 text-gray-400 absolute left-3 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={searchCity}
              onChange={(e) => setSearchCity(e.target.value)}
              placeholder="Search city e.g. Goa, Paris"
              className="pl-8 pr-3 py-1.5 rounded-lg bg-[#F3F4F4] border border-gray-300 text-[#2C2C2C] text-xs font-semibold focus:outline-none focus:ring-2 focus:ring-[#853953]"
            />
          </div>
          <button
            type="submit"
            className="px-3.5 py-1.5 rounded-lg bg-[#853953] text-white text-xs font-semibold hover:opacity-90 transition-all"
          >
            Check
          </button>
        </form>
      </div>

      {loading ? (
        <div className="py-8 text-center text-xs text-[#2C2C2C]/60 font-medium">
          Loading weather details...
        </div>
      ) : !weather ? (
        <div className="py-8 text-center text-xs text-red-500 font-medium">
          Weather unavailable for this city.
        </div>
      ) : (
        <div className="space-y-6">
          
          {/* Main Weather Card */}
          <div className="bg-[#2C2C2C] rounded-xl p-6 text-white shadow-xs relative overflow-hidden">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-6">
              <div>
                <span className="text-[10px] font-bold text-[#E2B4BD] uppercase tracking-wider">
                  {weather.country || 'Destination'}
                </span>
                <h3 className="text-2xl font-bold mt-0.5">{weather.city}</h3>
                <p className="text-xs text-gray-300 font-medium capitalize mt-1">
                  {weather.description} • Feels like {weather.feelsLike}°C
                </p>
              </div>

              <div className="flex items-baseline gap-2">
                <span className="text-4xl font-extrabold text-[#F3F4F4]">{weather.temp}°C</span>
              </div>
            </div>

            {/* Metrics */}
            <div className="grid grid-cols-3 gap-3 pt-4 mt-4 border-t border-gray-700/60 text-center">
              <div className="bg-white/10 rounded-lg p-2.5">
                <Droplets className="w-4 h-4 mx-auto mb-1 text-sky-300" />
                <span className="text-[10px] font-semibold text-gray-300 block">Humidity</span>
                <span className="text-xs font-bold">{weather.humidity}%</span>
              </div>

              <div className="bg-white/10 rounded-lg p-2.5">
                <Wind className="w-4 h-4 mx-auto mb-1 text-emerald-300" />
                <span className="text-[10px] font-semibold text-gray-300 block">Wind</span>
                <span className="text-xs font-bold">{weather.windSpeed} km/h</span>
              </div>

              <div className="bg-white/10 rounded-lg p-2.5">
                <CloudRain className="w-4 h-4 mx-auto mb-1 text-indigo-300" />
                <span className="text-[10px] font-semibold text-gray-300 block">Rain Chance</span>
                <span className="text-xs font-bold">{weather.rainProbability}%</span>
              </div>
            </div>
          </div>

          {/* Activity Recommendations */}
          {weather.activityRecommendations && (
            <div className="space-y-3">
              <h3 className="text-sm font-bold text-[#2C2C2C]">
                Recommended Activities for Weather Conditions:
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
                {weather.activityRecommendations.recommendations.map((rec, idx) => (
                  <div key={idx} className="p-3 rounded-lg bg-[#F3F4F4] border border-gray-200 space-y-1">
                    <h4 className="text-xs font-bold text-[#2C2C2C] flex items-center gap-1">
                      <Compass className="w-3.5 h-3.5 text-[#853953]" />
                      <span>{rec.name}</span>
                    </h4>
                    <p className="text-[11px] text-[#2C2C2C]/70 font-normal leading-relaxed">{rec.desc}</p>
                  </div>
                ))}
              </div>
            </div>
          )}

        </div>
      )}

    </div>
  );
}
