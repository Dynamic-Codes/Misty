const { EmbedBuilder } = require("discord.js");

module.exports = {
  name: "rules",
  description: "Type out the rules!",
  devOnly: Boolean,
  // testOnly: Boolean,
  // options: object[],
  deleted: true,

  callback: async (client, interaction) => {

      rule1 = new EmbedBuilder()
      .setColor(0xff3030)
      .setDescription(
        `╭𖣠 \`⌗𝟭\`  Keepin it cool ꒱
        ┊
        ┊  ✦ Remember to keep having fun at all times, don't be upset!
        ┊  ✦ Try not to start arguments or fight with other members.
        ❏ꕀ :ice_cube:`
      );

      rule2 = new EmbedBuilder()
      .setColor(0xff42a0)
      .setDescription(
        `╭𖣠 \`⌗𝟮\`  Using special words ꒱
        ┊
        ┊  ✦ We understand we're all humans and swear. We allow it!
        ┊  ✦ Just don't direct at someone or use slurs!
        ┊
        ❏ꕀ :face_with_symbols_over_mouth:`
      );
      
      rule3 = new EmbedBuilder()
      .setColor(0xff7c18)
      .setDescription(
        `╭𖣠 \`⌗𝟯\`  The Woah Stuff. ꒱
        ┊
        ┊  ✦ Everyone's got a smirky side, but please keep that to yourself!
        ┊  ✦ Sending NSFW in any format results in an instant ban.
        ┊
        ❏ꕀ :peach:`
      );

      rule4 = new EmbedBuilder()
      .setColor(0xf5cf20)
      .setDescription(
        `╭𖣠 \`⌗𝟰\`  Going the extra mile ꒱
        ┊
        ┊  ✦ chatting is fun, spamming is more. Only do it in #𖦹꒱ꪔspam∿me
        ┊  ✦ Do not flood or send chained messages. That kinda spam aint cool!
        ┊
        ❏ꕀ :zap:`
      );

      rule5 = new EmbedBuilder()
      .setColor(0x7bff63)
      .setDescription(
        `╭𖣠 \`⌗𝟱\`  Skip the Ads! ꒱
        ┊
        ┊  ✦ We made a server, and maybe so did you! Just don't self-promo.
        ┊  ✦ DM & chat advertisement results in a kick. 
        ┊
        ❏ꕀ :champagne_glass:`
      );

      rule6 = new EmbedBuilder()
      .setColor(0xabee75)
      .setDescription(
        `╭𖣠 \`⌗𝟲\`  Respawn Disabled. ꒱
        ┊
        ┊  ✦ Encouraging self harm, abuse, or torture is forbidden! 
        ┊  ✦ You will be reported and banned from the server
        ┊
        ❏ꕀ :headstone:`
      );

      rule7 = new EmbedBuilder()
      .setColor(0x91d9f0)
      .setDescription(
        `╭𖣠 \`⌗𝟳\`  Ctrl  C+V ꒱
        ┊
        ┊  ✦ Plagiarism ain't cool dude! Just get creative. 
        ┊  ✦ Do not claim other's work or use it for personal gain!
        ┊
        ❏ꕀ :pencil:`
      );

      rule8 = new EmbedBuilder()
      .setColor(0x3a72fa)
      .setDescription(
        `╭𖣠 \`⌗𝟴\`  Drama Llama Spotted! ꒱
        ┊
        ┊  ✦ Impersonation is a serious issue. So don't even try.
        ┊  ✦ This includes pfp, names, fake bios.
        ❏ꕀ :performing_arts:`
      );

      const suppChan = client.channels.cache.get('1089518530875097273')
      rule9 = new EmbedBuilder()
      .setColor(0x3a72fa)
      .setDescription(
        `╭𖣠 \`⌗𝟵\`  UAV Inbound. ꒱
        ┊
        ┊  ✦ If you need help, got to ${suppChan}
        ┊  ✦ Don't ping staff or dm them if it ain't an emergency!
        ┊
        ❏ꕀ :raised_hands:`
      );

      rule10 = new EmbedBuilder()
      .setColor(0x752bd6)
      .setDescription(
        `╭𖣠 \`⌗𝟭𝟬\`  The Discord Style! ꒱
        ┊
        ┊  ✦ Follow their guidelines and agree to the TOS & T&C. 
        ┊  ✦ We are not responsible if you get banned for violating those.
        ┊
        ❏ꕀ :cowboy:`
      );
      
      
      rulesChan = client.channels.cache.get('1089518852695666780')
      await rulesChan.send({ embeds: [rule1, rule2, rule3, rule4, rule5, rule6, rule7, rule8, rule9, rule10] })
      interaction.reply({
        content: 'Done!',
        ephemeral: true,
      })

      const vibeMemRole = interaction.guild.roles.cache.get('1089563213915496558')
      const VerifyEmbed = new EmbedBuilder()
      .setTitle('<:dope_fire:1091652527600193546> Let me in!')
      .setDescription(
        `Now that you've fully read through the rules, we think you are ready to be a ${vibeMemRole}! Just remember to follow them at all times and just enjoy your self here. Once your ready, just react with the check icon!`
      )
      .setColor(0xffffff)
      const msg = await rulesChan.send({ content: '𓈀𓈀𓈀𓈀𓈀𓈀𓈀𓈀𓈀𓈀𓈀𓈀𓈀𓈀𓈀𓈀𓈀𓈀𓈀𓈀', embeds: [VerifyEmbed] })
      await msg.react('1091645657330233414')
  },
};