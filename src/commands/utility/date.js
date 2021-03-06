const moment = require("moment");
const { getMessageReference, getFooter, errSadrzaj, errNaslov, timeZonePodesavanja } = require('../../lib/tools');
const { Command } = require("yuuko");

const datumFormati = ["DD/MM/YYYY", "DD.MM.YYYY."];

const date = new Command(['date', 'datediff', 'diff', 'datum'], async (message, args, context) => {

    var finalJson = {
        author: { name: "Datum" },
        color: 0x558ED5,
        thumbnail: { url: 'https://i.imgur.com/XyRHQz4.png' },
        footer: getFooter(message)
    }

    try {

        //args - prvi datum
        var prvi = moment(args[0], datumFormati);
        if(!prvi.isValid()) { prvi = moment(new Date()); } //ako nije validan uzmi danas

        //args - drugi datum
        var drugi = moment(args[1], datumFormati);
        if(!drugi.isValid()) { drugi = moment(new Date()); } //ako nije validan uzmi danas

        var razlika = Math.abs(prvi.diff(drugi, "days")); //koliko se razlikuju dani

        //neka drugi bude uvek veci
        if(prvi.isAfter(drugi)) { [prvi, drugi] = [drugi, prvi]; }

        finalJson.title = `Razlikuju se za ${razlika} dan/a`;
        finalJson.description = `**${prvi.toDate().toLocaleDateString('sr-RS', timeZonePodesavanja)}** :arrow_right: **${drugi.toDate().toLocaleDateString('sr-RS', timeZonePodesavanja)}**`;

    } catch(err) {
        //ne verujem da ce ovo da se desi nekad, mozda ako parsuje date, ali ne verujem
        console.log(err);
        finalJson.title = errNaslov;
        finalJson.description = errSadrzaj;
    }

    await message.channel.createMessage({
        messageReference: getMessageReference(message),
        embed: finalJson
    });
}).addSubcommand(new Command(['help', 'pomoc', '?', 'info'], async (message, args, context) => {
    await message.channel.createMessage({
        messageReference: getMessageReference(message),
        embed: {
            author: { name: "Datum" },
            color: 0x558ED5,
            thumbnail: { url: 'https://i.imgur.com/XyRHQz4.png' },
            footer: getFooter(message),
            title: ':book: Pomo??',
            description: "__***Opis:***__\n??? Prikazuje razliku izme??u dva datuma u danima.\n??? Unos mo??e biti jedan ili dva datuma.\n??? Koji god datum da izostavimo ra??una se kao danas.\n\n__***Sva imena komande:***__\n??? **datum**\n??? **date**\n??? **diff**\n??? **datediff**\n\n__***Kori????enje:***__\n??? **date** - prikazuje razliku izme??u danas i danas u danima\n??? **date __<DATUM>__** - prikazuje razliku izme??u danas i __DATUM-a__ u danima\n??? **date __<DATUM1>__ __<DATUM2>__** - prikazuje razliku izme??u __DATUM1-a__ i __DATUM2-a__ u danima\n\n__***Dodatno:***__\n??? Formati datuma: __DD/MM/YYYY__, __DD.MM.YYYY.__"
        }
    });
}));

module.exports = date;