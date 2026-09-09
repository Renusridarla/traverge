import mongoose from 'mongoose';
import dotenv from 'dotenv';
import Destination from '../models/Destination.js';
import Hotel from '../models/Hotel.js';
import { indianDestinations, internationalDestinations } from './destinationsData.js';
import { hotelsData } from './hotelsData.js';
import { connectDB } from '../config/db.js';

dotenv.config();

export const seedDatabase = async () => {
  try {
    const existingDest = await Destination.countDocuments();
    if (existingDest > 0) {
      console.log(`[Seeder] Database already populated with ${existingDest} destinations.`);
      return;
    }

    console.log('[Seeder] Clearing old records and populating seed data...');
    await Destination.deleteMany({});
    await Hotel.deleteMany({});

    const allDestinations = [...indianDestinations, ...internationalDestinations];
    await Destination.insertMany(allDestinations);
    await Hotel.insertMany(hotelsData);

    console.log(`[Seeder] Successfully seeded ${allDestinations.length} destinations (${indianDestinations.length} Indian, ${internationalDestinations.length} International) and ${hotelsData.length} hotels!`);
  } catch (err) {
    console.error(`[Seeder Error]: ${err.message}`);
  }
};

// If run directly from command line (node seed/seeder.js)
if (process.argv[1] && process.argv[1].endsWith('seeder.js')) {
  (async () => {
    await connectDB();
    await seedDatabase();
    process.exit(0);
  })();
}
