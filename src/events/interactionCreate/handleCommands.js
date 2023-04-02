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

    if (commandObject.permissionsRequired?.length) {
      for (const permission of commandObject.permissionsRequired) {
        if (!interaction.member.permission.has(permission)) {
          interaction.reply({
            content: 'Insufficent permissions to run this command!',
            ephemeral: true
          })
          return;
        }
      }
    }

    if (commandObject.botPermissions?.length) {
      for (const permission of commandObject.botPermissions) {
        const bot = interaction.guild.members.me

        if (!bot.permission.has(permission)) {
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
