const { ApplicationCommandOptionType, PermissionFlagsBits, EmbedBuilder } = require('discord.js')

module.exports = {
    name: "kick",
    description: "Just push that annoying kid if the cloud!",
    devOnly: false,
    testOnly: false,
    deleted: false,
    options:  [
      {
        name: 'target',
        description: 'The member you would like to kick.',
        required: true,
        type: ApplicationCommandOptionType.Mentionable,
      },
      {
        name: 'reason',
        description: 'Why did you kick the person?',
        required: false,
        type: ApplicationCommandOptionType.String,
      }
    ],
    PermissionsRequired: [PermissionFlagsBits.KickMembers],
    BotPermissions: [PermissionFlagsBits.KickMembers],

    callback: async (client, interaction) => {
      const member = interaction.options.getMember('target');
      const reason = interaction.options.getString('reason') || 'No reason provided.';
  
      if (!member.kickable) {
        return interaction.reply({ content: 'I cannot kick that member.', ephemeral: true });
      }
  
      try {
        await member.kick({ reason });

        const banEmbed = new EmbedBuilder()
          .setTitle('<:dope_partner:1091652495224352849> Cloud Administration')
          .setDescription(
            `**${member} is now kicked.**
            \`Reason:\` ${reason}`
          )
          .setColor(0xff7c18)

        interaction.reply({ embeds: [banEmbed] });
      } catch (error) {
        console.error(error);
        interaction.reply({ content: 'An error occurred while attempting to kick the member.', ephemeral: true });
      }
    },
};