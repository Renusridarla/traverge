import mongoose from 'mongoose';
import { MongoMemoryServer } from 'mongodb-memory-server';

let mongod = null;

export const connectDB = async () => {
  const uri = process.env.MONGODB_URI || 'mongodb://127.0.0.1:27017/traverge';
  try {
    // Attempt connecting to local/specified MongoDB daemon with short 2s timeout
    await mongoose.connect(uri, {
      serverSelectionTimeoutMS: 2000,
    });
    console.log(`[Database] MongoDB Connected to instance: ${mongoose.connection.host}`);
  } catch (err) {
    console.warn(`[Database] Local MongoDB daemon not detected (${err.message}). Starting MongoMemoryServer...`);
    try {
      mongod = await MongoMemoryServer.create();
      const mongoUri = mongod.getUri();
      await mongoose.connect(mongoUri);
      console.log(`[Database] MongoMemoryServer connected at ${mongoUri}`);
    } catch (fallbackErr) {
      console.error(`[Database] MongoMemoryServer notice: ${fallbackErr.message}`);
    }
  }
};
