const { Command } = require('yuuko');
const { getMessageReference, getFooter, randomList } = require('../../../lib/tools');
const data = require('../../../resources/commands/fun/generators/pname');

const pname = new Command(['pname', 'dzonson'], async (message, args, context) => {
    await message.channel.createMessage({
        messageReference: getMessageReference(message),
        embed: {
            author: { name: 'Džonson' },
            title: `${randomList(data.prviDeo)} ${randomList(data.drugiDeo)}`,
            color: 0xEDC240,
            thumbnail: { url: 'https://i.imgur.com/BxXlBFT.png' },
            footer: getFooter(message)
        }
    });
}).addSubcommand(new Command(['help', 'pomoc', '?', 'info'], async (message, args, context) => {
    await message.channel.createMessage({
        messageReference: getMessageReference(message),
        embed: {
            author: { name: 'Džonson' },
            color: 0xEDC240,
            thumbnail: { url: 'https://i.imgur.com/BxXlBFT.png' },
            footer: getFooter(message),
            title: ':book: Pomoć',
            description: "__***Opis:***__\n• Generiše ime džonsona.\n\n__***Sva imena komande:***__\n• **pname**\n• **dzonson**\n\n__***Korišćenje:***__\n• **pname** - generiše ime džonsona"
        }
    });
}));

module.exports = pname;