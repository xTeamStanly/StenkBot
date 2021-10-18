const { Command } = require("yuuko");
const axios = require('axios');
const { getFooter, getMessageReference, errNaslov, errSadrzaj } = require("../../lib/tools");

const merkur = new Command(['retrogradni', 'merkur', 'rm'], async (message, args, context) => {

    var finalJson = {
        author: { name: "Retrogradni Merkur", url: 'https://mercuryretrogradeapi.com/' },
        color: 0x5C699F,
        thumbnail: { url: 'https://i.imgur.com/xMQ7wj0.png' },
        footer: getFooter(message)
    }

    var naslov;

    try {
        const html = await axios.get('https://mercuryretrogradeapi.com/');
        var retrogradni = html.data.is_retrograde;

        switch(retrogradni) {
            case true: retrogradni = ":green_square: Jeste"; break;
            case false: retrogradni = ":red_square: Nije"; break;
        }
        naslov = retrogradni;

    } catch(err) {
        console.log(err);
        naslov = errNaslov;
        finalJson.description = errSadrzaj;
    }

    finalJson.title = naslov;

    await message.channel.createMessage({
        messageReference: getMessageReference(message),
        embed: finalJson
    });
}).addSubcommand(new Command(['help', 'pomoc', '?'], async (message, args, context) => {
    await message.channel.createMessage({
        messageReference: getMessageReference(message),
        embed: {
            author: { name: "Retrogradni Merkur", url: 'https://mercuryretrogradeapi.com/' },
            color: 0x5C699F,
            thumbnail: { url: 'https://i.imgur.com/xMQ7wj0.png' },
            footer: getFooter(message),
            url: 'https://mercuryretrogradeapi.com/',
            title: ':book: Pomoć',
            description: "__***Opis:***__\n• Prikazuje da li je Merkur trenutno u retrogradi.\n\n__***Sva imena komande:***__\n• **retrogradni**\n• **merkur**\n• **rm**\n\n__***Korišćenje:***__\n• **retrogradni** - prikazuje da li je Merkur trenutno u retrogradi"
        }
    })
}));

module.exports = merkur;