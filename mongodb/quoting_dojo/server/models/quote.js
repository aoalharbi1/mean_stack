const mongoose = require('mongoose');

const QuoteSchema = new mongoose.Schema({
    name: {type: String, required: true},
    quote: {type: String, required: true}
}, {timestamps: { createdAt: true, updatedAt: false }})
mongoose.model('Quote', QuoteSchema);