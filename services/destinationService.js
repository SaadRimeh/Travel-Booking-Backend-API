const Destination = require('../models/Destination');

exports.getAllDestinations = async () => {
  try {
    const destinations = await Destination.find();
    console.log('Database destinations:', destinations);
    
    // If no destinations in database, return mock data
    if (destinations.length === 0) {
      console.log('No destinations in database, returning mock data');
      const mockDestinations = [
        {
          _id: "1",
          name: "Paris",
          description: "The city of lights.",
          image: "https://images.unsplash.com/photo-1502602898535-892dd25850e4?w=500"
        },
        {
          _id: "2", 
          name: "Tokyo",
          description: "A blend of tradition and innovation.",
          image: "https://images.unsplash.com/photo-1540959733332-eab4deabeeaf?w=500"
        },
        {
          _id: "3",
          name: "New York",
          description: "The city that never sleeps.",
          image: "https://images.unsplash.com/photo-1496442226666-8d4d0e62e6e9?w=500"
        },
        {
          _id: "4",
          name: "London",
          description: "Historic and modern metropolis.",
          image: "https://images.unsplash.com/photo-1513635269975-59663e0ac1ad?w=500"
        }
      ];
      console.log('Returning mock destinations:', mockDestinations);
      return mockDestinations;
    }
    
    console.log('Returning database destinations:', destinations);
    return destinations;
  } catch (error) {
    console.error('Error in getAllDestinations:', error);
    // Return mock data even if there's an error
    return [
      {
        _id: "1",
        name: "Paris",
        description: "The city of lights.",
        image: "https://images.unsplash.com/photo-1502602898535-892dd25850e4?w=500"
      },
      {
        _id: "2", 
        name: "Tokyo",
        description: "A blend of tradition and innovation.",
        image: "https://images.unsplash.com/photo-1540959733332-eab4deabeeaf?w=500"
      },
      {
        _id: "3",
        name: "New York",
        description: "The city that never sleeps.",
        image: "https://images.unsplash.com/photo-1496442226666-8d4d0e62e6e9?w=500"
      },
      {
        _id: "4",
        name: "London",
        description: "Historic and modern metropolis.",
        image: "https://images.unsplash.com/photo-1513635269975-59663e0ac1ad?w=500"
      }
    ];
  }
}; 