
const mongoose = require('mongoose');

const taskSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: { type: String, required: true },
  dueDate: { type: Date, required: true },
  priority: { type: String, enum: ['low', 'medium', 'high'], required: true },
  status: { type: String, enum: ['to-do', 'in-progress', 'completed'], required: true },
}, { timestamps: true });

const Task = mongoose.model('Task', taskSchema);

module.exports = Task;
