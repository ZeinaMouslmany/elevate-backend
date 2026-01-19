const Service = require('../models/Service');
const Experience = require('../models/Experience');
const Video = require('../models/Video');
const Contact = require('../models/Contact');
const Hero = require('../models/Hero');
const About = require('../models/About');
const CTA = require('../models/CTA');

// @desc    Get dashboard statistics and overview
// @access  Private
const getDashboardStats = async (req, res) => {
  try {
    // Get all stats in parallel for better performance
    const [
      services,
      experiences,
      videos,
      contact,
      hero,
      about,
      cta,
    ] = await Promise.all([
      Service.find(),
      Experience.find(),
      Video.find().sort({ order: 1 }),
      Contact.findOne().sort({ createdAt: -1 }),
      Hero.findOne().sort({ createdAt: -1 }),
      About.findOne().sort({ createdAt: -1 }),
      CTA.findOne().sort({ createdAt: -1 }),
    ]);

    // Calculate active services
    const activeServices = services.filter(s => s.enabled).length;

    // Calculate enabled contact methods
    let contactMethodsCount = 0;
    if (contact && contact.socialLinks) {
      contactMethodsCount = contact.socialLinks.filter(link => link.enabled).length;
    }

    // Prepare dashboard stats
    const stats = {
      activeServices,
      timelineItems: experiences.length,
      galleryVideos: videos.length,
      contactMethods: contactMethodsCount,
    };

    // Prepare content overview
    const contentOverview = {
      hero: {
        headline: hero?.headline || '',
        tagline: hero?.tagline || '',
      },
      contact: {
        socialLinksCount: contactMethodsCount,
        quote: contact?.quote || '',
      },
      about: {
        name: about?.name || '',
        bioParagraphs: about?.bio?.length || 0,
      },
      cta: {
        headline: cta?.headline || '',
        buttonText: cta?.buttonText || '',
      },
    };

    res.json({
      stats,
      contentOverview,
      lastUpdated: {
        hero: hero?.updatedAt || null,
        about: about?.updatedAt || null,
        cta: cta?.updatedAt || null,
        contact: contact?.updatedAt || null,
      },
    });
  } catch (err) {
    console.error('Dashboard stats error:', err.message);
    res.status(500).json({ error: 'Server error: ' + err.message });
  }
};

module.exports = {
  getDashboardStats,
};
