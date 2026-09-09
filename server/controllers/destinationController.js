import Destination from '../models/Destination.js';

// Get all destinations with search, filter (type, state, country, category, budget, maxPrice)
export const getDestinations = async (req, res) => {
  try {
    const { type, state, country, category, search, minBudget, maxBudget, popular } = req.query;

    const query = {};

    if (type) query.type = type;
    if (state) query.state = { $regex: state, $options: 'i' };
    if (country) query.country = { $regex: country, $options: 'i' };
    if (category) query.category = { $regex: category, $options: 'i' };
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

    const destinations = await Destination.find(query).sort({ isPopular: -1, rating: -1 });
    res.json({ success: true, count: destinations.length, data: destinations });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};

// Get single destination by ID or Name
export const getDestinationById = async (req, res) => {
  try {
    const { id } = req.params;
    let destination;
    
    if (id.match(/^[0-9a-fA-F]{24}$/)) {
      destination = await Destination.findById(id);
    } else {
      destination = await Destination.findOne({ name: { $regex: id, $options: 'i' } });
    }

    if (!destination) {
      return res.status(404).json({ success: false, message: 'Destination not found' });
    }

    res.json({ success: true, data: destination });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};
