const { Command } = require('yuuko');
const { randomList, randomBetweenIncluding, getTodaysDate } = require('../../lib/tools');
const data = require('../../resources/commands/fun/vicevi');

const axios = require('axios');
const cheerio = require('cheerio');

const validnaKaterogija = (kategorija) => {
    for(let i = 0; i < data.kategorije.length; i++) {
        if(data.kategorije[i].ime == kategorija) { return true; }
    }
    return false;
}

const nadjiKategoriju = (kategorija) => {
    for(let i = 0; i < data.kategorije.length; i++) {
        if(data.kategorije[i].ime == kategorija) { return data.kategorije[i].value; }
    }
}

const vicevi = new Command(['vic', 'vicevi'], async (message, args, context) => {
    const finalJson = {
        author: { name: 'Vic' },
        color: 0x0B263F,
        thumbnail: { url: data.image },
        footer: {
            text: `Zahtevao ${message.author.username} - ${getTodaysDate()}`,
            icon_url: message.author.avatarURL
        }
    };

    var link = 'https://www.vicevi.rs/';
    var naslov;
    var sadrzaj;

    try {

        //ako ne unesemo kategoriju, onda uzimamo vic dana
        var kategorija = args[0];
        console.log(args)

        //ako je kategorija null ili undefined, uzimamo vic dana
        if(typeof(kategorija) === 'undefined' || kategorija == null) {

            const html = await axios.get(link);
            const $ = cheerio.load(html.data);

            const article = $('article.single.page.daily');
            naslov = article.children('h2').text();
            sadrzaj = article.children('p').html().replace(/<br\s*[\/]?>/gi,"\n");
            console.log('UNDEFINED!!')

        } else { //kategorija nije nula, odnosno postoji

            //TODO ZNAK PITANJA, POMOC, KATEGORIJE POKAZUJU KATEGORIJE, ILI SVE SPOJI U HELP KOMADU

            const validna = validnaKaterogija(kategorija);
            console.log(validna);
            //ako kategorija nije validna --> odaberi nasumicnu

            //TODO PRIKAZIVANJE KATEGORIJA AKO UNESE POGRESNU
            if(!validna) { kategorija = randomList(data.kategorije).value; } else { kategorija = nadjiKategoriju(kategorija); }

            link += `vicevi/${kategorija}`;
            console.log(link)
            //ucitao sam pocetnu stranu kategorije
            var html = await axios.get(link);
            var $ = cheerio.load(html.data);

            //sada treba da vidim koliko stranica ima, da bi odabrao nasumicnu
            const maxBrojStrane = $('.pagination li:last').prev().text();
            const brojStrane = randomBetweenIncluding(1, maxBrojStrane);

            link += `/${brojStrane}`;

            //ucitavamo novu stranicu
            html = await axios.get(link);
            $ = cheerio.load(html.data);

            const viceviNaStrani = $("div.text:not(:has(div.best))");
            const brojVicevaNaStrani = viceviNaStrani.length;

            const brojVica = randomBetweenIncluding(0, brojVicevaNaStrani - 1);

            const vic = $(viceviNaStrani[brojVica]);
            naslov = vic.children('h2').text();
            sadrzaj = vic.children('p').html().replace(/<br\s*[\/]?>/gi,"\n");

            link = 'https://www.vicevi.rs' + vic.children('h2').children('a').prop('href');

            const ocena = vic.children('div.box').children('div.rating_box').children('div.star').attr('data-score');
            const brojGlasova = vic.children('div.box').children('div.rating_box').children('span.votes').text();

            finalJson.fields = [
                {
                    name: "Broj Glasova",
                    value: brojGlasova,
                    inline: true
                },
                {
                    name: "Ocena",
                    value: `${ocena}/5.00`,
                    inline: true
                }
            ];

            if(!validna) {
                finalJson.fields.push({
                    name: "Random kategorija:",
                    value: kategorija,
                    inline: true
                });
            }

        }
    } catch(err) {
        naslov = "Zovi gazdu";
        description = "Desila se greška!";
        console.log(err);
    }

    finalJson.title = naslov;
    finalJson.description = sadrzaj;
    finalJson.url = link;

    message.channel.createMessage({embed: finalJson})
});

module.exports = vicevi;