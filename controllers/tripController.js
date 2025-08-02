const tripService = require('../services/tripService');
const { validationResult } = require('express-validator');
const jwt = require('jsonwebtoken');

exports.bookTrip = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ error: errors.array()[0].msg });
  }
  
  const { name, dateOfBirth, idNumber, numberOfTravelers, paymentMethod } = req.body;
  
  // Additional validation for required fields
  if (!name) {
    return res.status(400).json({ error: "Name is required" });
  }
  if (!dateOfBirth) {
    return res.status(400).json({ error: "Date of birth is required" });
  }
  if (!idNumber) {
    return res.status(400).json({ error: "ID number is required" });
  }
  if (!numberOfTravelers || numberOfTravelers < 1) {
    return res.status(400).json({ error: "Valid number of travelers is required" });
  }
  if (!paymentMethod) {
    return res.status(400).json({ error: "Payment method is required" });
  }
  if (!['credit card', 'paypal', 'bank transfer'].includes(paymentMethod)) {
    return res.status(400).json({ error: "Payment method must be one of: credit card, paypal, bank transfer" });
  }
  
  try {
    await tripService.bookTrip(req.body);
    
    // Create JWT token
    const payload = {
      user: {
        id: 'user_id_placeholder'
      }
    };

    jwt.sign(
      payload,
      process.env.JWT_SECRET || 'your-secret-key',
      { expiresIn: '24h' },
      (err, token) => {
        if (err) throw err;
        res.status(200).json({ 
          message: 'Trip booked successfully',
          token: token
        });
      }
    );
  } catch (err) {
    return res.status(400).json({ error: err.message });
  }
}; 