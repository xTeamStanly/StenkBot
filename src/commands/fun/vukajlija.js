const axios = require('axios');
const cheerio = require('cheerio');
const { Command } = require('yuuko');
const encodeUrl = require('encodeurl');

//const moment = require('moment');

const { getFooter, errNaslov, errSadrzaj, getMessageReference, customWebHookCheckAndCreate, timeZonePodesavanja } = require('../../lib/tools');

const image = "https://i.imgur.com/YAOcXt2.png";

//skrati na 900 karaktera
const skockajString = (input, link) => {
    if(input != null) {
        if(input.length > 300) {
            input = input.substring(0, 300);
            input += ` **[...Više](${link})**`;
        }
    }
    return input;
};

//vukajlija pretrazi podkomanda
//ako se ne unese nista posle, vraca 5 definicija sa pocetne stranice
//ako unese nesto, radi pretragu
const vukajlijaPretrazi = new Command(['pretrazi', 'pretraga', 'search'], async (message, args, context) => {
    var rec = args.join(' ');
    if(rec != '') {
        rec = encodeUrl(rec);
        await vukajlija2embeds2message(`https://vukajlija.com/pretraga/izraz?s=${rec}`, rec, message, context);
    } else {
        await vukajlija2embeds2message("https://vukajlija.com/", rec, message, context);
    }
});

//vukajlija definisi podkomanda
//ako se ne unese nista posle, vraca 5 definicija sa pocetne stranice
//ako unese nesto, radi definisi
const vukajlijaDefinisi = new Command(['definisi', 'define', 'def'], async (message, args, context) => {
    var rec = args.join(' ');
    if(rec != '') {
        rec = encodeUrl(rec);
        console.log("DEFINISI VUKAJLIJA - DEFINISI");
        await vukajlija2embeds2message(`https://vukajlija.com/${rec}`, rec, message, context);
    } else {
        console.log("DEFINISI VUKAJLIJA - POCETNA STRANICA");
        await vukajlija2embeds2message("https://vukajlija.com/", rec, message, context);
    }
});

//pocetna vukajlija komanda
//ako ne unese nista posle, vraca 5 definicija sa pocetne stranice
//ako unese nesto, isto je kao da je uradio pretragu
const vukajlija = new Command(['vukajlija', 'vuk'], async (message, args, context) => {
    var rec = args.join(' ');
    if(rec != '') {
        rec = encodeUrl(rec);
        await vukajlija2embeds2message(`https://vukajlija.com/pretraga/izraz?s=${rec}`, rec, message, context);
    } else {
        await vukajlija2embeds2message("https://vukajlija.com/", rec, message, context);
    }
}).addSubcommand(vukajlijaDefinisi).addSubcommand(vukajlijaPretrazi)
.addSubcommand(new Command(['help', 'pomoc', '?', 'info'], async (message, args, context) => {
    await message.channel.createMessage({
        messageReference: getMessageReference(message),
        embed: {
            author: { name: "Vukajlija", url: "https://vukajlija.com/" },
            url: "https://vukajlija.com/",
            color: 0x1F8B4C,
            thumbnail: { url: image },
            footer: getFooter(message),
            title: ':book: Pomoć',
            description: "__***Opis:***__\n• Prikazuje 5 definicija sa početne stranice.\n\n__***Sva imena komande:***__\n• **vukajlija**\n• **vuk**\n\n__***Podkomande:***__\n• **pretrazi**, **pretraga**, **search** - prikazuje maksimalno 5 definicija pretražene reči\n• **definisi**, **define**, **def** - prikazuje maksimalno 5 definicija konkretne unesene reči\n\n__***Korišćenje:***__\n• **vuk** - prikazuje 5 definicija sa početne stranice\n• **vuk __<REČ>__** - pretražuje __REČ__ i prikazuje maksimalno 5 definicija\n• **vuk pretrazi __<REČ>__** - pretražuje __REČ__ i prikazuje maksimalno 5 definicija\n• **vuk definisi __<REČ>__** - definiše konkretnu __REČ__ i prikazuje maksimalno 5 definicija\n\n__***Dodatno:***__\n• Koristi WebHook kako bi poslao više embed-a odjednom (smanjuje spam)\n"
        }
    });
}));

const vukajlija2embeds2message = async (link, rec, message, context) => {
    var finalJson = [];
    try {
        const html = await axios.get(link);
        const $ = cheerio.load(html.data);

        var brojDefinicija = $('div.copy').length;

        //imamo definicije
        if(brojDefinicija != 0) {
            if(brojDefinicija > 5) { brojDefinicija = 5; } //LIMIT

            //za svaku defku na stranici
            $('div.clearfix.definition.post').each((i, postRawElement) => {
                if(i == brojDefinicija) { return false; }

                const post = $(postRawElement);

                const text = post.children('div.copy');
                const info = post.children('ul.meta.clearfix');

                const naslov = text.children('h2');
                const defka = text.children('p').text();
                const primer = text.children('blockquote').text();

                const url = "https://vukajlija.com" + naslov.children('a').prop('href');

                const autor = info.children('li.post-votal-show').children('a');
                const defkaAutor = `[${autor.text()}](https://vukajlija.com${autor.prop('href')})`;

                const datumParsed = new Date(info.children('li').children('abbr').prop('title'));
                const defkaDatum = `${datumParsed.toLocaleDateString('sr-RS', timeZonePodesavanja)} ${datumParsed.toLocaleTimeString('sr-RS', timeZonePodesavanja)}`;

                const jsonDefka = {
                    author: { name: "Vukajlija" },
                    title: naslov.text(),
                    color: 0x1F8B4C,
                    url: url,
                    description: skockajString(defka, url),
                    thumbnail: { url: image },
                    fields: [],
                    footer: getFooter(message)
                }

                if(primer != '') {
                    jsonDefka.fields.push(
                        {
                            name: ":notepad_spiral: Primer",
                            value: skockajString(primer, url),
                            inline: false
                        }
                    );
                }

                jsonDefka.fields.push(
                    {
                        name: ":pencil: Autor",
                        value: defkaAutor,
                        inline: true
                    },
                    {
                        name: ":date: Datum",
                        value: defkaDatum,
                        inline: true
                    }
                );

                finalJson.push(jsonDefka);
            });

        } else { //nemamo definicije

            //if(rec.length > 900) { rec = rec.substring(0, 900); rec += " **...**"; }

            finalJson = [{
                author: { name: "Vukajlija", url: "https://vukajlija.com/" },
                title: ":mag_right: Definicija nije pronađena!",
                description: ":frowning2: Reč nažalost nije pronađena. Stranica je uklonjena ili nikada nije ni postojala!",
                color: 0x1F8B4C,
                url: "https://vukajlija.com/",
                thumbnail: { url: image },
                footer: getFooter(message)
            }];

        }
    } catch(err) {
        finalJson = [{
            author: { name: "Vukajlija" },
            title: errNaslov,
            description: errSadrzaj,
            color: 0x1F8B4C,
            url: "https://vukajlija.com/",
            thumbnail: { url: image },
            footer: getFooter(message)
        }];
        console.log(err);
    }

    //ako imamo samo jedan embed, posaljemo ga najobicnije
    if(finalJson.length == 1) {
        await message.channel.createMessage({
            messageReference: getMessageReference(message),
            embed: finalJson[0]
        });
    } else { //imamo vise od jednog, moramo da koristimo WebHook

        const hook = await customWebHookCheckAndCreate(message, context);

        await context.client.executeWebhook(
            hook.id,
            hook.token,
            {
                content: `:warning: Ja sam WebHook i **ne mogu** da uradim **reply**, zato evo **[link ka poruci](${message.jumpLink})** :warning:`,
                embeds: finalJson
            }
        );
    }
}

module.exports = vukajlija;