const mongoose = require('mongoose');

// Schema for ToDo model
const toDoSchema = new mongoose.Schema({
    userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    text: { type: String, required: true },
    tags: [{ type: String }],
    completed: { type: Boolean, default: false },
    thumbnail: { type: String },
    file: { type: String }
}, { timestamps: true });

const ToDo = mongoose.model('ToDo', toDoSchema);

module.exports = ToDo;
