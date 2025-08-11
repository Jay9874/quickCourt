const mongoose = require('mongoose');

const bookingSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  venueName: { type: String, required: true },
  sport: { type: String, required: true },
  date: { type: String, required: true },
  startTime: { type: String, required: true },
  endTime: { type: String, required: true },
  location: { type: String, required: true },
  status: { type: String, enum: ['Confirmed', 'Cancelled'], default: 'Confirmed' },
});

module.exports = mongoose.model('Booking', bookingSchema);
