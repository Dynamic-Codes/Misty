const { EmbedBuilder } = require("discord.js");

module.exports = {
  name: "notes",
  description: "Type out the notes!",
  devOnly: Boolean,
  // testOnly: Boolean,
  // options: object[],
  deleted: false,

  callback: async (client, interaction) => {

    notesEmbed = new EmbedBuilder()
      .setColor(0xb49eff)
      .setTitle('<:dope_electric:1091652532788531270> Roles')
      .setDescription(
        `꒰<:cloud_1:1091727044292923563> **DisVibes Official Members**꒱
        ⸽  These roles are for those who staff the server. 
        ⸽  You can only obtain these roles through application forms !
       ⌗
       <@&1089539437920264202> ⪧ You're all cloud beings, but this is for those Top-notch admins who just make things work!
       <@&1089540331638370384> ⪧ Need help, found trouble or got a flamin' question? Our server moderators got you covered!
       <@&1089541070641184778> ⪧ For all those who are officially approved to be vibin beings! And trainee staff also have this.. cuz why not?
       
       ꒰<:cloud_2:1091727052169818113> **Special Roles**꒱
        ⸽  These roles are for special & important people.
        ⸽  These roles are either rewarded or obtained through applications!
       ⌗
       <@&1089542402999590964> ⪧ Everyone's a VIP! But some are just too special.. don't you think so? Given to people who deserve it!
       <@&1091729990577565756> ⪧ Lights, camera, action! Okay we're live. The is what it says.
       <@&1091730181942677524> ⪧ Hard work pays.. and you also get this role! For people who won in-server events.
       <@&1091730281100222635> ⪧ These people help "DisVibes" grow! Thanks awesome discordians!
       
       ꒰<:cloud_3:1091727048088748032> **Other Roles**꒱
        ⸽  Just some extra roles that you'll see people rockin!
        ⸽  Most of these are self obtained.
       ⌗
       <#1089514901925531739> ⪧ All of the roles found here are just for fun and looks!
       <@&1091446524921253888> ⪧ These roles are automatically awarded for being active.
       <@&1089563213915496558> ⪧ The first role you'll every get.. Also this means you verified!`
      );
    
      rulesChan = client.channels.cache.get('1089513514072293497')
      await rulesChan.send({ embeds: [notesEmbed] })
      interaction.reply({
        content: 'Done!',
        ephemeral: true,
      })

  }
};