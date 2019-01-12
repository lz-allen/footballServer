const mongoose = require('mongoose')

const playerSchema = new mongoose.Schema({
  basicInfo: Object,
  capabilityValues: Object,
  code: {
    type: String,
    index: true
  },
  name: String,
  rarity: String,
  rarityValue: Number,
  skills: Object
});

module.exports = mongoose.model("playerlist",playerSchema)