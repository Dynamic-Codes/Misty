const { Client, Interaction, EmbedBuilder, ApplicationCommandOptionType } = require('discord.js')
const User = require('../../schemas/User');

const dailyAmount = 150

module.exports = {
  name: "balance",
  description: "See how many vibe crystals you or someone else has.",
  options: [
    {
      name: 'user',
      description: 'Which Vibin member should I check?',
      required: true,
      type: ApplicationCommandOptionType.Mentionable
    }
  ],
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
    await interaction.deferReply();
    let member = interaction.options.getMentionable('user')

    let query = {
      userID: member.user.id,
      guildID: interaction.guild.id
    };

    let user = await User.findOne(query);

    if (!user) {
      interaction.editReply(`Yikes, looks like they haven't gotten any vibin crystals..`)
      return
    } else {
      const balEmbed = new EmbedBuilder()
        .setTitle(`${member.user.username}'s Balance`)
        .setColor(0xfffda7)
        .setDescription(
          `\`Vibe Crystals\` **<a:VibeCrystal:1092056735688183878> ${user.balance}**`
        )
        .setTimestamp();
      
      interaction.editReply({
        embeds: [balEmbed]
      })
      return;
    }


  },
};