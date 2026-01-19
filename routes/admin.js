const express = require('express');
const router = express.Router();
const { login, getProfile } = require('../controllers/adminController');
const { getDashboardStats } = require('../controllers/dashboardController');
const auth = require('../middleware/auth');

// @route   POST api/admin/login
// @desc    Authenticate admin and get token
// @access  Public
router.post('/login', login);

// @route   GET api/admin/profile
// @desc    Get admin profile
// @access  Private
router.get('/profile', auth, getProfile);

// @route   GET api/admin/dashboard
// @desc    Get dashboard statistics and overview
// @access  Private
router.get('/dashboard', auth, getDashboardStats);

module.exports = router;
