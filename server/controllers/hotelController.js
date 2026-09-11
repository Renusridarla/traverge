import Hotel from '../models/Hotel.js';
import { hotelsData } from '../seed/hotelsData.js';

function filterSeedHotels({ destination, category, minPrice, maxPrice, minRating, sort, search }) {
  let list = hotelsData;

  if (destination && destination !== 'All') {
    const destLower = destination.toLowerCase();
    list = list.filter(h => h.destination && h.destination.toLowerCase().includes(destLower));
  }

  if (category && category !== 'All') {
    const catLower = category.toLowerCase();
    list = list.filter(h => h.category && h.category.toLowerCase().includes(catLower));
  }

  if (minPrice) {
    list = list.filter(h => h.pricePerNight >= Number(minPrice));
  }

  if (maxPrice) {
    list = list.filter(h => h.pricePerNight <= Number(maxPrice));
  }

  if (minRating) {
    list = list.filter(h => h.rating >= Number(minRating));
  }

  if (search) {
    const s = search.toLowerCase();
    list = list.filter(h =>
      (h.name && h.name.toLowerCase().includes(s)) ||
      (h.destination && h.destination.toLowerCase().includes(s)) ||
      (h.location && h.location.toLowerCase().includes(s)) ||
      (h.category && h.category.toLowerCase().includes(s))
    );
  }

  if (sort === 'price_asc') {
    list = [...list].sort((a, b) => a.pricePerNight - b.pricePerNight);
  } else if (sort === 'price_desc') {
    list = [...list].sort((a, b) => b.pricePerNight - a.pricePerNight);
  } else if (sort === 'rating') {
    list = [...list].sort((a, b) => b.rating - a.rating);
  } else {
    list = [...list].sort((a, b) => b.rating - a.rating);
  }

  return list;
}

export const getHotels = async (req, res) => {
  try {
    const { destination, category, minPrice, maxPrice, minRating, sort, search } = req.query;

    const query = {};

    if (destination && destination !== 'All') {
      query.destination = { $regex: destination, $options: 'i' };
    }

    if (category && category !== 'All') {
      query.category = { $regex: category, $options: 'i' };
    }

    if (minPrice || maxPrice) {
      query.pricePerNight = {};
      if (minPrice) query.pricePerNight.$gte = Number(minPrice);
      if (maxPrice) query.pricePerNight.$lte = Number(maxPrice);
    }

    if (minRating && minRating !== '0') {
      query.rating = { $gte: Number(minRating) };
    }

    if (search) {
      query.$or = [
        { name: { $regex: search, $options: 'i' } },
        { destination: { $regex: search, $options: 'i' } },
        { location: { $regex: search, $options: 'i' } },
        { category: { $regex: search, $options: 'i' } }
      ];
    }

    let sortOptions = {};
    if (sort === 'price_asc') sortOptions = { pricePerNight: 1 };
    else if (sort === 'price_desc') sortOptions = { pricePerNight: -1 };
    else if (sort === 'rating') sortOptions = { rating: -1 };
    else sortOptions = { rating: -1, reviewsCount: -1 };

    let hotels = [];
    try {
      hotels = await Hotel.find(query).sort(sortOptions);
    } catch (dbErr) {
      console.warn('[Hotel DB Notice] Using seed fallback data');
    }

    if (!hotels || hotels.length === 0) {
      hotels = filterSeedHotels(req.query);
    }

    res.json({ success: true, count: hotels.length, data: hotels });
  } catch (err) {
    const fallbackData = filterSeedHotels(req.query);
    res.json({ success: true, count: fallbackData.length, data: fallbackData });
  }
};

export const getHotelById = async (req, res) => {
  try {
    let hotel = null;
    try {
      hotel = await Hotel.findById(req.params.id);
    } catch (dbErr) {
      console.warn('[Hotel DB Notice] Using seed fallback for ID');
    }

    if (!hotel) {
      hotel = hotelsData.find(h => h._id === req.params.id || h.name === req.params.id);
    }

    if (!hotel) {
      return res.status(404).json({ success: false, message: 'Hotel not found' });
    }
    res.json({ success: true, data: hotel });
  } catch (err) {
    const hotel = hotelsData.find(h => h._id === req.params.id || h.name === req.params.id);
    if (hotel) {
      return res.json({ success: true, data: hotel });
    }
    res.status(500).json({ success: false, message: err.message });
  }
};
