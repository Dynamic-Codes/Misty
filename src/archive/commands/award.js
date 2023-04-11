const { Client, Interaction, EmbedBuilder, ApplicationCommandOptionType } = require('discord.js')
const User = require('../schemas/User');
//const Inventory = require('../schemas/Inventory');
const rewardEmojiIDs = {
  premium_giveaway_gem: '<a:premium_gem:1092778429151203328> Premium Giveaway Gems',
  xp_boost_bottle: '<a:spell_bottle:1092780198069547008> XP Boost Bottles'
}


module.exports = {
  name: "award",
  description: "Reward some members who truley vibed!",
  options: [
    {
      name: 'user',
      description: 'Member to award',
      required: true,
      type: ApplicationCommandOptionType.Mentionable
    },
    {
      name: 'amount',
      description: 'How amount to award em',
      required: true,
      type: ApplicationCommandOptionType.Number
    },
    {
      name: 'reward',
      description: 'Choose ya reward!',
      required: true,
      type: ApplicationCommandOptionType.String,
      choices: [
        {
          name: 'Premium Giveway Gem',
          value: 'premium_giveaway_gem'
        },
        {
          name: 'XP Boost Bottle',
          value: 'xp_boost_bottle',
        }
      ]
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

    let member = interaction.options.getMentionable('user')

    let query = {
      userID: member.user.id,
      guildID: interaction.guild.id
    };

    let user = await User.findOne(query);
    let userInv = await Inventory.findOne(query)

    if (!user) {
      user = new User({
        ...query,
        lastDaily: new Date(),
      });
    };

    if (!userInv) {
      userInv = new Inventory({
        ...query,
        lastUpdated: new Date()
      });
    };

    const rewardType = interaction.options.getString('reward')
    const rewardAmount = interaction.options.getNumber('amount')


    async function updateInventory(userInv, currentInventory, rewardType, rewardAmount) {
      let updatedInventory = currentInventory
      console.log(updatedInventory)
      let found = false;
      for (let i = 0; i < updatedInventory.length; i++) {
        if (updatedInventory[i][0] === rewardEmojiIDs[rewardType]) {
          console.log('w')
          console.log(updatedInventory)
          updatedInventory[i][1] += rewardAmount;
          console.log(updatedInventory)
          found = true;
          break;
        }
      }
    
      if (!found) {
        updatedInventory.push([rewardEmojiIDs[rewardType], rewardAmount]);
      }

      userInv.userInventory = updatedInventory
      console.log(userInv)
    
      const AwardEmbed = new EmbedBuilder()
        .setDescription(`Successfully gave ${member} ${rewardAmount} ${rewardEmojiIDs[rewardType]}`);
    
      interaction.editReply({
        embeds: [AwardEmbed],
      });
    }
    
    await updateInventory(userInv, userInv.userInventory, rewardType, rewardAmount);
    await userInv.save();


  },
};