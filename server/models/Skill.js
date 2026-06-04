import mongoose from 'mongoose';

const skillSchema = new mongoose.Schema({
  name: { type: String, required: true },
  category: { type: String, required: true }, // e.g. "Frontend", "Backend", "Tools"
  icon: { type: String }, // optional, for string-based icons or cloudinary
}, { timestamps: true });

export default mongoose.model('Skill', skillSchema);
