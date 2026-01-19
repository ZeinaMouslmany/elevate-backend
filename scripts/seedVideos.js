const mongoose = require('mongoose');
const Video = require('../models/Video');
require('dotenv').config();

const videosData = [
  {
    title: 'Fight Do Basics',
    thumbnail: 'https://images.unsplash.com/photo-1549719386-74dfcbf7dbed?w=600&h=400&fit=crop',
    videoUrl: '',
    duration: '3:45',
    order: 0,
  },
  {
    title: 'Kickboxing Combos',
    thumbnail: 'https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?w=600&h=400&fit=crop',
    videoUrl: '',
    duration: '5:20',
    order: 1,
  },
  {
    title: 'Strength Circuit',
    thumbnail: 'https://images.unsplash.com/photo-1534438327276-14e5300c3a48?w=600&h=400&fit=crop',
    videoUrl: '',
    duration: '4:15',
    order: 2,
  },
  {
    title: 'Group Workshop',
    thumbnail: 'https://images.unsplash.com/photo-1571019614242-c5c5dee9f50b?w=600&h=400&fit=crop',
    videoUrl: '',
    duration: '6:30',
    order: 3,
  },
];

const seedVideos = async () => {
  try {
    // Connect to MongoDB
    await mongoose.connect(process.env.MONGODB_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });

    console.log('Connected to MongoDB');

    // Clear existing Video data
    await Video.deleteMany({});
    console.log('Cleared existing Video data');

    // Insert new Video data
    const videos = await Video.insertMany(videosData);
    console.log('Seeded Video data successfully');
    console.log(`Created ${videos.length} videos`);

    process.exit(0);
  } catch (error) {
    console.error('Error seeding Videos:', error);
    process.exit(1);
  }
};

seedVideos();
