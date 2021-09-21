const axios = require('axios');

//TODO MOZDA ISPOVEST DANA, MESECA, NEDELJE???

//tipovi: random, novo, popularno, najbolje
const ispovesti = async (req, res) => {
    const tip = (req.query.tip) ? req.query.tip : 'random';
    var link;

    const brojIspovesti = 5;
    var pageNumber = null;

    switch(tip) {
        case 'novo':
            link = "https://ispovesti.com/api/main.php?sort=novo&value=1&step=10";
            break;
        case 'popularno':
            link = "http://ispovesti.com/api/main.php?sort=popularno&value=0&step=10";
            break;
        case 'najbolje':
            link = "https://ispovesti.com/api/main.php?popularno=najbolje&value=1&step=10";
            break;
        case 'random':
        default:
            pageNumber = Math.floor(Math.random() * Number.MAX_SAFE_INTEGER);
            if(Math.random() > 0.5) { pageNumber *= -1; }
            link = `https://ispovesti.com/api/main.php?sort=random&value=${pageNumber}&step=10`;
            break;
    };

    var finalJson;
    try {
        const html = await axios.get(link);
        var jsonIspovesti = html.data;

        finalJson = { count: brojIspovesti, items: [] };
        for(let i = 0; i < brojIspovesti; i++) {
            var ispovestJson = jsonIspovesti[`isp${i+1}`];
            var id = ispovestJson["id"];

            var json = { };
            json.title = `Ispovest: ${id}`;
            json.description = ispovestJson.text;
            json.color = 0x206694;
            json.url = `http://ispovesti.com/ispovest/${id}`;
            json.thumbnailUrl = "https://drive.google.com/uc?export=view&id=1CpJFwUdS96o9AnF1QHbxZJofUdHnL7QM";
            json.field = [
                {
                    name: "👍",
                    value: ispovestJson.oprost,
                    inline: true
                },
                {
                    name: "👎",
                    value: ispovestJson.osuda,
                    inline: true
                },
                {
                    name: "Datum",
                    value: ispovestJson.time,
                    inline: true
                }
            ];
            finalJson.items.push(json);
        }
    } catch(err) {
        console.log(err);
        finalJson = {
            count: 1,
            items: [{
                title: 'Desila se greška.',
                color: 0x206694,
                url: `http://ispovesti.com/`,
                thumbnailUrl: "https://drive.google.com/uc?export=view&id=1CpJFwUdS96o9AnF1QHbxZJofUdHnL7QM"
            }]
        }
    }

    res.json(finalJson);
};

module.exports = ispovesti;