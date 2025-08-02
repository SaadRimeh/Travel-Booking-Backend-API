const express = require('express');
const router = express.Router();
const newsletterController = require('../controllers/newsletterController');
const { subscribeValidation } = require('../utils/validators');

router.post('/subscribe', subscribeValidation, newsletterController.subscribe);
router.post('/unsubscribe', subscribeValidation, newsletterController.unsubscribe);

module.exports = router; 