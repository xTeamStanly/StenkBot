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
}).addSubcommand(new Command(['help', 'pomoc', '?'], async (message, args, context) => {
    await message.channel.createMessage({
        messageReference: getMessageReference(message),
        embed: {
            author: { name: 'Insult', url: 'https://evilinsult.com/' },
            url: 'https://evilinsult.com/' ,
            color: 0xED7517,
            thumbnail: { url: 'https://i.imgur.com/PFhkB6T.png' },
            footer: getFooter(message),
            title: ':book: Pomoć',
            description: "__***Opis:***__\n• Prikazuje nasumičnu uvredu na engleskom.\n\n__***Sva imena komande:***__\n• **insult**\n• **uvreda**\n\n__***Korišćenje:***__\n• **uvreda** - prikazuje nasumičnu uvredu"
        }
    });
}));

module.exports = insult;