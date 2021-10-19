const { Command } = require('yuuko');
const { randomList, getMessageReference, getFooter } = require('../../../lib/tools');
const data = require('../../../resources/commands/fun/generators/balkanInfo');

const balkanInfo = new Command(["bi", "binfo", "tesa", "balkaninfo"], async (message, args, context) => {
    var output = randomList(data.output);
    output = output
        .replace("[grupa]", randomList(data.grupa))
        .replace("[lokacija]", randomList(data.lokacija))
        .replace("[adjective]", randomList(data.adjective))
        .replace("[victims]", randomList(data.victims))
        .replace("[vek]", randomList(data.vek))
        .replace("[ostaci]", randomList(data.ostaci))
        .replace("[vrstaLobija]", randomList(data.vrstaLobija))
        .replace("[uradi]", randomList(data.uradi))
        .replace("[kome]", randomList(data.kome))
        .replace("[urucan]", randomList(data.urucan))
        .replace("[rucan]", randomList(data.rucan))
        .replace("[sila]", randomList(data.sila))
        .replace("[jado]", randomList(data.jado))
        .replace("[staCe]", randomList(data.staCe))
        .replace("[znalac]", randomList(data.znalac))
        .replace("[znanje]", randomList(data.znanje))
        .replace("[losUzor]", randomList(data.losUzor))
        .replace("[dobarUzor]", randomList(data.dobarUzor))
        .replace("[zlocinac]", randomList(data.zlocinac))
        .replace("[osporavaci]", randomList(data.osporavaci))
        .replace("[mesto]", randomList(data.mesto))
        .replace("[plen]", randomList(data.plen))
        .replace("[neki]", randomList(data.neki))
        .replace("[nauk]", randomList(data.nauk))
        .replace("[nenauk]", randomList(data.neNauk))
        .replace("[nagrde]", randomList(data.nagrde))
        .replace("[zastitnik]", randomList(data.zastitnik))
        .replace("[mocni]", randomList(data.mocni));

    await message.channel.createMessage({
        messageReference: getMessageReference(message),
        embed: {
            author: { name: "Balkan Info" },
            title: output,
            description: `Dobar dan, ja sam Teša Tešanović, dobrodošli u današnju emisiju, tema ove emisije je ... **${output}**`,
            color: 0xB2B6C2,
            thumbnail: { url: data.image },
            footer: getFooter(message)
        }
    })
}).addSubcommand(new Command(['help', 'pomoc', '?', 'info'], async (message, args, context) => {
    await message.channel.createMessage({
        messageReference: getMessageReference(message),
        embed: {
            author: { name: "Balkan Info" },
            color: 0xB2B6C2,
            thumbnail: { url: data.image },
            footer: getFooter(message),
            title: ':book: Pomoć',
            description: "__***Opis:***__\n• Generiše naslov koji liči na naslov emisije Balkan Info.\n\n__***Sva imena komande:***__\n• **balkaninfo**\n• **bi**\n• **binfo**\n• **tesa**\n\n__***Korišćenje:***__\n• **tesa** - generiše naslov koji liči na naslov emisije Balkan Info"
        }
    });
}));

module.exports = balkanInfo;