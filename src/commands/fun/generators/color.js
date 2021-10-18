const { Command } = require("yuuko");
const { getMessageReference, randomList, getFooter } = require('../../../lib/tools');
const data = require('../../../resources/commands/fun/generators/color');

const color = new Command(['color', 'boja'], async (message, args, context) => {
    const boja = randomList(data.colors);

    await message.channel.createMessage({
        messageReference: getMessageReference(message),
        embed: {
            author: { name: "Nasumična boja" },
            thumbnail: { url: 'https://i.imgur.com/6C8lsJD.png' },
            color: boja.color,
            title: `◄ ${boja.name}`,
            footer: getFooter(message)
        }
    });
}).addSubcommand(new Command(['help', 'pomoc', '?'], async (message, args, context) => {
    await message.channel.createMessage({
        messageReference: getMessageReference(message),
        embed: {
            author: { name: "Nasumična boja" },
            color: 0x490081,
            thumbnail: { url: 'https://i.imgur.com/6C8lsJD.png' },
            footer: getFooter(message),
            title: ':book: Pomoć',
            description: "__***Opis:***__\n• Generiše nasumičnu boju, kao i njeno ime.\n\n__***Sva imena komande:***__\n• **color**\n• **boja**\n\n__***Korišćenje:***__\n• **boja** - generiše nasumičnu boju, kao i njeno ime"
        }
    });
}));

module.exports = color;