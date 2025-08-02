const flightService = require('../services/flightService');
const { validationResult } = require('express-validator');
const jwt = require('jsonwebtoken');

exports.searchFlights = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ error: errors.array()[0].msg });
  }
  
  const { destination, date, numberOfTravelers } = req.body;
  
  try {
    const flights = await flightService.searchFlights({ destination, date, numberOfTravelers });
    
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
          flights,
          token: token
        });
      }
    );
  } catch (err) {
    return res.status(400).json({ error: err.message });
  }
}; 