const express = require('express');
const router = express.Router();
const { getContact } = require('../controllers/publicContactController');

// @route   GET /api/contact
// @desc    Get contact information (public)
// @access  Public
router.get('/contact', getContact);

module.exports = router;
