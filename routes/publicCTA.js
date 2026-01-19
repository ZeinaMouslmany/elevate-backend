const express = require('express');
const router = express.Router();
const { getCTA } = require('../controllers/publicCTAController');

// @route   GET /api/cta
// @desc    Get CTA content (public)
// @access  Public
router.get('/cta', getCTA);

module.exports = router;
