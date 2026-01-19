const Contact = require('../models/Contact');

// @desc    Get contact information (admin)
// @access  Private
const getContact = async (req, res) => {
  try {
    const contact = await Contact.findOne().sort({ createdAt: -1 });

    if (!contact) {
      return res.json({
        quote: '',
        socialLinks: [],
      });
    }

    res.json(contact);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
};

// @desc    Update contact information
// @access  Private
const updateContact = async (req, res) => {
  try {
    const { quote, socialLinks } = req.body;

    // Find existing contact or create new one
    let contact = await Contact.findOne().sort({ createdAt: -1 });

    if (!contact) {
      contact = new Contact({
        quote: quote || '',
        socialLinks: [],
      });
    }

    // Update quote
    if (quote !== undefined) {
      contact.quote = quote;
    }

    // Update social links if provided
    if (Array.isArray(socialLinks)) {
      // Assign order to each link based on index
      const linksWithOrder = socialLinks.map((link, index) => ({
        icon: link.icon,
        label: link.label,
        url: link.url,
        displayText: link.displayText,
        order: index,
        enabled: link.enabled !== undefined ? link.enabled : true,
      }));

      contact.socialLinks = linksWithOrder;
    }

    await contact.save();

    res.json(contact);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
};

module.exports = {
  getContact,
  updateContact,
};
