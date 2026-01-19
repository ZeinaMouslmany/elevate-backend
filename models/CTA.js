const mongoose = require('mongoose');

const CTASchema = new mongoose.Schema({
  headline: {
    type: String,
    required: true,
    default: '',
  },
  subtitle: {
    type: String,
    required: true,
    default: '',
  },
  buttonText: {
    type: String,
    required: true,
    default: '',
  },
}, {
  timestamps: true,
});

module.exports = mongoose.model('CTA', CTASchema);
