import express from 'express';
import { createItinerary, saveTrip, getTripById } from '../controllers/tripController.js';

const router = express.Router();

router.post('/itinerary', createItinerary);
router.post('/trips', saveTrip);
router.get('/trips/:id', getTripById);

export default router;
