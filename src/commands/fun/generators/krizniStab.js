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
});

module.exports = krizniStab;