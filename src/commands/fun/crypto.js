const { Command } = require("yuuko");
const axios = require('axios');
const { errNaslov, errSadrzaj, getFooter, getMessageReference } = require('../../lib/tools');
const encodeUrl = require('encodeurl');

const firstLineOutput = `${"Rank".padEnd(6, ' ')} ${"Simbol".padEnd(8, ' ')} ${"Ime".padEnd(20, ' ')} ${"$".padEnd(8, ' ')}`;

const coin2string = (coin) => {
    var finalString = '';

    var rank = coin.rank;
    if(rank) { finalString += `${rank.padEnd(6, ' ')} `; } else { finalString += `${'-'.repeat(6)} `; }

    var symbol = coin.symbol;
    if(symbol) { finalString += `${symbol.padEnd(8, ' ')} `; } else { finalString += `${'-'.repeat(8)} `; }

    var ime = coin.name;
    if(ime) {
        if(ime.length > 20) { ime = ime.substring(0, 17) + "..."; }
        finalString += `${ime.padEnd(20, ' ')} `;
    } else {
        finalString += `${'-'.repeat(20)} `;
    }

    var cena = coin.priceUsd;
    if(cena) { finalString += `${cena.substring(0, 8)} `; } else { finalString += `${'-'.repeat(8)} `; }

    return finalString;
}

const cryptoSearch = new Command(['search', 'pretrazi', 'pretraga'], async (message, args, context) => {

    var naslov; var sadrzaj;
    var finalJson = {
        author: { name: "CoinCap", url: 'https://coincap.io/' },
        color: 0x65C196,
        thumbnail: { url: 'https://i.imgur.com/B3l0Ysz.png' },
        footer: getFooter(message)
    }


    var word = args.join(' ');

    //rec nije uneta
    if(word == '') {

        finalJson.title = ":mag_right: Prazno";
        finalJson.description = ":warning: Termin nije unet";

        await message.channel.createMessage({
            messageReference: getMessageReference(message),
            embed: finalJson
        });
        return;
    }

    var naslov; var sadrzaj;

    //imamo rec
    try {

        var originalWord = word;
        if(originalWord.length > 32) { originalWord = originalWord.substring(0, 32); }
        word = encodeUrl(word);

        const cryptoJson = (await axios(`https://api.coincap.io/v2/assets?search=${word}`)).data;

        //imamo podatke
        if(cryptoJson.data) {

            var len = cryptoJson.data.length;

            //nadjeno
            if(len > 0) {
                var output = `${firstLineOutput}\n`;

                var coinJson; var tempString;
                for(let i = 0; i < len; i++) {
                    if(i > 50) { break; }
                    coinJson = cryptoJson.data[i];
                    tempString = coin2string(coinJson);
                    output += `${tempString}\n`;
                }
                naslov = `:mag_right: ${len} rezultat/a za "${originalWord}"`;
                sadrzaj = `\`\`\`${output}\`\`\``;

            } else { //nije nadjeno
                naslov = ':mag_right: Nije pronađeno!';
                sadrzaj = ':frowning2: Termin nažalost nije pronađen.';
            }



        } else {
            //nemamo podatke
            naslov = ":warning: API Greška :warning:";
            sadrzaj = "API je vratio nešto nevalidno!";
        }

    } catch(err) {
        console.log(err);

        if(err.response && err.response.status == 429) {
            naslov = ":warning: API Limit (probajte ponovo) :warning:";
        } else {
            naslov = errNaslov;
        }

        sadrzaj = errSadrzaj;
    }

    finalJson.title = naslov;
    finalJson.description = sadrzaj;

    await message.channel.createMessage({
        messageReference: getMessageReference(message),
        embed: finalJson
    });

});


const crypto = new Command(['crypto', 'kripto'], async (message, args, context) => {

    var naslov; var sadrzaj;
    var finalJson = {
        author: { name: "CoinCap", url: 'https://coincap.io/' },
        color: 0x65C196,
        thumbnail: { url: 'https://i.imgur.com/B3l0Ysz.png' },
        footer: getFooter(message)
    }

    try {
        const cryptoJson = (await axios('https://api.coincap.io/v2/assets')).data;

        //imamo podatke
        if(cryptoJson.data && cryptoJson.data.length > 0) {

            var output = `${firstLineOutput}\n`;

            var coinJson; var tempString;
            for(let i = 0; i < cryptoJson.data.length; i++) {
                if(i > 50) { break; }
                coinJson = cryptoJson.data[i];
                tempString = coin2string(coinJson);
                output += `${tempString}\n`;
            }

            sadrzaj = `\`\`\`${output}\`\`\``;

        } else {
            //nemamo podatke
            naslov = ":warning: API Greška :warning:";
            sadrzaj = "API je vratio nešto nevalidno!";
        }

    } catch(err) {
        console.log(err);

        if(err.response && err.response.status == 429) {
            naslov = ":warning: API Limit (probajte ponovo) :warning:";
        } else {
            naslov = errNaslov;
        }

        sadrzaj = errSadrzaj;
    }

    finalJson.title = naslov;
    finalJson.description = sadrzaj;

    await message.channel.createMessage({
        messageReference: getMessageReference(message),
        embed: finalJson
    });


}).addSubcommand(cryptoSearch);

module.exports = crypto;