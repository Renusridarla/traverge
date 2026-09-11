import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Sun, CloudRain, Snowflake, Wind, Droplets, MapPin, Cloud, Compass, Search } from 'lucide-react';

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
    <div className="interactive-card bg-[#131920]/90 backdrop-blur-xl rounded-2xl p-6 sm:p-8 shadow-card-dark border border-[#232E3C] hover:border-[#FFF449]/50 transition-all duration-300 space-y-6">
      
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-[#232E3C]">
        <div>
          <span className="text-xs font-extrabold text-[#FFF449] uppercase tracking-wider block">
            Weather Intelligence
          </span>
          <h2 className="text-xl font-bold text-white">Destination Weather</h2>
        </div>

        <form onSubmit={handleSearchSubmit} className="flex items-center gap-2">
          <div className="relative">
            <MapPin className="w-3.5 h-3.5 text-[#B2D959] absolute left-3 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={searchCity}
              onChange={(e) => setSearchCity(e.target.value)}
              placeholder="Search city e.g. Goa, Paris"
              className="pl-8 pr-3 py-2 rounded-xl bg-[#0B0F14] border border-[#232E3C] text-white text-xs font-semibold focus:outline-none focus:ring-2 focus:ring-[#FFF449] transition-all"
            />
          </div>
          <button
            type="submit"
            className="px-4 py-2 rounded-xl bg-gradient-brand hover:bg-gradient-brand-hover text-[#0B0F14] text-xs font-extrabold shadow-glow-yellow transition-all flex items-center gap-1"
          >
            <Search className="w-3.5 h-3.5" />
            <span>Check</span>
          </button>
        </form>
      </div>

      {loading ? (
        <div className="py-8 text-center text-xs text-gray-400 font-medium">
          Loading weather details...
        </div>
      ) : !weather ? (
        <div className="py-8 text-center text-xs text-red-400 font-medium">
          Weather unavailable for this city.
        </div>
      ) : (
        <div className="space-y-6">
          
          {/* Main Weather Card */}
          <div className="bg-[#1A222C] rounded-xl p-6 text-white border border-[#232E3C] shadow-md relative overflow-hidden">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-6">
              <div>
                <span className="text-[10px] font-extrabold text-[#B2D959] uppercase tracking-wider">
                  {weather.country || 'Destination'}
                </span>
                <h3 className="text-2xl font-black mt-0.5">{weather.city}</h3>
                <p className="text-xs text-gray-300 font-medium capitalize mt-1">
                  {weather.description} • Feels like {weather.feelsLike}°C
                </p>
              </div>

              <div className="flex items-baseline gap-2">
                <span className="text-4xl font-black text-gradient-brand">{weather.temp}°C</span>
              </div>
            </div>

            {/* Metrics */}
            <div className="grid grid-cols-3 gap-3 pt-4 mt-4 border-t border-[#232E3C] text-center">
              <div className="bg-[#0B0F14] rounded-xl p-3 border border-[#232E3C]">
                <Droplets className="w-4 h-4 mx-auto mb-1 text-[#FFF449]" />
                <span className="text-[10px] font-semibold text-gray-400 block">Humidity</span>
                <span className="text-xs font-bold text-white">{weather.humidity}%</span>
              </div>

              <div className="bg-[#0B0F14] rounded-xl p-3 border border-[#232E3C]">
                <Wind className="w-4 h-4 mx-auto mb-1 text-[#B2D959]" />
                <span className="text-[10px] font-semibold text-gray-400 block">Wind</span>
                <span className="text-xs font-bold text-white">{weather.windSpeed} km/h</span>
              </div>

              <div className="bg-[#0B0F14] rounded-xl p-3 border border-[#232E3C]">
                <CloudRain className="w-4 h-4 mx-auto mb-1 text-[#7EC151]" />
                <span className="text-[10px] font-semibold text-gray-400 block">Rain Chance</span>
                <span className="text-xs font-bold text-white">{weather.rainProbability}%</span>
              </div>
            </div>
          </div>

          {/* Activity Recommendations */}
          {weather.activityRecommendations && (
            <div className="space-y-3">
              <h3 className="text-sm font-bold text-white">
                Recommended Activities for Weather Conditions:
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
                {weather.activityRecommendations.recommendations.map((rec, idx) => (
                  <div key={idx} className="p-3.5 rounded-xl bg-[#0B0F14] border border-[#232E3C] space-y-1 hover:border-[#B2D959]/40 transition-colors">
                    <h4 className="text-xs font-bold text-[#FFF449] flex items-center gap-1.5">
                      <Compass className="w-3.5 h-3.5 text-[#B2D959]" />
                      <span>{rec.name}</span>
                    </h4>
                    <p className="text-[11px] text-gray-400 font-normal leading-relaxed">{rec.desc}</p>
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
