const { ApplicationCommandOptionType, PermissionFlagsBits, EmbedBuilder } = require('discord.js')

module.exports = {
    name: "unban",
    description: "Call those unworthies back into the vibe realm!",
    devOnly: false,
    testOnly: false,
    deleted: false,
    options:  [
      {
        name: 'target-id',
        description: 'The user you would like to unban.',
        required: true,
        type: ApplicationCommandOptionType.String,
      },
      {
        name: 'reason',
        description: 'Why did you unban the person?',
        required: true,
        type: ApplicationCommandOptionType.String,
      }
    ],
    PermissionsRequired: [PermissionFlagsBits.BanMembers],
    BotPermissions: [PermissionFlagsBits.BanMembers],

    callback: async (client, interaction) => {
      const user = interaction.options.getString('target-id');
      const reason = interaction.options.getString('reason') || 'No reason provided.';

      const guild = interaction.guild;
      const banList = await guild.bans.fetch();
      const userPerson = await client.users.cache.get(user);

      if (!banList.get(user)) {
          return interaction.reply(`${userPerson.tag} is not banned from this server.`);
      }

      try {
          await guild.members.unban(user, reason);
          const unbanEmbed = new EmbedBuilder()
          .setTitle('<:dope_partner:1091652495224352849> Cloud Administration')
          .setDescription(
            `**${userPerson.tag} is now unbanned.**
            \`Reason:\` ${reason}`
          )
          .setColor(0xabee75)

        interaction.reply({ embeds: [unbanEmbed] });
      } catch (error) {
          console.error(error);
          interaction.reply('There was an error unbanning the user.');
      }
    },
};
