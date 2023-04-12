const { Client, Message } = require('discord.js');
const Level = require('../../schemas/Levels');
const calculateLevelXp = require('../../utils/calculateLevelXp')
const cooldowns = new Set();
const User = require('../../schemas/User')


function getRandomXp(min, max) {
  min = Math.ceil(min)
  max = Math.floor(max)
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

/**
 * 
 * @param {Client} client 
 * @param {Message} message 
 */

module.exports = async (client, message) => {
  if (!message.inGuild() || message.author.bot || cooldowns.has(message.author.id) || message.channel.id === '1089536955731157013') return;

  const xpToGive = getRandomXp(3, 15);

  const query = {
    userID: message.author.id,
    guildID: message.guild.id,
  };

  try {
    const level = await Level.findOne(query);

    if (level) {
      level.xp += xpToGive

      if (level.xp > calculateLevelXp(level.level)) {

        // Award Vibin Crystals
        let query = {
          userID: message.author.id,
          guildID: message.guild.id,
        };
  
        let user = await User.findOne(query);
  
        if (!user) {
          user = new User({
            ...query,
            lastDaily: new Date(),
          });
        }
        
        let rankUpXp = (50 + (level.level * 10));
        user.balance += rankUpXp
        await user.save()

        // Send message

        level.xp = 0;
        level.level += 1;

        message.reply(
          `<a:run:1091645679048347688> ${message.member} just vibed into **level ${level.level}** !
          + Free **<a:VibeCrystal:1092056735688183878> ${rankUpXp}** Vibin Crystals.`)
      }

      await level.save().catch((e) => {
        console.log(`]⚠️] Error whilst updating level: ${e}`)
      })

      cooldowns.add(message.author.id)
      setTimeout(() => {
        cooldowns.delete(message.author.id)
      }, 10000) // 10 sec

    } else { // If level doesn't exist
      const newLevel = new Level({
        userID: message.author.id,
        guildID: message.guild.id,
        xp: xpToGive,
      });

      await newLevel.save();

      cooldowns.add(message.author.id)
      setTimeout(() => {
        cooldowns.delete(message.author.id)
      }, 10000)
    }
  } catch (error) {
    console.log(`[⚠️] AwardXP -> Error giving XP: ${error}`)
  }
}