const { Command } = require("yuuko");
const { randomList, getMessageReference, getFooter } = require("../../../lib/tools");
const data = require('../../../resources/commands/fun/generators/novine');

const novine = new Command(['novine', 'naslov'], async (message, args, context) => {
    var output = randomList(data.output);
    output = output
        .replace("[intro]", randomList(data.intro))
        .replace("[celebmale]", randomList(data.celebmale))
        .replace("[celebfemale]", randomList(data.celebfemale))
        .replace("[location]", randomList(data.location))
        .replace("[verbfemale]", randomList(data.verbfemale))
        .replace("[verbmale]", randomList(data.verbmale))
        .replace("[object]", randomList(data.object))
        .replace("[whose]", randomList(data.whose))
        .replace("[postfix]", randomList(data.postfix))
        .replace("[objectPerson]", randomList(data.objectPerson));

    await message.channel.createMessage({
        messageReference: getMessageReference(message),
        embed: {
            author: { name: "Novine" },
            title: output,
            thumbnail: { url: data.image },
            color: 0xE7E7E7,
            footer: getFooter(message)
        }
    })
});

module.exports = novine;