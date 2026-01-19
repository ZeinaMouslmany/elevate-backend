const express = require('express');
const router = express.Router();
const {
  getAllExperiences,
  updateExperiences,
  createExperience,
  updateExperience,
  deleteExperience,
} = require('../controllers/adminExperienceController');
const auth = require('../middleware/auth');

// @route   GET /api/admin/experiences
// @desc    Get all experiences (admin)
// @access  Private
router.get('/admin/experiences', auth, getAllExperiences);

// @route   PUT /api/admin/experiences
// @desc    Update all experiences
// @access  Private
router.put('/admin/experiences', auth, updateExperiences);

// @route   POST /api/admin/experiences
// @desc    Create new experience
// @access  Private
router.post('/admin/experiences', auth, createExperience);

// @route   PUT /api/admin/experiences/:id
// @desc    Update experience
// @access  Private
router.put('/admin/experiences/:id', auth, updateExperience);

// @route   DELETE /api/admin/experiences/:id
// @desc    Delete experience
// @access  Private
router.delete('/admin/experiences/:id', auth, deleteExperience);

module.exports = router;
