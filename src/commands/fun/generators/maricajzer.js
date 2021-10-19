const { Command } = require("yuuko");
const { randomList, countOccurrences, getMessageReference, getFooter } = require("../../../lib/tools");
const data = require('../../../resources/commands/fun/generators/maricajzer');

const maricajzer = new Command(['maric', 'maricajzer'], async (message, args, context) => {
    var output = randomList(data.output);
    output = output
        .replace("[citat]", randomList(data.citat))
        .replace("[takotada]", randomList(data.takotada))
        .replace("[desavanje]", randomList(data.desavanje))
        .replace("[lokacija]", randomList(data.lokacija));

    var count;

    count = countOccurrences(output, "[dogadjaj]");
    for(let i = 0; i < count; i++) { output = output.replace("[dogadjaj]", randomList(data.dogadjaj)); }

    count = countOccurrences(output, "[lik]");
    for(let i = 0; i < count; i++) { output = output.replace("[lik]", randomList(data.lik)); }

    await message.channel.createMessage({
        messageReference: getMessageReference(message),
        embed: {
            author: { name: "Marićajzer" },
            title: "Marićajzer kaze:",
            description: output,
            color: 0xAC6533,
            thumbnail: { url: data.image },
            footer: getFooter(message)
        }
    });
}).addSubcommand(new Command(['help', 'pomoc', '?', 'info'], async (message, args, context) => {
    await message.channel.createMessage({
        messageReference: getMessageReference(message),
        embed: {
            author: { name: "Marićajzer" },
            color: 0xAC6533,
            thumbnail: { url: data.image },
            footer: getFooter(message),
            title: ':book: Pomoć',
            description: "__***Opis:***__\n• Generiše tipičnu Marićevu rečenicu.\n\n__***Sva imena komande:***__\n• **maric**\n• **maricajzer**\n\n__***Korišćenje:***__\n• **maric** - generiše tipičnu Marićevu rečenicu"
        }
    });
}));

module.exports = maricajzer;