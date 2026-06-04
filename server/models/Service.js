import mongoose from 'mongoose';

const serviceSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: { type: String, required: true },
  iconName: { type: String, required: true }, // e.g. "Globe", "Code2"
}, { timestamps: true });

export default mongoose.model('Service', serviceSchema);
