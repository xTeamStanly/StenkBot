const { countOccurrences } = require('../shared');
const colors = require('colors');

const axios = require('axios');
const cheerio = require('cheerio');

//skrati na 900 karaktera
const skockajString = (input, link) => {
    if(input != null) {
        if(input.length > 900) {
            input = input.substring(0, 900);
            input += ` [...**Više**](${link})`;
        }
    }
    return input;
};

const vukajlija = async (req, res) => {
    var tipAkcije = 'default';
    var link = "https://vukajlija.com/";
    const definisi = req.query.definisi;
    const pretrazi = req.query.pretrazi;
    const skockaj = (req.query.skockaj) ? req.query.skockaj : false;

    //prednost ima pretrazi!! (ako se oba koriste)
    if(definisi != null && definisi != '') { tipAkcije = 'definisi'; link = `https://vukajlija.com/${definisi}`; }
    if(pretrazi != null && pretrazi != '') { tipAkcije = 'pretrazi'; link = `https://vukajlija.com/pretraga/izraz?s=${pretrazi}`; }

    var finalJson;

    try {
        const html = await axios.get(link);
        const $ = cheerio.load(html.data);

        var brojDefinicija = $('div.copy').length;

        //imamo definicije
        if(brojDefinicija != 0) {
            if(brojDefinicija > 5) { brojDefinicija = 5; }
            finalJson = { count: brojDefinicija, items: [] };

            //za svaku defku

            $('div.clearfix.definition.post').each((i, postElement) => {
                if(i == brojDefinicija) { return false; }
                const tekstualniElement = 0;
                const post = $(postElement);

                var json = { };

                const text = post.children('div.copy');
                const info = post.children('ul.meta.clearfix');

                const naslov = text.children('h2');
                const defka = text.children('p').text();
                const primer = text.children('blockquote').text();

                const url = "https://vukajlija.com" + naslov.children('a').prop('href');

                json.url = url;
                json.title = naslov.text();
                json.description = (skockaj) ? skockajString(defka, url) : defka;
                json.color = 0x1F8B4C;
                json.thumbnailUrl = "https://drive.google.com/uc?export=view&id=1oU9MBpvLtjurAJLzpFmLNFgG2o-agq01";

                json.field = [ ];
                if(primer.length) { json.field.push(
                    {
                        name: "Primer:",
                        value: (skockaj) ? skockajString(primer, url) : primer,
                        inline: false
                    }
                )};

                const autor = info.children('li.post-votal-show').children('a');

                json.field.push(
                    {
                        name: "Autor: ",
                        value: (skockaj) ? `[${autor.text()}](https://vukajlija.com${autor.prop('href')})` : autor.text(),
                        inline: true
                    },
                    {
                        name: "Datum: ",
                        value: info.children('li').children('abbr').prop('title'),
                        inline: true
                    }
                );

                finalJson.items.push(json);
            });

        } else {
            //nemamo definicije
            finalJson = {
                count: 1,
                items: [{
                    title: "Nije nađeno!",
                    description: "Strana je uklonjena ili nikada nije ni postojala!",
                    color: 0x1F8B4C,
                    url: "https://vukajlija.com/",
                    thumbnailUrl: "https://drive.google.com/uc?export=view&id=1oU9MBpvLtjurAJLzpFmLNFgG2o-agq01"
                }]
            }
        }

    }catch(err) {
        finalJson = {
            count: 1,
            items: [{
                title: "Desila se greška!",
                description: "Greška!",
                color: 0x1F8B4C,
                url: "https://vukajlija.com/",
                thumbnailUrl: "https://drive.google.com/uc?export=view&id=1oU9MBpvLtjurAJLzpFmLNFgG2o-agq01"
            }]
        };
    }

    res.json(finalJson);
};

module.exports = vukajlija;