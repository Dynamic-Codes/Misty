require("dotenv").config();
const { Client, IntentsBitField } = require("discord.js");
const eventHandler = require("./handlers/eventHandler");
const mongoose = require('mongoose');

const client = new Client({
    intents: [
        IntentsBitField.Flags.Guilds,
        IntentsBitField.Flags.GuildMembers,
        IntentsBitField.Flags.GuildModeration,
        IntentsBitField.Flags.GuildEmojisAndStickers,
        IntentsBitField.Flags.GuildWebhooks,
        IntentsBitField.Flags.GuildPresences,
        IntentsBitField.Flags.GuildInvites,
        IntentsBitField.Flags.GuildVoiceStates,
        IntentsBitField.Flags.GuildMessages,
        IntentsBitField.Flags.GuildMessageReactions,
        IntentsBitField.Flags.DirectMessages,
        IntentsBitField.Flags.DirectMessageReactions,
        IntentsBitField.Flags.MessageContent,
        IntentsBitField.Flags.AutoModerationExecution,
    ],
});

(async () => {
    try {
        mongoose.set('strictQuery', false);
        await mongoose.connect(process.env.MONGO_TOKEN, { keepAlive: true })
        console.log('[🖥️] Connected to database.')

        eventHandler(client);
        client.login(process.env.BOT_TOKEN);
        
    } catch (error) {
        console.log(`Startup error: ${error}`)
    }
})();
//Run bot in console by typing "nodemon"