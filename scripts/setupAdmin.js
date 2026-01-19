const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
require('dotenv').config();

const Admin = require('../models/Admin');

async function setupAdmin() {
  try {
    // Connect to MongoDB
    await mongoose.connect(process.env.MONGODB_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });

    console.log('Connected to MongoDB');

    // Check if admin already exists
    const existingAdmin = await Admin.findOne();
    if (existingAdmin) {
      console.log('Admin already exists in database');
      process.exit(0);
    }

    // Hash the default password
    const defaultPassword = 'fightdo2024';
    const saltRounds = 10;
    const hashedPassword = await bcrypt.hash(defaultPassword, saltRounds);

    // Create new admin
    const admin = new Admin({
      password: hashedPassword,
    });

    await admin.save();

    console.log('Admin created successfully with default password: fightdo2024');
    console.log('Password has been hashed and stored securely in the database');

  } catch (error) {
    console.error('Error setting up admin:', error);
  } finally {
    await mongoose.connection.close();
    console.log('Database connection closed');
  }
}

// Run the setup if this script is executed directly
if (require.main === module) {
  setupAdmin();
}

module.exports = setupAdmin;
