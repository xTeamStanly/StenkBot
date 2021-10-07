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
}).addSubcommand(kursnaDinar).addSubcommand(kursnaDolar).addSubcommand(kurnaEuro);

module.exports = kursnaLista;