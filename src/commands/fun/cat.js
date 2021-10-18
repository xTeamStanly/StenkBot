const { Command } = require("yuuko");
const axios = require('axios');
const { getMessageReference, getFooter, errNaslov, errSadrzaj } = require("../../lib/tools");

const cat = new Command(['macka', 'cat'], async (message, args, context) => {
    var finalJson = {
        author: { name: "Nasumična mačka", url: 'https://aws.random.cat/' },
        url: 'https://aws.random.cat/',
        color: 0xFAAD8A,
        thumbnail: { url: 'https://i.imgur.com/ZBA8lRS.png' },
        footer: getFooter(message)
    }

    var naslov; var sadrzaj;

    try {
        const jsonFox = (await axios.get('https://aws.random.cat/meow')).data;
        finalJson.image = { url: jsonFox["file"] };
        naslov = "Mačka";
        sadrzaj = "";
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

module.exports = cat;