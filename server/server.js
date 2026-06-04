import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import dotenv from 'dotenv';
import contactRoutes from './routes/contact.js';
import projectRoutes from './routes/projects.js';
import categoryRoutes from './routes/categories.js';
import settingsRoutes from './routes/settings.js';
import skillsRoutes from './routes/skills.js';
import servicesRoutes from './routes/services.js';
import authRoutes from './routes/auth.js';

dotenv.config();

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Database Connection
let isConnected = false;

const connectDB = async () => {
  if (isConnected) {
    console.log('Using existing MongoDB connection');
    return;
  }
  try {
    const db = await mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/portfolio');
    isConnected = db.connections[0].readyState;
    console.log('MongoDB connected successfully');
  } catch (err) {
    console.error('MongoDB connection error:', err);
  }
};

// Initialize DB
connectDB();

// Routes
app.use('/api/contact', contactRoutes);
app.use('/api/projects', projectRoutes);
app.use('/api/categories', categoryRoutes);
app.use('/api/settings', settingsRoutes);
app.use('/api/skills', skillsRoutes);
app.use('/api/services', servicesRoutes);
app.use('/api/auth', authRoutes);

// Health check
app.get('/api/health', (req, res) => {
  res.status(200).json({ status: 'ok', message: 'Server is running' });
});

const PORT = process.env.PORT || 5001;

// Only listen locally, Vercel Serverless handles routing directly
if (process.env.NODE_ENV !== 'production') {
  app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
  });
}

// Export the Express API for Vercel Serverless
export default app;
