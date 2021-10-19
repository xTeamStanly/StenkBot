const { Command } = require("yuuko");
const { randomList, getMessageReference, getFooter } = require("../../../lib/tools");
const data = require('../../../resources/commands/fun/generators/niskePrice');

const niskePrice = new Command(['nis', 'niskeprice', 'naissus', 'niskaposla'], async (message, args, context) => {
    var output = randomList(data.output);
    output = output
        .replace("[animal]", randomList(data.animal))
        .replace("[adjective]", randomList(data.adjective))
        .replace("[verb]", randomList(data.verb))
        .replace("[location]", randomList(data.location)) //duplikat
        .replace("[location]", randomList(data.location)) //duplikat
        .replace("[object]", randomList(data.object))
        .replace("[object2]", randomList(data.object2));

    await message.channel.createMessage({
        messageReference: getMessageReference(message),
        embed: {
            author: { name: "Niška posla" },
            title: "Danas u Niš!",
            description: output,
            color: 0xE91E63,
            thumbnail: { url: data.image },
            footer: getFooter(message)
        }
    });
}).addSubcommand(new Command(['help', 'pomoc', '?', 'info'], async (message, args, context) => {
    await message.channel.createMessage({
        messageReference: getMessageReference(message),
        embed: {
            author: { name: "Niška posla" },
            color: 0xE91E63,
            thumbnail: { url: data.image },
            footer: getFooter(message),
            title: ':book: Pomoć',
            description: "__***Opis:***__\n• Generiše nasumičnu rabotu u Niš.\n\n__***Sva imena komande:***__\n• **nis**\n• **niskeprice**\n• **naissus**\n• **niskaposla**\n\n__***Korišćenje:***__\n• **nis** - generiše nasumičnu rabotu u Niš"
        }
    });
}));

module.exports = niskePrice;