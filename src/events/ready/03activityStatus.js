const { ActivityType } = require("discord.js")

module.exports = (client) => {
  client.user.setActivity({
    name: 'Digital rain drops!',
    type: ActivityType.Streaming,
    url: 'https://www.youtube.com/watch?v=zsYwejVYZ_M',
  })
}