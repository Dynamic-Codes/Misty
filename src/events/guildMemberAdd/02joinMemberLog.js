const { EmbedBuilder } = require('discord.js')

module.exports = (client, member) => {
  user = client.users.cache.get(member.user.id)
  logChannel = client.channels.cache.get('1091086987785683085')

  joinLogEmbed = new EmbedBuilder()
  .setTitle(`☁️ ${member.user.tag}`)
  .setThumbnail(member.user.displayAvatarURL({ format: 'png' }))
  .setColor(0x7bff63)
  .setDescription(
    `**User ID:** \n\`${member.user.id}\`\n
    **Account Creation Date:**\n\`${member.user.createdAt}\`\n`)
  .setFooter({ text: 'User joined' })
  .setTimestamp()

  try {
    logChannel.send({ embeds: [joinLogEmbed] })
  } catch (error) {
    console.log(`Failed to send welcome message: ${error}`)
  }
}