const mongoose = require('mongoose');

// Schema for List model
const listSchema = new mongoose.Schema({
    userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    name: { type: String, required: true },
}, { timestamps: true });

const List = mongoose.model('List', listSchema);

module.exports = List;
