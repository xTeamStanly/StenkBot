const axios = require('axios');
const cheerio = require('cheerio');
const { Command } = require('yuuko');
const { getMessageReference, getFooter, customWebHookCheckAndCreate, botClient, botAvatar } = require('../../lib/tools');


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

const urbanDictionary = new Command(['urban', 'udefine'], async (message, args, context) => {
    var rec = args.join(' ');

    try {
        //ako imamo rec - kontaktiramo api
        if(rec != '') {
            const html = await axios.get(`https://api.urbandictionary.com/v0/define?term=${rec}`);
            const jsonDefinition = html.data;

            var brojDefinicija = jsonDefinition["list"].length;

            if(brojDefinicija != 0) {
                if(brojDefinicija > 5) { brojDefinicija = 5; } //limit!

                const hook = await customWebHookCheckAndCreate(message, context);
                const hookEmbeds = [];
                const footer = getFooter(message);

                for(let i = 0; i < brojDefinicija; i++) {
                    var responseJson = jsonDefinition.list[i];
                    const permaUrl = responseJson.permalink;

                    hookEmbeds.push({
                        author: { name: "Urban Dictionary" },
                        title: responseJson.word,
                        color: 0x1E2439,
                        url: permaUrl,
                        thumbnail: { url: "https://i.imgur.com/aZnKcUC.png" },
                        footer: footer,
                        description: skockajString(responseJson.definition, permaUrl),
                        fields: [
                            {
                                name: ':notepad_spiral: Primer',
                                value: skockajString(responseJson.example, permaUrl),
                                inline: false
                            }
                        ]
                    });
                }

                await context.client.executeWebhook(
                    hook.id,
                    hook.token,
                    {
                        /*avatarURL: botAvatar,*/ //OVERRIDE ZA AVATAR
                        content: `:warning: Ja sam WebHook i **ne mogu** da uradim **reply**, zato evo **[link ka poruci](${message.jumpLink})** :warning:`,
                        embeds: hookEmbeds
                    }
                );

                //context.client.editWebhookMessage(hook.id, hook.token, )
                //context.client.editMessage(message.channel.id, hookMessage.id, { content: hookMessage.content, messageReference: getMessageReference(message) })

            } else { //rec nije nadjena

                if(rec.length > 900) { rec = rec.substring(0, 900); rec += " **...**"; }

                await message.channel.createMessage({
                    messageReference: getMessageReference(message),
                    embed: {
                        author: { name: "Urban Dictionary" },
                        title: ":mag_right: Reč nije pronađena!",
                        description: `:frowning2: Reč ${rec} nažalost nije pronađena.`,
                        color: 0x1E2439,
                        url: "https://www.urbandictionary.com",
                        thumbnail: { url: "https://i.imgur.com/aZnKcUC.png" },
                        footer: getFooter(message)
                    }
                });
            }

        } else { //ako nemamo rec - uzimamo rec dana
            const html = await axios.get("https://www.urbandictionary.com");
            const $ = cheerio.load(html.data);

            //!!! NEKAD NE POSTOJI WORD OF THE DAY
            //TODO WORD OF THE DAY
            var date = $('div.ribbon:first').text();
            console.log(date);
            var url = "https://www.urbandictionary.com" + $('div.def-header:first').children('a').prop('href'); //$('div.def-header:first a').prop('href');
            var word = $('div.def-header:first').text();
            var meaning = $('div.meaning:first').text();
            var example = $('div.example:first').text();

            await message.channel.createMessage({
                messageReference: getMessageReference(message),
                embed: {
                    author: { name: "Urban Dictionary" },
                    title: word,
                    description: skockajString(meaning, url),
                    color: 0x1E2439,
                    url: url,
                    thumbnail: { url: "https://i.imgur.com/aZnKcUC.png" },
                    footer: getFooter(message),
                    fields: [
                        {
                            name: ':notepad_spiral: Primer',
                            value: skockajString(example, url),
                            inline: false
                        },
                        {
                            name: ":date: Datum",
                            value: date,
                            inline: false
                        }
                    ]
                }
            });

        }
    } catch(err) {
        console.log(err);
        //desila se neka izuzetna situacija
        finalJson = {
            brojDefinicija: 1,
            definicije: [{
                author: "Urban Dictionary",
                title: "Zahtev nije uspešan!",
                color: 0x1E2439,
                description: (err.message) ? err.message : "Greška!",
                url: "https://www.urbandictionary.com",
                thumbnailUrl: "https://drive.google.com/uc?export=view&id=1PQunt_-kvMXWjXq7cstx1uXhD1rbjvG-"
            }]
        }
    }
});

const urbanDictionary0 = async (req, res) => {
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