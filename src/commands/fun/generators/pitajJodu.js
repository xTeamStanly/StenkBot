const { Command } = require('yuuko');
const { randomList, getMessageReference, getFooter } = require('../../../lib/tools');
const data = require('../../../resources/commands/fun/generators/pitajJodu');

const pitajJodu = new Command(['yoda', 'pitajjodu', 'pitajyodu', 'yodo', 'joda', 'jodo', 'dedajoda', 'dedajodo'], async (message, args, context) => {
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
});

module.exports = pitajJodu;