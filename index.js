require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

const app = express();

// Middleware
app.use(express.json());
app.use(cors());

// Debug middleware to log all requests
app.use((req, res, next) => {
  console.log(`${req.method} ${req.url}`);
  next();
});

const connectDB = require('./config/db');

// Connect to MongoDB
connectDB();

// Import models for seeding
const Destination = require('./models/Destination');
const Flight = require('./models/Flight');
const Service = require('./models/Service');
const Trip = require('./models/Trip');
const TransportBooking = require('./models/TransportBooking');
const HotelBooking = require('./models/HotelBooking');

// Seed database with initial data
const seedDatabase = async () => {
  try {
    console.log('Seeding database with initial data...');

    // Seed Destinations
    const destinationCount = await Destination.countDocuments();
    if (destinationCount === 0) {
      await Destination.insertMany([
        {
          name: "Paris",
          description: "The city of lights.",
          image: "https://images.unsplash.com/photo-1502602898535-892dd25850e4?w=500"
        },
        {
          name: "Tokyo",
          description: "A blend of tradition and innovation.",
          image: "https://images.unsplash.com/photo-1540959733332-eab4deabeeaf?w=500"
        },
        {
          name: "New York",
          description: "The city that never sleeps.",
          image: "https://images.unsplash.com/photo-1496442226666-8d4d0e62e6e9?w=500"
        },
        {
          name: "London",
          description: "Historic and modern metropolis.",
          image: "https://images.unsplash.com/photo-1513635269975-59663e0ac1ad?w=500"
        }
      ]);
      console.log('✅ Destinations seeded');
    }

    // Seed Services
    const serviceCount = await Service.countDocuments();
    if (serviceCount === 0) {
      await Service.insertMany([
        {
          name: "Hotel Booking",
          description: "Book hotels at your destination."
        },
        {
          name: "Transport Booking",
          description: "Book transportation services."
        },
        {
          name: "Flight Booking",
          description: "Book flights to your destination."
        },
        {
          name: "Tour Guide",
          description: "Professional tour guides for your trip."
        }
      ]);
      console.log('✅ Services seeded');
    }

    // Seed Flights
    const flightCount = await Flight.countDocuments();
    if (flightCount === 0) {
      await Flight.insertMany([
        {
          origin: "London",
          destination: "Paris",
          date: new Date("2024-07-01"),
          availableSeats: 50,
          price: 300
        },
        {
          origin: "New York",
          destination: "Paris",
          date: new Date("2024-07-01"),
          availableSeats: 30,
          price: 450
        },
        {
          origin: "Tokyo",
          destination: "Paris",
          date: new Date("2024-07-01"),
          availableSeats: 25,
          price: 600
        },
        {
          origin: "London",
          destination: "Tokyo",
          date: new Date("2024-07-15"),
          availableSeats: 40,
          price: 800
        },
        {
          origin: "New York",
          destination: "London",
          date: new Date("2024-07-20"),
          availableSeats: 35,
          price: 550
        }
      ]);
      console.log('✅ Flights seeded');
    }

    // Seed Trips
    const tripCount = await Trip.countDocuments();
    if (tripCount === 0) {
      await Trip.insertMany([
        {
          name: "John Doe",
          dateOfBirth: new Date("1990-01-01"),
          idNumber: 123456789,
          numberOfTravelers: 2,
          paymentMethod: "credit card",
          destination: "Paris",
          tripDate: new Date("2024-07-01")
        },
        {
          name: "Jane Smith",
          dateOfBirth: new Date("1985-05-15"),
          idNumber: 987654321,
          numberOfTravelers: 1,
          paymentMethod: "paypal",
          destination: "Tokyo",
          tripDate: new Date("2024-07-15")
        }
      ]);
      console.log('✅ Trips seeded');
    }

    // Seed Transport Bookings
    const transportCount = await TransportBooking.countDocuments();
    if (transportCount === 0) {
      await TransportBooking.insertMany([
        {
          trip_datetime: new Date("2024-07-01T15:00:00"),
          pickup_location: "Airport Terminal 1",
          dropoff_location: "Downtown Hotel",
          passenger_count: 3,
          contact_info: {
            name: "John Doe",
            phone_number: "1234567890",
            email: "johndoe@example.com"
          }
        },
        {
          trip_datetime: new Date("2024-07-15T10:00:00"),
          pickup_location: "Hotel Lobby",
          dropoff_location: "Tourist Center",
          passenger_count: 2,
          contact_info: {
            name: "Jane Smith",
            phone_number: "9876543210",
            email: "janesmith@example.com"
          }
        }
      ]);
      console.log('✅ Transport Bookings seeded');
    }

    // Seed Hotel Bookings
    const hotelCount = await HotelBooking.countDocuments();
    if (hotelCount === 0) {
      await HotelBooking.insertMany([
        {
          check_in_date: new Date("2024-07-05"),
          check_out_date: new Date("2024-07-10"),
          guest_count: 2,
          room_type: "Double",
          contact_info: {
            name: "John Doe",
            phone_number: "1234567890",
            email: "johndoe@example.com"
          }
        },
        {
          check_in_date: new Date("2024-07-15"),
          check_out_date: new Date("2024-07-20"),
          guest_count: 1,
          room_type: "Single",
          contact_info: {
            name: "Jane Smith",
            phone_number: "9876543210",
            email: "janesmith@example.com"
          }
        }
      ]);
      console.log('✅ Hotel Bookings seeded');
    }

    console.log('🎉 Database seeding completed!');
  } catch (error) {
    console.error('Error seeding database:', error);
  }
};

// Test route
app.get('/api/test', (req, res) => {
  res.json({ message: 'Server is working!' });
});

// Import routes
app.use('/api', require('./routes/authRoutes'));
app.use('/api', require('./routes/flightRoutes'));
app.use('/api', require('./routes/tripRoutes'));
app.use('/api', require('./routes/destinationRoutes'));
app.use('/api', require('./routes/serviceRoutes'));
app.use('/api', require('./routes/newsletterRoutes'));

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
  // Seed database after server starts
  seedDatabase();
});
