import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { doctors, specialties } from '../data/doctors';
import { Star, MapPin, Clock, User } from 'lucide-react';

const DoctorList = ({ onDoctorSelect }) => {
  const [selectedSpecialty, setSelectedSpecialty] = useState('All Specialties');
  const [searchTerm, setSearchTerm] = useState('');

  const filteredDoctors = doctors.filter(doctor => {
    const matchesSpecialty = selectedSpecialty === 'All Specialties' || doctor.specialty === selectedSpecialty;
    const matchesSearch = doctor.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         doctor.specialty.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesSpecialty && matchesSearch;
  });

  return (
    <div>
      <div className="text-center mb-4">
        <h1 className="page-title">Find Your Doctor</h1>
        <p className="page-subtitle">Book appointments with experienced healthcare professionals</p>
      </div>

      {/* Search and Filter */}
      <div className="card mb-4">
        <div className="grid grid-2">
          <div className="form-group">
            <label className="form-label">Search Doctors</label>
            <input
              type="text"
              className="form-input"
              placeholder="Search by name or specialty..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          <div className="form-group">
            <label className="form-label">Filter by Specialty</label>
            <select
              className="form-input"
              value={selectedSpecialty}
              onChange={(e) => setSelectedSpecialty(e.target.value)}
            >
              {specialties.map(specialty => (
                <option key={specialty} value={specialty}>
                  {specialty}
                </option>
              ))}
            </select>
          </div>
        </div>
      </div>

      {/* Results Count */}
      <div className="mb-4">
        <p style={{ color: '#64748b', fontSize: '1rem' }}>
          {filteredDoctors.length} doctor{filteredDoctors.length !== 1 ? 's' : ''} found
        </p>
      </div>

      {/* Doctors Grid */}
      <div className="grid grid-3">
        {filteredDoctors.map(doctor => (
          <div key={doctor.id} className="card">
            <div className="flex items-center gap-4 mb-4">
              <img 
                src={doctor.image} 
                alt={doctor.name}
                className="avatar"
                onError={(e) => {
                  e.target.src = 'https://images.unsplash.com/photo-1559839734-2b71ea197ec2?w=150&h=150&fit=crop&crop=face';
                }}
              />
              <div style={{ flex: 1 }}>
                <h3 style={{
                  fontSize: '1.25rem',
                  fontWeight: '600',
                  color: '#1e293b',
                  marginBottom: '4px'
                }}>
                  {doctor.name}
                </h3>
                <p style={{
                  color: '#64748b',
                  fontSize: '0.875rem',
                  marginBottom: '8px'
                }}>
                  {doctor.specialty}
                </p>
                <div className="flex items-center gap-2">
                  <Star size={16} color="#fbbf24" fill="#fbbf24" />
                  
                  <span style={{ fontSize: '0.875rem', color: '#64748b' }}>
                    {doctor.rating} <Clock size={16}/> ({doctor.experience})
                  </span>
                </div>
              </div>
            </div>
            <MapPin size={16} />
            <p style={{
              color: '#64748b',
              fontSize: '0.875rem',
              lineHeight: '1.5',
              marginBottom: '16px'
            }}>
              {doctor.description}
            </p>
           
            <div className="flex gap-2">
              <Link
                to={`/doctor/${doctor.id}`}
                className="btn btn-primary"
                style={{ flex: 1, textAlign: 'center' }}
              >
                View Details
              </Link>
              <button
                className="btn btn-success"
                onClick={() => onDoctorSelect(doctor)}
                style={{ flex: 1 }}
              >
                Book Appointment
              </button>
              
            </div>
          </div>
        ))}
      </div>

      {filteredDoctors.length === 0 && (
        <div className="card text-center">
          <User size={48} color="#64748b" style={{ margin: '0 auto 16px' }} />
          <h3 style={{ color: '#1e293b', marginBottom: '8px' }}>No doctors found</h3>
          <p style={{ color: '#64748b' }}>
            Try adjusting your search criteria or specialty filter.
          </p>
        </div>
      )}
    </div>
  );
};

export default DoctorList; 