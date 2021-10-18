const { Command } = require("yuuko");
const { getMessageReference, getFooter, randomList } = require('../../../lib/tools');
const data = require('../../../resources/commands/fun/generators/nibba');

const nibba = new Command('nibba', async (message, args, context) => {
    await message.channel.createMessage({
        messageReference: getMessageReference(message),
        embed: {
            author: { name: "Nibba" },
            title: `${randomList(data.prviDeo)}${randomList(data.drugiDeo)}${randomList(data.treciDeo)} ${randomList(data.prezime)}`,
            color: 0x8B4513,
            thumbnail: { url: 'https://i.imgur.com/y4ld1KC.png' },
            footer: getFooter(message)
        }
    })
}).addSubcommand(new Command(['help', 'pomoc', '?'], async (message, args, context) => {
    await message.channel.createMessage({
        messageReference: getMessageReference(message),
        embed: {
            author: { name: "Nibba" },
            color: 0x8B4513,
            thumbnail: { url: 'https://i.imgur.com/y4ld1KC.png' },
            footer: getFooter(message),
            title: ':book: Pomoć',
            description: "__***Opis:***__\n• Generiše nibba ime.\n\n__***Sva imena komande:***__\n• **nibba**\n\n__***Korišćenje:***__\n• **nibba** - generiše nibba ime"
        }
    });
}));

module.exports = nibba;