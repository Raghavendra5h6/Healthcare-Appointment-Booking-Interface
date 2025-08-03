const mongoose = require('mongoose');
const Doctor = require('../models/Doctor');
require('dotenv').config();

const doctors = [
  {
    name: "Dr. Sarah Johnson",
    specialty: "Cardiology",
    experience: "15 years",
    rating: 4.8,
    image: "https://images.unsplash.com/photo-1559839734-2b71ea197ec2?w=150&h=150&fit=crop&crop=face",
    description: "Experienced cardiologist specializing in heart disease prevention and treatment. Dr. Johnson has extensive experience in diagnosing and treating various cardiovascular conditions.",
    email: "sarah.johnson@healthcare.com",
    phone: "+1-555-0101",
    availability: {
      monday: ["09:00", "10:00", "11:00", "14:00", "15:00", "16:00"],
      tuesday: ["09:00", "10:00", "11:00", "14:00", "15:00", "16:00"],
      wednesday: ["09:00", "10:00", "11:00", "14:00", "15:00", "16:00"],
      thursday: ["09:00", "10:00", "11:00", "14:00", "15:00", "16:00"],
      friday: ["09:00", "10:00", "11:00", "14:00", "15:00", "16:00"],
      saturday: ["09:00", "10:00", "11:00"],
      sunday: []
    },
    location: {
      address: "123 Medical Center Dr",
      city: "New York",
      state: "NY",
      zipCode: "10001"
    },
    education: [
      {
        degree: "MD",
        institution: "Harvard Medical School",
        year: 2008
      }
    ],
    certifications: ["Board Certified in Cardiology", "American Heart Association"],
    languages: ["English", "Spanish"]
  },
  {
    name: "Dr. Michael Chen",
    specialty: "Neurology",
    experience: "12 years",
    rating: 4.9,
    image: "https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?w=150&h=150&fit=crop&crop=face",
    description: "Neurologist with expertise in treating neurological disorders and brain conditions. Dr. Chen specializes in stroke treatment and prevention.",
    email: "michael.chen@healthcare.com",
    phone: "+1-555-0102",
    availability: {
      monday: ["10:00", "11:00", "14:00", "15:00", "16:00"],
      tuesday: ["09:00", "10:00", "11:00", "14:00", "15:00", "16:00"],
      wednesday: ["09:00", "10:00", "11:00", "14:00", "15:00", "16:00"],
      thursday: ["09:00", "10:00", "11:00", "14:00", "15:00", "16:00"],
      friday: ["09:00", "10:00", "11:00", "14:00", "15:00"],
      saturday: ["09:00", "10:00"],
      sunday: []
    },
    location: {
      address: "456 Neurology Ave",
      city: "Los Angeles",
      state: "CA",
      zipCode: "90210"
    },
    education: [
      {
        degree: "MD",
        institution: "Stanford University School of Medicine",
        year: 2011
      }
    ],
    certifications: ["Board Certified in Neurology", "American Academy of Neurology"],
    languages: ["English", "Mandarin"]
  },
  {
    name: "Dr. Emily Rodriguez",
    specialty: "Pediatrics",
    experience: "8 years",
    rating: 4.7,
    image: "https://images.unsplash.com/photo-1594824475548-9a5a9c4c5c5c?w=150&h=150&fit=crop&crop=face",
    description: "Pediatrician dedicated to providing comprehensive care for children of all ages. Dr. Rodriguez has a gentle approach and specializes in child development.",
    email: "emily.rodriguez@healthcare.com",
    phone: "+1-555-0103",
    availability: {
      monday: ["09:00", "10:00", "11:00", "14:00", "15:00", "16:00"],
      tuesday: ["09:00", "10:00", "11:00", "14:00", "15:00", "16:00"],
      wednesday: ["09:00", "10:00", "11:00", "14:00", "15:00", "16:00"],
      thursday: ["09:00", "10:00", "11:00", "14:00", "15:00", "16:00"],
      friday: ["09:00", "10:00", "11:00", "14:00", "15:00", "16:00"],
      saturday: ["09:00", "10:00", "11:00"],
      sunday: []
    },
    location: {
      address: "789 Children's Hospital Blvd",
      city: "Chicago",
      state: "IL",
      zipCode: "60601"
    },
    education: [
      {
        degree: "MD",
        institution: "University of Chicago Pritzker School of Medicine",
        year: 2015
      }
    ],
    certifications: ["Board Certified in Pediatrics", "American Academy of Pediatrics"],
    languages: ["English", "Spanish"]
  },
  {
    name: "Dr. David Thompson",
    specialty: "Orthopedics",
    experience: "20 years",
    rating: 4.6,
    image: "https://images.unsplash.com/photo-1622253692010-333f2da6031d?w=150&h=150&fit=crop&crop=face",
    description: "Orthopedic surgeon specializing in joint replacement and sports medicine. Dr. Thompson has performed over 1000 successful surgeries.",
    email: "david.thompson@healthcare.com",
    phone: "+1-555-0104",
    availability: {
      monday: ["08:00", "09:00", "10:00", "14:00", "15:00", "16:00"],
      tuesday: ["08:00", "09:00", "10:00", "14:00", "15:00", "16:00"],
      wednesday: ["08:00", "09:00", "10:00", "14:00", "15:00", "16:00"],
      thursday: ["08:00", "09:00", "10:00", "14:00", "15:00", "16:00"],
      friday: ["08:00", "09:00", "10:00", "14:00", "15:00", "16:00"],
      saturday: ["08:00", "09:00", "10:00"],
      sunday: []
    },
    location: {
      address: "321 Sports Medicine Center",
      city: "Miami",
      state: "FL",
      zipCode: "33101"
    },
    education: [
      {
        degree: "MD",
        institution: "Johns Hopkins University School of Medicine",
        year: 2003
      }
    ],
    certifications: ["Board Certified in Orthopedic Surgery", "American Academy of Orthopaedic Surgeons"],
    languages: ["English"]
  },
  {
    name: "Dr. Lisa Park",
    specialty: "Dermatology",
    experience: "10 years",
    rating: 4.8,
    image: "https://images.unsplash.com/photo-1582750433449-648ed127bb54?w=150&h=150&fit=crop&crop=face",
    description: "Dermatologist specializing in skin conditions, cosmetic procedures, and skin cancer screening. Dr. Park is known for her gentle approach to skin care.",
    email: "lisa.park@healthcare.com",
    phone: "+1-555-0105",
    availability: {
      monday: ["09:00", "10:00", "11:00", "14:00", "15:00", "16:00"],
      tuesday: ["09:00", "10:00", "11:00", "14:00", "15:00", "16:00"],
      wednesday: ["09:00", "10:00", "11:00", "14:00", "15:00", "16:00"],
      thursday: ["09:00", "10:00", "11:00", "14:00", "15:00", "16:00"],
      friday: ["09:00", "10:00", "11:00", "14:00", "15:00", "16:00"],
      saturday: ["09:00", "10:00", "11:00"],
      sunday: []
    },
    location: {
      address: "654 Skin Care Plaza",
      city: "Seattle",
      state: "WA",
      zipCode: "98101"
    },
    education: [
      {
        degree: "MD",
        institution: "University of Washington School of Medicine",
        year: 2013
      }
    ],
    certifications: ["Board Certified in Dermatology", "American Academy of Dermatology"],
    languages: ["English", "Korean"]
  },
  {
    name: "Dr. James Wilson",
    specialty: "Psychiatry",
    experience: "14 years",
    rating: 4.9,
    image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face",
    description: "Psychiatrist providing mental health care and therapy for various psychological conditions. Dr. Wilson specializes in anxiety and depression treatment.",
    email: "james.wilson@healthcare.com",
    phone: "+1-555-0106",
    availability: {
      monday: ["10:00", "11:00", "14:00", "15:00", "16:00"],
      tuesday: ["09:00", "10:00", "11:00", "14:00", "15:00", "16:00"],
      wednesday: ["09:00", "10:00", "11:00", "14:00", "15:00", "16:00"],
      thursday: ["09:00", "10:00", "11:00", "14:00", "15:00", "16:00"],
      friday: ["09:00", "10:00", "11:00", "14:00", "15:00", "16:00"],
      saturday: ["09:00", "10:00"],
      sunday: []
    },
    location: {
      address: "987 Mental Health Center",
      city: "Boston",
      state: "MA",
      zipCode: "02101"
    },
    education: [
      {
        degree: "MD",
        institution: "Boston University School of Medicine",
        year: 2009
      }
    ],
    certifications: ["Board Certified in Psychiatry", "American Psychiatric Association"],
    languages: ["English"]
  }
];

const seedDatabase = async () => {
  try {
    // Connect to MongoDB
    await mongoose.connect(
      process.env.MONGODB_URI || 'mongodb://localhost:27017/healthcare-appointments',
      {
        useNewUrlParser: true,
        useUnifiedTopology: true,
      }
    );

    console.log('Connected to MongoDB');

    // Clear existing doctors
    await Doctor.deleteMany({});
    console.log('Cleared existing doctors');

    // Insert new doctors
    const insertedDoctors = await Doctor.insertMany(doctors);
    console.log(`Inserted ${insertedDoctors.length} doctors`);

    console.log('Database seeded successfully!');
    process.exit(0);
  } catch (error) {
    console.error('Error seeding database:', error);
    process.exit(1);
  }
};

seedDatabase(); 