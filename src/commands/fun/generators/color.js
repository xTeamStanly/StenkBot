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
});

module.exports = color;