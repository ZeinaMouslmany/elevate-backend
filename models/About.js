const mongoose = require('mongoose');

const AboutSchema = new mongoose.Schema({
  name: {
    type: String,
    default: '',
  },
  tagline: {
    type: String,
    default: '',
  },
  bio: {
    type: [String],
    default: [],
  },
  stats: {
    clientsTrained: {
      type: String,
      default: '',
    },
    yearsExperience: {
      type: String,
      default: '',
    },
    workshops: {
      type: String,
      default: '',
    },
  },
  profileImageUrl: {
    type: String,
    default: '',
  },
}, {
  timestamps: true,
});

module.exports = mongoose.model('About', AboutSchema);
