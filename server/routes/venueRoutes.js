const express = require('express')
const { fetchVenuesByCity } = require('../controllers/venueControllers')
const router = express.Router()

router.get('/', fetchVenuesByCity)

module.exports = router
