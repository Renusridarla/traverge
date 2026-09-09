import Hotel from '../models/Hotel.js';

export const getHotels = async (req, res) => {
  try {
    const { destination, category, minPrice, maxPrice, minRating, sort, search } = req.query;

    const query = {};

    if (destination) {
      query.destination = { $regex: destination, $options: 'i' };
    }

    if (category) {
      query.category = { $regex: category, $options: 'i' };
    }

    if (minPrice || maxPrice) {
      query.pricePerNight = {};
      if (minPrice) query.pricePerNight.$gte = Number(minPrice);
      if (maxPrice) query.pricePerNight.$lte = Number(maxPrice);
    }

    if (minRating) {
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

    const hotels = await Hotel.find(query).sort(sortOptions);
    res.json({ success: true, count: hotels.length, data: hotels });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};

export const getHotelById = async (req, res) => {
  try {
    const hotel = await Hotel.findById(req.params.id);
    if (!hotel) {
      return res.status(404).json({ success: false, message: 'Hotel not found' });
    }
    res.json({ success: true, data: hotel });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};
