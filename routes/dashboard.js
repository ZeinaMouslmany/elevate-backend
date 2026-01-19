const express = require('express');
const router = express.Router();
const { getDashboardStats } = require('../controllers/dashboardController');
const auth = require('../middleware/auth');

// @route   GET /api/admin/dashboard
// @desc    Get dashboard statistics and overview
// @access  Private
router.get('/admin/dashboard', auth, getDashboardStats);

module.exports = router;
