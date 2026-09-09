import { fetchWeatherData, getWeatherBasedRecommendations } from '../services/weatherService.js';

export const getWeather = async (req, res) => {
  try {
    const { city } = req.params;
    const weather = await fetchWeatherData(city);
    const recommendations = getWeatherBasedRecommendations(weather.condition, weather.temp);

    res.json({
      success: true,
      data: {
        ...weather,
        activityRecommendations: recommendations
      }
    });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};
