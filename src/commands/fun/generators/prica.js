const { Command } = require("yuuko");
const { randomList, getMessageReference, getFooter } = require("../../../lib/tools");
const data = require('../../../resources/commands/fun/generators/prica');

const prica = new Command(['prica', 'story'], async (message, args, context) => {
    var output = data.output;
    output = output
        .replace("[ko]", randomList(data.ko))
        .replace("[radim]", randomList(data.radim))
        .replace("[kad]", randomList(data.kad))
        .replace("[vreme]", randomList(data.vreme))
        .replace("[sta]", randomList(data.sta))
        .replace("[opasnost]", randomList(data.opasnost))
        .replace("[zakljucak]", randomList(data.zakljucak))
        .replace("[kazem]", randomList(data.kazem))
        .replace("[kaze]", randomList(data.kaze))
        .replace("[kazem2]", randomList(data.kazem2))
        .replace("[staon]", randomList(data.staOn))
        .replace("[znaci]", randomList(data.znaci))
        .replace("[stacesad]", randomList(data.staCesSad));
        output = output.replace("[uzasna]", randomList(data.uzasna));
        output = output.replace("[uzasni]", randomList(data.uzasni));
        output = output.replace("[aktivnost]", randomList(data.aktivnost));
        output = output.replace("[setam]", randomList(data.setam));
        output = output.replace("[Popijem]", randomList(data.popijem));
        output = output.replace("[kolko]", randomList(data.kolko));

    await message.channel.createMessage({
        messageReference: getMessageReference(message),
        embed: {
            author: { name: 'Priča' },
            title: "Kratka priča",
            description: output,
            color: 0x8a3a34,
            thumbnail: { url: data.image },
            footer: getFooter(message)
        }
    });
}).addSubcommand(new Command(['help', 'pomoc', '?'], async (message, args, context) => {
    await message.channel.createMessage({
        messageReference: getMessageReference(message),
        embed: {
            author: { name: 'Priča' },
            color: 0x8a3a34,
            thumbnail: { url: data.image },
            footer: getFooter(message),
            title: ':book: Pomoć',
            description: "__***Opis:***__\n• Generiše kratak tekst koji liči na neku pričicu.\n\n__***Sva imena komande:***__\n• **prica**\n• **story**\n\n__***Korišćenje:***__\n• **prica** - generiše kratak tekst koji liči na neku pričicu"
        }
    });
}));

module.exports = prica;