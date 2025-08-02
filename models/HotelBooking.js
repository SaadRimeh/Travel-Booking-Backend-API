const mongoose = require('mongoose');

const contactInfoSchema = new mongoose.Schema({
  name: { type: String, required: true },
  phone_number: { type: String, required: true },
  email: { type: String, required: true },
}, { _id: false });

const hotelBookingSchema = new mongoose.Schema({
  check_in_date: { type: Date, required: true },
  check_out_date: { type: Date, required: true },
  guest_count: { type: Number, required: true },
  room_type: { type: String, required: true },
  contact_info: { type: contactInfoSchema, required: true },
});

module.exports = mongoose.model('HotelBooking', hotelBookingSchema); 