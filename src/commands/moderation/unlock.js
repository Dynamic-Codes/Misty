const { ApplicationCommandOptionType, PermissionFlagsBits, PermissionsBitField, EmbedBuilder } = require('discord.js')

module.exports = {
  name: "unlock",
  description: "Unlock a previously locked channel.",
  devOnly: false,
  testOnly: false,
  deleted: false,
  options:  [
    {
      name: 'channel',
      description: 'Which channel would you like to unlock?',
      required: true,
      type: ApplicationCommandOptionType.Channel,
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
    const lockChannel = interaction.options.getChannel('channel');

    if (!channelNameStartsWithEmoji(lockChannel.name, '🔒')) {
      return interaction.reply({
        content: 'This channel is not locked!',
        ephemeral: true,
      });
    }

    //If channel is not locked
    const role = lockChannel.guild.roles.cache.get('1089563213915496558'); //? This is the vibin member role.

    lockChannel.permissionOverwrites.create(role, { SendMessages: true })
      .then(() => console.log(`Set permissions for role ${role.name} in channel ${lockChannel.name}`))
      .catch(console.error);

    const newChannelName = lockChannel.name.replace(/^🔒\s*/, ''); ;
    lockChannel.setName(newChannelName)
      .then(updatedChannel => console.log(`Channel name updated to ${updatedChannel.name}`))
      .catch(console.error);
    
    let lockEmbed = new EmbedBuilder()
      .setTitle('🔓 Channel Unlocked')
      .setFooter({ text: `Unlocked by ${interaction.user.username}`})
      .setColor(0xabee75)

    await interaction.channel.send({ embeds: [lockEmbed] })
    interaction.reply({
      content: 'Channel Unlocked!',
      ephemeral: true,
    });

  }
};