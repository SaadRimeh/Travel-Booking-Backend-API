const Service = require('../models/Service');
const TransportBooking = require('../models/TransportBooking');
const HotelBooking = require('../models/HotelBooking');
const jwt = require('jsonwebtoken');

exports.getAllServices = async (req, res) => {
  try {
    console.log('Service controller: getAllServices called');
    
    // Query MongoDB directly
    const services = await Service.find();
    console.log('Service controller: services from DB:', services);
    
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
        console.log('Service controller: sending response with DB services');
        res.status(200).json({ 
          services,
          token: token
        });
      }
    );
  } catch (err) {
    console.error('Service controller error:', err);
    return res.status(400).json({ error: err.message });
  }
};

exports.bookTransport = async (req, res) => {
  try {
    const { trip_datetime, pickup_location, dropoff_location, passenger_count, contact_info } = req.body;
    
    // Validate all required fields
    if (!trip_datetime) {
      return res.status(400).json({ error: "Trip datetime is required" });
    }
    if (!pickup_location) {
      return res.status(400).json({ error: "Pickup location is required" });
    }
    if (!dropoff_location) {
      return res.status(400).json({ error: "Dropoff location is required" });
    }
    if (!passenger_count || passenger_count < 1) {
      return res.status(400).json({ error: "Valid passenger count is required" });
    }
    if (!contact_info) {
      return res.status(400).json({ error: "Contact info is required" });
    }
    if (!contact_info.name) {
      return res.status(400).json({ error: "Contact name is required" });
    }
    if (!contact_info.phone_number) {
      return res.status(400).json({ error: "Contact phone number is required" });
    }
    if (!contact_info.email) {
      return res.status(400).json({ error: "Contact email is required" });
    }
    
    await TransportBooking.create({ trip_datetime, pickup_location, dropoff_location, passenger_count, contact_info });
    
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
          message: 'Booking successful',
          token: token
        });
      }
    );
  } catch (err) {
    return res.status(400).json({ error: 'Booking failed' });
  }
};

exports.bookHotel = async (req, res) => {
  try {
    const { check_in_date, check_out_date, guest_count, room_type, contact_info } = req.body;
    
    // Validate all required fields
    if (!check_in_date) {
      return res.status(400).json({ error: "Check-in date is required" });
    }
    if (!check_out_date) {
      return res.status(400).json({ error: "Check-out date is required" });
    }
    if (!guest_count || guest_count < 1) {
      return res.status(400).json({ error: "Valid guest count is required" });
    }
    if (!room_type) {
      return res.status(400).json({ error: "Room type is required" });
    }
    if (!contact_info) {
      return res.status(400).json({ error: "Contact info is required" });
    }
    if (!contact_info.name) {
      return res.status(400).json({ error: "Contact name is required" });
    }
    if (!contact_info.phone_number) {
      return res.status(400).json({ error: "Contact phone number is required" });
    }
    if (!contact_info.email) {
      return res.status(400).json({ error: "Contact email is required" });
    }
    
    await HotelBooking.create({ check_in_date, check_out_date, guest_count, room_type, contact_info });
    
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
          message: 'Hotel booking successful',
          token: token
        });
      }
    );
  } catch (err) {
    return res.status(400).json({ error: 'Hotel booking failed' });
  }
}; 