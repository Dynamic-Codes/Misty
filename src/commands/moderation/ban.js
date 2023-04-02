const { ApplicationCommandOptionType, PermissionFlagsBits } = require('discord.js')

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

    callback: (client, interaction) => {
        interaction.reply(`Did something..!`);
    },
};
