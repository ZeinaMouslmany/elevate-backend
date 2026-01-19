const Hero = require('../models/Hero');

// @desc    Get Hero content (public)
// @access  Public
const getHero = async (req, res) => {
  try {
    // Get the Hero document (should be single document)
    const hero = await Hero.findOne().sort({ createdAt: -1 });

    if (!hero) {
      return res.json({
        tagline: '',
        headline: '',
        subtitle: '',
        primaryButtonText: '',
        secondaryButtonText: '',
        backgroundImageUrl: '',
      });
    }

    res.json({
      tagline: hero.tagline || '',
      headline: hero.headline || '',
      subtitle: hero.subtitle || '',
      primaryButtonText: hero.primaryButtonText || '',
      secondaryButtonText: hero.secondaryButtonText || '',
      backgroundImageUrl: hero.backgroundImageUrl || '',
    });
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
};

module.exports = {
  getHero,
};
