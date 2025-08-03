const express = require('express');
const router = express.Router();
const Doctor = require('../models/Doctor');
const { body, validationResult } = require('express-validator');

// Get all doctors
router.get('/', async (req, res) => {
  try {
    const { specialty, search, limit = 10, page = 1 } = req.query;
    
    let query = { isActive: true };
    
    // Filter by specialty
    if (specialty && specialty !== 'All Specialties') {
      query.specialty = specialty;
    }
    
    // Search by name or description
    if (search) {
      query.$or = [
        { name: { $regex: search, $options: 'i' } },
        { description: { $regex: search, $options: 'i' } },
        { specialty: { $regex: search, $options: 'i' } }
      ];
    }
    
    const skip = (parseInt(page) - 1) * parseInt(limit);
    
    const doctors = await Doctor.find(query)
      .select('-__v')
      .limit(parseInt(limit))
      .skip(skip)
      .sort({ rating: -1, name: 1 });
    
    const total = await Doctor.countDocuments(query);
    
    res.json({
      doctors,
      pagination: {
        current: parseInt(page),
        total: Math.ceil(total / parseInt(limit)),
        hasNext: skip + doctors.length < total,
        hasPrev: parseInt(page) > 1
      }
    });
  } catch (error) {
    res.status(500).json({ error: 'Server error', message: error.message });
  }
});

// Get doctor by ID
router.get('/:id', async (req, res) => {
  try {
    const doctor = await Doctor.findById(req.params.id).select('-__v');
    
    if (!doctor) {
      return res.status(404).json({ error: 'Doctor not found' });
    }
    
    res.json(doctor);
  } catch (error) {
    if (error.kind === 'ObjectId') {
      return res.status(404).json({ error: 'Doctor not found' });
    }
    res.status(500).json({ error: 'Server error', message: error.message });
  }
});

// Get doctor availability
router.get('/:id/availability', async (req, res) => {
  try {
    const doctor = await Doctor.findById(req.params.id).select('availability');
    
    if (!doctor) {
      return res.status(404).json({ error: 'Doctor not found' });
    }
    
    res.json({ availability: doctor.availability });
  } catch (error) {
    if (error.kind === 'ObjectId') {
      return res.status(404).json({ error: 'Doctor not found' });
    }
    res.status(500).json({ error: 'Server error', message: error.message });
  }
});

// Get available time slots for a specific date
router.get('/:id/availability/:date', async (req, res) => {
  try {
    const { id, date } = req.params;
    const doctor = await Doctor.findById(id);
    
    if (!doctor) {
      return res.status(404).json({ error: 'Doctor not found' });
    }
    
    const appointmentDate = new Date(date);
    const dayName = appointmentDate.toLocaleDateString('en-US', { weekday: 'lowercase' });
    
    const availableSlots = doctor.availability[dayName] || [];
    
    res.json({ 
      date: date,
      dayName: dayName,
      availableSlots 
    });
  } catch (error) {
    res.status(500).json({ error: 'Server error', message: error.message });
  }
});

// Get all specialties
router.get('/specialties/list', async (req, res) => {
  try {
    const specialties = await Doctor.distinct('specialty');
    res.json({ specialties: ['All Specialties', ...specialties] });
  } catch (error) {
    res.status(500).json({ error: 'Server error', message: error.message });
  }
});

// Create new doctor (Admin only)
router.post('/', [
  body('name').notEmpty().withMessage('Name is required'),
  body('specialty').notEmpty().withMessage('Specialty is required'),
  body('email').isEmail().withMessage('Valid email is required'),
  body('phone').notEmpty().withMessage('Phone is required'),
  body('experience').notEmpty().withMessage('Experience is required'),
  body('description').notEmpty().withMessage('Description is required'),
  body('image').notEmpty().withMessage('Image URL is required')
], async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    
    const doctor = new Doctor(req.body);
    await doctor.save();
    
    res.status(201).json(doctor);
  } catch (error) {
    if (error.code === 11000) {
      return res.status(400).json({ error: 'Doctor with this email already exists' });
    }
    res.status(500).json({ error: 'Server error', message: error.message });
  }
});

// Update doctor (Admin only)
router.put('/:id', async (req, res) => {
  try {
    const doctor = await Doctor.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true, runValidators: true }
    );
    
    if (!doctor) {
      return res.status(404).json({ error: 'Doctor not found' });
    }
    
    res.json(doctor);
  } catch (error) {
    if (error.kind === 'ObjectId') {
      return res.status(404).json({ error: 'Doctor not found' });
    }
    res.status(500).json({ error: 'Server error', message: error.message });
  }
});

// Delete doctor (Admin only)
router.delete('/:id', async (req, res) => {
  try {
    const doctor = await Doctor.findByIdAndUpdate(
      req.params.id,
      { isActive: false },
      { new: true }
    );
    
    if (!doctor) {
      return res.status(404).json({ error: 'Doctor not found' });
    }
    
    res.json({ message: 'Doctor deactivated successfully' });
  } catch (error) {
    if (error.kind === 'ObjectId') {
      return res.status(404).json({ error: 'Doctor not found' });
    }
    res.status(500).json({ error: 'Server error', message: error.message });
  }
});

module.exports = router; 