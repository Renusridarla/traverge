import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import { connectDB } from './config/db.js';
import { seedDatabase } from './seed/seeder.js';

import destinationRoutes from './routes/destinationRoutes.js';
import hotelRoutes from './routes/hotelRoutes.js';
import weatherRoutes from './routes/weatherRoutes.js';
import tripRoutes from './routes/tripRoutes.js';
import recommendationRoutes from './routes/recommendationRoutes.js';

dotenv.config();

const app = express();

// Middlewares
app.use(cors());
app.use(express.json());

// API Routes
app.use('/api/destinations', destinationRoutes);
app.use('/api/hotels', hotelRoutes);
app.use('/api/weather', weatherRoutes);
app.use('/api', tripRoutes);
app.use('/api/recommendations', recommendationRoutes);

// Health check endpoint
app.get('/api/health', (req, res) => {
  res.json({
    status: 'online',
    app: 'Traverge API',
    timestamp: new Date().toISOString()
  });
});

let PORT = parseInt(process.env.PORT, 10) || 5000;

// Initialize DB and Seeder
connectDB().then(() => {
  seedDatabase();
});

if (process.env.NODE_ENV !== 'production' || !process.env.VERCEL) {
  const listenOnPort = (portToTry) => {
    const server = app.listen(portToTry, () => {
      console.log(`[Traverge Server] Running on http://localhost:${portToTry}`);
    });

    server.on('error', (err) => {
      if (err.code === 'EADDRINUSE') {
        console.warn(`[Traverge Server] Port ${portToTry} is already in use. Trying port ${portToTry + 1}...`);
        listenOnPort(portToTry + 1);
      } else {
        console.error('[Traverge Server Error]:', err);
      }
    });
  };

  listenOnPort(PORT);
}

export default app;
