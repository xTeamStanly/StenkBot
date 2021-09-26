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
});

module.exports = oldInsult;