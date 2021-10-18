const { Command } = require("yuuko");
const { randomList, getMessageReference, getFooter } = require("../../../lib/tools");
const data = require('../../../resources/commands/fun/generators/oldInsult');

const oldInsult = new Command(['oldinsult', 'thou'], async (message, args, context) => {
    const output = `Thou ${randomList(data.firstPhrase)} ${randomList(data.secondPhrase)} ${randomList(data.thirdPhrase)}!`;
    await message.channel.createMessage({
        messageReference: getMessageReference(message),
        embed: {
            author: { name: "Shakespearean Insults", url: 'http://www.literarygenius.info/a1-shakespearean-insults-generator.htm' },
            title: output,
            color: 0x888C8E,
            thumbnail: { url: data.image },
            footer: getFooter(message)
        }
    })
}).addSubcommand(new Command(['help', 'pomoc', '?'], async (message, args, context) => {
    await message.channel.createMessage({
        messageReference: getMessageReference(message),
        embed: {
            author: { name: "Novine" },
            thumbnail: { url: data.image },
            color: 0xE7E7E7,
            footer: getFooter(message),
            title: ':book: Pomoć',
            description: "__***Opis:***__\n• Generise uvredu na engleskom koja liči kao da je pisana Šekspirovim stilom.\n\n__***Sva imena komande:***__\n• **oldinsult**\n• **thou**\n\n__***Korišćenje:***__\n• **oldinsult** - generise uvredu na engleskom koja liči kao da je pisana Šekspirovim stilom"
        }
    });
}));

module.exports = oldInsult;