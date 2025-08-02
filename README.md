#  Travel Booking Backend API

A comprehensive Node.js backend API for a travel booking and management system. This API provides endpoints for user authentication, flight search, trip booking, destination management, and various travel services.

## 🚀 Features

- **User Authentication**: Register and login with JWT token-based authentication
- **Flight Search**: Search for available flights with filtering options
- **Trip Booking**: Book trips with traveler information and payment methods
- **Destination Management**: Get available travel destinations with descriptions and images
- **Service Management**: Access various travel services (hotel, transport, tour guide)
- **Transport Booking**: Book transportation services with pickup/dropoff locations
- **Hotel Booking**: Reserve hotel rooms with check-in/check-out dates
- **Newsletter Subscription**: Subscribe to travel newsletters
- **Database Seeding**: Automatic seeding with sample data on startup

## 🛠️ Tech Stack

- **Runtime**: Node.js
- **Framework**: Express.js
- **Database**: MongoDB with Mongoose ODM
- **Authentication**: JWT (JSON Web Tokens)
- **Password Hashing**: bcryptjs
- **Validation**: express-validator
- **CORS**: Cross-origin resource sharing enabled
- **Environment**: dotenv for configuration

## 📋 Prerequisites

- Node.js (v14 or higher)
- MongoDB (local or cloud instance)
- npm or yarn package manager

## 🚀 Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd BackendNodejs
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Environment Setup**
   Create a `.env` file in the root directory:
   ```env
   PORT=5000
   MONGODB_URI=mongodb://localhost:27017/travel_booking (for EXAMPLE)
   JWT_SECRET=your_jwt_secret_key_here
   ```

4. **Start the server**
   ```bash
   # Development mode (with nodemon)
   npm run dev
   
   # Production mode
   npm start
   ```

The server will start on `http://localhost:5000` (or the port specified in your `.env` file).

## 📊 Database Schema

The API uses the following MongoDB collections:

- **users** - User registration and authentication data
- **destinations** - Available travel destinations with descriptions and images
- **services** - Available travel services (hotel, transport, flight, tour guide)
- **flights** - Flight search data with routes, dates, and pricing
- **trips** - Trip bookings with traveler information
- **transportbookings** - Transportation service bookings
- **hotelbookings** - Hotel room reservations
- **newsletters** - Newsletter subscription data

## 🔧 API Endpoints

### Authentication
- `POST /api/register` - User registration
- `POST /api/login` - User login

### Flight Management
- `POST /api/flights-search` - Search for available flights

### Trip Booking
- `POST /api/trip-book` - Book a trip

### Destinations
- `GET /api/destination` - Get all available destinations

### Services
- `GET /api/services` - Get all available services

### Newsletter
- `POST /api/subscribe` - Subscribe to newsletter

### Transport Booking
- `POST /api/transport_booking` - Book transportation service

### Hotel Booking
- `POST /api/hotel_booking` - Book hotel room

### Test
- `GET /api/test` - Test server connectivity

## 📖 API Documentation

For detailed API documentation including request/response examples, validation rules, and error codes, see [API_DOCUMENTATION.md](./API_DOCUMENTATION.md).

## 🗄️ Database Seeding

The application automatically seeds the database with sample data on startup if collections are empty:

- **4 Destinations**: Paris, Tokyo, New York, London
- **4 Services**: Hotel Booking, Transport Booking, Flight Booking, Tour Guide
- **5 Flights**: Various routes with different pricing
- **Sample Trips**: 2 example trip bookings
- **Sample Bookings**: Transport and hotel booking examples

## 🔐 Authentication

The API uses JWT (JSON Web Tokens) for authentication:

- Tokens expire after 24 hours
- All API responses include a JWT token
- Protected endpoints require valid authentication
- Password hashing with bcryptjs for security

## 📝 Validation

All endpoints include comprehensive input validation:

- Email format validation
- Password strength requirements (minimum 6 characters)
- Date format validation (ISO8601)
- Required field validation
- Payment method validation (credit card, paypal, bank transfer)

## 🚦 Status Codes

- `200` - Success (GET, POST for actions like booking, subscribing)
- `201` - Resource created (register, login)
- `400` - Bad request (validation or business logic error)
- `500` - Server error

## 🏗️ Project Structure

```
azizBackendNodejs/
├── config/
│   └── db.js                 # Database configuration
├── controllers/
│   ├── authController.js      # Authentication logic
│   ├── destinationController.js
│   ├── flightController.js
│   ├── newsletterController.js
│   ├── serviceController.js
│   └── tripController.js
├── models/
│   ├── Destination.js
│   ├── Flight.js
│   ├── HotelBooking.js
│   ├── Newsletter.js
│   ├── Service.js
│   ├── TransportBooking.js
│   ├── Trip.js
│   └── User.js
├── routes/
│   ├── authRoutes.js
│   ├── destinationRoutes.js
│   ├── flightRoutes.js
│   ├── newsletterRoutes.js
│   ├── serviceRoutes.js
│   └── tripRoutes.js
├── services/
│   ├── authService.js
│   ├── destinationService.js
│   ├── flightService.js
│   ├── newsletterService.js
│   ├── serviceService.js
│   └── tripService.js
├── utils/
│   └── validators.js         # Input validation utilities
├── index.js                  # Main server file
├── package.json
└── API_DOCUMENTATION.md
```

## 🧪 Testing

Test the server connectivity:
```bash
curl http://localhost:5000/api/test
```

Expected response:
```json
{
  "message": "Server is working!"
}
```

## 🔧 Development

### Running in Development Mode
```bash
npm run dev
```

This uses nodemon for automatic server restart on file changes.

### Environment Variables
Make sure to set up your `.env` file with the following variables:
- `PORT`: Server port (default: 5000)
- `MONGODB_URI`: MongoDB connection string
- `JWT_SECRET`: Secret key for JWT token generation


## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📞 Support

For support and questions, please open an issue in the repository or contact the development team.
Email : Saad.rimeh.01@gmail.com

---

**Happy Traveling! ✈️🌍** 
