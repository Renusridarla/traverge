import Destination from '../models/Destination.js';
import { indianDestinations, internationalDestinations } from '../seed/destinationsData.js';

const allSeedDestinations = [...indianDestinations, ...internationalDestinations];

function filterSeedDestinations({ type, state, country, category, search, maxBudget, popular }) {
  let list = allSeedDestinations;

  if (type) {
    list = list.filter(d => d.type === type);
  }
  if (state && state !== 'All') {
    list = list.filter(d => d.state && d.state.toLowerCase().includes(state.toLowerCase()));
  }
  if (country && country !== 'All') {
    list = list.filter(d => d.country && d.country.toLowerCase().includes(country.toLowerCase()));
  }
  if (category && category !== 'All') {
    list = list.filter(d => d.category && d.category.toLowerCase().includes(category.toLowerCase()));
  }
  if (popular === 'true') {
    list = list.filter(d => d.isPopular);
  }
  if (search) {
    const s = search.toLowerCase();
    list = list.filter(d =>
      (d.name && d.name.toLowerCase().includes(s)) ||
      (d.state && d.state.toLowerCase().includes(s)) ||
      (d.country && d.country.toLowerCase().includes(s)) ||
      (d.category && d.category.toLowerCase().includes(s))
    );
  }
  if (maxBudget) {
    list = list.filter(d => d.estimatedBudgetINR <= Number(maxBudget));
  }

  return list;
}

// Get all destinations with search, filter (type, state, country, category, budget, maxPrice)
export const getDestinations = async (req, res) => {
  try {
    const { type, state, country, category, search, minBudget, maxBudget, popular } = req.query;

    const query = {};

    if (type) query.type = type;
    if (state && state !== 'All') query.state = { $regex: state, $options: 'i' };
    if (country && country !== 'All') query.country = { $regex: country, $options: 'i' };
    if (category && category !== 'All') query.category = { $regex: category, $options: 'i' };
    if (popular === 'true') query.isPopular = true;

    if (search) {
      query.$or = [
        { name: { $regex: search, $options: 'i' } },
        { state: { $regex: search, $options: 'i' } },
        { country: { $regex: search, $options: 'i' } },
        { category: { $regex: search, $options: 'i' } }
      ];
    }

    if (maxBudget) {
      query.estimatedBudgetINR = { $lte: Number(maxBudget) };
    }

    let destinations = [];
    try {
      destinations = await Destination.find(query).sort({ isPopular: -1, rating: -1 });
    } catch (dbErr) {
      console.warn('[Destination DB Notice] Using seed fallback data');
    }

    if (!destinations || destinations.length === 0) {
      destinations = filterSeedDestinations(req.query);
    }

    res.json({ success: true, count: destinations.length, data: destinations });
  } catch (err) {
    const fallbackData = filterSeedDestinations(req.query);
    res.json({ success: true, count: fallbackData.length, data: fallbackData });
  }
};

// Get single destination by ID or Name
export const getDestinationById = async (req, res) => {
  try {
    const { id } = req.params;
    let destination;

    try {
      if (id.match(/^[0-9a-fA-F]{24}$/)) {
        destination = await Destination.findById(id);
      } else {
        destination = await Destination.findOne({ name: { $regex: id, $options: 'i' } });
      }
    } catch (dbErr) {
      console.warn('[Destination DB Notice] Using seed fallback for ID search');
    }

    if (!destination) {
      const idDecoded = decodeURIComponent(id).toLowerCase();
      destination = allSeedDestinations.find(
        d => d._id === id || (d.name && d.name.toLowerCase() === idDecoded)
      ) || allSeedDestinations.find(
        d => d.name && d.name.toLowerCase().includes(idDecoded)
      );
    }

    if (!destination) {
      return res.status(404).json({ success: false, message: 'Destination not found' });
    }

    res.json({ success: true, data: destination });
  } catch (err) {
    const idDecoded = decodeURIComponent(req.params.id || '').toLowerCase();
    const destination = allSeedDestinations.find(
      d => d.name && d.name.toLowerCase().includes(idDecoded)
    );
    if (destination) {
      return res.json({ success: true, data: destination });
    }
    res.status(500).json({ success: false, message: err.message });
  }
};
