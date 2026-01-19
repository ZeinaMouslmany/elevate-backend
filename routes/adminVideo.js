const express = require('express');
const router = express.Router();
const {
  getVideos,
  createVideo,
  updateVideo,
  deleteVideo,
  updateVideoOrder,
} = require('../controllers/adminVideoController');
const auth = require('../middleware/auth');

// @route   GET /api/admin/videos
// @desc    Get all Videos (admin)
// @access  Private
router.get('/admin/videos', auth, getVideos);

// @route   POST /api/admin/videos
// @desc    Create a new Video
// @access  Private
router.post('/admin/videos', auth, createVideo);

// @route   PUT /api/admin/videos/order
// @desc    Update video order (bulk)
// @access  Private
// IMPORTANT: This route must come BEFORE /:id route to avoid matching "order" as an ID
router.put('/admin/videos/order', auth, updateVideoOrder);

// @route   PUT /api/admin/videos/:id
// @desc    Update a Video
// @access  Private
router.put('/admin/videos/:id', auth, updateVideo);

// @route   DELETE /api/admin/videos/:id
// @desc    Delete a Video
// @access  Private
router.delete('/admin/videos/:id', auth, deleteVideo);

module.exports = router;
