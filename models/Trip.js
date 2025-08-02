const mongoose = require('mongoose');

const tripSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: false },
  name: { type: String, required: true },
  dateOfBirth: { type: Date, required: true },
  idNumber: { type: Number, required: true },
  numberOfTravelers: { type: Number, required: true },
  paymentMethod: { type: String, enum: ['credit card', 'paypal', 'bank transfer'], required: true },
  createdAt: { type: Date, default: Date.now },
});

module.exports = mongoose.model('Trip', tripSchema); 