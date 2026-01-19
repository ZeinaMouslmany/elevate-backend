const mongoose = require('mongoose');
const Service = require('../models/Service');
require('dotenv').config();

const services = [
  {
    id: "1",
    icon: "Swords",
    title: "Fight Do Coaching",
    description:
      "High-energy martial arts-inspired fitness combining kickboxing, Muay Thai, and combat moves. Perfect for burning calories, building strength, and releasing stress through powerful movements.",
    features: ["Personal Training", "Group Classes", "Technique Mastery"],
    enabled: true,
    order: 1,
  },
  {
    id: "2",
    icon: "Dumbbell",
    title: "Strength Training",
    description:
      "Customized weight training programs designed to build lean muscle, increase power, and sculpt your physique. From beginners to advanced lifters—tailored to your goals.",
    features: ["Custom Programs", "Progressive Overload", "Body Transformation"],
    enabled: true,
    order: 2,
  },
  {
    id: "3",
    icon: "Globe",
    title: "Programs",
    description:
      "Flexible remote coaching that combines Fight Do energy and structured strength training. Includes progress plans, and on-demand workouts so you can train anywhere.",
    features: ["Personalized Plans", "On-Demand Workouts"],
    enabled: true,
    order: 3,
  },
];

const seedServices = async () => {
  try {
    // Connect to MongoDB
    await mongoose.connect(process.env.MONGODB_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });

    console.log('Connected to MongoDB');

    // Clear existing services
    await Service.deleteMany({});
    console.log('Cleared existing services');

    // Insert new services
    await Service.insertMany(services);
    console.log('Services seeded successfully');

    process.exit(0);
  } catch (error) {
    console.error('Error seeding services:', error);
    process.exit(1);
  }
};

seedServices();
