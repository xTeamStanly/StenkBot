const { Command } = require("yuuko");
const { getMessageReference, getFooter, botAvatar } = require("../../lib/tools");


const who = new Command(['who'], async (message, args, context) => {
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
}).addSubcommand(new Command(['help', 'pomoc', '?', 'info'], async (message, args, context) => {
    await message.channel.createMessage({
        messageReference: getMessageReference(message),
        embed: {
            author: { name: "Informacije o korisniku" },
            color: 0x808080,
            thumbnail: { url: botAvatar },
            footer: getFooter(message),
            title: ':book: Pomoć',
            description: "__***Opis:***__\n• Prikazuje informacije o korisniku.\n\n__***Sva imena komande:***__\n• **who**\n\n__***Korišćenje:***__\n• **who** - prikazuje informacije o korisniku koji je pozvao komandu\n• **who __<MENTION>__** - prikazuje informacije o __MENTION__ (@username)"
        }
    });
}));

module.exports = who;