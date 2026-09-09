import mongoose from 'mongoose';

const attractionSchema = new mongoose.Schema({
  name: { type: String, required: true },
  description: { type: String },
  category: { type: String },
  estimatedCost: { type: Number, default: 0 },
  weatherSuitability: { type: String, default: 'All Weather' } // Sunny, Indoor, Outdoor, Rainy
});

const destinationSchema = new mongoose.Schema({
  name: { type: String, required: true, unique: true },
  state: { type: String, default: '' },
  country: { type: String, required: true, default: 'India' },
  type: { type: String, enum: ['indian', 'international'], required: true, default: 'indian' },
  description: { type: String, required: true },
  shortDescription: { type: String },
  category: { type: String, required: true }, // e.g. Heritage, Beach, Mountain, Wildlife, Urban, Resort
  budgetTier: { type: String, enum: ['Budget', 'Mid-Range', 'Luxury'], default: 'Mid-Range' },
  estimatedBudgetINR: { type: Number, required: true },
  recommendedDays: { type: Number, default: 3 },
  bestTime: { type: String, required: true },
  activities: [{ type: String }],
  attractions: [attractionSchema],
  weatherOverview: { type: String },
  image: { type: String, required: true },
  flagEmoji: { type: String, default: '🇮🇳' },
  isPopular: { type: Boolean, default: false },
  rating: { type: Number, default: 4.5 }
}, { timestamps: true });

export default mongoose.model('Destination', destinationSchema);
