const Contact = require('../models/Contact');

// @desc    Get contact information (public)
// @access  Public
const getContact = async (req, res) => {
  try {
    // Get the contact document (should be single document)
    const contact = await Contact.findOne().sort({ createdAt: -1 });

    if (!contact) {
      return res.json({
        quote: '',
        socialLinks: [],
      });
    }

    // Filter enabled social links and sort by order
    const enabledLinks = contact.socialLinks
      .filter(link => link.enabled !== false)
      .sort((a, b) => (a.order || 0) - (b.order || 0));

    res.json({
      quote: contact.quote || '',
      socialLinks: enabledLinks.map(link => ({
        icon: link.icon,
        label: link.label,
        url: link.url,
        displayText: link.displayText,
      })),
    });
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
};

module.exports = {
  getContact,
};
