# Travel Booking API Documentation

Base URL: `/api`

**Note:** All API responses include a JWT token for authentication.

---

## 1. Authentication

### Register
- **POST** `/api/register`
- **Body:**
```json
{
  "username": "john_doe",
  "email": "john@example.com",
  "password": "password123",
  "confirmPassword": "password123"
}
```
- **Success Response:**
  - Status: 201
  - Body: `{ "message": "Registration successful" }`
- **Failure Response:**
  - Status: 400
  - Body: `{ "error": "Email already registered" }`

### Login
- **POST** `/api/login`
- **Body:**
```json
{
  "email": "john@example.com",
  "password": "password123"
}
```
- **Success Response:**
  - Status: 201
  - Body: `{ "message": "Login successful", "token": "<jwt_token>" }`
- **Failure Response:**
  - Status: 400
  - Body: `{ "error": "Invalid credentials" }`

---

## 2. Flight Search

### Search Flights
- **POST** `/api/flights-search`
- **Body:**
```json
{
  "destination": "Paris",
  "date": "2024-07-01",
  "numberOfTravelers": 2
}
```
- **Success Response:**
  - Status: 200
  - Body:
```json
{
  "flights": [
    {
      "_id": "...",
      "origin": "London",
      "destination": "Paris",
      "date": "2024-07-01T00:00:00.000Z",
      "availableSeats": 50,
      "price": 300
    }
  ],
  "token": "<jwt_token>"
}
```
- **Failure Response:**
  - Status: 400
  - Body: `{ "error": "..." }`

---

## 3. Book a Trip

### Book Trip
- **POST** `/api/trip-book`
- **Body:**
```json
{
  "name": "John Doe",
  "dateOfBirth": "1990-01-01",
  "idNumber": 123456789,
  "numberOfTravelers": 2,
  "paymentMethod": "credit card"
}
```
- **Success Response:**
  - Status: 200
  - Body: `{ "message": "Trip booked successfully", "token": "<jwt_token>" }`
- **Failure Response:**
  - Status: 400
  - Body: `{ "error": "..." }`

**Note:** Trip data is saved to MongoDB `trips` collection.

---

## 4. Get Destinations

### Get Destinations
- **GET** `/api/destination`
- **Success Response:**
  - Status: 200
  - Body:
```json
{
  "destinations": [
    {
      "_id": "...",
      "name": "Paris",
      "description": "The city of lights.",
      "image": "https://images.unsplash.com/photo-1502602898535-892dd25850e4?w=500"
    }
  ],
  "token": "<jwt_token>"
}
```

---

## 5. Get Services

### Get Services
- **GET** `/api/services`
- **Success Response:**
  - Status: 200
  - Body:
```json
{
  "services": [
    {
      "_id": "...",
      "name": "Hotel Booking",
      "description": "Book hotels at your destination."
    }
  ],
  "token": "<jwt_token>"
}
```

---

## 6. Subscribe to Newsletter

### Subscribe
- **POST** `/api/subscribe`
- **Body:**
```json
{
  "email": "john@example.com"
}
```
- **Success Response:**
  - Status: 200
  - Body: `{ "message": "Subscribed successfully", "token": "<jwt_token>" }`
- **Failure Response:**
  - Status: 400
  - Body: `{ "error": "Already subscribed" }`

**Note:** Newsletter subscriptions are saved to MongoDB `newsletters` collection.

---

## 7. Transport Booking

### Book Transport
- **POST** `/api/transport_booking`
- **Body:**
```json
{
  "trip_datetime": "2025-08-01T15:00:00",
  "pickup_location": "Location A",
  "dropoff_location": "Location B",
  "passenger_count": 3,
  "contact_info": {
    "name": "John Doe",
    "phone_number": "1234567890",
    "email": "johndoe@example.com"
  }
}
```
- **Success Response:**
  - Status: 200
  - Body: `{ "message": "Booking successful", "token": "<jwt_token>" }`
- **Failure Response:**
  - Status: 400
  - Body: `{ "error": "Booking failed" }`

**Note:** Transport bookings are saved to MongoDB `transportbookings` collection.

---

## 8. Hotel Booking

### Book Hotel
- **POST** `/api/hotel_booking`
- **Body:**
```json
{
  "check_in_date": "2025-08-05",
  "check_out_date": "2025-08-10",
  "guest_count": 2,
  "room_type": "Double",
  "contact_info": {
    "name": "Jane Smith",
    "phone_number": "9876543210",
    "email": "janesmith@example.com"
  }
}
```
- **Success Response:**
  - Status: 200
  - Body: `{ "message": "Hotel booking successful", "token": "<jwt_token>" }`
- **Failure Response:**
  - Status: 400
  - Body: `{ "error": "Hotel booking failed" }`

**Note:** Hotel bookings are saved to MongoDB `hotelbookings` collection.

---

## 9. Test Endpoint

### Test Server
- **GET** `/api/test`
- **Success Response:**
  - Status: 200
  - Body: `{ "message": "Server is working!" }`

---

## Database Collections

The API uses the following MongoDB collections:

- **users** - User registration and authentication
- **destinations** - Available travel destinations
- **services** - Available travel services
- **flights** - Flight search data
- **trips** - Trip bookings
- **transportbookings** - Transport service bookings
- **hotelbookings** - Hotel bookings
- **newsletters** - Newsletter subscriptions

---

## Validation Notes
- All endpoints validate input and return 400 with details on validation errors.
- Dates must be in ISO8601 format (e.g., `YYYY-MM-DD`).
- `paymentMethod` must be one of: `"credit card"`, `"paypal"`, `"bank transfer"`.
- Email addresses are validated for proper format.
- Passwords must be at least 6 characters long.
- All required fields are validated before processing.

---

## Status Codes
- `200`: Success (GET, POST for actions like booking, subscribing)
- `201`: Resource created (register, login)
- `400`: Bad request (validation or business logic error)
- `500`: Server error

---

## JWT Token
All API responses include a JWT token for authentication. The token expires in 24 hours and contains user information for authenticated endpoints.

---

## Database Seeding
The server automatically seeds the database with sample data on startup if collections are empty:
- 4 destinations (Paris, Tokyo, New York, London)
- 4 services (Hotel, Transport, Flight, Tour Guide)
- 5 flights with different routes
- 2 sample trips
- 2 sample transport bookings
- 2 sample hotel bookings 