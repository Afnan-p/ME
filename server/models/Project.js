import mongoose from 'mongoose';

const projectSchema = new mongoose.Schema({
  title: { type: String, required: true },
  slug: { type: String, required: true, unique: true },
  subtitle: { type: String, required: true },
  description: { type: String, required: true },
  features: [{ type: String }],
  technologies: [{ type: String }],
  images: [{ type: String }],
  featured: { type: Boolean, default: false },
  category: { type: mongoose.Schema.Types.ObjectId, ref: 'Category', required: true },
  liveDemoLink: { type: String },
  githubLink: { type: String },
  challenges: { type: String },
  results: { type: String }
}, { timestamps: true });

export default mongoose.model('Project', projectSchema);
