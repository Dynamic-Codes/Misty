module.exports = {
    name: "ping",
    description: "Just check how quick Misty vibes!",
    // devOnly: Boolean,
    // testOnly: Boolean,
    // options: object[],
    deleted: false,

    callback: (client, interaction) => {
        interaction.reply(`Pong with a speed of ${client.ws.ping}ms!`);
    },
};
