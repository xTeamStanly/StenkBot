const moment = require("moment");
const { getMessageReference, getFooter, errSadrzaj, errNaslov } = require('../../lib/tools');
const { Command } = require("yuuko");
const { filledBar } = require('string-progressbar');
const { getSign, getZodiac } = require('horoscope');

const datumFormati = ["DD/MM/YYYY", "DD.MM.YYYY."];
const datumGranica = moment('1/1/1921', datumFormati);

const getDateName = (weekday) => {
    switch(weekday) {
        case 1: return 'Ponedeljak';
        case 2: return 'Utorak';
        case 3: return 'Sreda';
        case 4: return 'Četvrtak';
        case 5: return 'Petak';
        case 6: return 'Subota';
        case 7: return 'Nedelja';
    }
}

const getDateNameZeroBased = (weekday) => {
    switch(weekday) {
        case 1: return 'Ponedeljak';
        case 2: return 'Utorak';
        case 3: return 'Sreda';
        case 4: return 'Četvrtak';
        case 5: return 'Petak';
        case 6: return 'Subota';
        case 0: return 'Nedelja';
    }
}

const horoscopeTranslation = new Map([
    ['Aries', { ime: "Ovan", simbol: ':aries:', element: ':fire: Vatra' }],
    ['Taurus', { ime: "Bik", simbol: ':taurus:', element: ':earth_africa: Zemlja' }],
    ['Gemini', { ime: "Blizanci", simbol: ':gemini:', element: ':wind_blowing_face: Vazduh' }],
    ['Cancer', { ime: "Rak", simbol: ':cancer:', element: ':droplet: Voda' }],
    ['Leo', { ime: "Lav", simbol: ':leo:', element: ':fire: Vatra' }],
    ['Virgo', { ime: "Devica", simbol: ':virgo:', element: ':earth_africa: Zemlja' }],
    ['Libra', { ime: "Vaga", simbol: ':libra:', element: ':wind_blowing_face: Vazduh' }],
    ['Scorpio', { ime: "Škorpija", simbol: ':scorpius:', element: ':droplet: Voda' }],
    ['Sagittarius', { ime: "Strelac", simbol: ':sagittarius:', element: ':fire: Vatra' }],
    ['Capricorn', { ime: "Jarac", simbol: ':capricorn:', element: ':earth_africa: Zemlja' }],
    ['Aquarius', { ime: "Vodolija", simbol: ':aquarius:', element: ':wind_blowing_face: Vazduh' }],
    ['Pisces', { ime: "Ribe", simbol: ':pisces:', element: ':droplet: Voda' }]
]);

const zodiacTranslation = new Map([
    ['Monkey', ':monkey_face: Majmun'],
    ['Rooster', ':rooster: Petao'],
    ['Dog', ':dog: Pas'],
    ['Pig', ':pig: Svinja'],
    ['Rat', ':rat: Pacov'],
    ['Ox', ':ox: Goveče'],
    ['Tiger', ':tiger: Tigar'],
    ['Rabbit', ':rabbit: Zec'],
    ['Dragon', ':dragon: Zmaj'],
    ['Snake', ':snake: Zmija'],
    ['Horse', ':horse: Konj'],
    ['Goat', ':goat: Koza']
]);

const calculateWeekday = (datum) => {
    var x = Intl.DateTimeFormat('sr-Latn-RS', { weekday: 'long' }).format(datum.toDate());
    return x.charAt(0).toUpperCase() + x.slice(1);
}

const day = new Command(['day', 'dan'], async (message, args, context) => {

    var finalJson = {
        author: { name: "Dan" },
        color: 0x558ED5,
        thumbnail: { url: 'https://i.imgur.com/XyRHQz4.png' },
        footer: getFooter(message)
    }

    try {
new Date()
        //args - datum
        var datum = moment(args[0], datumFormati);
        if(!datum.isValid()) { datum = moment(new Date()); } //ako nije validan uzmi danas

        const prestupnaGodina = datum.isLeapYear();
        const brojDanaUGodini = (prestupnaGodina) ? 366 : 365;
        const trenutniDanUGodini = datum.dayOfYear();

        const danMesecGodina = [datum.date(), datum.month() + 1, datum.year()];

        const horoskopskiZnak = horoscopeTranslation.get(getSign({ month: danMesecGodina[1], day: danMesecGodina[0] }));
        const zodiacZnak = zodiacTranslation.get(getZodiac(danMesecGodina[2]));

        var weekday = (datum.isBefore(datumGranica)) ? 'Davno...' : calculateWeekday(datum);

        finalJson.title = `${datum.toDate().toLocaleDateString('sr')} (${(100 * trenutniDanUGodini/brojDanaUGodini).toFixed(2)}%) :arrow_right: ${datum.endOf('year').toDate().toLocaleDateString('sr')}`;
        finalJson.description = filledBar(brojDanaUGodini, trenutniDanUGodini, brojDanaUGodini)[0];
        finalJson.fields = [
            {
                name: ":hash: Dan",
                value: weekday,
                inline: true
            },
            {
                name: ":abacus: Do kraja godine",
                value: brojDanaUGodini - trenutniDanUGodini,
                inline: true
            },
            {
                name: ":calendar: Prestupna godina",
                value: (prestupnaGodina) ? "Da" : "Ne",
                inline: true
            },
            {
                name: ':star: Horoskopski znak',
                value: `${horoskopskiZnak.simbol} ${horoskopskiZnak.ime}`,
                inline: true
            },
            {
                name: ':star: Horoskopski Element',
                value: `${horoskopskiZnak.element}`,
                inline: true
            },
            {
                name: ':star: Kineski horoskop',
                value: zodiacZnak,
                inline: true
            }
        ];
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
            author: { name: "Dan" },
            color: 0x558ED5,
            thumbnail: { url: 'https://i.imgur.com/XyRHQz4.png' },
            footer: getFooter(message),
            title: ':book: Pomoć',
            description: "__***Opis:***__\n• Vizuelno prikazuje koliko još dana je ostalo do kraja godine.\n• Unos može biti prazan ili neki datum.\n• Ako je unos prazan, datum se računa se kao danas.\n\n__***Sva imena komande:***__\n• **day**\n• **dan**\n\n__***Korišćenje:***__\n• **dan** - vizuelno prikazuje koliko još dana je ostalo do kraja godine od danas\n• **dan __<DATUM>__** - vizuelno prikazuje koliko još dana je ostalo do kraja godine (posmatra se godina unesenog __DATUM-a__) od __DATUM-a__\n\n__***Dodatno:***__\n• Formati datuma: __DD/MM/YYYY__, __DD.MM.YYYY.__\n• Datumi stariji od 1/1/1921 se tretiraju kao stari datumi i za njih se ne prikazuje dan u nedelji"
        }
    });
}));

module.exports = day;