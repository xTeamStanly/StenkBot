const Zalgo = require('to-zalgo');
const Banish = require('to-zalgo/banish');
const { Command } = require('yuuko');
const { getMessageReference, getFooter } = require('../../../lib/tools');

//convertor, deconvertor

const zalgofy = (input) => {
    input = input.join(' ');
    if(input != '') {
        if(input.lenght > 500) { input = input.substring(0, 500); }
        return Zalgo(input);
    } else {
        return Zalgo('Unesite validan text');
    }
}

const dezalgofy = (input) => {
    input = input.join(' ');
    if(input != '') {
        if(input.lenght > 500) { input = input.substring(0, 500); }
        return Banish(input);
    } else {
        return Banish('Unesite validan text')
    }
}

const zalgoEncode = new Command(['encode', 'encoder'], async (message, args, context) => {
    var output = zalgofy(args);

    await message.channel.createMessage({
        messageReference: getMessageReference(message),
        embed: {
            author: { name: "Zalgo" },
            title: "Zalgo - Encode",
            description: `_*Rezultat:*_\n\n***${output}***`,
            color: 0xE3BD74,
            thumbnail: { url: 'https://i.imgur.com/kfB5KHl.png' },
            footer: getFooter(message)
        }
    });
});

const zalgoDecode = new Command(['decode', 'decoder'], async (message, args, context) => {
    var output = dezalgofy(args);

    await message.channel.createMessage({
        messageReference: getMessageReference(message),
        embed: {
            author: { name: "Zalgo" },
            title: "Zalgo - Decode",
            description: `_*Rezultat:*_\n***${output}***`,
            color: 0xE3BD74,
            thumbnail: { url: 'https://i.imgur.com/kfB5KHl.png' },
            footer: getFooter(message)
        }
    });
});


const zalgo = new Command('zalgo', async (message, args, context) => {
    var output = zalgofy(args);

    await message.channel.createMessage({
        messageReference: getMessageReference(message),
        embed: {
            author: { name: "Zalgo" },
            title: "Zalgo - Encode",
            description: `_*Rezultat:*_\n\n***${output}***`,
            color: 0xE3BD74,
            thumbnail: { url: 'https://i.imgur.com/kfB5KHl.png' },
            footer: getFooter(message)
        }
    });
}).addSubcommand(zalgoEncode).addSubcommand(zalgoDecode)
.addSubcommand(new Command(['help', 'pomoc', '?', 'info'], async (message, args, context) => {
    await message.channel.createMessage({
        messageReference: getMessageReference(message),
        embed: {
            author: { name: "Zalgo" },
            color: 0xE3BD74,
            thumbnail: { url: 'https://i.imgur.com/kfB5KHl.png' },
            footer: getFooter(message),
            title: ':book: Pomoć',
            description: "__***Opis:***__\n• Generiše zalgo tekst.\n\n__***Sva imena komande:***__\n• **zalgo**\n\n__***Podkomande:***__\n• **encode**, **encoder** - generiše zalgo tekst\n• **decode**, **decoder** - dekodira zalgo tekst\n\n__***Korišćenje:***__\n• **zalgo __<UNOS>__** - pretvara __UNOS__ u zalgo tekst\n• **zalgo encode __<UNOS>__** - pretvara __UNOS__ u zalgo tekst\n• **zalgo decode __<UNOS>__** - pretvara zalgo __UNOS__ u običan tekst"
        }
    });
}));

module.exports = zalgo;