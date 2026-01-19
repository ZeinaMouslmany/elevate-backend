const express = require('express');
const router = express.Router();
const {
  getContact,
  updateContact,
} = require('../controllers/adminContactController');
const auth = require('../middleware/auth');

// @route   GET /api/admin/contact
// @desc    Get contact information (admin)
// @access  Private
router.get('/admin/contact', auth, getContact);

// @route   PUT /api/admin/contact
// @desc    Update contact information
// @access  Private
router.put('/admin/contact', auth, updateContact);

module.exports = router;
