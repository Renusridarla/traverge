import Destination from '../models/Destination.js';
import Hotel from '../models/Hotel.js';

export const generateItinerary = async (params) => {
  const {
    destinationName = 'Manali',
    budgetINR = 25000,
    durationDays = 3,
    travelers = { adults: 2, children: 0 },
    travelStyles = ['Adventure', 'Nature'],
    weatherCondition = 'Sunny'
  } = params;

  const totalPeople = (Number(travelers.adults) || 1) + (Number(travelers.children) || 0);
  const days = Math.max(1, Math.min(10, Number(durationDays) || 3));

  // Fetch destination record
  let dest = await Destination.findOne({
    name: { $regex: destinationName, $options: 'i' }
  }).lean();

  if (!dest) {
    // Fallback template destination if not found in DB
    dest = {
      name: destinationName,
      state: 'Tourist Paradise',
      country: 'India',
      category: 'Sightseeing & Culture',
      estimatedBudgetINR: budgetINR,
      activities: ['Sightseeing', 'Local Food', 'Culture', 'Photography'],
      bestTime: 'Oct - Mar',
      attractions: [
        { name: `${destinationName} Central Square & Heritage Walk`, category: 'Heritage', estimatedCost: 300, weatherSuitability: 'All Weather' },
        { name: `${destinationName} Panoramic Viewpoint`, category: 'Nature', estimatedCost: 500, weatherSuitability: 'Sunny' },
        { name: `${destinationName} Local Craft Bazaar`, category: 'Shopping', estimatedCost: 400, weatherSuitability: 'Indoor' },
        { name: `${destinationName} Cultural Museum & Gallery`, category: 'Culture', estimatedCost: 250, weatherSuitability: 'Rainy' },
        { name: `${destinationName} Riverside Promenade & Gardens`, category: 'Relaxation', estimatedCost: 200, weatherSuitability: 'Sunny' },
        { name: `${destinationName} Sunset Point & Cafe`, category: 'Food', estimatedCost: 600, weatherSuitability: 'Sunny' }
      ]
    };
  }

  // Fetch sample hotel to calculate accommodation cost accurately
  const sampleHotel = await Hotel.findOne({
    destination: { $regex: dest.name, $options: 'i' }
  }).sort({ pricePerNight: 1 }).lean();

  const estPricePerNight = sampleHotel ? sampleHotel.pricePerNight : Math.round(budgetINR * 0.35 / days);
  
  // Calculate Cost Breakdown
  const accommodationCost = Math.round(estPricePerNight * (days - 1 > 0 ? days - 1 : 1));
  const foodCostPerDayPerPerson = Math.round(Math.max(500, (budgetINR * 0.25) / (days * totalPeople)));
  const totalFoodCost = foodCostPerDayPerPerson * days * totalPeople;

  const transportCost = Math.round(Math.max(1000, budgetINR * 0.15));
  const activitiesCost = Math.round(Math.max(1500, budgetINR * 0.18));
  const miscCost = Math.round(Math.max(1000, budgetINR * 0.07));
  
  const totalEstimatedCost = accommodationCost + totalFoodCost + transportCost + activitiesCost + miscCost;

  // Build Day-wise activities
  const attractions = dest.attractions && dest.attractions.length > 0 ? dest.attractions : [
    { name: `Historic City Tour of ${dest.name}`, category: 'Sightseeing', estimatedCost: 500, weatherSuitability: 'Sunny' },
    { name: `Popular Local Market & Shopping Street`, category: 'Shopping', estimatedCost: 300, weatherSuitability: 'Indoor' },
    { name: `Nature Trail & Botanical Gardens`, category: 'Nature', estimatedCost: 200, weatherSuitability: 'Sunny' },
    { name: `Iconic Landmark & Photo Spot`, category: 'Heritage', estimatedCost: 400, weatherSuitability: 'All Weather' },
    { name: `Local Specialty Food Walk`, category: 'Food', estimatedCost: 700, weatherSuitability: 'All Weather' },
    { name: `Scenic Sunset Point & Relaxation`, category: 'Relaxation', estimatedCost: 250, weatherSuitability: 'Sunny' }
  ];

  const itineraryDays = [];

  const weatherIsRainy = weatherCondition.toLowerCase().includes('rain');
  const weatherIsCold = weatherCondition.toLowerCase().includes('cold') || weatherCondition.toLowerCase().includes('snow');

  for (let i = 1; i <= days; i++) {
    const morningAttr = attractions[(i * 3 - 3) % attractions.length];
    const afternoonAttr = attractions[(i * 3 - 2) % attractions.length];
    const eveningAttr = attractions[(i * 3 - 1) % attractions.length];

    const morningActivity = {
      timeSlot: 'Morning',
      title: `${morningAttr.name}`,
      place: `${dest.name} - ${morningAttr.category || 'Sightseeing'} Zone`,
      description: weatherIsRainy && morningAttr.weatherSuitability === 'Outdoor' 
        ? `Explore ${morningAttr.name} with weather-proof gear or visit adjacent covered promenade.`
        : `Kick off Day ${i} with an invigorating visit to ${morningAttr.name}. Perfect morning light for photography!`,
      estimatedCost: Math.round(morningAttr.estimatedCost || 300) * totalPeople,
      weatherSuitability: weatherIsRainy ? 'Covered / Indoor' : (weatherIsCold ? 'Warm Attire Needed' : 'Sunny Outdoor'),
      duration: '3 Hours'
    };

    const afternoonActivity = {
      timeSlot: 'Afternoon',
      title: `Authentic Lunch & ${afternoonAttr.name}`,
      place: `${dest.name} Central District`,
      description: `Enjoy a delicious local meal followed by sightseeing at ${afternoonAttr.name}.`,
      estimatedCost: Math.round((afternoonAttr.estimatedCost || 400) + 400) * totalPeople,
      weatherSuitability: 'All Weather',
      duration: '3.5 Hours'
    };

    const eveningActivity = {
      timeSlot: 'Evening',
      title: `${eveningAttr.name} & Leisure Stroll`,
      place: `${dest.name} Downtown & Promenade`,
      description: `Unwind in the evening at ${eveningAttr.name}. Sample local snacks and enjoy the ambient evening vibe.`,
      estimatedCost: Math.round(eveningAttr.estimatedCost || 350) * totalPeople,
      weatherSuitability: weatherIsCold ? 'Fireside / Cozy Indoor' : 'Pleasant Evening Outdoor',
      duration: '2.5 Hours'
    };

    itineraryDays.push({
      dayNumber: i,
      title: `Day ${i}: Discovering ${dest.name} (${i === 1 ? 'Arrival & Exploration' : (i === days ? 'Final Sightseeing & Departure' : 'Deep Dive Experience')})`,
      activities: [morningActivity, afternoonActivity, eveningActivity]
    });
  }

  return {
    destination: dest.name,
    country: dest.country || 'India',
    state: dest.state || '',
    durationDays: days,
    travelersCount: totalPeople,
    travelStyles,
    weatherCondition,
    itinerary: itineraryDays,
    costBreakdown: {
      accommodation: accommodationCost,
      food: totalFoodCost,
      transport: transportCost,
      activities: activitiesCost,
      miscellaneous: miscCost,
      totalEstimated: totalEstimatedCost
    },
    sampleHotel
  };
};
