const { Command } = require("yuuko");
const { randomList, getMessageReference, getFooter } = require("../../../lib/tools");
const data = require('../../../resources/commands/fun/generators/krizniStab');

const krizniStab = new Command(['kriznistab', 'ks', 'covidmera', 'kovidmera', 'mera'], async (message, args, context) => {
    const output = `${randomList(data.mesec)} ${randomList(data.dan)} ${randomList(data.godina)}!`;
    await message.channel.createMessage({
        messageReference: getMessageReference(message),
        embed: {
            author: { name: "Šaljiva mera kriznog štaba" },
            title: output,
            color: 0x2ECC71,
            thumbnail: { url: data.image },
            footer: getFooter(message)
        }
    })
}).addSubcommand(new Command(['help', 'pomoc', '?', 'info'], async (message, args, context) => {
    await message.channel.createMessage({
        messageReference: getMessageReference(message),
        embed: {
            author: { name: "Šaljiva mera kriznog štaba" },
            color: 0x2ECC71,
            thumbnail: { url: data.image },
            footer: getFooter(message),
            title: ':book: Pomoć',
            description: "__***Opis:***__\n• Generiše novu meru Kriznog štaba protiv koronavirusa.\n\n__***Sva imena komande:***__\n• **kriznistab**\n• **ks**\n• **covidmera**\n• **kovidmera**\n• **mera**\n\n__***Korišćenje:***__\n• **ks** - generiše novu meru Kriznog štaba protiv koronavirusa"
        }
    });
}));

module.exports = krizniStab;