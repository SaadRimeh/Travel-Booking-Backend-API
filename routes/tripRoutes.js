const express = require('express');
const router = express.Router();
const tripController = require('../controllers/tripController');
const { tripBookValidation } = require('../utils/validators');

router.post('/trip-book', tripBookValidation, tripController.bookTrip);

module.exports = router; 