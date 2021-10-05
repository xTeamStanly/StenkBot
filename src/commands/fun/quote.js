const { Command } = require("yuuko");
const axios = require('axios');
const { getFooter, errNaslov, errSadrzaj, getMessageReference } = require("../../lib/tools");

const quoteBreakingBad = new Command(['brekingbad', 'bb'], async (message, args, context) => {
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
});

const quoteRonSwanson = new Command(['ron', 'ronswanson', 'swanson'], async (message, args, context) => {
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
});

const quoteOffice = new Command('office', async (message, args, context) => {
    var finalJson = {
        author: { name: "The Office", url: "https://www.officeapi.dev/" },
        color: 0x1A384E,
        thumbnail: { url: 'https://i.imgur.com/pXTNDtl.png' },
        footer: getFooter(message)
    }

    var naslov = "The Office Quote"; var sadrzaj;

    try {
        const quoteJson = (await axios.get('https://www.officeapi.dev/api/quotes/random')).data.data;
        console.log(quoteJson)
        sadrzaj = `***"${quoteJson.content}"***\n- ${quoteJson.character.firstname} ${quoteJson.character.lastname}`;
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
});

const quote = new Command(['quote', 'quotes'], async (message, args, context) => {
    await message.channel.createMessage({
        messageReference: getMessageReference(message),
        embed: {
            author: { name: "Nasumičan citat" },
            color: 0xF78200,
            thumbnail: { url: 'https://i.imgur.com/U41S13T.png' },
            title: `Unesite vrstu citata`,
            description: "**Vrste citata:**\n" +
            "**• breakingbad | bb**\n" +
            "**• ron | ronswanson | swanson**\n" +
            "**• office**",
            footer: getFooter(message)
        }
    });;
}).addSubcommand(quoteBreakingBad).addSubcommand(quoteRonSwanson).addSubcommand(quoteOffice);

module.exports = quote;