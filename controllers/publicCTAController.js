const CTA = require('../models/CTA');

// @desc    Get CTA content (public)
// @access  Public
const getCTA = async (req, res) => {
  try {
    // Get the CTA document (should be single document)
    const cta = await CTA.findOne().sort({ createdAt: -1 });

    if (!cta) {
      return res.json({
        headline: '',
        subtitle: '',
        buttonText: '',
      });
    }

    res.json({
      headline: cta.headline || '',
      subtitle: cta.subtitle || '',
      buttonText: cta.buttonText || '',
    });
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
};

module.exports = {
  getCTA,
};
