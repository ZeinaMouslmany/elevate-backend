const express = require('express');
const cors = require('cors');
const connectDB = require('./config/database');
const adminRoutes = require('./routes/admin');
const serviceRoutes = require('./routes/services');
const publicExperiencesRoutes = require('./routes/publicExperiences');
const adminExperiencesRoutes = require('./routes/adminExperiences');
const publicContactRoutes = require('./routes/publicContact');
const adminContactRoutes = require('./routes/adminContact');
const publicCTARoutes = require('./routes/publicCTA');
const adminCTARoutes = require('./routes/adminCTA');
const publicHeroRoutes = require('./routes/publicHero');
const adminHeroRoutes = require('./routes/adminHero');
const publicAboutRoutes = require('./routes/publicAbout');
const adminAboutRoutes = require('./routes/adminAbout');
const publicVideoRoutes = require('./routes/publicVideo');
const adminVideoRoutes = require('./routes/adminVideo');
const uploadRoutes = require('./routes/upload');

require('dotenv').config();

const app = express();

// Connect Database
connectDB();

// Init Middleware
app.use(cors({
  origin: true, // Allow all origins (dynamic based on request)
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization', 'authorization', 'X-Requested-With'],
  exposedHeaders: ['Authorization']
}));
app.use(express.json({ extended: false }));

// Define Routes
app.use('/api/admin', adminRoutes);
app.use('/api', serviceRoutes);
app.use('/api', publicExperiencesRoutes);
app.use('/api', adminExperiencesRoutes);
app.use('/api', publicContactRoutes);
app.use('/api', adminContactRoutes);
app.use('/api', publicCTARoutes);
app.use('/api', adminCTARoutes);
app.use('/api', publicHeroRoutes);
app.use('/api', adminHeroRoutes);
app.use('/api', publicAboutRoutes);
app.use('/api', adminAboutRoutes);
app.use('/api', publicVideoRoutes);
app.use('/api', adminVideoRoutes);
app.use('/api', uploadRoutes);

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send('Something broke!');
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => console.log(`Server started on port ${PORT}`));
