const { Command } = require('yuuko');
const axios = require('axios');
const cheerio = require('cheerio');
const { errNaslov, errSadrzaj, getMessageReference, getFooter, emptyEmbedField } = require('../../lib/tools');

const covid19 = new Command(['covid', 'covid19', 'koronka', 'kovid', 'kovid19'], async (message, args, context) => {
    var finalJson = {
        author: { name: "Covid-19 Informacije", url: "https://www.covid19.rs" },
        color: 0xE74C3C,
        url: "https://www.covid19.rs",
        thumbnail: { url: "https://i.imgur.com/zbNq0N2.png" },
        footer: getFooter(message)
    };

    var naslov;
    var sadrzaj;

    try {
        //malo je tezi sajt pa mu treba neko vreme da otvori
        const html = await axios.get('https://covid19.rs/');
        const $ = cheerio.load(html.data);

        var covidData = [];
        $('p.elementor-heading-title').each((i, node) => {
            covidData.push($(node).text().replace('\u202C', "").replace(/,/g, ""));
        });

        const ukupanBroj = covidData[2];
        naslov = `Ukupan broj: ${ukupanBroj}`;
        sadrzaj = `Ažurirano: ${covidData[1].substring(10, 21)}`;

        finalJson.fields = [
            {
                name: "Ukupan broj",
                value: `__**${ukupanBroj}**__`,
                inline: true
            },
            {
                name: "Novozaraženi (24h)",
                value: `__**${covidData[12]}**__`,
                inline: true
            },
            emptyEmbedField(),
            {
                name: "Testirani",
                value: covidData[8],
                inline: true,
            },
            {
                name: "Testirani (24h)",
                value: covidData[10],
                inline: true,
            },
            emptyEmbedField(),
            {
                name: "Preminuli",
                value: covidData[4],
                inline: true,
            },
            {
                name: "Preminuli (24h)",
                value: covidData[14],
                inline: true,
            },
            {
                name: "Procenat smrtnosti",
                value: covidData[6],
                inline: true,
            },
            {
                name: "Hospitalizovani",
                value: covidData[16],
                inline: true,
            },
            {
                name: "Na respiratorima",
                value: covidData[18],
                inline: true,
            },
            emptyEmbedField()
        ];
    } catch(err) {
        naslov = errNaslov;
        sadrzaj = errSadrzaj;
    }

    finalJson.title = naslov;
    finalJson.description = sadrzaj;

    await message.channel.createMessage({messageReference: getMessageReference(message), embed: finalJson})
}).addSubcommand(new Command(['help', 'pomoc', '?', 'info'], async (message, args, context) => {
    await message.channel.createMessage({
        messageReference: getMessageReference(message),
        embed: {
            author: { name: "Covid-19 Informacije", url: "https://www.covid19.rs" },
            color: 0xE74C3C,
            url: "https://www.covid19.rs",
            thumbnail: { url: "https://i.imgur.com/zbNq0N2.png" },
            footer: getFooter(message),
            title: ':book: Pomoć',
            description: "__***Opis:***__\n• Prikazuje Covid19 statistiku.\n\n__***Sva imena komande:***__\n• **covid**\n• **kovid**\n• **covid19**\n• **kovid19**\n• **koronka**\n\n__***Korišćenje:***__\n• **covid** - prikazuje Covid19 statistiku"
        }
    });
}));

module.exports = covid19;