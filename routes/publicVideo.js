const express = require('express');
const router = express.Router();
const { getVideos } = require('../controllers/publicVideoController');

// @route   GET /api/videos
// @desc    Get all Videos (public)
// @access  Public
router.get('/videos', getVideos);

module.exports = router;
