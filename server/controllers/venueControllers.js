const Venue = require('../models/Venue')

exports.fetchVenuesByCity = async (req, res) => {
  const { city} = req.query

  if (!city) {
    return res.status(400).json({ message: 'City is required' })
  }

  try {
    const venues = await Venue.find({
      city: { $regex: new RegExp(`^${city}`, 'i') }
    })

    // 4. (Optional) Get total count for pagination UI
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
  } catch (err) {
    return res.status(500).json({ error: 'something went wrong' })
  }
}

exports.fetchVenuesByParams = async (req, res) => {
  const {
    searchTerm,
    selectedSport,
    selectedPrice,
    selectedVenueType,
    selectedRating,
    page = 1,
    venuesPerPage = 6
  } = req.query

  if (!req.query) {
    return res
      .status(400)
      .json({ message: 'Please provide the search parameters' })
  }

  try {
    // 1. Build the filter object
    const filter = {}

    // Text search: 'searchTerm'
    if (searchTerm) {
      // This creates a regex to find the searchTerm in the venue name, case-insensitive
      filter.name = { $regex: searchTerm, $options: 'i' }
    }

    // Exact match filters
    if (selectedSport) {
      filter.sport = selectedSport
    }
    if (selectedVenueType) {
      filter.venueType = selectedVenueType
    }

    // Price range filter
    if (selectedPrice) {
      if (selectedPrice === 'low') {
        filter.price = { $gte: 0, $lte: 1500 }
      } else if (selectedPrice === 'medium') {
        filter.price = { $gte: 1501, $lte: 2500 }
      } else {
        filter.price = { $gte: 2501 }
      }
    }

    // Rating filter
    if (selectedRating) {
      // Assuming selectedRating is a minimum value, e.g., '4'
      filter.rating = { $gte: Number(selectedRating) }
    }

    // 2. Configure pagination
    const limit = parseInt(venuesPerPage)
    const skip = (parseInt(page) - 1) * limit

    // 3. Execute the query
    const venues = await Venue.find(filter)
      .sort({ name: 1 })
      .skip(skip)
      .limit(limit)
      .exec()

    // 4. (Optional) Get total count for pagination UI
    const totalCount = await Venue.countDocuments(filter)

    if (!venues || venues.length === 0) {
      return res.status(404).json({
        error: `We could not find any venue with your search terms.`
      })
    }
    return res.status(200).json({
      venues: venues,
      totalPages: totalCount
    })
  } catch (err) {
    return res.status(500).json({ error: 'something went wrong' })
  }
}
