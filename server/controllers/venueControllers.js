const Venue = require('../models/Venue')

exports.fetchVenuesByCity = async (req, res) => {
  const { city } = req.query
  if (!city) {
    return res.status(400).json({ message: 'City is required' });
  }

  try {
    const venues = await Venue.find({ city });

    if (!venues) {
      return res.status(404).json({ error: `Venues in ${city} could not be found` });
    }

    return res.status(200).json(venues);
  }
  catch (err) {
    return res.status(500).json({ error: 'something went wrong' })
  }
}
