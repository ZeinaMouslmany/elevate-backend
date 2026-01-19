const About = require('../models/About');

// @desc    Get About content (public)
// @access  Public
const getAbout = async (req, res) => {
  try {
    // Get the About document (should be single document)
    const about = await About.findOne().sort({ createdAt: -1 });

    if (!about) {
      return res.json({
        name: '',
        tagline: '',
        bio: [],
        stats: {
          clientsTrained: '',
          yearsExperience: '',
          workshops: '',
        },
        profileImageUrl: '',
        statsEnabled: true,
      });
    }

    res.json({
      name: about.name || '',
      tagline: about.tagline || '',
      bio: about.bio || [],
      stats: {
        clientsTrained: about.stats?.clientsTrained || '',
        yearsExperience: about.stats?.yearsExperience || '',
        workshops: about.stats?.workshops || '',
      },
      profileImageUrl: about.profileImageUrl || '',
      statsEnabled:
        typeof about.statsEnabled === 'boolean' ? about.statsEnabled : true,
    });
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
};

module.exports = {
  getAbout,
};
