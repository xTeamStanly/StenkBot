const axios = require('axios');
const cheerio = require('cheerio');
const { Command } = require('yuuko');
const { getMessageReference, getFooter, customWebHookCheckAndCreate, errNaslov, errSadrzaj } = require('../../lib/tools');
const encodeUrl = require('encodeurl');

const image = "https://i.imgur.com/aZnKcUC.png";

const skockajString = (input, link) => {
    if(input != null) {
        input = input.replace(/(\[|\])/g, '__');
        if(input.length > 300) {
            input = input.substring(0, 300);
            input += ` **[...More](${link})**`;
        }
    }
    return input;
};

const urbanDictionary = new Command(['urban', 'udefine', 'urbandictionary'], async (message, args, context) => {
    var rec = args.join(' ');

    try {
        //ako imamo rec - kontaktiramo api
        if(rec != '') {
            rec = encodeUrl(rec);
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
                        author: { name: "Urban Dictionary", url: "https://www.urbandictionary.com" },
                        title: responseJson.word,
                        color: 0x1E2439,
                        url: permaUrl,
                        thumbnail: { url: image },
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
                        content: `:warning: Ja sam WebHook i **ne mogu** da uradim **reply**, zato evo **[link ka poruci](${message.jumpLink})** :warning:`,
                        embeds: hookEmbeds
                    }
                );

            } else { //rec nije nadjena

                //if(rec.length > 900) { rec = rec.substring(0, 900); rec += " **...**"; }

                await message.channel.createMessage({
                    messageReference: getMessageReference(message),
                    embed: {
                        author: { name: "Urban Dictionary", url: "https://www.urbandictionary.com" },
                        title: ":mag_right: Reč nije pronađena!",
                        description: `:frowning2: Reč nažalost nije pronađena.`,
                        color: 0x1E2439,
                        url: "https://www.urbandictionary.com",
                        thumbnail: { url: image },
                        footer: getFooter(message)
                    }
                });
            }

        } else { //ako nemamo rec - uzimamo rec dana
            const html = await axios.get("https://www.urbandictionary.com");
            const $ = cheerio.load(html.data);

            //WORD OF THE DAY RIBBON VISE NE POSTOJI, IDEMO NA DRUGO RESENJE
            var date = $('title:first').text().replace("Urban Dictionary, ", '');
            var url = "https://www.urbandictionary.com" + $('div.def-header:first').children('a').prop('href');
            //var word = $('div.def-header:first').text();
            var meaning = $('div.meaning:first').text();
            var example = $('div.example:first').text();

            await message.channel.createMessage({
                messageReference: getMessageReference(message),
                embed: {
                    author: { name: "Urban Dictionary", url: "https://www.urbandictionary.com" },
                    title: date,
                    description: skockajString(meaning, url),
                    color: 0x1E2439,
                    url: url,
                    thumbnail: { url: image },
                    footer: getFooter(message),
                    fields: [
                        {
                            name: ':notepad_spiral: Primer',
                            value: skockajString(example, url),
                            inline: false
                        }
                    ]
                }
            });
        }
    } catch(err) {
        //desila se neka izuzetna situacija
        await message.channel.createMessage({
            messageReference: getMessageReference(message),
            embed: {
                author: { name: "Urban Dictionary", url: "https://www.urbandictionary.com" },
                url: "https://www.urbandictionary.com",
                color: 0x1E2439,
                thumbnail: { url: image },
                footer: getFooter(message),
                title: errNaslov,
                description: errSadrzaj
            }
        });
        console.log(err);
    }
}).addSubcommand(new Command(['help', 'pomoc', '?'], async (message, args, context) => {
    await message.channel.createMessage({
        messageReference: getMessageReference(message),
        embed: {
            author: { name: "Urban Dictionary", url: "https://www.urbandictionary.com" },
            url: "https://www.urbandictionary.com",
            thumbnail: { url: image },
            color: 0x1E2439,
            footer: getFooter(message),
            title: ':book: Pomoć',
            description: "__***Opis:***__\n• Prikazuje reč dana sa početne stranice.\n\n__***Sva imena komande:***__\n• **urban**\n• **urbandictionary**\n• **udefine**\n\n__***Korišćenje:***__\n• **urban** - prikazuje reč dana sa početne strane\n• **urban __<REČ>__** - pretražuje __REČ__ i vraća maksimalno 5 defincija (ako pronađe reč)\n\n__***Dodatno:***__\n• Koristi WebHook kako bi poslao više embed-a odjednom (smanjuje spam)"
        }
    })
}));

module.exports = urbanDictionary;