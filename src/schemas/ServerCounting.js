const { Schema, model } = require('mongoose')

const  ServerCountingSchema = new Schema({
  guildID: {
    type: String,
    required: true,
  },
  counterChannel: {
    type: String,
    required: true
  },
  CurrentCount: {
    type: Number,
    default: 0,
  },
  LastCounter: {
    type: String,
    required: true,
  }
});

module.exports = model('ServerCounting', ServerCountingSchema)