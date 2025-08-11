const Venue = require('../models/Venue')

exports.fetchVenuesByCity = async (req, res) => {
  const { city } = req.query
  if (!city) {
    return res.status(400).json({ message: 'City is required' });
  }

  try {
    const venues = await Venue.find({ city: { $regex: new RegExp(`^${city}`, 'i') } });

    if (!venues || venues.length === 0) {
      return res.status(404).json({ error: `Venues in cities starting with "${city}" could not be found` });
    }

    return res.status(200).json(venues);
  }
  catch (err) {
    return res.status(500).json({ error: 'something went wrong' })
  }
}