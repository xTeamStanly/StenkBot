const axios = require('axios');

const xkcd = async (req, res) => {
    var finalJson;

    try {
        var html = await axios.get("https://xkcd.com/info.0.json");
        var jsonComic = html.data;

        const maxComicID = jsonComic["num"];

        var comicID = req.query.id;

        if(!(comicID == null || comicID < 1 || comicID > maxComicID)) {
            html = await axios.get(`https://xkcd.com/${comicID}/info.0.json`);
            jsonComic = html.data;
        } else {
            comicID = maxComicID;
        }

        finalJson = {
            count: 1,
            items: [{
                author: `${comicID} - ${jsonComic["day"]}.${jsonComic["month"]}.${jsonComic["year"]}.`,
                title: jsonComic["safe_title"],
                description: jsonComic["alt"],
                color: 0x11806A,
                url: `https://xkcd.com/${comicID}/`,
                thumbnailUrl: "https://drive.google.com/uc?export=view&id=11AQTQfaFcYZiox7XK7hXbA4leE4E-uth",
                imageUrl: jsonComic["img"]
            }]
        };
    } catch(err) {
        finalJson = {
            count: 1,
            items: [{
                title: "Desila se greška!",
                description: "Greška",
                color: 0x11806A,
                url: "https://xkcd.com/",
                thumbnailUrl: "https://drive.google.com/uc?export=view&id=11AQTQfaFcYZiox7XK7hXbA4leE4E-uth"
            }]
        };
    }
    res.json(finalJson);
};

module.exports = xkcd;