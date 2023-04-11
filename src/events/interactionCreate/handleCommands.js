const { devs, testServer } = require("../../../config.json");
const getLocalCommands = require('../../utils/getLocalCommands')

module.exports = async (client, interaction) => {
  if (!interaction.isChatInputCommand()) return;

  const localCommands = getLocalCommands();

  try {
    const commandObject = localCommands.find(
      (cmd) => cmd.name === interaction.commandName
    );

    if (!commandObject) return;

    if (commandObject.devOnly) {
      if (!devs.includes(interaction.member.id)) {
        interaction.reply({
          content: 'Only developers are allowed to run this command.',
          ephemeral: true
        })
        return;
      } 
    }

    if (commandObject.testOnly) {
      if (!interaction.guild.id === testServer) {
        interaction.reply({
          content: 'Unable to run this command as it is part of the beta testing program.',
          ephemeral: true
        })
        return;
      } 
    }

    if (commandObject.PermissionsRequired?.length) {
      for (const permission of commandObject.PermissionsRequired) {
        if (!interaction.member.permissions.has(permission)) {
          interaction.reply({
            content: 'Insufficent permissions to run this command!',
            ephemeral: true
          })
          return;
        }
      }
    }

    if (commandObject.BotPermissions?.length) {
      for (const permission of commandObject.BotPermissions) {
        const bot = interaction.guild.members.me

        if (!bot.permissions.has(permission)) {
          interaction.reply({
            content: "I don't have enough permissions to perform this command!",
            ephemeral: true
          });
          return;
        }
      }
    }

    await commandObject.callback(client, interaction)

  } catch (error) {
    console.log(`[⚠️] Error occured whilst running this command: ${error}`)
  }
};
