import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { AuthProvider } from './contexts/AuthContext';
import DoctorList from './components/DoctorList';
import DoctorDetail from './components/DoctorDetail';
import BookingForm from './components/BookingForm';
import Confirmation from './components/Confirmation';
import Login from './components/auth/Login';
import Register from './components/auth/Register';
import './App.css';

function App() {
  const [bookings, setBookings] = useState([]);
  const [selectedDoctor, setSelectedDoctor] = useState(null);
  const [selectedDate, setSelectedDate] = useState(null);
  const [selectedTime, setSelectedTime] = useState(null);

  const addBooking = (booking) => {
    setBookings([...bookings, booking]);
  };

  return (
    <AuthProvider>
      <Router>
        <div className="App">
          <main className="container">
            <Routes>
              <Route 
                path="/" 
                element={
                  <DoctorList 
                    onDoctorSelect={(doctor) => setSelectedDoctor(doctor)}
                  />
                } 
              />
              <Route 
                path="/doctor/:id" 
                element={
                  <DoctorDetail 
                    onBookAppointment={(doctor) => {
                      setSelectedDoctor(doctor);
                      setSelectedDate(null);
                      setSelectedTime(null);
                    }}
                  />
                } 
              />
              <Route 
                path="/booking/:doctorId" 
                element={
                  <BookingForm 
                    doctor={selectedDoctor}
                    selectedDate={selectedDate}
                    setSelectedDate={setSelectedDate}
                    selectedTime={selectedTime}
                    setSelectedTime={setSelectedTime}
                    onBookingComplete={addBooking}
                  />
                } 
              />
              <Route 
                path="/confirmation" 
                element={
                  <Confirmation 
                    booking={bookings[bookings.length - 1]}
                  />
                } 
              />
              <Route path="/login" element={<Login />} />
              <Route path="/register" element={<Register />} />
            </Routes>
          </main>
        </div>
      </Router>
    </AuthProvider>
  )
}

export default App; 