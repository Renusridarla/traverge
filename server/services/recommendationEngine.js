import Destination from '../models/Destination.js';
import Hotel from '../models/Hotel.js';

export const getRecommendations = async (params) => {
  const {
    budgetINR = 30000,
    destinationName = '',
    durationDays = 3,
    weatherCondition = 'Sunny',
    travelStyles = [],
    travelersCount = 1
  } = params;

  // Find destination if name provided, else fetch all matching styles/budget
  let destQuery = {};
  if (destinationName) {
    destQuery = { name: { $regex: destinationName, $options: 'i' } };
  }

  const dests = await Destination.find(destQuery).lean();
  
  // Sort destinations based on budget suitability & category match with travelStyles
  const scoredDests = dests.map(dest => {
    let score = 50;
    
    // Budget check
    if (dest.estimatedBudgetINR <= budgetINR) {
      score += 30;
    } else if (dest.estimatedBudgetINR <= budgetINR * 1.25) {
      score += 15;
    } else {
      score -= 20;
    }

    // Travel styles match
    if (travelStyles.length > 0) {
      const matchCount = travelStyles.filter(style => 
        dest.activities.some(act => act.toLowerCase().includes(style.toLowerCase())) ||
        dest.category.toLowerCase().includes(style.toLowerCase())
      ).length;
      score += matchCount * 15;
    }

    // Rating boost
    score += (dest.rating || 4.5) * 5;

    return { ...dest, matchScore: Math.round(score) };
  });

  scoredDests.sort((a, b) => b.matchScore - a.matchScore);

  // Recommended hotels for the top destination or search query
  const targetDestName = destinationName || (scoredDests[0] ? scoredDests[0].name : 'Goa');
  const hotels = await Hotel.find({
    destination: { $regex: targetDestName, $options: 'i' }
  }).sort({ rating: -1 }).limit(6).lean();

  return {
    topDestinations: scoredDests.slice(0, 6),
    recommendedHotels: hotels,
    querySummary: {
      budgetINR,
      durationDays,
      weatherCondition,
      travelStyles,
      travelersCount
    }
  };
};
