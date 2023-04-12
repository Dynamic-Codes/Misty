const { Schema, model } = require('mongoose')

const  UserCountingSchema = new Schema({
  userID: {
    type: String,
    required: true,
  },
  guildID: {
    type: String,
    required: true,
  },
  userCounts: {
    type: Number,
    default: 0,
  }
});

module.exports = model('UserCounting', UserCountingSchema)