const { Command } = require('yuuko');
const { randomList, getMessageReference, getFooter } = require('../../../lib/tools');
const data = require('../../../resources/commands/fun/generators/pitajJodu');

const pitajJodu = new Command(['yoda', 'yodo', 'pitajyodu', 'dedayodo', 'joda', 'jodo', 'pitajjodu', 'dedajodo'], async (message, args, context) => {
    var pitanje = args.join(' ');
    var validno = false;

    var output = { type: ' Pitanja nema...', message: ':man_shrugging: Konkretno pitanje postavite!' };
    if(pitanje.length >= 4 && pitanje.endsWith('?')) {
        output = randomList(data.response);
        validno = true;

        if(pitanje.length >= 256) { pitanje = pitanje.substring(0, 256); pitanje += "...?" };
    }

    await message.channel.createMessage({
        messageReference: getMessageReference(message),
        embed: {
            author: { name: "Pitaj Jodu" },
            title: output.type,
            description: output.message,
            color: 0x2AB26A,
            thumbnail: { url: data.image },
            footer: getFooter(message)
        }
    });
}).addSubcommand(new Command(['help', 'pomoc', '?'], async (message, args, context) => {
    await message.channel.createMessage({
        messageReference: getMessageReference(message),
        embed: {
            author: { name: "Pirotska orata" },
            color: 0xDCC397,
            thumbnail: { url: data.image },
            footer: getFooter(message),
            title: ':book: Pomoć',
            description: "__***Opis:***__\n• Postavi pitanje mudracu.\n\n__***Sva imena komande:***__\n• **yoda**\n• **yodo**\n• **pitajyodu**\n• **dedayodo**\n• **joda**\n• **jodo**\n• **pitajjodu**\n• **dedajodo**\n\n__***Korišćenje:***__\n• **dedajodo __<PITANJE>__?** - postavi __<PITANJE>__ mudracu."
        }
    });
}));

module.exports = pitajJodu;