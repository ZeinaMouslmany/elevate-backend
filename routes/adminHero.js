const express = require('express');
const router = express.Router();
const {
  getHero,
  updateHero,
} = require('../controllers/adminHeroController');
const auth = require('../middleware/auth');

// @route   GET /api/admin/hero
// @desc    Get Hero content (admin)
// @access  Private
router.get('/admin/hero', auth, getHero);

// @route   PUT /api/admin/hero
// @desc    Update Hero content
// @access  Private
router.put('/admin/hero', auth, updateHero);

module.exports = router;
