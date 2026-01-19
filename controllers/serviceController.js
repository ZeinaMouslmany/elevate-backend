const Service = require('../models/Service');

// @desc    Get all enabled services (public)
// @access  Public
const getServices = async (req, res) => {
  try {
    const services = await Service.find({ enabled: true }).sort({ order: 1 });
    res.json(services);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
};

// @desc    Get all services (admin)
// @access  Private
const getAllServices = async (req, res) => {
  try {
    const services = await Service.find().sort({ order: 1 });
    res.json(services);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
};

// @desc    Update all services
// @access  Private
const updateServices = async (req, res) => {
  try {
    const { services } = req.body;

    if (!Array.isArray(services)) {
      return res.status(400).json({ error: 'Services must be an array' });
    }

    // Delete all existing services
    await Service.deleteMany({});

    // Clean up services data - remove _id if present, ensure id is set
    const cleanedServices = services.map(service => {
      const { _id, ...serviceData } = service;
      // Ensure id field exists (use existing id or generate new one)
      if (!serviceData.id) {
        serviceData.id = Date.now().toString() + Math.random().toString(36).substr(2, 9);
      }
      return serviceData;
    });

    // Insert updated services
    const updatedServices = await Service.insertMany(cleanedServices);

    res.json(updatedServices);
  } catch (err) {
    console.error('Update services error:', err.message);
    res.status(500).json({ error: 'Server error: ' + err.message });
  }
};

// @desc    Create new service
// @access  Private
const createService = async (req, res) => {
  try {
    const service = new Service(req.body);
    await service.save();
    res.json(service);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
};

// @desc    Update service
// @access  Private
const updateService = async (req, res) => {
  try {
    const { id } = req.params;
    const mongoose = require('mongoose');
    
    // First, try to find by custom id field (string) - this is the primary method
    // Explicitly query by the 'id' field to avoid any ObjectId casting issues
    let service = await Service.findOneAndUpdate(
      { id: String(id) },
      req.body,
      { new: true }
    );

    // If not found by custom id and the provided id looks like an ObjectId, try _id
    if (!service && mongoose.Types.ObjectId.isValid(id) && id.length === 24) {
      try {
        service = await Service.findByIdAndUpdate(
          id,
          req.body,
          { new: true }
        );
      } catch (idError) {
        // If ObjectId lookup fails, log but don't throw - we'll return not found
        console.log('ObjectId lookup failed for update:', idError.message);
      }
    }

    if (!service) {
      return res.status(404).json({ message: 'Service not found' });
    }

    res.json(service);
  } catch (err) {
    console.error('Update service error:', err.message);
    // Provide more detailed error information
    if (err.name === 'CastError') {
      return res.status(400).json({ error: 'Invalid service ID format' });
    }
    res.status(500).json({ error: 'Server error: ' + err.message });
  }
};

// @desc    Delete service
// @access  Private
const deleteService = async (req, res) => {
  try {
    const { id } = req.params;
    const mongoose = require('mongoose');
    
    // First, try to find by custom id field (string) - this is the primary method
    // Explicitly query by the 'id' field to avoid any ObjectId casting issues
    let service = await Service.findOneAndDelete({ id: String(id) });

    // If not found by custom id and the provided id looks like an ObjectId, try _id
    if (!service && mongoose.Types.ObjectId.isValid(id) && id.length === 24) {
      try {
        service = await Service.findByIdAndDelete(id);
      } catch (idError) {
        // If ObjectId lookup fails, log but don't throw - we'll return not found
        console.log('ObjectId lookup failed for delete:', idError.message);
      }
    }

    if (!service) {
      return res.status(404).json({ message: 'Service not found' });
    }

    res.json({ message: 'Service deleted' });
  } catch (err) {
    console.error('Delete service error:', err.message);
    // Provide more detailed error information
    if (err.name === 'CastError') {
      return res.status(400).json({ error: 'Invalid service ID format' });
    }
    res.status(500).json({ error: 'Server error: ' + err.message });
  }
};

module.exports = {
  getServices,
  getAllServices,
  updateServices,
  createService,
  updateService,
  deleteService,
};
