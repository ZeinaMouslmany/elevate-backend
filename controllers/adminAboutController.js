const About = require('../models/About');

// @desc    Get About content (admin)
// @access  Private
const getAbout = async (req, res) => {
  try {
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

    res.json(about);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
};

// @desc    Update About content
// @access  Private
const updateAbout = async (req, res) => {
  try {
    const {
      name,
      tagline,
      bio,
      stats,
      profileImageUrl,
      statsEnabled,
    } = req.body;

    // Find existing About or create new one
    let about = await About.findOne().sort({ createdAt: -1 });

    if (!about) {
      about = new About({
        name: name || '',
        tagline: tagline || '',
        bio: Array.isArray(bio) ? bio : [],
        stats: {
          clientsTrained: stats?.clientsTrained || '',
          yearsExperience: stats?.yearsExperience || '',
          workshops: stats?.workshops || '',
        },
        profileImageUrl: profileImageUrl || '',
        statsEnabled:
          typeof statsEnabled === 'boolean' ? statsEnabled : true,
      });
    } else {
      // Update fields
      if (name !== undefined) {
        about.name = name;
      }
      if (tagline !== undefined) {
        about.tagline = tagline;
      }
      if (bio !== undefined && Array.isArray(bio)) {
        about.bio = bio;
      }
      if (stats !== undefined) {
        if (stats.clientsTrained !== undefined) {
          about.stats.clientsTrained = stats.clientsTrained;
        }
        if (stats.yearsExperience !== undefined) {
          about.stats.yearsExperience = stats.yearsExperience;
        }
        if (stats.workshops !== undefined) {
          about.stats.workshops = stats.workshops;
        }
      }
      if (profileImageUrl !== undefined) {
        about.profileImageUrl = profileImageUrl;
      }
      if (statsEnabled !== undefined) {
        about.statsEnabled = !!statsEnabled;
      }
    }

    await about.save();

    res.json(about);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
};

module.exports = {
  getAbout,
  updateAbout,
};
