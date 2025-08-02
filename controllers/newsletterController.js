const express = require('express');
const jwt = require('jsonwebtoken');
const Newsletter = require('../models/Newsletter');

// @route   POST /api/subscribe
// @desc    Subscribe to newsletter
// @access  Public
const subscribe = async (req, res) => {
  try {
    const { email } = req.body;

    // Validate email
    if (!email) {
      return res.status(400).json({ 
        error: "Email is required" 
      });
    }

    // Email validation regex
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return res.status(400).json({ 
        error: "Please provide a valid email address" 
      });
    }

    // Check if already subscribed
    const existingSubscription = await Newsletter.findOne({ email });
    if (existingSubscription) {
      return res.status(400).json({ 
        error: "Already subscribed" 
      });
    }

    // Save to database
    const newsletter = new Newsletter({ email });
    await newsletter.save();

    console.log(`Newsletter subscription saved for: ${email}`);

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
          message: "Subscribed successfully",
          token: token
        });
      }
    );

  } catch (error) {
    console.error('Newsletter subscription error:', error);
    res.status(400).json({
      error: "Already subscribed"
    });
  }
};

// @route   POST /api/unsubscribe
// @desc    Unsubscribe from newsletter
// @access  Public
const unsubscribe = async (req, res) => {
  try {
    const { email } = req.body;

    if (!email) {
      return res.status(400).json({ 
        error: "Email is required" 
      });
    }

    // Remove from database
    const result = await Newsletter.findOneAndDelete({ email });
    
    if (!result) {
      return res.status(400).json({ 
        error: "Email not found in subscriptions" 
      });
    }

    console.log(`Newsletter unsubscription for: ${email}`);

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
          message: "Unsubscribed successfully",
          token: token
        });
      }
    );

  } catch (error) {
    console.error('Newsletter unsubscription error:', error);
    res.status(400).json({
      error: "Unsubscription failed"
    });
  }
};

module.exports = {
  subscribe,
  unsubscribe
}; 