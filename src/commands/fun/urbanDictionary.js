const axios = require('axios');
const cheerio = require('cheerio');

const skockajString = (input, link) => {
    if(input != null) {
        input = input.replace(/(\[|\])/g, '__');
        if(input.length > 900) {
            input = input.substring(0, 900);
            input += ` [...**More**](${link})`;
        }
    }
    return input;
};

const urbanDictionary = async (req, res) => {
    const rec = (req.query.rec) ? req.query.rec : false;
    const skockaj = (req.query.skockaj) ? req.query.skockaj : false;
    var finalJson;

    try {
        //ako imamo rec - kontaktiramo api
        if(rec) {
            const html = await axios.get(`https://api.urbandictionary.com/v0/define?term=${rec}`);
            const jsonDefinition = html.data;

            var brojDefinicija = jsonDefinition["list"].length;

            if(brojDefinicija != 0) {
                if(brojDefinicija > 5) { brojDefinicija = 5; } //limit!
                finalJson = { count: brojDefinicija, items: [] };

                for(let i = 0; i < brojDefinicija; i++) {
                    var responseJson = jsonDefinition.list[i];

                    var json = { };
                    json.author = "Urban Dictionary";
                    json.title = responseJson.word;
                    json.color = 0x206694;
                    json.url = responseJson.permalink;
                    json.thumbnailUrl = "https://drive.google.com/uc?export=view&id=1PQunt_-kvMXWjXq7cstx1uXhD1rbjvG-";
                    json.description = (skockaj) ? skockajString(responseJson.definition, finalJson[i].url) : responseJson.definition;
                    json.field = [
                        {
                            name: 'Primer:',
                            value: (skockaj) ? skockajString(responseJson.example, finalJson[i].url) : responseJson.example,
                            inline: false
                        }
                    ];

                    finalJson.items.push(json);
                }

            } else { //rec nije nadjena
                finalJson = {
                    count: 1,
                    items: [{
                        author: "Urban Dictionary",
                        title: "Nije nađeno!",
                        description: `Definicija "${rec}" nije pronađena`,
                        color: 0x206694,
                        url: "https://www.urbandictionary.com",
                        thumbnailUrl: "https://drive.google.com/uc?export=view&id=1PQunt_-kvMXWjXq7cstx1uXhD1rbjvG-"
                    }]
                };
            }

        } else { //ako nemamo rec - uzimamo rec dana
            const html = await axios.get("https://www.urbandictionary.com");
            const $ = cheerio.load(html.data);

            var date = $('div.ribbon:first').text();
            var url = $('div.def-header:first a').prop('href');
            var word = $('div.def-header:first').text();
            var meaning = $('div.meaning:first').text();
            var example = $('div.example:first').text();

            finalJson = {
                count: 1,
                items: [{
                    author: `Urban Dictionary - ${date}`,
                    title: word,
                    description: (skockaj) ? skockajString(meaning, url) : meaning,
                    color: 0x206694,
                    url: url,
                    thumbnailUrl: "https://drive.google.com/uc?export=view&id=1PQunt_-kvMXWjXq7cstx1uXhD1rbjvG-",
                    field: [
                        {
                            name: 'Primer:',
                            value: (skockaj) ? skockajString(example, url) : example,
                            inline: false
                        }
                    ]
                }]
            };
        }
    } catch(err) {
        //desila se neka izuzetna situacija
        finalJson = {
            brojDefinicija: 1,
            definicije: [{
                author: "Urban Dictionary",
                title: "Zahtev nije uspešan!",
                color: 0x206694,
                description: (err.message) ? err.message : "Greška!",
                url: "https://www.urbandictionary.com",
                thumbnailUrl: "https://drive.google.com/uc?export=view&id=1PQunt_-kvMXWjXq7cstx1uXhD1rbjvG-"
            }]
        }
    }
    res.json(finalJson);
};

module.exports = urbanDictionary;