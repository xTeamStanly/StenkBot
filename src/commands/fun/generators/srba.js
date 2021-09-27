const { Command } = require('yuuko');
const { randomList, getMessageReference, getFooter } = require('../../../lib/tools');
const data = require('../../../resources/commands/fun/generators/srba');

const srba = new Command(['srba', 'mudrolija', 'mudrost', 'srbapametuje', 'srbakaze'], async (message, args, context) => {
    var output = randomList(data.poslovica);
    const akcija = randomList(data.akcija);

    if(!output.endsWith('.') && !output.endsWith('!') && !output.endsWith('?')) {
        output += '.';
    }

    await message.channel.createMessage({
        messageReference: getMessageReference(message),
        embed: {
            author: { name: 'Srba - Srba kaže' },
            title: output,
            description: akcija,
            color: 0x1F8B4C,
            thumbnail: { url: randomList(data.image) },
            footer: getFooter(message)
        }
    });
});

module.exports = srba;