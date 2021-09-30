const moment = require("moment");
const { getMessageReference, getFooter, errSadrzaj, errNaslov } = require('../../lib/tools');
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
        if(prvi > drugi) { [prvi, drugi] = [drugi, prvi]; }

        finalJson.title = `Razlikuju se za ${razlika} dan/a`;
        finalJson.description = `**${prvi.toDate().toLocaleDateString('sr')}** :arrow_right: **${drugi.toDate().toLocaleDateString('sr')}**`;

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
});

module.exports = date;