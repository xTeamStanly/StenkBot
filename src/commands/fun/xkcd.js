const { Command } = require('yuuko');
const axios = require('axios');

const { getTodaysDate } = require('../../lib/tools');

const xkcd = new Command('xkcd', async (message, args, context) => {
    const finalJson = {
        author: { name: 'XKCD' },
        color: 0x6F7B91,
        thumbnail: { url: "https://i.imgur.com/MiXtna4.png" },
        footer: {
            text: `Zahtevao ${message.author.username} - ${getTodaysDate()}`,
            icon_url: message.author.avatarURL
        }
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
                name: "ID",
                value: comicID,
                inline: true
            },
            {
                name: "Date",
                value: `${jsonComic["day"]}.${jsonComic["month"]}.${jsonComic["year"]}`,
                inline: true
            }
        ];

    } catch(err) {
        naslov = "Zovi gazdu!";
        sadrzaj = "Desila se greška!";
        url = "https://xkcd.com/";
    }

    finalJson.title = naslov;
    finalJson.description = sadrzaj;
    finalJson.url = url;

    await message.channel.createMessage({embed: finalJson});
});

module.exports = xkcd;