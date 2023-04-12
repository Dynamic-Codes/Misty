const { Client, Message } = require('discord.js');
const UserCount = require('../../schemas/UserCounting');
const ServerCount = require('../../schemas/ServerCounting')

/**
 * 
 * @param {Client} client 
 * @param {Message} message 
 */

module.exports = async (client, message) => {
  const userQuery = {
    userID: message.author.id,
    guildID: message.guild.id,
  };

  const serverQuery = {
    guildID: message.guild.id,
  };

  let countUser = await UserCount.findOne(userQuery);
  let countServer = await ServerCount.findOne(serverQuery);

  if (!countServer) {
    countServer = new ServerCount({
      ...serverQuery,
      counterChannel: message.channel.id,
      LastCounter: message.author.id
    });
  };

  if (!countUser) {
    countUser = new UserCount({
      ...userQuery
    });
  };

  if (message.channel.id !== countServer.counterChannel) return;

  if (message.webhookId) return //*If the message is from webhook, then ignore it
  if (message.author.bot) return message.delete() //*If the message is from a bot, delete

  if (Number(message.content) !== (countServer.CurrentCount + 1)) return message.delete() //*If the message is not the next number, delete

  countServer.CurrentCount += 1
  countServer.LastCounter = message.author.id
  countUser.userCounts += 1

  try {
    const webhooks = await message.channel.fetchWebhooks();
		let webhook = webhooks.find(wh => wh.token);

    if (!webhook) {
      webhook = await message.channel.createWebhook({
        name: 'Misty Counting',
        avatar: client.user.displayAvatarURL({ format: 'png', size: 512 }),
      }).then(webhook => console.log(`Created webhook ${webhook}`))
    }

    await message.delete()

    await webhook.send({
      content: message.content,
      username: message.author.username,
      avatarURL: message.author.displayAvatarURL({ formate: 'png', size: 512 })
    });

  } catch (error) {
    console.log(error)
    return message.channel.send('An error occured whilst creating cloudhook!')
  }

  countServer.save()
  countUser.save()

  
};