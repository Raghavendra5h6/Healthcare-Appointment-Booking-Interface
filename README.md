# Healthcare Appointment Booking System

A comprehensive web application for booking healthcare appointments with doctors. Built with React frontend and Node.js/Express backend with MongoDB database.

## Features

### Frontend (React)
- **User Authentication**: Login/Register with JWT tokens
- **Doctor Discovery**: Browse doctors by specialty with search and filtering
- **Doctor Profiles**: Detailed doctor information with availability schedules
- **Appointment Booking**: Easy appointment scheduling with date/time selection
- **Responsive Design**: Mobile-friendly interface
- **Real-time Validation**: Form validation and error handling

### Backend (Node.js/Express)
- **RESTful API**: Complete CRUD operations for doctors, appointments, and users
- **Authentication**: JWT-based authentication with password hashing
- **Database**: MongoDB with Mongoose ODM
- **Validation**: Input validation using express-validator
- **Security**: Helmet.js for security headers, CORS support
- **Error Handling**: Comprehensive error handling and logging

### Database Models
- **Doctors**: Complete doctor profiles with availability schedules
- **Appointments**: Appointment booking with status tracking
- **Users**: Patient accounts with medical history

## Tech Stack

### Frontend
- React 18
- React Router DOM
- Lucide React (Icons)
- Date-fns (Date utilities)
- Tailwind CSS (Styling)

### Backend
- Node.js
- Express.js
- MongoDB
- Mongoose
- JWT (JSON Web Tokens)
- bcryptjs (Password hashing)
- express-validator
- Helmet.js (Security)
- Morgan (Logging)

## Prerequisites

- Node.js (v14 or higher)
- MongoDB (local installation or MongoDB Atlas)
- npm or yarn

## Installation

### 1. Clone the repository
```bash
git clone <repository-url>
cd healthcare-appointment-booking
```

### 2. Install Frontend Dependencies
```bash
npm install
```

### 3. Install Backend Dependencies
```bash
cd server
npm install
```

### 4. Environment Setup

#### Frontend (.env)
Create a `.env` file in the root directory:
```env
REACT_APP_API_URL=http://localhost:5000/api
```

#### Backend (.env)
Create a `.env` file in the server directory:
```env
PORT=5000
NODE_ENV=development
MONGODB_URI=mongodb://localhost:27017/healthcare-appointments
JWT_SECRET=your-super-secret-jwt-key-change-this-in-production
```

### 5. Database Setup

#### Option A: Local MongoDB
1. Install MongoDB locally
2. Start MongoDB service
3. The application will automatically create the database

#### Option B: MongoDB Atlas
1. Create a MongoDB Atlas account
2. Create a cluster
3. Get your connection string
4. Update the `MONGODB_URI` in your `.env` file

### 6. Seed the Database
```bash
cd server
npm run seed
```

### 7. Start the Application

#### Start Backend Server
```bash
cd server
npm run dev
```
The server will start on `http://localhost:5000`

#### Start Frontend Development Server
```bash
# In a new terminal, from the root directory
npm start
```
The frontend will start on `http://localhost:3000`

## API Endpoints

### Authentication
- `POST /api/users/register` - Register new user
- `POST /api/users/login` - Login user
- `GET /api/users/profile` - Get user profile
- `PUT /api/users/profile` - Update user profile
- `PUT /api/users/change-password` - Change password

### Doctors
- `GET /api/doctors` - Get all doctors (with filters)
- `GET /api/doctors/:id` - Get doctor by ID
- `GET /api/doctors/:id/availability` - Get doctor availability
- `GET /api/doctors/:id/availability/:date` - Get availability for specific date
- `GET /api/doctors/specialties/list` - Get all specialties

### Appointments
- `GET /api/appointments` - Get all appointments (with filters)
- `GET /api/appointments/:id` - Get appointment by ID
- `POST /api/appointments` - Create new appointment
- `PUT /api/appointments/:id` - Update appointment
- `PATCH /api/appointments/:id/status` - Update appointment status
- `DELETE /api/appointments/:id` - Delete appointment
- `GET /api/appointments/stats/overview` - Get appointment statistics

## Project Structure

```
healthcare-appointment-booking/
├── public/
├── src/
│   ├── components/
│   │   ├── auth/
│   │   │   ├── Login.js
│   │   │   └── Register.js
│   │   ├── BookingForm.js
│   │   ├── Confirmation.js
│   │   ├── DoctorDetail.js
│   │   └── DoctorList.js
│   ├── contexts/
│   │   └── AuthContext.js
│   ├── services/
│   │   └── api.js
│   ├── data/
│   │   └── doctors.js
│   ├── App.js
│   └── index.js
├── server/
│   ├── config/
│   │   └── database.js
│   ├── models/
│   │   ├── Doctor.js
│   │   ├── Appointment.js
│   │   └── User.js
│   ├── routes/
│   │   ├── doctors.js
│   │   ├── appointments.js
│   │   └── users.js
│   ├── scripts/
│   │   └── seed.js
│   ├── server.js
│   └── package.json
├── package.json
└── README.md
```

## Usage

### For Patients
1. **Register/Login**: Create an account or sign in
2. **Browse Doctors**: View available doctors by specialty
3. **View Doctor Details**: See doctor profiles, ratings, and availability
4. **Book Appointment**: Select date, time, and provide appointment details
5. **Manage Appointments**: View and manage your appointments

### For Administrators
1. **Manage Doctors**: Add, edit, or deactivate doctors
2. **View Appointments**: Monitor all appointments and their status
3. **Generate Reports**: Access appointment statistics and analytics

## Development

### Available Scripts

#### Frontend
```bash
npm start          # Start development server
npm run build      # Build for production
npm test           # Run tests
npm run eject      # Eject from Create React App
```

#### Backend
```bash
npm start          # Start production server
npm run dev        # Start development server with nodemon
npm run seed       # Seed database with sample data
```

### Adding New Features

1. **Backend**: Add new routes in `server/routes/`
2. **Frontend**: Add new components in `src/components/`
3. **Database**: Update models in `server/models/`
4. **API**: Update API service in `src/services/api.js`

## Security Features

- JWT token authentication
- Password hashing with bcrypt
- Input validation and sanitization
- CORS configuration
- Security headers with Helmet.js
- Error handling without exposing sensitive information

## Deployment

### Frontend Deployment
1. Build the application: `npm run build`
2. Deploy the `build` folder to your hosting service

### Backend Deployment
1. Set up environment variables
2. Deploy to your preferred hosting service (Heroku, AWS, etc.)
3. Configure MongoDB connection

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Add tests if applicable
5. Submit a pull request

## License

This project is licensed under the MIT License.

## Support

For support, please open an issue in the repository or contact the development team.

## Future Enhancements

- Email notifications for appointments
- Payment integration
- Video consultation support
- Mobile app development
- Advanced analytics dashboard
- Multi-language support
- Integration with electronic health records 