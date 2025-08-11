const Venue = require('../models/Venue')
exports.fetchVenuesByCity = async (req, res) => {
  try {
    const { city } = req.query
    if (!city)
      return res.status(400).json({
        error: 'Please provide city name.'
      })

    const venues = await Venue.find({
      location: city
    })
    if (!venues)
      return res.status(404).json({
        error: 'Venues in city could not be found'
      })
    return res.status(200).json(venues)
  } catch (err) {
    return res.status(500).json({
      error: 'something went wrong.',
      data: null
    })
  }
}
