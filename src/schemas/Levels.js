const { Schema, model } = require('mongoose');

const levelschema = new Schema({
  userID: {
    type: String,
    required: true,
  },
  guildID: {
    type: String,
    required: true,
  },
  xp: {
    type: Number,
    default: 0,
  },
  level: {
    type: Number,
    default: 0
  }
});

module.exports = model('Level', levelschema);