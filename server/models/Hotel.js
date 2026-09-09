import mongoose from 'mongoose';

const hotelSchema = new mongoose.Schema({
  name: { type: String, required: true },
  destination: { type: String, required: true },
  country: { type: String, default: 'India' },
  location: { type: String, required: true },
  pricePerNight: { type: Number, required: true }, // in INR
  rating: { type: Number, default: 4.0 },
  reviewsCount: { type: Number, default: 120 },
  amenities: [{ type: String }],
  roomType: { type: String, default: 'Deluxe Room' },
  category: {
    type: String,
    enum: ['Budget', '3-Star', '4-Star', '5-Star', 'Luxury', 'Resort', 'Boutique', 'Hostel'],
    default: '3-Star'
  },
  image: { type: String, required: true },
  distanceFromCenter: { type: String, default: '1.5 km from center' },
  isSampleData: { type: Boolean, default: true }
}, { timestamps: true });

export default mongoose.model('Hotel', hotelSchema);
