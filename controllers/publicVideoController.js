const Video = require('../models/Video');

// @desc    Get all Videos (public)
// @access  Public
const getVideos = async (req, res) => {
  try {
    // Get all videos sorted by order
    const videos = await Video.find().sort({ order: 1, createdAt: -1 });

    res.json(videos.map(video => ({
      id: video._id.toString(),
      title: video.title || '',
      thumbnail: video.thumbnail || '',
      videoUrl: video.videoUrl || '',
      duration: video.duration || '0:00',
    })));
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
};

module.exports = {
  getVideos,
};
