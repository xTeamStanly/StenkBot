const { Command } = require("yuuko");
const { randomList, getMessageReference, getFooter } = require("../../../lib/tools");
const data = require('../../../resources/commands/fun/generators/kanyeTweet');

const kanyeTweet = new Command(['kanye', 'kanyetweet'], async (message, args, context) => {
    await message.channel.createMessage({
        messageReference: getMessageReference(message),
        embed: {
            author: { name: "Kanye Tweet" },
            title: "Kanye kaže...",
            description: randomList(data.quotes),
            thumbnail: { url: randomList(data.image) },
            footer: getFooter(message),
            color: 0xC27C0E
        }
    });
});

module.exports = kanyeTweet;
