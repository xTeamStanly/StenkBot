const { Command } = require("yuuko");
const axios = require('axios');
const { errNaslov, errSadrzaj, getMessageReference, getFooter } = require('../../lib/tools');
const { decode } = require('html-entities');

const insult = new Command(['insult', 'uvreda'], async (message, args, context) => {
    var finalJson = {
        author: { name: 'Insult', url: 'https://evilinsult.com/' },
        thumbnail: { url: 'https://i.imgur.com/PFhkB6T.png' },
        color: 0xED7517,
        footer: getFooter(message)
    }

    var naslov; var sadrzaj;

    try {
        const insultJson = (await axios.get('https://evilinsult.com/generate_insult.php?lang=en&type=json')).data;
        naslov = decode(insultJson.insult);

        //ako postoji link, stavi ga u url
        var link = insultJson.comment; if(link) { finalJson.url = link; }
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

module.exports = insult;