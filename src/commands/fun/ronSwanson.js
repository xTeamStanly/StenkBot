const { Command } = require("yuuko");
const axios = require('axios');
const { getFooter, errNaslov, errSadrzaj, getMessageReference } = require("../../lib/tools");

const ronSwanson = new Command(['ron', 'ronswanson', 'swanson'], async (message, args, context) => {
    var finalJson = {
        author: { name: "Ron Swanson", url: "https://github.com/jamesseanwright/ron-swanson-quotes" },
        color: 0x9A252A,
        thumbnail: { url: 'https://i.imgur.com/2uwEA6O.png' },
        footer: getFooter(message)
    }

    var naslov = "Ron Swanson Quote"; var sadrzaj;

    try {
        const quoteJson = (await axios.get('http://ron-swanson-quotes.herokuapp.com/v2/quotes')).data[0];
        sadrzaj = `***"${quoteJson}"***`;
    } catch(err) {
        console.log(err);
        naslov = errNaslov;
        sadrzaj = errSadrzaj;
    }

    finalJson.title = naslov;
    finalJson.description = sadrzaj;

    await message.channel.createMessage({
        messageReference: getMessageReference(message),
        embed: finalJson
    });
}).addSubcommand(new Command(['help', 'pomoc', '?'], async (message, args, context) => {
    await message.channel.createMessage({
        messageReference: getMessageReference(message),
        embed: {
            author: { name: "Ron Swanson", url: "https://github.com/jamesseanwright/ron-swanson-quotes" },
            color: 0x9A252A,
            thumbnail: { url: 'https://i.imgur.com/2uwEA6O.png' },
            footer: getFooter(message),
            title: ':book: Pomoć',
            description: "__***Opis:***__\n• Prikazuje nasumičan citat Rona Swansona iz serije Parks and Recreation.\n\n__***Sva imena komande:***__\n• **ron**\n• **ronswanson**\n• **swanson**\n\n__***Korišćenje:***__\n• **ron** - prikazuje nasumičan citat Rona Swansona iz serije Parks and Recreation"
        }
    });
}));

module.exports = ronSwanson;