const { Command } = require('yuuko');
const { randomList, randomBetweenIncluding } = require('../../lib/tools');
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


const vicevi = async (req, res) => {
    var finalJson;
    var link = 'https://www.vicevi.rs/';

    try {

        //ako ne unesemo kategoriju, onda uzimamo vic dana
        var kategorija = (req.query.kategorija) ? req.query.kategorija : null;


        //ako je kategorija null, uzimamo vic dana
        if(kategorija == null) {

            const html = await axios.get(link);
            const $ = cheerio.load(html.data);

            const article = $('article.single.page.daily');
            const naslov = article.children('h2').text();
            const sadrzaj = article.children('p').html().replace(/<br\s*[\/]?>/gi,"\n");

            finalJson = {
                count: 1,
                items: [{
                    title: naslov,
                    description: sadrzaj,
                    color: 0xA84300,
                    url: link,
                    thumbnailUrl: "https://www.vicevi.rs/assets/images/logo2.png"
                }]
            };
        } else { //kategorija nije nula

            const validna = validnaKaterogija(kategorija);
            //ako kategorija nije validna --> odaberi nasumicnu
            //TODO PRIKAZIVANJE KATEGORIJA AKO UNESE POGRESNU
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
            const naslov = vic.children('h2').text();
            const sadrzaj = vic.children('p').html().replace(/<br\s*[\/]?>/gi,"\n");
            var url = 'https://www.vicevi.rs' + vic.children('h2').children('a').prop('href');

            const ocena = vic.children('div.box').children('div.rating_box').children('div.star').attr('data-score');
            const brojGlasova = vic.children('div.box').children('div.rating_box').children('span.votes').text();

            finalJson = {
                count: 1,
                items: [{
                    title: naslov,
                    description: sadrzaj,
                    color: 0xA84300,
                    url: url,
                    thumbnailUrl: "https://www.vicevi.rs/assets/images/logo2.png",
                    field: [
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
                    ]
                }]
            };

            if(!validna) {
                finalJson.items[0].field.push({
                    name: "Random kategorija:",
                    value: kategorija,
                    inline: true
                });
            }
        }

    } catch(err) {
        finalJson = {
            count: 1,
            items: [{
                title: "Desila se greška!",
                description: "Greška!",
                color: 0xA84300,
                url: "https://www.vicevi.rs/",
                thumbnailUrl: "https://www.vicevi.rs/assets/images/logo2.png"
            }]
        };
    };

    res.json(finalJson);
};

module.exports = vicevi;