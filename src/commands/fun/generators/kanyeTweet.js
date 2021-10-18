const { Command } = require("yuuko");
const { randomList, getMessageReference, getFooter } = require("../../../lib/tools");
const data = require('../../../resources/commands/fun/generators/kanyeTweet');

const kanyeTweet = new Command(['kanye', 'kanyetweet'], async (message, args, context) => {
    await message.channel.createMessage({
        messageReference: getMessageReference(message),
        embed: {
            author: { name: "Kanye Tweet" },
            title: "Kanye kaže...",
            description: randomList(data.quotes),
            thumbnail: { url: randomList(data.image) },
            footer: getFooter(message),
            color: 0xC27C0E
        }
    });
}).addSubcommand(new Command(['help', 'pomoc', '?'], async (message, args, context) => {
    await message.channel.createMessage({
        messageReference: getMessageReference(message),
        embed: {
            author: { name: "Kanye Tweet" },
            color: 0xC27C0E,
            thumbnail: { url: randomList(data.image) },
            footer: getFooter(message),
            title: ':book: Pomoć',
            description: "__***Opis:***__\n• Prikazuje nasumičan Kanjetov tvit (lista od 115 tvitova).\n\n__***Sva imena komande:***__\n• **kanye**\n• **kanyetweet**\n\n__***Korišćenje:***__\n• **kanye** - prikazuje nasumičan Kanjetov tvit (lista od 115 tvitova)"
        }
    });
}));

module.exports = kanyeTweet;
