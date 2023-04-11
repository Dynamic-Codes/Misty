const { Client, Interaction, EmbedBuilder, ApplicationCommandOptionType } = require('discord.js')
const User = require('../../schemas/User');

const dailyAmount = 150

module.exports = {
  name: "inventory",
  description: "Check your current inventory!",
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
  deleted: true,
  // PermissionsRequired: [PermissionFlagsBits.BanMembers],
  // BotPermissions: [PermissionFlagsBits.BanMembers],

  /**
   * 
   * @param {Client} client 
   * @param {Interaction} interaction 
   */

  callback: async (client, interaction) => {
    await interaction.deferReply();
    interaction.editReply('Coming Soon!')

    /*
    Inventory is an array.
    It will contain stuff we give them.
    looks something like this:
    Array = [
      ['NAME', 3],
      ['NAME', 6],
      ['NAME', 1],
    ]

    The amount of total items will be calculated by the total of each item count
    For example, the above array will contain 10 items.
    The amount of items should not be greater than slotCount
    But can be equal too.

    You can get total amount by:

    let total = 0;
    for (let i = 0; i < arr.length; i++) {
      total += arr[i][1];
    }

    You should have a shop view command and shop buy command.
    The view command should show what you can buy,
    The buy command will allow you to buy stuff and deduct appropriate amount of crystals

    --

    Examples of what we can have are:
    - Premium Giveaway Tickets
    - Double XP

     */

  },
};