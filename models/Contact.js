const mongoose = require('mongoose');

const ContactSchema = new mongoose.Schema({
  quote: {
    type: String,
    default: '',
  },
  socialLinks: [
    {
      icon: {
        type: String,
        required: true,
        enum: [
          'Instagram',
          'Phone',
          'Mail',
          'Facebook',
          'Twitter',
          'LinkedIn',
          'YouTube',
          'TikTok',
          'WhatsApp',
          'MapPin',
          'Globe',
        ],
      },
      label: {
        type: String,
        required: true,
      },
      url: {
        type: String,
        required: true,
      },
      displayText: {
        type: String,
        required: true,
      },
      order: {
        type: Number,
        default: 0,
      },
      enabled: {
        type: Boolean,
        default: true,
      },
    },
  ],
}, {
  timestamps: true,
});

module.exports = mongoose.model('Contact', ContactSchema);
