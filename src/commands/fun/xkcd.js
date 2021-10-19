const { Command } = require('yuuko');
const axios = require('axios');

const { errNaslov, errSadrzaj, getFooter, getMessageReference } = require('../../lib/tools');

const image = "https://i.imgur.com/MiXtna4.png";

const xkcd = new Command('xkcd', async (message, args, context) => {
    const finalJson = {
        author: { name: 'XKCD', url: `https://xkcd.com/` },
        color: 0x6F7B91,
        thumbnail: { url: image },
        footer: getFooter(message)
    };

    var naslov;
    var sadrzaj;
    var url;

    try {
        var html = await axios.get("https://xkcd.com/info.0.json");
        var jsonComic = html.data;

        const maxComicID = jsonComic["num"];

        var comicID = parseInt(args[0]);

        if(!(isNaN(comicID) || comicID < 1 || comicID > maxComicID)) {
            html = await axios.get(`https://xkcd.com/${comicID}/info.0.json`);
            jsonComic = html.data;
        } else {
            comicID = maxComicID;
        }

        finalJson.image = { url: jsonComic["img"] };

        naslov = jsonComic["safe_title"];
        sadrzaj = jsonComic["alt"];
        url = `https://xkcd.com/${comicID}/`;

        finalJson.fields = [
            {
                name: ":id: Comic ID",
                value: comicID,
                inline: true
            },
            {
                name: ":date: Date",
                value: `${jsonComic["day"]}.${jsonComic["month"]}.${jsonComic["year"]}`,
                inline: true
            }
        ];

    } catch(err) {
        naslov = errNaslov,
        sadrzaj = errSadrzaj;
        url = "https://xkcd.com/";
    }

    finalJson.title = naslov;
    finalJson.description = sadrzaj;
    finalJson.url = url;

    await message.channel.createMessage({messageReference: getMessageReference(message), embed: finalJson});
}).addSubcommand(new Command(['help', 'pomoc', '?', 'info'], async (message, args, context) => {
    await message.channel.createMessage({
        messageReference: getMessageReference(message),
        embed: {
            author: { name: 'Advice', url: "https://adviceslip.com/" },
            url: "https://adviceslip.com/",
            color: 0xFE830E,
            thumbnail: { url: image },
            footer: getFooter(message),
            title: ':book: Pomoć',
            description: "__***Opis:***__\n• Prikazuje nasumičan xkcd strip.\n\n__***Sva imena komande:***__\n• **xkcd**\n\n__***Korišćenje:***__\n• **xkcd** - prikazuje nasumičan xkcd strip\n• **xkcd __<BROJ>__** - prikazuje xkcd strip sa brojem __BROJ__"
        }
    });
}));

module.exports = xkcd;