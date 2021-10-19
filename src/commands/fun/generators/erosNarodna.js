const { Command } = require("yuuko");
const { randomList, getMessageReference, getFooter } = require('../../../lib/tools');
const data = require('../../../resources/commands/fun/generators/erosNarodna');

const erosNarodna = new Command(['eros', 'erosnarodna', 'erotska'], async (message, args, context) => {
    const poema = randomList(data);
    await message.channel.createMessage({
        messageReference: getMessageReference(message),
        embed: {
            author: { name:'Eros - Narodne erotske pesme', url: 'https://sr.wikisource.org/sr-ec/%D0%A6%D1%80%D0%B2%D0%B5%D0%BD_%D0%91%D0%B0%D0%BD' },
            title: poema.naslov,
            description: poema.pesma,
            url: poema.link,
            color: 0xDB418F,
            thumbnail: { url: 'https://i.imgur.com/n4HlLEN.png' },
            fields: [
                {
                    name: ":notepad_spiral: Zbirka",
                    value: poema.zbirka,
                    inline: false
                }
            ],
            description: poema.pesma,
            footer: getFooter(message)
        }
    });
}).addSubcommand(new Command(['help', 'pomoc', '?', 'info'], async (message, args, context) => {
    await message.channel.createMessage({
        messageReference: getMessageReference(message),
        embed: {
            author: { name:'Eros - Narodne erotske pesme', url: 'https://sr.wikisource.org/sr-ec/%D0%A6%D1%80%D0%B2%D0%B5%D0%BD_%D0%91%D0%B0%D0%BD' },
            color: 0xDB418F,
            thumbnail: { url: 'https://i.imgur.com/n4HlLEN.png' },
            footer: getFooter(message),
            title: ':book: Pomoć',
            description: "__***Opis:***__\n• Prikazuje nasumičnu erotsku narodnu pesmu.\n\n__***Sva imena komande:***__\n• **eros**\n• **erotska**\n• **erosnarodna**\n\n__***Korišćenje:***__\n• **eros** - prikazuje nasumičnu erotsku narodnu pesmu."
        }
    });
}));

module.exports = erosNarodna;