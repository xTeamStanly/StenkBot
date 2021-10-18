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
});

module.exports = fox;