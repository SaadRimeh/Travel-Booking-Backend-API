const mongoose = require('mongoose');

const contactInfoSchema = new mongoose.Schema({
  name: { type: String, required: true },
  phone_number: { type: String, required: true },
  email: { type: String, required: true },
}, { _id: false });

const transportBookingSchema = new mongoose.Schema({
  trip_datetime: { type: Date, required: true },
  pickup_location: { type: String, required: true },
  dropoff_location: { type: String, required: true },
  passenger_count: { type: Number, required: true },
  contact_info: { type: contactInfoSchema, required: true },
});

module.exports = mongoose.model('TransportBooking', transportBookingSchema); 