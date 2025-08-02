const Destination = require('../models/Destination');
const jwt = require('jsonwebtoken');

exports.getAllDestinations = async (req, res) => {
  try {
    console.log('Destination controller: getAllDestinations called');
    
    // Query MongoDB directly
    const destinations = await Destination.find();
    console.log('Destination controller: destinations from DB:', destinations);
    
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
        console.log('Destination controller: sending response with DB destinations');
        res.status(200).json({ 
          destinations,
          token: token
        });
      }
    );
  } catch (err) {
    console.error('Destination controller error:', err);
    return res.status(400).json({ error: err.message });
  }
}; 