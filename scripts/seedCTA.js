const mongoose = require('mongoose');
const CTA = require('../models/CTA');
require('dotenv').config();

const ctaData = {
  headline: 'Ready to Unleash Your Power?',
  subtitle: 'Every champion was once a beginner. Take the first step towards becoming the strongest version of yourself. Your transformation starts now.',
  buttonText: 'Start Your Fight Do Journey',
};

const seedCTA = async () => {
  try {
    // Connect to MongoDB
    await mongoose.connect(process.env.MONGODB_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });

    console.log('Connected to MongoDB');

    // Clear existing CTA data
    await CTA.deleteMany({});
    console.log('Cleared existing CTA data');

    // Insert new CTA data
    const cta = new CTA(ctaData);
    await cta.save();
    console.log('Seeded CTA data successfully');

    process.exit(0);
  } catch (error) {
    console.error('Error seeding CTA:', error);
    process.exit(1);
  }
};

seedCTA();
