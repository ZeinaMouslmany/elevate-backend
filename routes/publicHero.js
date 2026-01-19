const express = require('express');
const router = express.Router();
const { getHero } = require('../controllers/publicHeroController');

// @route   GET /api/hero
// @desc    Get Hero content (public)
// @access  Public
router.get('/hero', getHero);

module.exports = router;
