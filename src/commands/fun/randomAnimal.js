const { Command } = require("yuuko");
const axios = require('axios');
const { getMessageReference, getFooter, errNaslov, errSadrzaj } = require("../../lib/tools");

const randomDog = new Command(['pas', 'dog'], async (message, args, context) => {
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
});

const randomFox = new Command(['lisica', 'fox'], async (message, args, context) => {
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

const randomCat = new Command(['macka', 'cat'], async (message, args, context) => {
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

const randomAnimal = new Command(['randomanimal', 'randanimal', 'animal'], async (message, args, context) => {
    await message.channel.createMessage({
        messageReference: getMessageReference(message),
        embed: {
            author: { name: "Nasumična životinja" },
            color: 0x5AC622,
            thumbnail: { url: 'https://i.imgur.com/hsxhGTP.png' },
            title: `Unesite vrstu životinje`,
            description: "**Vrste životinja:**\n" +
            "**• pas | dog**\n" +
            "**• macka | cat**\n" +
            "**• lisica | fox**",
            footer: getFooter(message)
        }
    });
}).addSubcommand(randomDog).addSubcommand(randomFox).addSubcommand(randomCat);

module.exports = randomAnimal;