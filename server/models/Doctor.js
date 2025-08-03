const mongoose = require('mongoose');

const availabilitySchema = new mongoose.Schema({
  monday: [String],
  tuesday: [String],
  wednesday: [String],
  thursday: [String],
  friday: [String],
  saturday: [String],
  sunday: [String]
});

const doctorSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true
  },
  specialty: {
    type: String,
    required: true,
    trim: true
  },
  experience: {
    type: String,
    required: true
  },
  rating: {
    type: Number,
    default: 0,
    min: 0,
    max: 5
  },
  image: {
    type: String,
    required: true
  },
  description: {
    type: String,
    required: true
  },
  availability: {
    type: availabilitySchema,
    required: true
  },
  isActive: {
    type: Boolean,
    default: true
  },
  email: {
    type: String,
    required: true,
    unique: true,
    lowercase: true
  },
  phone: {
    type: String,
    required: true
  },
  location: {
    address: String,
    city: String,
    state: String,
    zipCode: String
  },
  education: [{
    degree: String,
    institution: String,
    year: Number
  }],
  certifications: [String],
  languages: [String]
}, {
  timestamps: true
});

// Index for better search performance
doctorSchema.index({ specialty: 1, name: 1 });
doctorSchema.index({ isActive: 1 });

module.exports = mongoose.model('Doctor', doctorSchema); 