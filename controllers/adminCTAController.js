const CTA = require('../models/CTA');

// @desc    Get CTA content (admin)
// @access  Private
const getCTA = async (req, res) => {
  try {
    const cta = await CTA.findOne().sort({ createdAt: -1 });

    if (!cta) {
      return res.json({
        headline: '',
        subtitle: '',
        buttonText: '',
      });
    }

    res.json(cta);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
};

// @desc    Update CTA content
// @access  Private
const updateCTA = async (req, res) => {
  try {
    const { headline, subtitle, buttonText } = req.body;

    // Find existing CTA or create new one
    let cta = await CTA.findOne().sort({ createdAt: -1 });

    if (!cta) {
      cta = new CTA({
        headline: headline || '',
        subtitle: subtitle || '',
        buttonText: buttonText || '',
      });
    } else {
      // Update fields
      if (headline !== undefined) {
        cta.headline = headline;
      }
      if (subtitle !== undefined) {
        cta.subtitle = subtitle;
      }
      if (buttonText !== undefined) {
        cta.buttonText = buttonText;
      }
    }

    await cta.save();

    res.json(cta);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
};

module.exports = {
  getCTA,
  updateCTA,
};
