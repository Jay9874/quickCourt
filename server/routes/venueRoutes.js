const express = require('express')
const {
  fetchVenuesByParams,
  fetchVenuesByCity
} = require('../controllers/venueControllers')
const router = express.Router()

router.get('/', fetchVenuesByParams)
router.get('/city', fetchVenuesByCity)

module.exports = router
