const { randomList, getMessageReference, getFooter } = require("../../../lib/tools");
const data = require('../../../resources/commands/fun/generators/polumenta');
const { Command } = require("yuuko");

const rado = () => {
    var A;
    var B;
    var C;
    var D;
    var final = "";
    for(let i = 0; i < 5; i++) {
        A = randomList(data.A); A = A.charAt(0).toUpperCase() + A.slice(1);
        B = randomList(data.B);
        C = randomList(data.C);
        D = randomList(data.D);
        final += `- ${A}${B}${C}${D} Polumenta\n`;
    };
    return final;
};

const radodado = () => {
    var A;
    var B;
    var C;
    var D;
    var final = "";
    for(let i = 0; i < 5; i++) {
        A = randomList(data.A); A = A.charAt(0).toUpperCase() + A.slice(1);
        B = randomList(data.B);
        C = randomList(data.C);
        D = randomList(data.D);
        final += `- ${A}${B}${C}${D}${C}${B}${C}${D} Polumenta\n`;
    };
    return final;
};

const folotrolo = () => {
    var A;
    var B;
    var C;
    var D;
    var E;
    var final = "";
    for(let i = 0; i < 5; i++) {
        A = randomList(data.A); A = A.charAt(0).toUpperCase() + A.slice(1);
        B = randomList(data.B);
        C = randomList(data.C);
        D = randomList(data.D);
        E = randomList(data.E);
        final += `- ${A}${B}${C}${D}${E}${B}${C}${D} Polumenta\n`;
    };
    return final;
};

const polumentaRado = new Command('rado', async (message, args, context) => {
    await message.channel.createMessage({
        messageReference: getMessageReference(message),
        embed: {
            author: { name: "Polumenta - Rado" },
            title: "Dalje idu, dalje idu, dalje idu...",
            description: rado(),
            color: 0x804936,
            thumbnail: { url: data.image },
            footer: getFooter(message)
        }
    });
});

const polumentaRadoDado = new Command('radodado', async (message, args, context) => {
    await message.channel.createMessage({
        messageReference: getMessageReference(message),
        embed: {
            author: { name: "Polumenta - RadoDado" },
            title: "Dalje idu, dalje idu, dalje idu...",
            description: radodado(),
            color: 0x804936,
            thumbnail: { url: data.image },
            footer: getFooter(message)
        }
    });
});

const polumentaFoloTrolo = new Command('folotrolo', async (message, args, context) => {
    await message.channel.createMessage({
        messageReference: getMessageReference(message),
        embed: {
            author: { name: "Polumenta - FoloTrolo" },
            title: "Dalje idu, dalje idu, dalje idu...",
            description: folotrolo(),
            color: 0x804936,
            thumbnail: { url: data.image },
            footer: getFooter(message)
        }
    });
});

const polumenta = new Command(['polumenta', 'sako', 'dado'], async (message, args, context) => {
    await message.channel.createMessage({
        messageReference: getMessageReference(message),
        embed: {
            author: { name: "Polumenta - Rado" },
            title: "Dalje idu, dalje idu, dalje idu...",
            description: rado(),
            color: 0x804936,
            thumbnail: { url: data.image },
            footer: getFooter(message)
        }
    });
}).addSubcommand(polumentaRado).addSubcommand(polumentaRadoDado).addSubcommand(polumentaFoloTrolo);

module.exports = polumenta;