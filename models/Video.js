const mongoose = require('mongoose');

const VideoSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
    default: '',
  },
  thumbnail: {
    type: String,
    default: '',
  },
  videoUrl: {
    type: String,
    default: '',
  },
  duration: {
    type: String,
    default: '0:00',
  },
  order: {
    type: Number,
    default: 0,
  },
}, {
  timestamps: true,
});

// Index for ordering
VideoSchema.index({ order: 1 });

module.exports = mongoose.model('Video', VideoSchema);
