const Booking = require('../models/Booking');

// Get all bookings for the logged-in user
exports.getMyBookings = async (req, res) => {
  try {
    const bookings = await Booking.find({ user: req.user._id });
    res.json({ bookings });
  } catch (err) {
    res.status(500).json({ message: 'Failed to fetch bookings' });
  }
};

// Cancel a booking
exports.cancelBooking = async (req, res) => {
  try {
    const booking = await Booking.findOne({ _id: req.params.id, user: req.user._id });
    if (!booking) return res.status(404).json({ message: 'Booking not found' });
    booking.status = 'Cancelled';
    await booking.save();
    res.json({ message: 'Booking cancelled', booking });
  } catch (err) {
    res.status(500).json({ message: 'Failed to cancel booking' });
  }
};
