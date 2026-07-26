import mongoose from 'mongoose';
const taskSchema = new mongoose.Schema({
  title: { type: String, required: true, trim: true, maxlength: 200 },
  completed: { type: Boolean, default: false, index: true },
  ownerId: { type: mongoose.Schema.Types.ObjectId, required: true, index: true },
}, { timestamps: true });
taskSchema.index({ ownerId: 1, createdAt: -1 });
export const Task = mongoose.model('Task', taskSchema);
