const axios= require("axios");
const { Command } = require("yuuko");
const { getFooter, errNaslov, errSadrzaj, getMessageReference } = require("../../lib/tools");

const trivia = new Command(['trivia', 'question'], async (message, args, context) => {
    var finalJson = {
        author: { name: "Trivia", url: "http://jservice.io/" },
        url: "http://jservice.io/",
        thumbnail: { url: 'https://i.imgur.com/8UYfsF0.png' },
        color: 0xEF862A,
        footer: getFooter(message)
    }

    var naslov; var sadrzaj;

    try {
        const triviaJson = (await axios.get('https://jservice.io/api/random')).data[0];
        console.log(triviaJson)

        naslov = "Trivia Question";
        sadrzaj = `**Pitanje:**\n${triviaJson.question}`;

        //TODO ADD EMOJIS
        finalJson.fields = [
            {
                name: "Odgovor",
                value: `||${triviaJson.answer}||`,
                inline: true
            },
            {
                name: "Value",
                value: triviaJson.value,
                inline: true
            },
            {
                name: "Kategorija",
                value: triviaJson.category.title,
                inline: true
            }
        ];

    } catch(err) {
        console.log(err);
        naslov = errNaslov,
        sadrzaj = errSadrzaj;
    }

    finalJson.title = naslov;
    finalJson.description = sadrzaj;

    await message.channel.createMessage({
        messageReference: getMessageReference(message),
        embed: finalJson
    });
});

module.exports = trivia;