const mongoose = require('mongoose');
const Contact = require('../models/Contact');
require('dotenv').config();

const contactData = {
  quote: '"The only bad workout is the one that didn\'t happen."',
  socialLinks: [
    {
      icon: 'Instagram',
      label: 'Instagram',
      url: 'https://www.instagram.com/zeinabsaad24',
      displayText: '@zeinabsaad24',
      order: 0,
      enabled: true,
    },
    {
      icon: 'Phone',
      label: 'Phone',
      url: '+96170722446',
      displayText: '+961 70 722 446',
      order: 1,
      enabled: true,
    },
  ],
};

const seedContact = async () => {
  try {
    // Connect to MongoDB
    await mongoose.connect(process.env.MONGODB_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });

    console.log('Connected to MongoDB');

    // Clear existing contact data
    await Contact.deleteMany({});
    console.log('Cleared existing contact data');

    // Insert new contact data
    const contact = new Contact(contactData);
    await contact.save();
    console.log('Seeded contact data successfully');

    process.exit(0);
  } catch (error) {
    console.error('Error seeding contact:', error);
    process.exit(1);
  }
};

seedContact();
