import { getRecommendations } from '../services/recommendationEngine.js';

export const fetchRecommendations = async (req, res) => {
  try {
    const result = await getRecommendations(req.body);
    res.json({ success: true, data: result });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};
