const { Command } = require("yuuko");
const axios = require('axios');
const { getMessageReference, getFooter, errNaslov, errSadrzaj } = require("../../lib/tools");

const fox = new Command(['lisica', 'fox'], async (message, args, context) => {
    var finalJson = {
        author: { name: "Nasumična lisica", url: 'https://randomfox.ca/' },
        url: 'https://randomfox.ca/',
        color: 0xEE8B00,
        thumbnail: { url: 'https://i.imgur.com/OoehT9y.png' },
        footer: getFooter(message)
    }

    var naslov; var sadrzaj;

    try {
        const jsonFox = (await axios.get('https://randomfox.ca/floof')).data;
        finalJson.image = { url: jsonFox["image"] };
        naslov = "Lisica";
        sadrzaj = "";
        finalJson.url = jsonFox["link"];
    } catch(err) {
        console.log(err);
        naslov = errNaslov;
        sadrzaj = errSadrzaj;
    }

    finalJson['title'] = naslov;
    finalJson['description'] = sadrzaj;

    await message.channel.createMessage({
        messageReference: getMessageReference(message),
        embed: finalJson
    });
}).addSubcommand(new Command(['help', 'pomoc', '?'], async (message, args, context) => {
    await message.channel.createMessage({
        messageReference: getMessageReference(message),
        embed: {
            author: { name: "Nasumična lisica", url: 'https://randomfox.ca/' },
            url: 'https://randomfox.ca/',
            color: 0xEE8B00,
            thumbnail: { url: 'https://i.imgur.com/OoehT9y.png' },
            footer: getFooter(message),
            title: ':book: Pomoć',
            description: "__***Opis:***__\n• Prikazuje nasumičnu sliku lisice.\n\n__***Sva imena komande:***__\n• **lisica**\n• **fox**\n\n__***Korišćenje:***__\n• **lisica** - prikazuje nasumičnu sliku lisice"
        }
    });
}));

module.exports = fox;