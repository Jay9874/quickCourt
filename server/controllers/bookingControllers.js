const Booking = require('../models/Booking')

// Get all bookings for the logged-in user
exports.getMyBookings = async (req, res) => {
  try {
    const bookings = await Booking.find({ user: req.user._id }).populate('venue','name address')
    res.status(200).json(bookings)
  } catch (err) {
    res.status(500).json({ message: 'Failed to fetch bookings' })
  }
}

// Cancel a booking
exports.cancelBooking = async (req, res) => {
  try {
    const booking = await Booking.findOne({
      _id: req.params.id,
      user: req.user._id
    })
    if (!booking) return res.status(404).json({ message: 'Booking not found' })
    booking.status = 'Cancelled'
    await booking.save()
    res.json({ message: 'Booking cancelled', booking })
  } catch (err) {
    res.status(500).json({ message: 'Failed to cancel booking' })
  }
}

// Create a new booking
exports.book = async (req, res) => {
  try {
    const { booking } = req.body
    if (!booking)
      return res.status(400).json({
        error: 'Please provide the booking details.'
      })
    const user = req.user._id
    const newBooking = { ...booking, user }

    const bookingResult = await Booking.insertOne(newBooking)

    if (!bookingResult)
      return res.status(404).json({ message: 'Could not book your courts.' })

    return res
      .status(200)
      .json({ message: 'Booking successful', bookingResult })
  } catch (err) {
    console.log('err at booking: ', err)
    return res.status(500).json({ message: 'Failed to book.' })
  }
}
