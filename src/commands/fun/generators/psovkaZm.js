const { randomList, countOccurrences, getMessageReference, getFooter } = require("../../../lib/tools");
const data = require('../../../resources/commands/fun/generators/psovkaZm');
const { Command } = require("yuuko");

const maxBrPrideva = 5;
const minBrPrideva = 1;

const generisiPsovku = () => {
    //broj prideva izmedju 1 i 5
    const brojPrideva = Math.floor(Math.random() * (maxBrPrideva - minBrPrideva + 1) + minBrPrideva);

    var trenutniPridev;
    var i = 0;
    var psovka = '';

    //postoji minimalna sansa da zauvek ostane u ovoj petlji :/
    do {
        trenutniPridev = randomList(data.atribut);
        if(countOccurrences(psovka, trenutniPridev) == 0) {
            psovka += `${trenutniPridev} `;
            i++;
        }
    } while(i != brojPrideva);

    psovka += `${randomList(data.kraj)}!`;
    psovka = psovka.charAt(0).toUpperCase() + psovka.slice(1);

    return psovka;
};

const psovkaZm = new Command(['psovka', 'zorica', 'zoricapsuje'], async (message, args, context) => {
    await message.channel.createMessage({
        messageReference: getMessageReference(message),
        embed: {
            author: { name: "Psovka" },
            title: "Ti si jedna...",
            description: `**${generisiPsovku()}**`,
            color: 0xED7517,
            thumbnail: { url: data.image },
            footer: getFooter(message)
        }
    });
}).addSubcommand(new Command(['help', 'pomoc', '?', 'info'], async (message, args, context) => {
    await message.channel.createMessage({
        messageReference: getMessageReference(message),
        embed: {
            author: { name: "Psovka" },
            color: 0xED7517,
            thumbnail: { url: data.image },
            footer: getFooter(message),
            title: ':book: Pomoć',
            description: "__***Opis:***__\n• Generiše novu psovku.\n\n__***Sva imena komande:***__\n• **psovka**\n• **zorica**\n• **zoricapsuje**\n\n__***Korišćenje:***__\n• **psovka** - generiše novu psovku"
        }
    });
}));

module.exports = psovkaZm;