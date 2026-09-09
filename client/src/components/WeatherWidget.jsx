import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Sun, CloudRain, Snowflake, Wind, Droplets, Umbrella, Sparkles, MapPin } from 'lucide-react';

export default function WeatherWidget({ initialCity = 'Manali' }) {
  const [city, setCity] = useState(initialCity);
  const [searchCity, setSearchCity] = useState(initialCity);
  const [weather, setWeather] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchWeather = async (cityName) => {
    setLoading(true);
    setError(null);
    try {
      const res = await axios.get(`/api/weather/${encodeURIComponent(cityName)}`);
      if (res.data?.success) {
        setWeather(res.data.data);
      }
    } catch (err) {
      setError('Could not fetch weather for this destination.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchWeather(city);
  }, [city]);

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    if (searchCity.trim()) {
      setCity(searchCity.trim());
    }
  };

  return (
    <div className="bg-white rounded-3xl p-6 sm:p-8 shadow-glow border border-orange-100 space-y-6">
      
      {/* Header & Search */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-slate-100">
        <div>
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-100 text-amber-800 text-xs font-bold mb-1">
            <Sun className="w-3.5 h-3.5" />
            Live Weather Intelligence
          </div>
          <h2 className="text-2xl font-extrabold text-slate-900">Destination Weather</h2>
        </div>

        <form onSubmit={handleSearchSubmit} className="flex items-center gap-2">
          <div className="relative">
            <MapPin className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={searchCity}
              onChange={(e) => setSearchCity(e.target.value)}
              placeholder="Search city e.g. Goa, Paris"
              className="pl-9 pr-3 py-2 rounded-xl bg-slate-50 border border-slate-200 text-slate-800 text-xs font-bold focus:outline-none focus:ring-2 focus:ring-brand-orange"
            />
          </div>
          <button
            type="submit"
            className="px-4 py-2 rounded-xl bg-brand-orange text-white text-xs font-bold hover:bg-brand-orangeHover transition-all shadow-sm"
          >
            Check Weather
          </button>
        </form>
      </div>

      {loading ? (
        <div className="py-12 text-center text-slate-500 font-semibold animate-pulse">
          Fetching weather information...
        </div>
      ) : error || !weather ? (
        <div className="py-8 text-center text-red-500 font-medium">
          {error || 'Weather details unavailable.'}
        </div>
      ) : (
        <div className="space-y-6">
          
          {/* Main Weather Card Display */}
          <div className="bg-gradient-to-br from-brand-orange via-amber-500 to-brand-golden rounded-3xl p-6 text-white shadow-lg relative overflow-hidden">
            <div className="absolute right-4 top-4 text-6xl opacity-30 select-none">
              {weather.condition.toLowerCase().includes('rain') ? '🌧️' : (weather.temp < 15 ? '❄️' : '☀️')}
            </div>

            <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-6">
              <div>
                <span className="text-xs font-bold bg-white/20 backdrop-blur-md px-3 py-1 rounded-full uppercase tracking-wider">
                  {weather.country || 'Destination'}
                </span>
                <h3 className="text-3xl font-extrabold mt-1">{weather.city}</h3>
                <p className="text-sm font-medium text-yellow-100 capitalize mt-0.5">
                  {weather.description} • Feels like {weather.feelsLike}°C
                </p>
              </div>

              <div className="flex items-baseline gap-2">
                <span className="text-5xl lg:text-6xl font-extrabold">{weather.temp}°C</span>
                <span className="text-xs text-yellow-100 font-bold">H: {weather.tempMax}° / L: {weather.tempMin}°</span>
              </div>
            </div>

            {/* Weather Metrics Strip */}
            <div className="grid grid-cols-3 gap-3 pt-6 mt-6 border-t border-white/20 text-center">
              <div className="bg-white/10 backdrop-blur-md rounded-2xl p-3">
                <Droplets className="w-4 h-4 mx-auto mb-1 text-sky-200" />
                <span className="text-[10px] font-bold text-yellow-100 block uppercase">Humidity</span>
                <span className="text-sm font-extrabold">{weather.humidity}%</span>
              </div>

              <div className="bg-white/10 backdrop-blur-md rounded-2xl p-3">
                <Wind className="w-4 h-4 mx-auto mb-1 text-emerald-200" />
                <span className="text-[10px] font-bold text-yellow-100 block uppercase">Wind Speed</span>
                <span className="text-sm font-extrabold">{weather.windSpeed} km/h</span>
              </div>

              <div className="bg-white/10 backdrop-blur-md rounded-2xl p-3">
                <Umbrella className="w-4 h-4 mx-auto mb-1 text-amber-200" />
                <span className="text-[10px] font-bold text-yellow-100 block uppercase">Rain Chance</span>
                <span className="text-sm font-extrabold">{weather.rainProbability}%</span>
              </div>
            </div>
          </div>

          {/* Weather-Based Recommendations Section */}
          {weather.activityRecommendations && (
            <div className="space-y-4 pt-2">
              <div className="flex items-center gap-2">
                <Sparkles className="w-5 h-5 text-brand-orange" />
                <h3 className="text-lg font-extrabold text-slate-900">
                  {weather.activityRecommendations.title}
                </h3>
              </div>
              <p className="text-xs text-slate-600 font-medium">
                {weather.activityRecommendations.subtitle}
              </p>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 pt-1">
                {weather.activityRecommendations.recommendations.map((rec, idx) => (
                  <div
                    key={idx}
                    className="p-4 rounded-2xl bg-orange-50/50 border border-orange-100 hover:border-brand-orange hover:bg-orange-50 transition-all space-y-2"
                  >
                    <div className="text-2xl">{rec.icon}</div>
                    <h4 className="text-xs font-extrabold text-slate-900">{rec.name}</h4>
                    <p className="text-[11px] text-slate-500 font-medium leading-relaxed">{rec.desc}</p>
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
