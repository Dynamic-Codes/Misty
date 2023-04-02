const { EmbedBuilder } = require('discord.js')

module.exports = async (client, member) => {

  welcomeChannel = await client.channels.cache.get('1089512938995450018')
  user = client.users.cache.get(member.user.id)
  welcomeMessages = [
    'just spawned on the cloud!',
    'is ready to vibe!',
    'was an epic person and decided to join!',
    'literally gave themselves happiness by joining DisCloud!',
    'has passed their vibe check and came here!',
    'joined and can\'t wait to start chatting!',
    'wanted pure luck and came here!',
    'managed to reach the last cloud without falling!',
    'is here!',
    'has arrived!'
  ]

  welcomeColours = [
    0xf5cf20,
    0xff3030,
    0xff7c18,
    0xff42a0,
    0x7bff63,
    0x3a72fa,
    0x9657eb,
  ]

  const welcomeEmbed = new EmbedBuilder()
    .setColor(welcomeColours[Math.floor(Math.random() * welcomeColours.length)])
    .setDescription(`${user} ${welcomeMessages[Math.floor(Math.random() * welcomeMessages.length)]}`)
      
  try {
    welcomeChannel.send({ embeds: [welcomeEmbed] })
  } catch (error) {
    console.log(`Failed to send welcome message: ${error}`)
  }
};