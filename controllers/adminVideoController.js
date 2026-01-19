const Video = require('../models/Video');

// @desc    Get all Videos (admin)
// @access  Private
const getVideos = async (req, res) => {
  try {
    const videos = await Video.find().sort({ order: 1, createdAt: -1 });
    res.json(videos);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
};

// @desc    Create a new Video
// @access  Private
const createVideo = async (req, res) => {
  try {
    const { title, thumbnail, videoUrl, duration, order } = req.body;

    // Get max order if not provided
    let videoOrder = order;
    if (videoOrder === undefined || videoOrder === null) {
      const maxOrderVideo = await Video.findOne().sort({ order: -1 });
      videoOrder = maxOrderVideo ? maxOrderVideo.order + 1 : 0;
    }

    const video = new Video({
      title: title || '',
      thumbnail: thumbnail || '',
      videoUrl: videoUrl || '',
      duration: duration || '0:00',
      order: videoOrder,
    });

    await video.save();
    res.json(video);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
};

// @desc    Update a Video
// @access  Private
const updateVideo = async (req, res) => {
  try {
    const { id } = req.params;
    const { title, thumbnail, videoUrl, duration, order } = req.body;

    // Validate id format
    if (!id || id.length !== 24) {
      return res.status(400).json({ message: 'Invalid video ID format' });
    }

    const video = await Video.findById(id);
    if (!video) {
      return res.status(404).json({ message: 'Video not found' });
    }

    if (title !== undefined) video.title = title;
    if (thumbnail !== undefined) video.thumbnail = thumbnail;
    if (videoUrl !== undefined) video.videoUrl = videoUrl;
    if (duration !== undefined) video.duration = duration;
    if (order !== undefined && typeof order === 'number') video.order = order;

    await video.save();
    res.json(video);
  } catch (err) {
    console.error('Error updating video:', err.message);
    if (err.name === 'CastError') {
      return res.status(400).json({ message: 'Invalid video ID format' });
    }
    res.status(500).json({ error: 'Server error: ' + err.message });
  }
};

// @desc    Delete a Video
// @access  Private
const deleteVideo = async (req, res) => {
  try {
    const { id } = req.params;

    const video = await Video.findById(id);
    if (!video) {
      return res.status(404).json({ message: 'Video not found' });
    }

    await Video.findByIdAndDelete(id);
    res.json({ message: 'Video deleted successfully' });
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
};

// @desc    Update video order (bulk update)
// @access  Private
const updateVideoOrder = async (req, res) => {
  try {
    const { videos } = req.body; // Array of { id, order }

    if (!Array.isArray(videos)) {
      return res.status(400).json({ message: 'Videos array is required' });
    }

    // Validate and update each video's order
    const updatePromises = videos.map(async ({ id, order }) => {
      // Validate id exists and is a valid MongoDB ObjectId
      if (!id || typeof id !== 'string') {
        throw new Error(`Invalid video id: ${id}`);
      }

      // Validate order is a number
      if (typeof order !== 'number' && order !== undefined) {
        throw new Error(`Invalid order value: ${order} for video ${id}`);
      }

      // Check if video exists
      const video = await Video.findById(id);
      if (!video) {
        throw new Error(`Video not found: ${id}`);
      }

      // Update the order
      video.order = order !== undefined ? order : video.order;
      return video.save();
    });

    await Promise.all(updatePromises);
    const updatedVideos = await Video.find().sort({ order: 1, createdAt: -1 });
    res.json(updatedVideos);
  } catch (err) {
    console.error('Error updating video order:', err.message);
    res.status(500).json({ error: 'Server error: ' + err.message });
  }
};

module.exports = {
  getVideos,
  createVideo,
  updateVideo,
  deleteVideo,
  updateVideoOrder,
};
