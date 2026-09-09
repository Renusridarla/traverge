import mongoose from 'mongoose';

const activitySchema = new mongoose.Schema({
  timeSlot: { type: String, enum: ['Morning', 'Afternoon', 'Evening'], required: true },
  title: { type: String, required: true },
  place: { type: String, required: true },
  description: { type: String },
  estimatedCost: { type: Number, default: 0 },
  weatherSuitability: { type: String, default: 'Outdoor' },
  duration: { type: String, default: '2-3 hrs' }
});

const dayItinerarySchema = new mongoose.Schema({
  dayNumber: { type: Number, required: true },
  title: { type: String },
  activities: [activitySchema]
});

const tripSchema = new mongoose.Schema({
  destinationName: { type: String, required: true },
  budgetINR: { type: Number, required: true },
  startDate: { type: String },
  endDate: { type: String },
  durationDays: { type: Number, default: 3 },
  travelers: {
    adults: { type: Number, default: 1 },
    children: { type: Number, default: 0 }
  },
  travelStyles: [{ type: String }],
  weatherCondition: { type: String, default: 'Sunny' },
  itinerary: [dayItinerarySchema],
  costBreakdown: {
    accommodation: { type: Number, default: 0 },
    food: { type: Number, default: 0 },
    transport: { type: Number, default: 0 },
    activities: { type: Number, default: 0 },
    miscellaneous: { type: Number, default: 0 },
    totalEstimated: { type: Number, default: 0 }
  }
}, { timestamps: true });

export default mongoose.model('Trip', tripSchema);
