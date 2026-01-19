const mongoose = require('mongoose');
const Experience = require('../models/Experience');
require('dotenv').config();

const experiences = [
  {
    title: "The Beginning",
    description:
      "Started my fitness journey, discovering a passion for martial arts and high-intensity training that would shape my career.",
    order: 1,
    enabled: true,
  },
  {
    title: "Fight Do Certification",
    description:
      "Obtained official Fight Do coaching certification, becoming one of the first certified coaches in the region.",
    order: 2,
    enabled: true,
  },
  {
    title: "Strength Coach Certification",
    description:
      "Expanded expertise with advanced strength and conditioning certifications, adding weight training to my coaching repertoire.",
    order: 3,
    enabled: true,
  },
  {
    title: "Workshop Leader",
    description:
      "Launched a series of successful workshops, training hundreds of participants and building a strong community of fitness enthusiasts.",
    order: 4,
    enabled: true,
  },
  {
    title: "Elite Coach Status",
    description:
      "Recognized as an elite-level coach, continuing to inspire and transform lives through Fight Do and strength training.",
    order: 5,
    enabled: true,
  },
];

const seedExperiences = async () => {
  try {
    // Connect to MongoDB
    await mongoose.connect(process.env.MONGODB_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

    console.log('Connected to MongoDB');

    // Clear existing experiences
    await Experience.deleteMany({});
    console.log('Cleared existing experiences');

    // Insert new experiences
    await Experience.insertMany(experiences);
    console.log('Seeded experiences successfully');

    process.exit(0);
  } catch (error) {
    console.error('Error seeding experiences:', error);
    process.exit(1);
  }
};

seedExperiences();
