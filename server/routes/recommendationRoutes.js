import express from 'express';
import { fetchRecommendations } from '../controllers/recommendationController.js';

const router = express.Router();

router.post('/', fetchRecommendations);

export default router;
