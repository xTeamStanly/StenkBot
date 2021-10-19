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
}).addSubcommand(new Command(['help', 'pomoc', '?', 'info'], async (message, args, context) => {
    await message.channel.createMessage({
        messageReference: getMessageReference(message),
        embed: {
            author: { name: "Novine" },
            thumbnail: { url: data.image },
            color: 0xE7E7E7,
            footer: getFooter(message),
            title: ':book: Pomoć',
            description: "__***Opis:***__\n• Generiše tipičan clickbait novinarski naslov.\n\n__***Sva imena komande:***__\n• **novine**\n• **naslov**\n\n__***Korišćenje:***__\n• **naslov** - generiše tipičan clickbait novinarski naslov"
        }
    });
}));

module.exports = novine;