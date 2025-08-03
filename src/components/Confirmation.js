import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { CheckCircle, Calendar, Clock, User, Phone, Mail, ArrowLeft } from 'lucide-react';
import { format } from 'date-fns';

const Confirmation = ({ booking }) => {
  const navigate = useNavigate();

  if (!booking) {
    return (
      <div className="card text-center">
        <h3 style={{ color: '#1e293b', marginBottom: '8px' }}>No booking found</h3>
        <p style={{ color: '#64748b', marginBottom: '16px' }}>
          Please book an appointment first.
        </p>
        <Link to="/" className="btn btn-primary">
          Find Doctors
        </Link>
      </div>
    );
  }

  return (
    <div>
      <button 
        className="back-button"
        onClick={() => navigate('/')}
      >
        <ArrowLeft size={16} />
        Back to Home
      </button>

      <div className="card text-center">
        <div className="mb-6">
          <CheckCircle size={64} color="#10b981" style={{ margin: '0 auto 16px' }} />
          <h1 style={{
            fontSize: '2rem',
            fontWeight: '700',
            color: '#1e293b',
            marginBottom: '8px'
          }}>
            Booking Confirmed!
          </h1>
          <p style={{
            fontSize: '1.125rem',
            color: '#64748b'
          }}>
            Your appointment has been successfully scheduled.
          </p>
        </div>

        {/* Booking Details */}
        <div className="card" style={{ marginBottom: '24px' }}>
          <h3 style={{
            fontSize: '1.25rem',
            fontWeight: '600',
            color: '#1e293b',
            marginBottom: '20px'
          }}>
            Appointment Details
          </h3>
          
          <div className="grid grid-2">
            <div className="text-center">
              <div className="flex items-center justify-center gap-2 mb-2">
                <User size={20} color="#64748b" />
                <span style={{ fontWeight: '600', color: '#1e293b' }}>Doctor</span>
              </div>
              <p style={{ color: '#64748b', marginBottom: '4px' }}>
                {booking.doctor.name}
              </p>
              <p style={{ color: '#64748b', fontSize: '0.875rem' }}>
                {booking.doctor.specialty}
              </p>
            </div>
            
            <div className="text-center">
              <div className="flex items-center justify-center gap-2 mb-2">
                <Calendar size={20} color="#64748b" />
                <span style={{ fontWeight: '600', color: '#1e293b' }}>Date</span>
              </div>
              <p style={{ color: '#64748b' }}>
                {booking.date.dayLabel}, {booking.date.dateLabel}
              </p>
            </div>
            
            <div className="text-center">
              <div className="flex items-center justify-center gap-2 mb-2">
                <Clock size={20} color="#64748b" />
                <span style={{ fontWeight: '600', color: '#1e293b' }}>Time</span>
              </div>
              <p style={{ color: '#64748b' }}>
                {booking.time}
              </p>
            </div>
            
            <div className="text-center">
              <div className="flex items-center justify-center gap-2 mb-2">
                <CheckCircle size={20} color="#64748b" />
                <span style={{ fontWeight: '600', color: '#1e293b' }}>Status</span>
              </div>
              <span className="badge badge-success">
                Confirmed
              </span>
            </div>
          </div>
        </div>

        {/* Patient Information */}
        <div className="card" style={{ marginBottom: '24px' }}>
          <h3 style={{
            fontSize: '1.25rem',
            fontWeight: '600',
            color: '#1e293b',
            marginBottom: '20px'
          }}>
            Patient Information
          </h3>
          
          <div className="grid grid-2">
            <div className="text-center">
              <div className="flex items-center justify-center gap-2 mb-2">
                <User size={20} color="#64748b" />
                <span style={{ fontWeight: '600', color: '#1e293b' }}>Name</span>
              </div>
              <p style={{ color: '#64748b' }}>
                {booking.patient.name}
              </p>
            </div>
            
            <div className="text-center">
              <div className="flex items-center justify-center gap-2 mb-2">
                <Mail size={20} color="#64748b" />
                <span style={{ fontWeight: '600', color: '#1e293b' }}>Email</span>
              </div>
              <p style={{ color: '#64748b' }}>
                {booking.patient.email}
              </p>
            </div>
            
            <div className="text-center">
              <div className="flex items-center justify-center gap-2 mb-2">
                <Phone size={20} color="#64748b" />
                <span style={{ fontWeight: '600', color: '#1e293b' }}>Phone</span>
              </div>
              <p style={{ color: '#64748b' }}>
                {booking.patient.phone}
              </p>
            </div>
            
            {booking.patient.reason && (
              <div className="text-center">
                <div className="flex items-center justify-center gap-2 mb-2">
                  <User size={20} color="#64748b" />
                  <span style={{ fontWeight: '600', color: '#1e293b' }}>Reason</span>
                </div>
                <p style={{ color: '#64748b' }}>
                  {booking.patient.reason}
                </p>
              </div>
            )}
          </div>
        </div>

        {/* Next Steps */}
        <div className="card">
          <h3 style={{
            fontSize: '1.25rem',
            fontWeight: '600',
            color: '#1e293b',
            marginBottom: '16px'
          }}>
            What's Next?
          </h3>
          
          <div style={{ textAlign: 'left', maxWidth: '600px', margin: '0 auto' }}>
            <ul style={{
              listStyle: 'none',
              padding: 0,
              color: '#64748b',
              lineHeight: '1.6'
            }}>
              <li style={{ marginBottom: '12px', paddingLeft: '20px', position: 'relative' }}>
                <span style={{
                  position: 'absolute',
                  left: 0,
                  color: '#10b981',
                  fontWeight: 'bold'
                }}>1.</span>
                You will receive a confirmation email with appointment details.
              </li>
              <li style={{ marginBottom: '12px', paddingLeft: '20px', position: 'relative' }}>
                <span style={{
                  position: 'absolute',
                  left: 0,
                  color: '#10b981',
                  fontWeight: 'bold'
                }}>2.</span>
                Please arrive 15 minutes before your scheduled appointment time.
              </li>
              <li style={{ marginBottom: '12px', paddingLeft: '20px', position: 'relative' }}>
                <span style={{
                  position: 'absolute',
                  left: 0,
                  color: '#10b981',
                  fontWeight: 'bold'
                }}>3.</span>
                Bring a valid ID and your insurance information if applicable.
              </li>
              <li style={{ marginBottom: '12px', paddingLeft: '20px', position: 'relative' }}>
                <span style={{
                  position: 'absolute',
                  left: 0,
                  color: '#10b981',
                  fontWeight: 'bold'
                }}>4.</span>
                If you need to reschedule or cancel, please contact us at least 24 hours in advance.
              </li>
            </ul>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="mt-6 flex gap-4 justify-center">
          <Link to="/" className="btn btn-primary">
            Book Another Appointment
          </Link>
          <button 
            className="btn btn-secondary"
            onClick={() => window.print()}
          >
            Print Confirmation
          </button>
        </div>
      </div>
    </div>
  );
};

export default Confirmation; 