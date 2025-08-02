const Flight = require('../models/Flight');

exports.searchFlights = async ({ destination, date, numberOfTravelers }) => {
  const flights = await Flight.find({
    destination,
    date: new Date(date),
    availableSeats: { $gte: numberOfTravelers },
  });
  
  // If no flights in database, return mock data
  if (flights.length === 0) {
    return [
      {
        _id: "1",
        origin: "London",
        destination: destination,
        date: new Date(date),
        availableSeats: 50,
        price: 300
      },
      {
        _id: "2", 
        origin: "New York",
        destination: destination,
        date: new Date(date),
        availableSeats: 30,
        price: 450
      },
      {
        _id: "3",
        origin: "Tokyo",
        destination: destination,
        date: new Date(date),
        availableSeats: 25,
        price: 600
      }
    ];
  }
  
  return flights;
}; 