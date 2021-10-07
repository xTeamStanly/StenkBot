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
});

module.exports = niskePrice;