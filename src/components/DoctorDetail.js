import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { doctors } from '../data/doctors';
import { Star, Clock, Calendar, ArrowLeft, User } from 'lucide-react';

const DoctorDetail = ({ onBookAppointment }) => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [doctor, setDoctor] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const foundDoctor = doctors.find(d => d.id === parseInt(id));
    if (foundDoctor) {
      setDoctor(foundDoctor);
    }
    setLoading(false);
  }, [id]);

  if (loading) {
    return <div className="loading">Loading...</div>;
  }

  if (!doctor) {
    return (
      <div className="card text-center">
        <User size={48} color="#64748b" style={{ margin: '0 auto 16px' }} />
        <h3 style={{ color: '#1e293b', marginBottom: '8px' }}>Doctor not found</h3>
        <p style={{ color: '#64748b', marginBottom: '16px' }}>
          The doctor you're looking for doesn't exist.
        </p>
        <button 
          className="btn btn-primary"
          onClick={() => navigate('/')}
        >
          Back to Doctors
        </button>
      </div>
    );
  }

  const getDayName = (day) => {
    const days = {
      monday: 'Monday',
      tuesday: 'Tuesday', 
      wednesday: 'Wednesday',
      thursday: 'Thursday',
      friday: 'Friday',
      saturday: 'Saturday',
      sunday: 'Sunday'
    };
    return days[day] || day;
  };

  const getAvailableSlots = (day) => {
    return doctor.availability[day] || [];
  };

  return (
    <div>
      <button 
        className="back-button"
        onClick={() => navigate('/')}
      >
        <ArrowLeft size={16} />
        Back to Doctors
      </button>

      <div className="card">
        <div className="flex items-center gap-6 mb-6">
          <img 
            src={doctor.image} 
            alt={doctor.name}
            className="avatar"
            style={{ width: '120px', height: '120px' }}
            onError={(e) => {
              e.target.src = 'https://images.unsplash.com/photo-1559839734-2b71ea197ec2?w=150&h=150&fit=crop&crop=face';
            }}
          />
          <div style={{ flex: 1 }}>
            <h1 style={{
              fontSize: '2rem',
              fontWeight: '700',
              color: '#1e293b',
              marginBottom: '8px'
            }}>
              {doctor.name}
            </h1>
            <p style={{
              fontSize: '1.125rem',
              color: '#64748b',
              marginBottom: '12px'
            }}>
              {doctor.specialty}
            </p>
            <div className="flex items-center gap-4">
              <div className="flex items-center gap-2">
                <Star size={20} color="#fbbf24" fill="#fbbf24" />
                <span style={{ fontSize: '1rem', color: '#64748b' }}>
                  {doctor.rating} rating
                </span>
              </div>
              <div className="flex items-center gap-2">
                <Clock size={20} color="#64748b" />
                <span style={{ fontSize: '1rem', color: '#64748b' }}>
                  {doctor.experience} experience
                </span>
              </div>
            </div>
          </div>
        </div>

        <div className="mb-6">
          <h3 style={{
            fontSize: '1.25rem',
            fontWeight: '600',
            color: '#1e293b',
            marginBottom: '12px'
          }}>
            About Dr. {doctor.name.split(' ')[1]}
          </h3>
          <p style={{
            color: '#64748b',
            lineHeight: '1.6',
            fontSize: '1rem'
          }}>
            {doctor.description}
          </p>
        </div>

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
            Availability Schedule
          </h3>
          
          <div className="grid grid-2">
            {Object.keys(doctor.availability).map(day => {
              const slots = getAvailableSlots(day);
              return (
                <div key={day} className="card" style={{ margin: 0 }}>
                  <h4 style={{
                    fontSize: '1rem',
                    fontWeight: '600',
                    color: '#1e293b',
                    marginBottom: '12px'
                  }}>
                    {getDayName(day)}
                  </h4>
                  {slots.length > 0 ? (
                    <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px' }}>
                      {slots.map((time, index) => (
                        <span 
                          key={index}
                          className="badge badge-info"
                        >
                          {time}
                        </span>
                      ))}
                    </div>
                  ) : (
                    <p style={{ color: '#64748b', fontSize: '0.875rem' }}>
                      No availability
                    </p>
                  )}
                </div>
              );
            })}
          </div>
        </div>

        <div className="text-center">
          <button
            className="btn btn-success"
            style={{ fontSize: '1.125rem', padding: '16px 32px' }}
            onClick={() => {
              onBookAppointment(doctor);
              navigate(`/booking/${doctor.id}`);
            }}
          >
            Book Appointment
          </button>
        </div>
      </div>
    </div>
  );
};

export default DoctorDetail; 