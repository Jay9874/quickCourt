const express = require('express')
const router = express.Router()
const {
  getMyBookings,
  cancelBooking,
  book
} = require('../controllers/bookingControllers')

// Get all bookings for the logged-in user
router.get('/', getMyBookings)

// Cancel a booking
router.put('/:id/cancel', cancelBooking)

// New booking

router.post('/', book)

module.exports = router
