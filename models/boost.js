const mongoose = require('mongoose');

const boostSchema = new mongoose.Schema({
    capabilityValues: Array,
    level: Number
});

module.exports = mongoose.model("boost",boostSchema);