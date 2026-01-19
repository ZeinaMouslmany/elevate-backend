const express = require('express');
const router = express.Router();
const {
  getServices,
  getAllServices,
  updateServices,
  createService,
  updateService,
  deleteService,
} = require('../controllers/serviceController');
const auth = require('../middleware/auth');

// @route   GET /api/services
// @desc    Get all enabled services (public)
// @access  Public
router.get('/services', getServices);

// @route   GET /api/admin/services
// @desc    Get all services (admin)
// @access  Private
router.get('/admin/services', auth, getAllServices);

// @route   PUT /api/admin/services
// @desc    Update all services
// @access  Private
router.put('/admin/services', auth, updateServices);

// @route   POST /api/admin/services
// @desc    Create new service
// @access  Private
router.post('/admin/services', auth, createService);

// @route   PUT /api/admin/services/:id
// @desc    Update service
// @access  Private
router.put('/admin/services/:id', auth, updateService);

// @route   DELETE /api/admin/services/:id
// @desc    Delete service
// @access  Private
router.delete('/admin/services/:id', auth, deleteService);

module.exports = router;
