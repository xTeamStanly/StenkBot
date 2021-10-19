const { Command } = require('yuuko');
const axios = require('axios');
const { getFooter, getMessageReference, errNaslov, errSadrzaj } = require("../../lib/tools");

const { filledBar } = require('string-progressbar')

const prevedi = (input) => {
    switch(input) {
        case 'education': return 'Edukacija';
        case 'recreational': return 'Rekreacija';
        case 'social': return 'Društvo';
        case 'diy': return 'Uradi sam';
        case 'charity': return 'Dobročinstvo';
        case 'cooking': return 'Kulinarstvo';
        case 'relaxation': return 'Relaksacija';
        case 'music': return 'Muzika';
        case 'busywork': return 'Okupacija';
    }

    return 'Zanimacija';
};

const bored = new Command(['bored', 'dosada', 'dosadno'], async (message, args, context) => {
    var finalJson = {
        author: { name: 'Bored', url: 'https://www.boredapi.com/' },
        thumbnail: { url: 'https://i.imgur.com/krYlg16.png' },
        color: 0x79A3FD,
        footer: getFooter(message)
    }

    var naslov; var sadrzaj;

    try {
        const boredJson = (await axios.get('http://www.boredapi.com/api/activity/')).data;

        naslov = boredJson.activity;
        const link = boredJson.link; if(link) { finalJson.url = link; }

        finalJson.fields = [
            {
                name: ':busts_in_silhouette: Broj ljudi',
                value: boredJson.participants,
                inline: true
            },{
                name: ':bookmark: Tip',
                value: prevedi(boredJson.type),
                inline: true
            }
        ];

        var accessibility = boredJson.accessibility;
        if(typeof(accessibility) == 'number') {
            finalJson.fields.push({
                name: ":signal_strength: Pristupačnost",
                value: filledBar(1, 1 - accessibility, 20)[0],
                inline: false
            });
        }

        var price = boredJson.price;
        if(typeof(price) == 'number') {
            finalJson.fields.push({
                name: ":moneybag: Cena",
                value: filledBar(1, price, 20)[0],
                inline: false
            });
        }

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
}).addSubcommand(new Command(['help', 'pomoc', '?', 'info'], async (message, args, context) => {
    await message.channel.createMessage({
        messageReference: getMessageReference(message),
        embed: {
            author: { name: 'Bored', url: 'https://www.boredapi.com/' },
            url: "https://www.boredapi.com/",
            color: 0x79A3FD,
            thumbnail: { url: 'https://i.imgur.com/krYlg16.png' },
            footer: getFooter(message),
            title: ':book: Pomoć',
            description: "__***Opis:***__\n• Prikazuje nasumičnu aktivnost na engleskom.\n\n__***Sva imena komande:***__\n• **bored**\n• **dosada**\n• **dosadno**\n\n__***Korišćenje:***__\n• **bored** - prikazuje nasumičnu aktivnost"
        }
    });
}));

module.exports = bored;