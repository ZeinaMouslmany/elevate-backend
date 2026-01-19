const Experience = require('../models/Experience');

// @desc    Get all enabled experiences (public)
// @access  Public
const getExperiences = async (req, res) => {
  try {
    // Return experiences that are enabled (true) or where enabled field doesn't exist/null (default to enabled)
    // Only exclude experiences where enabled is explicitly false
    const experiences = await Experience.find({
      $or: [
        { enabled: true },
        { enabled: { $exists: false } },
        { enabled: null }
      ]
    })
      .sort({ order: 1 })
      .select('title description order');
    
    res.json(experiences);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
};

module.exports = {
  getExperiences,
};
