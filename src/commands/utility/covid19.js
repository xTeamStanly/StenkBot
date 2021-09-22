const axios = require('axios');
const cheerio = require('cheerio');

const { Command } = require('yuuko');

const covid19 = new Command('covid', covid19, {});


const covid19 = async (message, args, ctx) => {
    var finalJson;

    console.log(args);

    try {
        //malo je tezi sajt pa mu treba neko vreme da otvori
        const html = await axios.get('https://covid19.rs/');
        const $ = cheerio.load(html.data);

        var covidData = [];
        $('p.elementor-heading-title').each((i, node) => {
            covidData.push($(node).text().replace('\u202C', "").replace(/,/g, ""));
        });

        finalJson = {
            count: 1,
            items: [{
                author: `Ažurirano: ${covidData[1].substring(10, 21)}`,
                title: `Ukupan broj: ${covidData[2]}`,
                color: 0xE74C3C,
                url: "https://www.covid19.rs",
                thumbnailUrl: "https://drive.google.com/uc?export=view&id=1pYUIL27Gy9_25YNCuoVNscaLK8XK_kHG",
                field: [
                    {
                        name: "Novozaraženi (24h): ",
                        value: covidData[12],
                        inline: false
                    },
                    {
                        name: "Testirani: ",
                        value: covidData[8],
                        inline: true,
                    },
                    {
                        name: "Testirani (24h): ",
                        value: covidData[10],
                        inline: true,
                    },
                    {
                        name: "\u200b",
                        value: "\u200b",
                        inline: true,
                    },
                    {
                        name: "Preminuli: ",
                        value: covidData[4],
                        inline: true,
                    },
                    {
                        name: "Preminuli (24h): ",
                        value: covidData[14],
                        inline: true,
                    },
                    {
                        name: "Procenat smrtnosti: ",
                        value: covidData[6],
                        inline: true,
                    },
                    {
                        name: "Hospitalizovani: ",
                        value: covidData[16],
                        inline: true,
                    },
                    {
                        name: "Na respiratorima: ",
                        value: covidData[18],
                        inline: true,
                    }
                ]
            }]
        };
    } catch(err) {
        finalJson = {
            count: 1,
            items: [{
                title: "Desila se greška",
                color: '0xE74C3C',
                url: "https://www.covid19.rs",
                thumbnailUrl: "https://drive.google.com/uc?export=view&id=1pYUIL27Gy9_25YNCuoVNscaLK8XK_kHG"
            }]
        };
    }

    res.json(finalJson);
};

module.exports = covid19;