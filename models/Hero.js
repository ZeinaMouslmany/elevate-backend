const mongoose = require('mongoose');

const HeroSchema = new mongoose.Schema({
  tagline: {
    type: String,
    default: '',
  },
  headline: {
    type: String,
    default: '',
  },
  subtitle: {
    type: String,
    default: '',
  },
  primaryButtonText: {
    type: String,
    default: '',
  },
  secondaryButtonText: {
    type: String,
    default: '',
  },
  backgroundImageUrl: {
    type: String,
    default: '',
  },
}, {
  timestamps: true,
});

module.exports = mongoose.model('Hero', HeroSchema);
