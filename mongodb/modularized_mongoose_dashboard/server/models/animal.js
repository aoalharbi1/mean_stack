const mongoose = require('mongoose');

const AnimalSchema = new mongoose.Schema({
    name: { type: String, required: true },
    age: { type: Number, required: true },
    color: { type: String, required: true }
}, { timestamps: { createdAt: true, updatedAt: true } });
mongoose.model('Animal', AnimalSchema);