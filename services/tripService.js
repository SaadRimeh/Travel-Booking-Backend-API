const Trip = require('../models/Trip');

exports.bookTrip = async (tripData) => {
  const trip = new Trip(tripData);
  await trip.save();
  return trip;
}; 