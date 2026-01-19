const Hero = require('../models/Hero');

// @desc    Get Hero content (admin)
// @access  Private
const getHero = async (req, res) => {
  try {
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

    res.json(hero);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
};

// @desc    Update Hero content
// @access  Private
const updateHero = async (req, res) => {
  try {
    const { 
      tagline, 
      headline, 
      subtitle, 
      primaryButtonText, 
      secondaryButtonText, 
      backgroundImageUrl 
    } = req.body;

    // Find existing Hero or create new one
    let hero = await Hero.findOne().sort({ createdAt: -1 });

    if (!hero) {
      hero = new Hero({
        tagline: tagline || '',
        headline: headline || '',
        subtitle: subtitle || '',
        primaryButtonText: primaryButtonText || '',
        secondaryButtonText: secondaryButtonText || '',
        backgroundImageUrl: backgroundImageUrl || '',
      });
    } else {
      // Update fields
      if (tagline !== undefined) {
        hero.tagline = tagline;
      }
      if (headline !== undefined) {
        hero.headline = headline;
      }
      if (subtitle !== undefined) {
        hero.subtitle = subtitle;
      }
      if (primaryButtonText !== undefined) {
        hero.primaryButtonText = primaryButtonText;
      }
      if (secondaryButtonText !== undefined) {
        hero.secondaryButtonText = secondaryButtonText;
      }
      if (backgroundImageUrl !== undefined) {
        hero.backgroundImageUrl = backgroundImageUrl;
      }
    }

    await hero.save();

    res.json(hero);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
};

module.exports = {
  getHero,
  updateHero,
};
