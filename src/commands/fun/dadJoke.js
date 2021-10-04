const { Command } = require("yuuko");
const axios = require("axios");
const { getFooter, errNaslov, errSadrzaj, getMessageReference } = require("../../lib/tools");

const dadJoke = new Command(['dadjoke', 'dad'], async (message, args, context) => {
    var finalJson = {
        author: { name: "Dad Joke", url: 'https://icanhazdadjoke.com/' },
        color: 0xFBDE5A,
        thumbnail: { url: 'https://i.imgur.com/oqjSr13.png' },
        footer: getFooter(message)
    }

    try {
        const jokeJson = (await axios.get('https://icanhazdadjoke.com/', {
            headers: {
                'User-Agent': 'DadJoke API Client',
                'Accept': 'application/json'
            }
        })).data;

        finalJson.title = jokeJson.joke;
        finalJson.url = `https://icanhazdadjoke.com/j/${jokeJson.id}`;

    } catch(err) {
        console.log(err);
        finalJson.title = errNaslov;
        finalJson.description = errSadrzaj;
        finalJson.url = 'https://icanhazdadjoke.com/';
    }

    await message.channel.createMessage({
        messageReference: getMessageReference(message),
        embed: finalJson
    });
});

module.exports = dadJoke;