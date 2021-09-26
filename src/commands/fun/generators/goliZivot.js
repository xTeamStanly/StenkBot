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
});

module.exports = goliZivot;