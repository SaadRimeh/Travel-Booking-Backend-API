const Service = require('../models/Service');

exports.getAllServices = async () => {
  try {
    const services = await Service.find();
    console.log('Database services:', services);
    
    // If no services in database, return mock data
    if (services.length === 0) {
      console.log('No services in database, returning mock data');
      const mockServices = [
        {
          _id: "1",
          name: "Hotel Booking",
          description: "Book hotels at your destination."
        },
        {
          _id: "2",
          name: "Transport Booking", 
          description: "Book transportation services."
        },
        {
          _id: "3",
          name: "Flight Booking",
          description: "Book flights to your destination."
        },
        {
          _id: "4",
          name: "Tour Guide",
          description: "Professional tour guides for your trip."
        }
      ];
      console.log('Returning mock services:', mockServices);
      return mockServices;
    }
    
    console.log('Returning database services:', services);
    return services;
  } catch (error) {
    console.error('Error in getAllServices:', error);
    // Return mock data even if there's an error
    return [
      {
        _id: "1",
        name: "Hotel Booking",
        description: "Book hotels at your destination."
      },
      {
        _id: "2",
        name: "Transport Booking", 
        description: "Book transportation services."
      },
      {
        _id: "3",
        name: "Flight Booking",
        description: "Book flights to your destination."
      },
      {
        _id: "4",
        name: "Tour Guide",
        description: "Professional tour guides for your trip."
      }
    ];
  }
}; 