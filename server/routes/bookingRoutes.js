const express = require('express');
const router = express.Router();
const { getMyBookings, cancelBooking } = require('../controllers/bookingControllers');
const verifyUser = require('../middlewares/verifyUser');

// Get all bookings for the logged-in user
router.get('/me', verifyUser, getMyBookings);

// Cancel a booking
router.put('/:id/cancel', verifyUser, cancelBooking);

module.exports = router;
