const mongoose = require('mongoose')

const bookingSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  venue: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Venue',
    required: true
  },
  courts: [{ type: mongoose.Schema.Types.ObjectId, required: true }],
  duration: { type: Number, required: true },
  price: { type: Number, required: true },
  date: { type: String, required: true },
  startTime: { type: String, required: true },
  status: {
    type: String,
    enum: ['Confirmed', 'Cancelled'],
    default: 'Confirmed'
  }
})

module.exports = mongoose.model('Booking', bookingSchema)
