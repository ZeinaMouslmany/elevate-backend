const express = require('express');
const router = express.Router();
const { getExperiences } = require('../controllers/publicExperienceController');

// @route   GET /api/experiences
// @desc    Get all enabled experiences (public)
// @access  Public
router.get('/experiences', getExperiences);

module.exports = router;
