const mongoose = require('mongoose');

const appointmentSchema = new mongoose.Schema({
  patient: {
    name: {
      type: String,
      required: true,
      trim: true
    },
    email: {
      type: String,
      required: true,
      lowercase: true
    },
    phone: {
      type: String,
      required: true
    },
    dateOfBirth: {
      type: Date,
      required: true
    },
    gender: {
      type: String,
      enum: ['male', 'female', 'other'],
      required: true
    }
  },
  doctor: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Doctor',
    required: true
  },
  appointmentDate: {
    type: Date,
    required: true
  },
  appointmentTime: {
    type: String,
    required: true
  },
  appointmentType: {
    type: String,
    enum: ['consultation', 'follow-up', 'emergency', 'routine'],
    default: 'consultation'
  },
  status: {
    type: String,
    enum: ['pending', 'confirmed', 'cancelled', 'completed'],
    default: 'pending'
  },
  reason: {
    type: String,
    required: true,
    trim: true
  },
  symptoms: [String],
  notes: {
    type: String,
    trim: true
  },
  insurance: {
    provider: String,
    policyNumber: String
  },
  paymentStatus: {
    type: String,
    enum: ['pending', 'paid', 'waived'],
    default: 'pending'
  },
  reminderSent: {
    type: Boolean,
    default: false
  },
  cancellationReason: String,
  cancelledBy: {
    type: String,
    enum: ['patient', 'doctor', 'admin']
  }
}, {
  timestamps: true
});

// Indexes for better query performance
appointmentSchema.index({ doctor: 1, appointmentDate: 1 });
appointmentSchema.index({ 'patient.email': 1 });
appointmentSchema.index({ status: 1 });
appointmentSchema.index({ appointmentDate: 1, appointmentTime: 1 });

// Virtual for formatted date
appointmentSchema.virtual('formattedDate').get(function() {
  return this.appointmentDate.toLocaleDateString();
});

// Virtual for formatted time
appointmentSchema.virtual('formattedTime').get(function() {
  return this.appointmentTime;
});

// Ensure virtuals are included in JSON output
appointmentSchema.set('toJSON', { virtuals: true });

module.exports = mongoose.model('Appointment', appointmentSchema); 