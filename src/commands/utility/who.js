const { Command } = require("yuuko");
const { getMessageReference, getFooter } = require("../../lib/tools");


const who = new Command(['info', 'who'], async (message, args, context) => {
    var user = message.mentions[0];
    if(!user) { user = message.author; } //ako nema mention, onda daj info o korisniku

    user = await message.channel.guild.members.get(user.id);

    await message.channel.createMessage({
        messageReference: getMessageReference(message),
        embed: {
            author: { name: "Informacije o korisniku" },
            title: `${user.username}#${user.discriminator}`,
            color: 0x808080,
            thumbnail: { url: user.avatarURL },
            fields: [
                {
                    name: ":id: User ID",
                    value: user.id,
                    inline: false,
                },
                {
                    name: ":date: Nalog kreiran",
                    value: new Date(user.createdAt).toLocaleString('sr-RS'),
                    inline: false
                },
                {
                    name: ":clock1: Nalog se pridružio serveru",
                    value: new Date(user.joinedAt).toLocaleString('sr-RS'),
                    inline: false
                }
            ],
            footer: getFooter(message)
        }
    })
});

module.exports = who;