#!/usr/bin/env node

const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');

console.log('🏥 Healthcare Appointment Booking System Setup');
console.log('=============================================\n');

// Check if Node.js is installed
try {
  const nodeVersion = process.version;
  console.log(`✅ Node.js ${nodeVersion} is installed`);
} catch (error) {
  console.error('❌ Node.js is not installed. Please install Node.js first.');
  process.exit(1);
}

// Create .env files if they don't exist
const createEnvFile = (filePath, content) => {
  if (!fs.existsSync(filePath)) {
    fs.writeFileSync(filePath, content);
    console.log(`✅ Created ${filePath}`);
  } else {
    console.log(`ℹ️  ${filePath} already exists`);
  }
};

// Frontend .env
const frontendEnv = `REACT_APP_API_URL=http://localhost:5000/api
`;
createEnvFile('.env', frontendEnv);

// Backend .env
const backendEnv = `PORT=5000
NODE_ENV=development
MONGODB_URI=mongodb://localhost:27017/healthcare-appointments
JWT_SECRET=your-super-secret-jwt-key-change-this-in-production

# Optional: Email Configuration (for future features)
# SMTP_HOST=smtp.gmail.com
# SMTP_PORT=587
# SMTP_USER=your-email@gmail.com
# SMTP_PASS=your-app-password

# Optional: Payment Gateway (for future features)
# STRIPE_SECRET_KEY=sk_test_your_stripe_secret_key
# STRIPE_PUBLISHABLE_KEY=pk_test_your_stripe_publishable_key
`;
createEnvFile('server/.env', backendEnv);

console.log('\n📦 Installing dependencies...');

// Install frontend dependencies
try {
  console.log('Installing frontend dependencies...');
  execSync('npm install', { stdio: 'inherit' });
  console.log('✅ Frontend dependencies installed');
} catch (error) {
  console.error('❌ Failed to install frontend dependencies');
  process.exit(1);
}

// Install backend dependencies
try {
  console.log('Installing backend dependencies...');
  execSync('npm install', { cwd: 'server', stdio: 'inherit' });
  console.log('✅ Backend dependencies installed');
} catch (error) {
  console.error('❌ Failed to install backend dependencies');
  process.exit(1);
}

console.log('\n🎉 Setup completed successfully!');
console.log('\n📋 Next steps:');
console.log('1. Make sure MongoDB is running');
console.log('2. Start the backend server: cd server && npm run dev');
console.log('3. Start the frontend: npm start');
console.log('4. Seed the database: cd server && npm run seed');
console.log('\n🌐 The application will be available at:');
console.log('   Frontend: http://localhost:3000');
console.log('   Backend API: http://localhost:5000');
console.log('\n📚 For more information, see the README.md file'); 