const express = require('express')
const {
  fetchVenuesByCity,
  fetchVenuesByParams,
  fetchVenuesById
} = require('../controllers/venueControllers')
const router = express.Router()

router.get('/', fetchVenuesByParams)
router.get('/city', fetchVenuesByCity)

router.get('/', fetchVenuesByParams)

// Get a venue by its id
router.get('/:venueId', fetchVenuesById)

module.exports = router
