const { Command } = require("yuuko");
const axios = require('axios');
const { getFooter, errNaslov, errSadrzaj, getMessageReference } = require("../../lib/tools");

const breakingBad = new Command(['breakingbad', 'bb'], async (message, args, context) => {
    var finalJson = {
        author: { name: "Breaking Bad", url: "https://github.com/shevabam/breaking-bad-quotes" },
        color: 0x337840,
        thumbnail: { url: 'https://i.imgur.com/lam1724.png' },
        footer: getFooter(message)
    }

    var naslov = "Breaking Bad Quote"; var sadrzaj;

    try {
        const quoteJson = (await axios.get('https://breaking-bad-quotes.herokuapp.com/v1/quotes')).data[0];
        sadrzaj = `***"${quoteJson.quote}"***\n- ${quoteJson.author}`;
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
            author: { name: "Breaking Bad", url: "https://github.com/shevabam/breaking-bad-quotes" },
            color: 0x337840,
            thumbnail: { url: 'https://i.imgur.com/lam1724.png' },
            footer: getFooter(message),
            title: ':book: Pomoć',
            description: `__***Opis:***__
            • Prikazuje nasumičan citat iz serije Breaking Bad.

            __***Sva imena komande:***__
            • **breakingbad**
            • **bb**

            __***Korišćenje:***__
            • **breakingbad** - prikazuje nasumičan citat iz serije Breaking Bad
            `
        }
    });
}));

module.exports = breakingBad;