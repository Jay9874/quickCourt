const express = require('express')
const {
  fetchVenuesByCity,
  fetchVenuesByParams
} = require('../controllers/venueControllers')
const router = express.Router()

router.get('/city', fetchVenuesByCity)

router.get('/', fetchVenuesByParams)

module.exports = router
