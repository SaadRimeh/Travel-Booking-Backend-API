const express = require('express');
const router = express.Router();
const serviceController = require('../controllers/serviceController');

router.get('/services', serviceController.getAllServices);
router.post('/transport_booking', serviceController.bookTransport);
router.post('/hotel_booking', serviceController.bookHotel);

module.exports = router; 