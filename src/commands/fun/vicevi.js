const { Command } = require('yuuko');
const { randomList, randomBetweenIncluding, getFooter, getMessageReference, errNaslov, errSadrzaj } = require('../../lib/tools');
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
        author: { name: 'Vicevi', url: 'https://www.vicevi.rs' },
        color: 0x0B263F,
        thumbnail: { url: data.image },
        footer: getFooter(message)
    };

    var link = 'https://www.vicevi.rs/';
    var naslov;
    var sadrzaj;

    try {

        //ako ne unesemo kategoriju, onda uzimamo vic dana
        var kategorija = args[0];
        if(kategorija != null) { kategorija.toLowerCase(); }

        //ako je kategorija null ili undefined, uzimamo vic dana
        if(typeof(kategorija) === 'undefined' || kategorija == null) {

            const html = await axios.get(link);
            const $ = cheerio.load(html.data);

            const article = $('article.single.page.daily');
            naslov = article.children('h2').text();
            sadrzaj = article.children('p').html().replace(/<br\s*[\/]?>/gi,"\n");

        } else { //kategorija nije nula, odnosno postoji

            //prikazi kategorije ako korisnik zahteva
            const kategorijaLowerCase = kategorija.toLowerCase();
            if(['kategorije', 'kategorija', 'kat', 'pomoc', '?'].includes(kategorijaLowerCase)) {
                await message.channel.createMessage({
                    messageReference: getMessageReference(message),
                    embed: {
                        author: { name: 'Vicevi', url: 'https://www.vicevi.rs' },
                        color: 0x0B263F,
                        thumbnail: { url: data.image },
                        footer: getFooter(message),
                        url: 'https://www.vicevi.rs/',
                        title: "Kategorije viceva",
                        description: data.kategorijeLista
                    }
                });
                return;
            }

            const validna = validnaKaterogija(kategorija);

            //ako kategorija nije validna --> odaberi nasumicnu
            if(!validna) { kategorija = randomList(data.kategorije).value; } else { kategorija = nadjiKategoriju(kategorija); }

            link += `vicevi/${kategorija}`;
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
                    name: ":mega: Broj Glasova",
                    value: brojGlasova,
                    inline: true
                },
                {
                    name: ":pencil: Ocena",
                    value: `${ocena}/5.00`,
                    inline: true
                }
            ];

            if(!validna) {
                finalJson.fields.push({
                    name: ":orange_book: Random kategorija",
                    value: kategorija,
                    inline: true
                });
            }
        }
    } catch(err) {
        naslov = errNaslov;
        description = errSadrzaj;
        console.log(err);
    }

    finalJson.title = naslov;
    finalJson.description = sadrzaj;
    finalJson.url = link;

    await message.channel.createMessage({messageReference: getMessageReference(message), embed: finalJson});
});

module.exports = vicevi;