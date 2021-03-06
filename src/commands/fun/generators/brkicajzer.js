const { Command } = require('yuuko');
const { randomList, getMessageReference, getFooter } = require('../../../lib/tools');
const data = require('../../../resources/commands/fun/generators/brkicajzer');

const brkicajzer = new Command(['brkic', 'brk', 'brkicajzer'], async (message, args, context) => {
    var output = data.output;
    output = output
        .replace("[stranac]", randomList(data.stranac))
        .replace("[uradio]", randomList(data.uradio))
        .replace("[ljubavnik]", randomList(data.ljubavnik))
        .replace("[faktori]", randomList(data.faktori))
        .replace("[olos]", randomList(data.olos))
        .replace("[zemlja]", randomList(data.zemlja))
        .replace("[tehnologija]", randomList(data.tehnologija))
        .replace("[tone]", randomList(data.tone))
        .replace("[pretvara]", randomList(data.pretvara))
        .replace("[bolest]", randomList(data.bolest));

    await message.channel.createMessage({
        messageReference: getMessageReference(message),
        embed: {
            author: { name: 'Brkićajzer' },
            title: "Brkićajzer kaže",
            description: output,
            color: 0x6C645F,
            thumbnail: { url: data.image },
            footer: getFooter(message)
        }
    })
}).addSubcommand(new Command(['help', 'pomoc', '?', 'info'], async (message, args, context) => {
    await message.channel.createMessage({
        messageReference: getMessageReference(message),
        embed: {
            author: { name: 'Brkićajzer' },
            color: 0x6C645F,
            thumbnail: { url: data.image },
            footer: getFooter(message),
            title: ':book: Pomoć',
            description: "__***Opis:***__\n• Generiše tipičnu priču Milovana Brkića.\n\n__***Sva imena komande:***__\n• **brk**\n• **brkic**\n• **brkicajzer**\n\n__***Korišćenje:***__\n• **brkic** - generiše tipičnu priču Milovana Brkića"
        }
    });
}));

module.exports = brkicajzer;