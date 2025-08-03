const express = require('express');
const router = express.Router();
const Appointment = require('../models/Appointment');
const Doctor = require('../models/Doctor');
const { body, validationResult } = require('express-validator');

// Get all appointments (with filters)
router.get('/', async (req, res) => {
  try {
    const { 
      doctorId, 
      patientEmail, 
      status, 
      date,
      page = 1,
      limit = 10 
    } = req.query;
    
    let query = {};
    
    if (doctorId) query.doctor = doctorId;
    if (patientEmail) query['patient.email'] = patientEmail;
    if (status) query.status = status;
    if (date) {
      const startDate = new Date(date);
      const endDate = new Date(date);
      endDate.setDate(endDate.getDate() + 1);
      query.appointmentDate = { $gte: startDate, $lt: endDate };
    }
    
    const skip = (parseInt(page) - 1) * parseInt(limit);
    
    const appointments = await Appointment.find(query)
      .populate('doctor', 'name specialty')
      .sort({ appointmentDate: 1, appointmentTime: 1 })
      .limit(parseInt(limit))
      .skip(skip);
    
    const total = await Appointment.countDocuments(query);
    
    res.json({
      appointments,
      pagination: {
        current: parseInt(page),
        total: Math.ceil(total / parseInt(limit)),
        hasNext: skip + appointments.length < total,
        hasPrev: parseInt(page) > 1
      }
    });
  } catch (error) {
    res.status(500).json({ error: 'Server error', message: error.message });
  }
});

// Get appointment by ID
router.get('/:id', async (req, res) => {
  try {
    const appointment = await Appointment.findById(req.params.id)
      .populate('doctor', 'name specialty email phone');
    
    if (!appointment) {
      return res.status(404).json({ error: 'Appointment not found' });
    }
    
    res.json(appointment);
  } catch (error) {
    if (error.kind === 'ObjectId') {
      return res.status(404).json({ error: 'Appointment not found' });
    }
    res.status(500).json({ error: 'Server error', message: error.message });
  }
});

// Create new appointment
router.post('/', [
  body('patient.name').notEmpty().withMessage('Patient name is required'),
  body('patient.email').isEmail().withMessage('Valid patient email is required'),
  body('patient.phone').notEmpty().withMessage('Patient phone is required'),
  body('patient.dateOfBirth').notEmpty().withMessage('Date of birth is required'),
  body('patient.gender').isIn(['male', 'female', 'other']).withMessage('Valid gender is required'),
  body('doctor').notEmpty().withMessage('Doctor ID is required'),
  body('appointmentDate').notEmpty().withMessage('Appointment date is required'),
  body('appointmentTime').notEmpty().withMessage('Appointment time is required'),
  body('reason').notEmpty().withMessage('Appointment reason is required')
], async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    
    const { doctor, appointmentDate, appointmentTime } = req.body;
    
    // Check if doctor exists
    const doctorExists = await Doctor.findById(doctor);
    if (!doctorExists) {
      return res.status(404).json({ error: 'Doctor not found' });
    }
    
    // Check if time slot is available
    const appointmentDateTime = new Date(appointmentDate);
    const dayName = appointmentDateTime.toLocaleDateString('en-US', { weekday: 'lowercase' });
    
    const availableSlots = doctorExists.availability[dayName] || [];
    if (!availableSlots.includes(appointmentTime)) {
      return res.status(400).json({ error: 'Selected time slot is not available' });
    }
    
    // Check if appointment already exists for this time slot
    const existingAppointment = await Appointment.findOne({
      doctor,
      appointmentDate: appointmentDateTime,
      appointmentTime,
      status: { $nin: ['cancelled'] }
    });
    
    if (existingAppointment) {
      return res.status(400).json({ error: 'This time slot is already booked' });
    }
    
    // Validate appointment date (not in the past)
    const now = new Date();
    if (appointmentDateTime < now) {
      return res.status(400).json({ error: 'Cannot book appointments in the past' });
    }
    
    const appointment = new Appointment(req.body);
    await appointment.save();
    
    // Populate doctor info for response
    await appointment.populate('doctor', 'name specialty');
    
    res.status(201).json(appointment);
  } catch (error) {
    if (error.code === 11000) {
      return res.status(400).json({ error: 'Appointment already exists' });
    }
    res.status(500).json({ error: 'Server error', message: error.message });
  }
});

// Update appointment status
router.patch('/:id/status', [
  body('status').isIn(['pending', 'confirmed', 'cancelled', 'completed']).withMessage('Valid status is required')
], async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    
    const { status, cancellationReason, cancelledBy } = req.body;
    
    const updateData = { status };
    if (status === 'cancelled') {
      updateData.cancellationReason = cancellationReason;
      updateData.cancelledBy = cancelledBy;
    }
    
    const appointment = await Appointment.findByIdAndUpdate(
      req.params.id,
      updateData,
      { new: true }
    ).populate('doctor', 'name specialty');
    
    if (!appointment) {
      return res.status(404).json({ error: 'Appointment not found' });
    }
    
    res.json(appointment);
  } catch (error) {
    if (error.kind === 'ObjectId') {
      return res.status(404).json({ error: 'Appointment not found' });
    }
    res.status(500).json({ error: 'Server error', message: error.message });
  }
});

// Update appointment
router.put('/:id', async (req, res) => {
  try {
    const appointment = await Appointment.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true, runValidators: true }
    ).populate('doctor', 'name specialty');
    
    if (!appointment) {
      return res.status(404).json({ error: 'Appointment not found' });
    }
    
    res.json(appointment);
  } catch (error) {
    if (error.kind === 'ObjectId') {
      return res.status(404).json({ error: 'Appointment not found' });
    }
    res.status(500).json({ error: 'Server error', message: error.message });
  }
});

// Delete appointment
router.delete('/:id', async (req, res) => {
  try {
    const appointment = await Appointment.findByIdAndDelete(req.params.id);
    
    if (!appointment) {
      return res.status(404).json({ error: 'Appointment not found' });
    }
    
    res.json({ message: 'Appointment deleted successfully' });
  } catch (error) {
    if (error.kind === 'ObjectId') {
      return res.status(404).json({ error: 'Appointment not found' });
    }
    res.status(500).json({ error: 'Server error', message: error.message });
  }
});

// Get appointment statistics
router.get('/stats/overview', async (req, res) => {
  try {
    const total = await Appointment.countDocuments();
    const pending = await Appointment.countDocuments({ status: 'pending' });
    const confirmed = await Appointment.countDocuments({ status: 'confirmed' });
    const completed = await Appointment.countDocuments({ status: 'completed' });
    const cancelled = await Appointment.countDocuments({ status: 'cancelled' });
    
    // Today's appointments
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    const tomorrow = new Date(today);
    tomorrow.setDate(tomorrow.getDate() + 1);
    
    const todayAppointments = await Appointment.countDocuments({
      appointmentDate: { $gte: today, $lt: tomorrow }
    });
    
    res.json({
      total,
      pending,
      confirmed,
      completed,
      cancelled,
      todayAppointments
    });
  } catch (error) {
    res.status(500).json({ error: 'Server error', message: error.message });
  }
});

module.exports = router; 