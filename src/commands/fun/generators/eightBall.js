const { Command } = require('yuuko');
const { randomList, getMessageReference, getFooter } = require('../../../lib/tools');
const data = require('../../../resources/commands/fun/generators/eightBall');

const eightBall = new Command('8ball', async (message, args, context) => {

    var pitanje = args.join(' ');
    var validno = false;

    var output = { type: 'bad', message: ':man_shrugging: Postavite konkretno pitanje!' }
    if(pitanje.length >= 4 && pitanje.endsWith('?')) {
        output = randomList(data.response);
        validno = true;

        if(pitanje.length >= 256) { pitanje = pitanje.substring(0, 256); pitanje += "...?" };
    }

    var color;
    switch(output.type) {
        case 'bad': color = 0xE74C3C; break;
        case 'neutral': color = 0xF1C40F; break;
        case 'good': color = 0x2ECC71; break;
    }

    await message.channel.createMessage({
        messageReference: getMessageReference(message),
        embed: {
            author: { name: '8Ball' },
            title: output.message,
            color: color,
            thumbnail: { url: data.image },
            footer: getFooter(message),
            fields: (validno) ? [{ name: ':thinking: Pitanje', value: pitanje, inline: false }] : []
        }
    });
}).addSubcommand(new Command(['help', 'pomoc', '?', 'info'], async (message, args, context) => {
    await message.channel.createMessage({
        messageReference: getMessageReference(message),
        embed: {
            author: { name: '8Ball' },
            color: 0x070707,
            thumbnail: { url: data.image },
            footer: getFooter(message),
            title: ':book: Pomoć',
            description: "__***Opis:***__\n• Postavite pitanje kugli.\n\n__***Sva imena komande:***__\n• **8ball**\n\n__***Korišćenje:***__\n• **8ball __<PITANJE>__?** - postavlja __PITANJE__ kugli"
        }
    });
}));;

module.exports = eightBall;