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
});

module.exports = xkcd;