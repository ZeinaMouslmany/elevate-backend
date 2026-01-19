const mongoose = require('mongoose');

const AboutSchema = new mongoose.Schema(
  {
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
    // Controls whether the statistics section is shown on the public site
    statsEnabled: {
      type: Boolean,
      default: true,
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model('About', AboutSchema);
