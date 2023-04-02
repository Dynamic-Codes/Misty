const { Client } = require('discord.js')
const User = require('../../schemas/User')

/**
 * 
 * @param {Client} client 
 */

module.exports = async (client, member) => {
  let query = {
    userID: member.user.id,
    guildID: member.guild.id,
  };

  let user = await User.findOne(query);

  if (!user) {
    user = new User({
      ...query,
      lastDaily: new Date('2023-04-01T12:08:58.112+00:00'),
    });

    await user.save()

  } else {
    return;
  }
};