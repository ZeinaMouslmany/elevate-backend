const express = require('express');
const router = express.Router();
const { getAbout } = require('../controllers/publicAboutController');

// @route   GET /api/about
// @desc    Get About content (public)
// @access  Public
router.get('/about', getAbout);

module.exports = router;
