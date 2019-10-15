const mongoose = require('mongoose');

const PersonSchema = new mongoose.Schema({
    name: { type: String, required: true }
}, { timestamps: { createdAt: true, updatedAt: true } });
mongoose.model('Person', PersonSchema);