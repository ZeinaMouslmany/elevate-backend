const mongoose = require('mongoose');
const About = require('../models/About');
require('dotenv').config();

const aboutData = {
  name: 'Zeinab Saad',
  tagline: 'About the Coach',
  bio: [
    'As a certified Fight Do coach, I specialize in empowering individuals through high-energy martial arts-inspired fitness. My passion lies in helping you discover your inner strength while building physical power.',
    'Beyond Fight Do, I offer comprehensive strength and weight training programs tailored to your goals. Whether you\'re looking to build muscle, increase endurance, or transform your physique—I\'m here to guide your journey.',
    'Through workshops and group sessions, I\'ve had the privilege of coaching hundreds of clients, from beginners to advanced athletes. My approach combines technical precision with motivational coaching to unlock your full potential.',
  ],
  stats: {
    clientsTrained: '500+',
    yearsExperience: '8+',
    workshops: '50+',
  },
  profileImageUrl: '',
};

const seedAbout = async () => {
  try {
    // Connect to MongoDB
    await mongoose.connect(process.env.MONGODB_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });

    console.log('Connected to MongoDB');

    // Clear existing About data
    await About.deleteMany({});
    console.log('Cleared existing About data');

    // Insert new About data
    const about = new About(aboutData);
    await about.save();
    console.log('Seeded About data successfully');
    console.log('About ID:', about._id);

    process.exit(0);
  } catch (error) {
    console.error('Error seeding About:', error);
    process.exit(1);
  }
};

seedAbout();
