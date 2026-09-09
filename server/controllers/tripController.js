import Trip from '../models/Trip.js';
import { generateItinerary } from '../services/itineraryGenerator.js';
import { fetchWeatherData } from '../services/weatherService.js';

// POST /api/itinerary - Generate itinerary dynamically
export const createItinerary = async (req, res) => {
  try {
    const { destination, budget, dates, duration, travelers, travelStyles } = req.body;

    const destName = destination || 'Manali';
    
    // Fetch live weather context
    const weather = await fetchWeatherData(destName);
    
    // Generate itinerary object
    const result = await generateItinerary({
      destinationName: destName,
      budgetINR: Number(budget) || 25000,
      durationDays: Number(duration) || 3,
      travelers: travelers || { adults: 2, children: 0 },
      travelStyles: travelStyles || ['Adventure', 'Nature'],
      weatherCondition: weather.condition
    });

    res.json({
      success: true,
      data: {
        ...result,
        weather
      }
    });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};

// Save a planned trip
export const saveTrip = async (req, res) => {
  try {
    const tripData = req.body;
    const trip = new Trip(tripData);
    await trip.save();
    res.status(201).json({ success: true, data: trip });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};

// Get trip by ID
export const getTripById = async (req, res) => {
  try {
    const trip = await Trip.findById(req.params.id);
    if (!trip) {
      return res.status(404).json({ success: false, message: 'Trip not found' });
    }
    res.json({ success: true, data: trip });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};
