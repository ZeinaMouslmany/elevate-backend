const Experience = require('../models/Experience');

// @desc    Get all experiences (admin)
// @access  Private
const getAllExperiences = async (req, res) => {
  try {
    const experiences = await Experience.find().sort({ order: 1 });
    res.json(experiences);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
};

// @desc    Update all experiences
// @access  Private
const updateExperiences = async (req, res) => {
  try {
    const { experiences } = req.body;

    if (!Array.isArray(experiences)) {
      return res.status(400).json({ message: 'Experiences must be an array' });
    }

    // Get all existing experience IDs
    const existingExperiences = await Experience.find({});
    const existingIds = new Set(existingExperiences.map(exp => exp._id.toString()));

    // Separate new and existing experiences
    const experiencesToCreate = [];
    const experiencesToUpdate = [];

    experiences.forEach((exp, index) => {
      const experienceData = {
        title: exp.title,
        description: exp.description,
        order: index,
        enabled: true,
      };

      if (exp.id && existingIds.has(exp.id)) {
        // Existing experience - update it
        experiencesToUpdate.push({
          id: exp.id,
          data: experienceData,
        });
      } else {
        // New experience - create it
        experiencesToCreate.push(experienceData);
      }
    });

    // Delete experiences that are no longer in the list
    const incomingIds = new Set(
      experiences
        .filter(exp => exp.id && existingIds.has(exp.id))
        .map(exp => exp.id)
    );
    const idsToDelete = existingExperiences
      .filter(exp => !incomingIds.has(exp._id.toString()))
      .map(exp => exp._id);

    if (idsToDelete.length > 0) {
      await Experience.deleteMany({ _id: { $in: idsToDelete } });
    }

    // Update existing experiences
    const updatePromises = experiencesToUpdate.map(({ id, data }) =>
      Experience.findByIdAndUpdate(id, data, { new: true })
    );
    await Promise.all(updatePromises);

    // Create new experiences
    let createdExperiences = [];
    if (experiencesToCreate.length > 0) {
      createdExperiences = await Experience.insertMany(experiencesToCreate);
    }

    // Get all experiences sorted by order
    const allExperiences = await Experience.find().sort({ order: 1 });

    res.json(allExperiences);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
};

// @desc    Create new experience
// @access  Private
const createExperience = async (req, res) => {
  try {
    const experience = new Experience(req.body);
    await experience.save();
    res.json(experience);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
};

// @desc    Update experience
// @access  Private
const updateExperience = async (req, res) => {
  try {
    const experience = await Experience.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );

    if (!experience) {
      return res.status(404).json({ message: 'Experience not found' });
    }

    res.json(experience);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
};

// @desc    Delete experience
// @access  Private
const deleteExperience = async (req, res) => {
  try {
    const experience = await Experience.findByIdAndDelete(req.params.id);

    if (!experience) {
      return res.status(404).json({ message: 'Experience not found' });
    }

    res.json({ message: 'Experience deleted' });
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
};

module.exports = {
  getAllExperiences,
  updateExperiences,
  createExperience,
  updateExperience,
  deleteExperience,
};
