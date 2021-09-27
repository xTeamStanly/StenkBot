const { Command } = require("yuuko");
const { randomList, getMessageReference, getFooter, randomBetweenIncluding } = require("../../../lib/tools");
const data = require('../../../resources/commands/fun/generators/socFirma');

const socFirma = new Command(['firma', 'socfirma', 'socijalistickafirma', 'firmasoc'], async (message, args, context) => {
    await message.channel.createMessage({
        messageReference: getMessageReference(message),
        embed: {
            author: { name: "Socijalistička firma" },
            title: `:tools: ${randomList(data.prvideo)}${randomList(data.drugideo)} :tools:`,
            color: 0x940404,
            thumbnail: { url: data.image },
            fields: [
                {
                    name: ":cityscape: Grad",
                    value: randomList(data.gradovi),
                    inline: true
                },
                {
                    name: ":moneybag: Plata",
                    value: `${randomBetweenIncluding(350, 700) * 100} dinara`, //opseg od 35000 do 70000
                    inline: true
                },
                {
                    name: ":toolbox: Broj zaposlenih",
                    value: Math.trunc(randomBetweenIncluding(1, 5000) / 10) * 10, //opseg od 10 - 50000
                    inline: true
                },
                {
                    name: ":medical_symbol: Osiguranje",
                    value: (Math.random() > 0.5) ? "Da" : "Ne",
                    inline: true
                },
                {
                    name: ":clock1: Produženo radno vreme",
                    value: (Math.random() > 0.5) ? "Da" : "Ne",
                    inline: true
                },
                {
                    name: ":crescent_moon: Treća smena",
                    value: (Math.random() > 0.5) ? "Da" : "Ne",
                    inline: true
                }
            ],
            footer: getFooter(message)
        }
    });
});

module.exports = socFirma;
