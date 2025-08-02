const express = require('express');
const router = express.Router();
const flightController = require('../controllers/flightController');
const { flightSearchValidation } = require('../utils/validators');

router.post('/flights-search', flightSearchValidation, flightController.searchFlights);

module.exports = router; 