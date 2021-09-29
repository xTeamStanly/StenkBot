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
});

module.exports = nibba;