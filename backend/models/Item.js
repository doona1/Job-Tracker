const mongoose = require('mongoose');

const itemSchema = new mongoose.Schema({
    companyName: { type: String, required: true },
    hrContact: { type: String, required: true },
    role: { type: String, required: true },
    status: { type: String, required: true },
    applicationLink: { type: String, required: true },
    applied: { type: Boolean, default: false }
});

const Item = mongoose.model('Item', itemSchema);

module.exports = Item;
