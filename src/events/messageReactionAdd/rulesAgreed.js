module.exports = (client, reaction, user) => {
  console.log(reaction.emoji.name, user.username)

  const guild = client.guilds.cache.get('1089504423417499658')
  const member = guild.members.cache.get(user.id)

  if (!member.roles.cache.has('1089563213915496558')) {
    member.roles.add(guild.roles.cache.get('1089563213915496558'))
  } else {
    return;
  }
}