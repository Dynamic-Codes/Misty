const { Client, Interaction, EmbedBuilder } = require('discord.js')
const User = require('../../schemas/User');

const dailyAmount = 150

module.exports = {
  name: "daily",
  description: "Claim your free daily rewards every 24hrs!",
  // devOnly: Boolean,
  // testOnly: Boolean,
  // options: object[],
  // deleted: false,
  // PermissionsRequired: [PermissionFlagsBits.BanMembers],
  // BotPermissions: [PermissionFlagsBits.BanMembers],

  /**
   * 
   * @param {Client} client 
   * @param {Interaction} interaction 
   */

  callback: async (client, interaction) => {
    if(!interaction.inGuild()) {
      interaction.reply({
        content: `You may only use this command in the server!`,
        ephemeral: true,
      })
      return;
    }

    try {
      await interaction.deferReply();

      let query = {
        userID: interaction.user.id,
        guildID: interaction.guild.id,
      };

      let user = await User.findOne(query);

      if (user) {
        const lastDailyDate = user.lastDaily.toDateString();
        const currentDate = new Date().toDateString();

        if (lastDailyDate === currentDate ) {
          interaction.editReply("Gettin overhyped? Looks like you've already got your dailys! Come back tomorrow.")
          return;
        }

      } else { // User doesn't have a UserSchema
        user = new User({
          ...query,
          lastDaily: new Date(),
        });
      }

      user.balance += dailyAmount;
      await user.save()

      const dailyEmbed = new EmbedBuilder()
        .setDescription(`<a:chest_open:1092055570611187742> | Daily Vibe Crystals claimed! You now have **<a:VibeCrystal:1092056735688183878> ${user.balance}** !`)
        .setColor(0xfff250)

      interaction.editReply({
        embeds: [dailyEmbed]
      })


    } catch (error) {
      console.log(`[⚠️] Error while executing daily command: ${error}`)
    }

  },
};