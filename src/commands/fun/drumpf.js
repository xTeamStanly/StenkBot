const { Command } = require("yuuko");
const { getMessageReference, errNaslov, errSadrzaj, getFooter, timeZonePodesavanja } = require("../../lib/tools");
const axios = require("axios");

const drumpf = new Command(['drumpf', 'trump', 'tramp'], async (message, args, context) => {

    const finalJson = {
        author: { name: "Drumpf", url: 'https://www.tronalddump.io/' },
        thumbnail: { url: 'https://i.imgur.com/3GHu1aQ.png' },
        color: 0xFFA500,
        footer: getFooter(message)
    };

    var naslov; var sadrzaj;

    try {
        const html = await axios.get('https://www.tronalddump.io/random/quote');
        const jsonDrumpf = html.data;

        try {
            naslov = "Drumpf kaže";
            const info = jsonDrumpf._embedded;
            const date = new Date(jsonDrumpf.appeared_at);
            if(info && isNaN(date.getDate())) { throw "Nije validno idemo dalje"; }

            sadrzaj = `${jsonDrumpf.value}\n\n- ${info.author[0].name}\n${date.toLocaleDateString('sr-RS', timeZonePodesavanja)} ${date.toLocaleTimeString('sr-RS', timeZonePodesavanja)}`;
            finalJson.url = info.source[0].url;
        } catch(errJson) {
            naslov = errNaslov;
            sadrzaj = errSadrzaj;
        }
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
}).addSubcommand(new Command(['help', 'pomoc', '?', 'info'], async (message, args, context) => {
    await message.channel.createMessage({
        messageReference: getMessageReference(message),
        embed: {
            author: { name: "Drumpf", url: 'https://www.tronalddump.io/' },
        thumbnail: { url: 'https://i.imgur.com/3GHu1aQ.png' },
        color: 0xFFA500,
        footer: getFooter(message),
            title: ':book: Pomoć',
            description: "__***Opis:***__\n• Prikazuje nasumičnu twitter objavu Donalda Trampa.\n\n__***Sva imena komande:***__\n• **drumpf**\n• **trump**\n• **tramp**\n\n__***Korišćenje:***__\n• **drumpf** - prikazuje nasumičnu twitter objavu Donalda Trampa"
        }
    });
}));

module.exports = drumpf;