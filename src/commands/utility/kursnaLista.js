const { Command } = require('yuuko');
const { randomList, getFooter, getMessageReference, errNaslov, errSadrzaj } = require('../../lib/tools');
const data = require('../../resources/commands/utility/kursnaLista');
const axios = require('axios');

const kursna2string = (json) => {
    var valuta = Object.keys(json)[1];
    var lista = json[valuta];
    var output = '';

    var trenutnaValuta;
    for(let i = 0; i < data.currencies.length; i++) {
        trenutnaValuta = data.currencies[i];
        if(trenutnaValuta == valuta) { continue; }
        output += `${data.flags[trenutnaValuta]} - ${lista[trenutnaValuta]}\n`;
    }

    return output;
}

const kursnaDinar = new Command(['rsd', 'dinar', 'din'], async (message, args, context) => {
    var naslov; var sadrzaj;

    try {
        const currencyJson = (await axios.get('https://cdn.jsdelivr.net/gh/fawazahmed0/currency-api@1/latest/currencies/rsd.json')).data;

        if(currencyJson.date) { //validan response
            naslov = "1 Dinar = ...";
            sadrzaj = kursna2string(currencyJson);

        } else {
            naslov = ":warning: API Greška :warning:";
            sadrzaj = "API je vratio nešto nevalidno!";
        }
    } catch(err) {
        console.log(err);
        naslov = errNaslov;
        sadrzaj = errSadrzaj;
    }

    await message.channel.createMessage({
        messageReference: getMessageReference(message),
        embed: {
            title: naslov,
            description: sadrzaj,
            author: { name: "Kursna Lista", url: 'https://github.com/fawazahmed0/currency-api' },
            color: 0x85BB65,
            thumbnail: { url: 'https://i.imgur.com/Jvw1Dtq.png' },
            footer: getFooter(message)
        }
    });
});

const kurnaEuro = new Command(['euro', 'evro', 'eur'], async (message, args, context) => {

    var naslov; var sadrzaj;

    try {
        const currencyJson = (await axios.get('https://cdn.jsdelivr.net/gh/fawazahmed0/currency-api@1/latest/currencies/eur.json')).data;

        if(currencyJson.date) { //validan response
            naslov = "1 Evro = ...";
            sadrzaj = kursna2string(currencyJson);

        } else {
            naslov = ":warning: API Greška :warning:";
            sadrzaj = "API je vratio nešto nevalidno!";
        }
    } catch(err) {
        console.log(err);
        naslov = errNaslov;
        sadrzaj = errSadrzaj;
    }

    await message.channel.createMessage({
        messageReference: getMessageReference(message),
        embed: {
            title: naslov,
            description: sadrzaj,
            author: { name: "Kursna Lista", url: 'https://github.com/fawazahmed0/currency-api' },
            color: 0x85BB65,
            thumbnail: { url: 'https://i.imgur.com/Jvw1Dtq.png' },
            footer: getFooter(message)
        }
    });
});

const kursnaDolar = new Command(['dollar', 'dolar', 'usd'], async (message, args, context) => {
    var naslov; var sadrzaj;

    try {
        const currencyJson = (await axios.get('https://cdn.jsdelivr.net/gh/fawazahmed0/currency-api@1/latest/currencies/usd.json')).data;

        if(currencyJson.date) { //validan response
            naslov = "1 Dolar = ...";
            sadrzaj = kursna2string(currencyJson);

        } else {
            naslov = ":warning: API Greška :warning:";
            sadrzaj = "API je vratio nešto nevalidno!";
        }
    } catch(err) {
        console.log(err);
        naslov = errNaslov;
        sadrzaj = errSadrzaj;
    }

    await message.channel.createMessage({
        messageReference: getMessageReference(message),
        embed: {
            title: naslov,
            description: sadrzaj,
            author: { name: "Kursna Lista", url: 'https://github.com/fawazahmed0/currency-api' },
            color: 0x85BB65,
            thumbnail: { url: 'https://i.imgur.com/Jvw1Dtq.png' },
            footer: getFooter(message)
        }
    });
});

const kursnaLista = new Command(['kursna', 'kursnalista'], async (message, args, context) => {
    var naslov; var sadrzaj;

    try {
        const currencyJson = (await axios.get('https://cdn.jsdelivr.net/gh/fawazahmed0/currency-api@1/latest/currencies/eur.json')).data;

        if(currencyJson.date) { //validan response
            naslov = "1 Evro = ...";
            sadrzaj = kursna2string(currencyJson);

        } else {
            naslov = ":warning: API Greška :warning:";
            sadrzaj = "API je vratio nešto nevalidno!";
        }
    } catch(err) {
        console.log(err);
        naslov = errNaslov;
        sadrzaj = errSadrzaj;
    }

    await message.channel.createMessage({
        messageReference: getMessageReference(message),
        embed: {
            title: naslov,
            description: sadrzaj,
            author: { name: "Kursna Lista", url: 'https://github.com/fawazahmed0/currency-api' },
            color: 0x85BB65,
            thumbnail: { url: 'https://i.imgur.com/Jvw1Dtq.png' },
            footer: getFooter(message)
        }
    });
}).addSubcommand(kursnaDinar).addSubcommand(kursnaDolar).addSubcommand(kurnaEuro)
.addSubcommand(new Command(['help', 'pomoc', '?'], async (message, args, context) => {
    await message.channel.createMessage({
        messageReference: getMessageReference(message),
        embed: {
            author: { name: "Kursna Lista", url: 'https://github.com/fawazahmed0/currency-api' },
            color: 0x85BB65,
            thumbnail: { url: 'https://i.imgur.com/Jvw1Dtq.png' },
            footer: getFooter(message),
            title: ':book: Pomoć',
            description: "__***Opis:***__\n• Prikazuje trenutnu kursnu listu u odnosu na evro.\n\n__***Sva imena komande:***__\n• **kursna**\n• **kursnalista**\n\n__***Podkomande:***__\n• **rsd**, **dinar**, **din** - prikazuje kursnu listu u odnosu na dinar\n• **euro**, **evro**, **eur** - prikazuje kursnu listu u odnosu na evro\n• **dollar**, **dolar**, **usd** - prikazuje kursnu listu u odnosu na dolar\n\n__***Korišćenje:***__\n• **kursna** - prikazuje trenutnu kursnu listu u odnosu na evro\n• **kursna dinar** - prikazuje kursnu listu u odnosu na dinar\n• **kursna evro** - prikazuje kursnu listu u odnosu na evro\n• **kursna dolar** - prikazuje kursnu listu u odnosu na dolar\n\n***Dodatno:***__\n• Postoji API limit (ili sačekate ili probajte ponovo)"
        }
    });
}));

module.exports = kursnaLista;