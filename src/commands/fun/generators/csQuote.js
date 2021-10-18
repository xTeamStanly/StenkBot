const { Command } = require("yuuko");
const axios = require('axios');
const { getFooter, getMessageReference, randomList } = require("../../../lib/tools");
const data = require('../../../resources/commands/fun/quote');

const programerski = new Command(['cs', 'programmer', 'programer', 'programerski'], async (message, args, context) => {
    const csJson = randomList(data.programerskiCitati);
    var citat = `***"${csJson.en}"***\n`;
    if(csJson.sr) { citat += `\n***"${csJson.sr}"***\n`; }
    citat += `- ${csJson.author}`;

    await message.channel.createMessage({
        messageReference: getMessageReference(message),
        embed: {
            author: { name: "CS", url: 'https://github.com/skolakoda/programming-quotes-api' },
            thumbnail: { url: 'https://i.imgur.com/EuAxIry.png' },
            color: 0x7EC2B0,
            title: "CS Citati",
            description: citat,
            footer: getFooter(message)
        }
    });
}).addSubcommand(new Command(['help', 'pomoc', '?'], async (message, args, context) => {
    await message.channel.createMessage({
        messageReference: getMessageReference(message),
        embed: {
            author: { name: "CS", url: 'https://github.com/skolakoda/programming-quotes-api' },
            thumbnail: { url: 'https://i.imgur.com/EuAxIry.png' },
            color: 0x7EC2B0,
            footer: getFooter(message),
            title: ':book: Pomoć',
            description: "__***Opis:***__\n• Prikazuje nasumičan programerski citat.\n\n__***Sva imena komande:***__\n• **cs**\n• **programmer**\n• **programer**\n• **programerski**\n\n__***Korišćenje:***__\n• **cs** - prikazuje nasumičan programerski citat"
        }
    });
}));

module.exports = programerski;