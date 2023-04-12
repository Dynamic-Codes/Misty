const { ApplicationCommandOptionType, PermissionFlagsBits, PermissionsBitField, EmbedBuilder } = require('discord.js')

module.exports = {
  name: "lock",
  description: "Lock a channel and prevent members from messaging.",
  devOnly: false,
  testOnly: false,
  deleted: false,
  options:  [
    {
      name: 'channel',
      description: 'Which channel would you like to lock?',
      required: true,
      type: ApplicationCommandOptionType.Channel,
    },
    {
      name: 'reason',
      description: 'Why are you locking the channel?',
      required: true,
      type: ApplicationCommandOptionType.String,
    },
  ],
  PermissionsRequired: [PermissionFlagsBits.Administrator],

  /**
   * 
   * @param {Client} client 
   * @param {Interaction} interaction 
   */

  callback: async (client, interaction) => {
    function channelNameStartsWithEmoji(channelName, emoji) {
      const regex = new RegExp(`^${emoji}`);
      return regex.test(channelName);
    }
    let lockChannel = interaction.options.getChannel('channel');
    let lockReason = interaction.options.getString('reason');

    if (channelNameStartsWithEmoji(lockChannel.name, '🔒')) {
      return interaction.reply({
        content: 'This channel is already locked!',
        ephemeral: true,
      });
    }

    //If channel is not locked
    const role = lockChannel.guild.roles.cache.get('1089563213915496558'); //? This is the vibin member role.

    lockChannel.permissionOverwrites.create(role, { SendMessages: false })
      .then(() => console.log(`Set permissions for role ${role.name} in channel ${lockChannel.name}`))
      .catch(console.error);

    const newChannelName = `🔒${lockChannel.name}`
    
    lockChannel.setName(newChannelName)
      .then(updatedChannel => console.log(`Channel name updated to ${updatedChannel.name}`))
      .catch(console.error);
    
    let lockEmbed = new EmbedBuilder()
      .setTitle('🔒 Channel Locked')
      .setDescription(`${lockReason}`)
      .setFooter({ text: `Locked by ${interaction.user.username}`})
      .setColor(0xff7c18)

    await interaction.channel.send({ embeds: [lockEmbed] })
    interaction.reply({
      content: 'Channel Locked!',
      ephemeral: true,
    });

  }
};