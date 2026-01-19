const express = require('express');
const router = express.Router();
const {
  getCTA,
  updateCTA,
} = require('../controllers/adminCTAController');
const auth = require('../middleware/auth');

// @route   GET /api/admin/cta
// @desc    Get CTA content (admin)
// @access  Private
router.get('/admin/cta', auth, getCTA);

// @route   PUT /api/admin/cta
// @desc    Update CTA content
// @access  Private
router.put('/admin/cta', auth, updateCTA);

module.exports = router;
