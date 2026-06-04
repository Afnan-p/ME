import express from 'express';
import Project from '../models/Project.js';
import { upload, cloudinary } from '../config/cloudinary.js';

const router = express.Router();

// Helper to get public id from cloudinary url
const getPublicIdFromUrl = (url) => {
  if (!url || !url.includes('cloudinary')) return null;
  const splitUrl = url.split('/');
  const filename = splitUrl[splitUrl.length - 1];
  return 'afnan_premium_portfolio/' + filename.split('.')[0];
};

// Get all projects
router.get('/', async (req, res) => {
  try {
    const { category, featured, limit } = req.query;
    let query = {};
    
    if (category && category !== 'All') {
      query.category = category;
    }
    
    if (featured === 'true') {
      query.featured = true;
    }
    
    let projectsQuery = Project.find(query).populate('category').sort({ createdAt: -1 });
    
    if (limit) {
      projectsQuery = projectsQuery.limit(parseInt(limit));
    }
    
    const projects = await projectsQuery;
    res.status(200).json(projects);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching projects', error: error.message });
  }
});

// Get project by slug
router.get('/:slug', async (req, res) => {
  try {
    const project = await Project.findOne({ slug: req.params.slug }).populate('category');
    if (!project) {
      return res.status(404).json({ message: 'Project not found' });
    }
    res.status(200).json(project);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching project', error: error.message });
  }
});

// Create new project
router.post('/', upload.array('images'), async (req, res) => {
  try {
    let slug = req.body.slug;
    if (!slug) {
      slug = req.body.title.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)+/g, '');
    }

    const imageUrls = req.files ? req.files.map(file => file.path) : [];

    // Parse stringified arrays back to arrays if sent via formData
    let technologies = req.body.technologies;
    let features = req.body.features;
    if (typeof technologies === 'string') technologies = technologies.split(',').map(i => i.trim()).filter(i => i);
    if (typeof features === 'string') features = features.split('\n').map(i => i.trim()).filter(i => i);

    const newProject = new Project({
      ...req.body,
      slug,
      images: imageUrls.length > 0 ? imageUrls : req.body.images, // Fallback if sent as text
      technologies: technologies || [],
      features: features || []
    });
    
    const savedProject = await newProject.save();
    res.status(201).json(savedProject);
  } catch (error) {
    res.status(500).json({ message: 'Error creating project', error: error.message });
  }
});

// Update project
router.put('/:id', upload.array('images'), async (req, res) => {
  try {
    const project = await Project.findById(req.params.id);
    if (!project) return res.status(404).json({ message: 'Project not found' });

    let imageUrls = req.files && req.files.length > 0 ? req.files.map(file => file.path) : null;
    
    // If we have new images, we might want to delete the old ones from cloudinary
    if (imageUrls && project.images && project.images.length > 0) {
      for (const imgUrl of project.images) {
        const publicId = getPublicIdFromUrl(imgUrl);
        if (publicId) {
          await cloudinary.uploader.destroy(publicId).catch(err => console.log('Error deleting old image:', err));
        }
      }
    }

    // Parse stringified arrays
    let technologies = req.body.technologies;
    let features = req.body.features;
    if (typeof technologies === 'string') technologies = technologies.split(',').map(i => i.trim()).filter(i => i);
    if (typeof features === 'string') features = features.split('\n').map(i => i.trim()).filter(i => i);

    const updateData = {
      ...req.body,
      technologies: technologies || project.technologies,
      features: features || project.features
    };

    if (imageUrls) {
      updateData.images = imageUrls;
    } else if (req.body.existingImages) {
      updateData.images = typeof req.body.existingImages === 'string' ? JSON.parse(req.body.existingImages) : req.body.existingImages;
    }

    const updatedProject = await Project.findByIdAndUpdate(
      req.params.id,
      { $set: updateData },
      { new: true }
    );
    res.status(200).json(updatedProject);
  } catch (error) {
    res.status(500).json({ message: 'Error updating project', error: error.message });
  }
});

// Delete project
router.delete('/:id', async (req, res) => {
  try {
    const project = await Project.findById(req.params.id);
    if (!project) return res.status(404).json({ message: 'Project not found' });

    // Delete images from cloudinary
    if (project.images && project.images.length > 0) {
      for (const imgUrl of project.images) {
        const publicId = getPublicIdFromUrl(imgUrl);
        if (publicId) {
          await cloudinary.uploader.destroy(publicId).catch(err => console.log('Error deleting image:', err));
        }
      }
    }

    await Project.findByIdAndDelete(req.params.id);
    res.status(200).json({ message: 'Project deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Error deleting project', error: error.message });
  }
});

export default router;
