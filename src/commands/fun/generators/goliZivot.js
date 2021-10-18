const { Command } = require('yuuko');
const { randomList, countOccurrences, getMessageReference, getFooter } = require('../../../lib/tools');
const data = require('../../../resources/commands/fun/generators/goliZivot');

const goliZivot = new Command(['golizivot', 'gz'], async (message, args, context) => {
    var output = randomList(data.output);
    output = output
        .replace("[lokacija]", randomList(data.lokacija))
        .replace("[takotada]", randomList(data.takotada))
        .replace("[citat]", randomList(data.citat))
        .replace("[desavanje]", randomList(data.desavanje));

    var count;
    count = countOccurrences(output, "[dogadjaj]");
    for(let i = 0; i < count; i++) { output = output.replace("[dogadjaj]", randomList(data.dogadjaj)); }

    count = countOccurrences(output, "[lik]");
    for(let i = 0; i < count; i++) { output = output.replace("[lik]", randomList(data.lik)); }

    await message.channel.createMessage({
        messageReference: getMessageReference(message),
        embed: {
            author: { name: "Goli Život" },
            title: output,
            color: 0x61625C,
            thumbnail: { url: data.image },
            footer: getFooter(message)
        }
    });
}).addSubcommand(new Command(['help', 'pomoc', '?'], async (message, args, context) => {
    await message.channel.createMessage({
        messageReference: getMessageReference(message),
        embed: {
            author: { name: "Goli Život" },
            color: 0x61625C,
            thumbnail: { url: data.image },
            footer: getFooter(message),
            title: ':book: Pomoć',
            description: "__***Opis:***__\n• Generiše tekst iz Marićeve emisije \"Goli Život\" na Happy-ju.\n\n__***Sva imena komande:***__\n• **golizivot**\n• **gz**\n\n__***Korišćenje:***__\n• **gz** - generiše tekst iz Marićeve emisije \"Goli Život\" na Happy-ju"
        }
    });
}));

module.exports = goliZivot;