const { testServer } = require("../../../config.json");
const areCommandsDifferent = require("../../utils/areCommandsDifferent");
const getApplicationCommands = require("../../utils/getApplicationCommands");
const getLocalCommands = require("../../utils/getLocalCommands");

module.exports = async (client) => {
  try {
    localCommands = getLocalCommands()
    const applicationCommands = await getApplicationCommands(client, testServer)

    for (const localCommand of localCommands) {
      const {name, description, options} = localCommand;

      const exististingCommand = await applicationCommands.cache.find(
        (cmd) => cmd.name === name
      );

      if (exististingCommand) {
        if (localCommand.deleted) {
          await applicationCommands.delete(exististingCommand.id);
          console.log(`[🗑️] Deleted Command "${name}".`)
          continue;
        }

        if (areCommandsDifferent(exististingCommand, localCommand)) {
          await applicationCommands.edit(exististingCommand.id, {
            description,
            options,
          });

          console.log(`[⤴️] Edited Command "${name}".`)
        }

      } else {
        if (localCommand.deleted) {
          console.log(`[➡️] Command registration skipped. "${name}" is scheduled for deletion.`)
          continue;
        }

        await applicationCommands.create({
          name,
          description,
          options
        })

        console.log(`[📝] Registered command "${name}".`)
      }
    }
    
  } catch (error) {
    console.log(`An error occured: ${error}`)
  }

};
