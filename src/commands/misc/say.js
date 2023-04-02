const { ApplicationCommandOptionType, PermissionFlagsBits } = require('discord.js')

module.exports = {
    name: "say",
    description: "Just make me say anything you like!",
    devOnly: true,
    testOnly: false,
    deleted: false,
    options:  [
      {
        name: 'channel',
        description: 'Where should I send the message?',
        required: true,
        type: ApplicationCommandOptionType.Channel,
      },
      {
        name: 'message',
        description: 'What should I say?',
        required: true,
        type: ApplicationCommandOptionType.String,
      }
    ],
    PermissionsRequired: [PermissionFlagsBits.BanMembers],
    BotPermissions: [PermissionFlagsBits.BanMembers],

    callback: (client, interaction) => {
      interaction.options.getChannel('channel').send({ content: interaction.options.getString('message') })
      interaction.reply({
        content: 'Message sent!',
        ephemeral: true
      })
    },
};