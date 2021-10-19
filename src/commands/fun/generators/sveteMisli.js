const { Command } = require("yuuko");
const { getFooter, getMessageReference, randomList } = require("../../../lib/tools");
const data = require('../../../resources/commands/fun/quote');

const sveteMisli = new Command(['svetemisli', 'svete', 'holy'], async (message, args, context) => {
    const misaoJson = randomList(data.sveteMisli);
    await message.channel.createMessage({
        messageReference: getMessageReference(message),
        embed: {
            author: { name: "Svete Misli", url: 'https://github.com/skolakoda/programming-quotes-api' },
            thumbnail: { url: 'https://i.imgur.com/S9vCi5J.png' },
            color: 0xFBD70D,
            title: "Svete Misli Citat",
            description: `***"${misaoJson.sr}"***\n- ${misaoJson.author}`,
            footer: getFooter(message)
        }
    });
}).addSubcommand(new Command(['help', 'pomoc', '?', 'info'], async (message, args, context) => {
    await message.channel.createMessage({
        messageReference: getMessageReference(message),
        embed: {
            author: { name: "Svete Misli", url: 'https://github.com/skolakoda/programming-quotes-api' },
            thumbnail: { url: 'https://i.imgur.com/S9vCi5J.png' },
            color: 0xFBD70D,
            footer: getFooter(message),
            title: ':book: Pomoć',
            description: "__***Opis:***__\n• Prikazuje nasumičan duhovni citat.\n\n__***Sva imena komande:***__\n• **svetemisli**\n• **svete**\n• **holy**\n\n__***Korišćenje:***__\n• **svete** - prikazuje nasumičan duhovni citat"
        }
    });
}));

module.exports = sveteMisli;