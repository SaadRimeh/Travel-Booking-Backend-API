const express = require('express');
const router = express.Router();
const destinationController = require('../controllers/destinationController');

router.get('/destination', destinationController.getAllDestinations);

module.exports = router; 