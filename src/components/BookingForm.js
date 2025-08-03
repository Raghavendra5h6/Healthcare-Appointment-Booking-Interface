import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { doctors } from '../data/doctors';
import { ArrowLeft, Calendar, Clock, User, Phone, Mail } from 'lucide-react';
import { format, addDays, startOfWeek, addWeeks } from 'date-fns';

const BookingForm = ({ 
  doctor, 
  selectedDate, 
  setSelectedDate, 
  selectedTime, 
  setSelectedTime, 
  onBookingComplete 
}) => {
  const { doctorId } = useParams();
  const navigate = useNavigate();
  const [currentDoctor, setCurrentDoctor] = useState(null);
  const [availableDates, setAvailableDates] = useState([]);
  const [availableTimes, setAvailableTimes] = useState([]);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    reason: ''
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const foundDoctor = doctor || doctors.find(d => d.id === parseInt(doctorId));
    if (foundDoctor) {
      setCurrentDoctor(foundDoctor);
      generateAvailableDates(foundDoctor);
    }
    setLoading(false);
  }, [doctorId, doctor]);

  const generateAvailableDates = (doctor) => {
    const dates = [];
    const today = new Date();
    const startDate = startOfWeek(today);
    
    for (let i = 0; i < 28; i++) {
      const date = addDays(startDate, i);
      const dayName = format(date, 'EEEE').toLowerCase();
      
      if (doctor.availability[dayName] && doctor.availability[dayName].length > 0) {
        dates.push({
          date: date,
          dayName: dayName,
          dayLabel: format(date, 'EEEE'),
          dateLabel: format(date, 'MMM dd')
        });
      }
    }
    setAvailableDates(dates);
  };

  const handleDateSelect = (selectedDateObj) => {
    setSelectedDate(selectedDateObj);
    setSelectedTime(null);
    
    const dayName = format(selectedDateObj.date, 'EEEE').toLowerCase();
    setAvailableTimes(currentDoctor.availability[dayName] || []);
  };

  const handleTimeSelect = (time) => {
    setSelectedTime(time);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    if (!selectedDate || !selectedTime) {
      alert('Please select a date and time for your appointment.');
      return;
    }

    if (!formData.name || !formData.email || !formData.phone) {
      alert('Please fill in all required fields.');
      return;
    }

    const booking = {
      id: Date.now(),
      doctor: currentDoctor,
      date: selectedDate,
      time: selectedTime,
      patient: formData,
      status: 'confirmed',
      createdAt: new Date()
    };

    onBookingComplete(booking);
    navigate('/confirmation');
  };

  if (loading) {
    return <div className="loading">Loading...</div>;
  }

  if (!currentDoctor) {
    return (
      <div className="card text-center">
        <h3 style={{ color: '#1e293b', marginBottom: '8px' }}>Doctor not found</h3>
        <button 
          className="btn btn-primary"
          onClick={() => navigate('/')}
        >
          Back to Doctors
        </button>
      </div>
    );
  }

  return (
    <div>
      <button 
        className="back-button"
        onClick={() => navigate(`/doctor/${currentDoctor.id}`)}
      >
        <ArrowLeft size={16} />
        Back to Doctor Details
      </button>

      <div className="card">
        <div className="flex items-center gap-4 mb-6">
          <img 
            src={currentDoctor.image} 
            alt={currentDoctor.name}
            className="avatar"
            onError={(e) => {
              e.target.src = 'https://images.unsplash.com/photo-1559839734-2b71ea197ec2?w=150&h=150&fit=crop&crop=face';
            }}
          />
          <div>
            <h2 style={{
              fontSize: '1.5rem',
              fontWeight: '600',
              color: '#1e293b',
              marginBottom: '4px'
            }}>
              Book Appointment with {currentDoctor.name}
            </h2>
            <p style={{ color: '#64748b' }}>
              {currentDoctor.specialty}
            </p>
          </div>
        </div>

        <form onSubmit={handleSubmit}>
          {/* Date Selection */}
          <div className="mb-6">
            <h3 style={{
              fontSize: '1.25rem',
              fontWeight: '600',
              color: '#1e293b',
              marginBottom: '16px',
              display: 'flex',
              alignItems: 'center',
              gap: '8px'
            }}>
              <Calendar size={20} />
              Select Date
            </h3>
            
            <div className="grid grid-3">
              {availableDates.map((dateObj, index) => (
                <button
                  key={index}
                  type="button"
                  className={`card ${selectedDate?.date === dateObj.date ? 'border-2 border-blue-500' : ''}`}
                  style={{ 
                    margin: 0, 
                    cursor: 'pointer',
                    border: selectedDate?.date === dateObj.date ? '2px solid #3b82f6' : '1px solid #e5e7eb',
                    backgroundColor: selectedDate?.date === dateObj.date ? '#eff6ff' : 'white'
                  }}
                  onClick={() => handleDateSelect(dateObj)}
                >
                  <div className="text-center">
                    <div style={{
                      fontSize: '0.875rem',
                      color: '#64748b',
                      marginBottom: '4px'
                    }}>
                      {dateObj.dayLabel}
                    </div>
                    <div style={{
                      fontSize: '1.125rem',
                      fontWeight: '600',
                      color: '#1e293b'
                    }}>
                      {dateObj.dateLabel}
                    </div>
                  </div>
                </button>
              ))}
            </div>
          </div>

          {/* Time Selection */}
          {selectedDate && (
            <div className="mb-6">
              <h3 style={{
                fontSize: '1.25rem',
                fontWeight: '600',
                color: '#1e293b',
                marginBottom: '16px',
                display: 'flex',
                alignItems: 'center',
                gap: '8px'
              }}>
                <Clock size={20} />
                Select Time
              </h3>
              
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: '12px' }}>
                {availableTimes.map((time, index) => (
                  <button
                    key={index}
                    type="button"
                    className={`btn ${selectedTime === time ? 'btn-primary' : 'btn-secondary'}`}
                    onClick={() => handleTimeSelect(time)}
                  >
                    {time}
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Patient Information */}
          <div className="mb-6">
            <h3 style={{
              fontSize: '1.25rem',
              fontWeight: '600',
              color: '#1e293b',
              marginBottom: '16px',
              display: 'flex',
              alignItems: 'center',
              gap: '8px'
            }}>
              <User size={20} />
              Patient Information
            </h3>
            
            <div className="grid grid-2">
              <div className="form-group">
                <label className="form-label">Full Name *</label>
                <input
                  type="text"
                  name="name"
                  className="form-input"
                  placeholder="Enter your full name"
                  value={formData.name}
                  onChange={handleInputChange}
                  required
                />
              </div>
              
              <div className="form-group">
                <label className="form-label">Email *</label>
                <div className='flex'>
                  <Mail size={20} />
                  <input
                    type="email"
                    name="email"
                    className="form-input"
                    placeholder="Enter your email"
                    value={formData.email}
                    onChange={handleInputChange}
                    required
                  />
                </div>
              </div>
                
              <div className="form-group">
                <label className="form-label">Phone Number *</label>
                <div className='flex flex-row p-2'>
                <Phone size={20} />
                <input
                  type="tel"
                  name="phone"
                  className="form-input"
                  placeholder="Enter your phone number"
                  value={formData.phone}
                  onChange={handleInputChange}
                  required
                />
                </div>
              </div>
              
              <div className="form-group">
                <label className="form-label">Reason for Visit</label>
                <textarea
                  name="reason"
                  className="form-input"
                  placeholder="Briefly describe your symptoms or reason for visit"
                  value={formData.reason}
                  onChange={handleInputChange}
                  rows="3"
                />
              </div>
            </div>
          </div>

          {/* Submit Button */}
          <div className="text-center">
            <button
              type="submit"
              className="btn btn-success"
              style={{ fontSize: '1.125rem', padding: '16px 32px' }}
              disabled={!selectedDate || !selectedTime}
            >
              Confirm Booking
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default BookingForm; 