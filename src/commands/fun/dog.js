const { Command } = require("yuuko");
const axios = require('axios');
const { getMessageReference, getFooter, errNaslov, errSadrzaj } = require("../../lib/tools");

const dog = new Command(['pas', 'dog'], async (message, args, context) => {
    var finalJson = {
        author: { name: "Nasumičan pas", url: 'https://dog.ceo/dog-api/' },
        url: 'https://dog.ceo/dog-api/',
        color: 0xA66851,
        thumbnail: { url: 'https://i.imgur.com/SpZNBqk.png' },
        footer: getFooter(message)
    }

    var naslov; var sadrzaj;

    try {
        const jsonDog = (await axios.get('https://dog.ceo/api/breeds/image/random')).data;
        if(jsonDog["status"] != "success") { throw "Website response failed!"; }
        finalJson.image = { url: jsonDog["message"] };
        naslov = "Pas";
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
}).addSubcommand(new Command(['help', 'pomoc', '?'], async (message, args, context) => {
    await message.channel.createMessage({
        messageReference: getMessageReference(message),
        embed: {
            author: { name: "Nasumičan pas", url: 'https://dog.ceo/dog-api/' },
            url: 'https://dog.ceo/dog-api/',
            color: 0xA66851,
            thumbnail: { url: 'https://i.imgur.com/SpZNBqk.png' },
            footer: getFooter(message),
            title: ':book: Pomoć',
            description: "__***Opis:***__\n• Prikazuje nasumičnu sliku psa.\n\n__***Sva imena komande:***__\n• **pas**\n• **dog**\n\n__***Korišćenje:***__\n• **pas** - prikazuje nasumičnu sliku psa"
        }
    })
}));

module.exports = dog;