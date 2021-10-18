const { Command } = require("yuuko");
const axios = require('axios');
const { getFooter, errNaslov, errSadrzaj, getMessageReference } = require("../../lib/tools");

const office = new Command('office', async (message, args, context) => {
    var finalJson = {
        author: { name: "The Office", url: "https://www.officeapi.dev/" },
        color: 0x1A384E,
        thumbnail: { url: 'https://i.imgur.com/pXTNDtl.png' },
        footer: getFooter(message)
    }

    var naslov = "The Office Quote"; var sadrzaj;

    try {
        const quoteJson = (await axios.get('https://www.officeapi.dev/api/quotes/random')).data.data;
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
}).addSubcommand(new Command(['help', 'pomoc', '?'], async (message, args, context) => {
    await message.channel.createMessage({
        messageReference: getMessageReference(message),
        embed: {
            author: { name: "The Office", url: "https://www.officeapi.dev/" },
            color: 0x1A384E,
            thumbnail: { url: 'https://i.imgur.com/pXTNDtl.png' },
            footer: getFooter(message),
            title: ':book: Pomoć',
            description: "__***Opis:***__\n• Prikazuje nasumičan citat iz serije Office.\n\n__***Sva imena komande:***__\n• **office**\n\n__***Korišćenje:***__\n• **office** - prikazuje nasumičan citat iz serije Office"
        }
    });
}));

module.exports = office;