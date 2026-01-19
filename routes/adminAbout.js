const express = require('express');
const router = express.Router();
const {
  getAbout,
  updateAbout,
} = require('../controllers/adminAboutController');
const auth = require('../middleware/auth');

// @route   GET /api/admin/about
// @desc    Get About content (admin)
// @access  Private
router.get('/admin/about', auth, getAbout);

// @route   PUT /api/admin/about
// @desc    Update About content
// @access  Private
router.put('/admin/about', auth, updateAbout);

module.exports = router;
