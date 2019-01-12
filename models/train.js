const mongoose = require('mongoose');

const trainSchema = new mongoose.Schema({
    capabilityValues: Array,
    level: Number
});

module.exports = mongoose.model("train_xp",trainSchema);