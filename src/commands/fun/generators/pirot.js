const { Command } = require("yuuko");
const { randomList, getFooter, getMessageReference } = require("../../../lib/tools");
const data = require('../../../resources/commands/fun/generators/pirot');

const pirot = new Command(['pirot', 'pirotskaorata'], async (message, args, context) => {
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
            author: { name: "Pirotska orata" },
            title: "Danas u Pirot!",
            description: output,
            color: 0xDCC397,
            thumbnail: { url: data.image },
            footer: getFooter(message)
        }
    });
});

module.exports = pirot;