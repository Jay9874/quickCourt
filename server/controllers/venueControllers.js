const Venue = require('../models/Venue')

exports.fetchVenuesByParams = async (req, res) => {
  const {
    searchTerm = '',
    selectedSport,
    selectedPrice,
    selectedVenueType,
    selectedRating,
    city,
    page = 1,
    venuesPerPage = 6,
  } = req.query;

  if (!req.query) {
    return res.status(400).json({ message: 'Please provide the search parameters' });
  }

  try {
    const query = {};

    if (searchTerm) {
      query.$or = [
        { name: { $regex: searchTerm, $options: 'i' } },
        { description: { $regex: searchTerm, $options: 'i' } },
      ];
    }

    if (selectedSport) {
      query.$or = query.$or || [];
      query.$or.push({ 'courts.sport': selectedSport });
    }

    if (selectedPrice) {
      let priceFilter = {};
      if (selectedPrice === 'low') {
        priceFilter = { $gte: 0, $lte: 1500 };
      }
      else if (selectedPrice === 'medium') {
        priceFilter = { $gte: 1501, $lte: 2500 };
      }
      else if (selectedPrice === 'high') {
        priceFilter = { $gte: 2501 };
      }

      query.courts = {
        $elemMatch: {
          price: priceFilter,
        },
      };
    }

    if (city) {
      query.city = { $regex: city, $options: 'i' };
    }

    // if (selectedVenueType) {
    //   query.venueType = selectedVenueType;
    // }

    // if (selectedRating) {
    //   query.rating = { $gte: Number(selectedRating) };
    // }

    const pageNum = parseInt(page, 10) || 1;
    const limit = parseInt(venuesPerPage, 10) || 6;
    const skip = (pageNum - 1) * limit;

    const totalCount = await Venue.countDocuments(query);

    const venues = await Venue.find(query)
      .skip(skip)
      .limit(limit)
      .sort({ createdAt: -1 });

    const totalPages = Math.ceil(totalCount / limit);

    return res.status(200).json({
      venues,
      totalPages,
      currentPage: pageNum
    });
  }
  catch (err) {
    return res.status(500).json({ error: 'Something went wrong' });
  }
};

exports.fetchVenuesByCity = async (req, res) => {
  const { city } = req.query

  if (!city) {
    return res.status(400).json({ message: 'City is required' })
  }

  try {
    const venues = await Venue.find({
      city: { $regex: new RegExp(`^${city}`, 'i') }
    })

    const totalCount = await Venue.countDocuments()

    if (!venues || venues.length === 0) {
      return res.status(404).json({
        error: `Venues in cities starting with "${city}" could not be found`
      })
    }

    return res.status(200).json({
      venues: venues,
      totalPages: totalCount
    })
  }
  catch (err) {
    return res.status(500).json({ error: 'something went wrong' })
  }
}
// Get a venue by its id
exports.fetchVenuesById = async (req, res) => {
  try {
    const { venueId } = req.params
    const venues = await Venue.findById(venueId)

    if (!venues || venues.length === 0) {
      return res.status(404).json({
        error: `Venue could not be found with the id`
      })
    }

    console.log('the venue is: ', venues)
    return res.status(200).json(venues)
  } catch (err) {
    console.log('Err while fetching a venue by its id: ', err)
    return res.status(500).json({
      error: 'something went wrong.'
    })
  }
}
