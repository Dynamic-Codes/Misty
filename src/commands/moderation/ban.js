const { ApplicationCommandOptionType, PermissionFlagsBits, EmbedBuilder } = require('discord.js')

module.exports = {
    name: "ban",
    description: "Strike thunder at em with the ban hammer!",
    devOnly: false,
    testOnly: false,
    deleted: false,
    options:  [
      {
        name: 'target',
        description: 'The member you would like to ban.',
        required: true,
        type: ApplicationCommandOptionType.Mentionable,
      },
      {
        name: 'reason',
        description: 'Why did you ban the person?',
        required: false,
        type: ApplicationCommandOptionType.String,
      }
    ],
    PermissionsRequired: [PermissionFlagsBits.BanMembers],
    BotPermissions: [PermissionFlagsBits.BanMembers],

    callback: async (client, interaction) => {
      const member = interaction.options.getMember('target');
      const reason = interaction.options.getString('reason') || 'No reason provided.';
  
      if (!member.bannable) {
        return interaction.reply({ content: 'I cannot ban that member.', ephemeral: true });
      }
  
      try {
        await member.ban({ reason });

        const banEmbed = new EmbedBuilder()
          .setTitle('<:dope_partner:1091652495224352849> Cloud Administration')
          .setDescription(
            `**${member} is now banned.**
            \`Reason:\` ${reason}`
          )
          .setColor(0xff3030)

        interaction.reply({ embeds: [banEmbed] });
      } catch (error) {
        console.error(error);
        interaction.reply({ content: 'An error occurred while attempting to ban the member.', ephemeral: true });
      }
    },
};
