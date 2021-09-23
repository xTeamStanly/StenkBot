const { Command } = require('yuuko');
const axios = require('axios');

const advice = new Command(['advice', 'savet'], async (message, args, context) => {
    var finalJson = {
        author: { name: 'Advice' },
        url: "https://adviceslip.com/",
        color: 0xFE830E,
        thumbnail: { url: "https://i.imgur.com/U41S13T.png" }
    };

    try {
        const adviceID = parseInt(args[0]);
        var link = `https://api.adviceslip.com/advice`;

        if(!isNaN(adviceID)) { link += `/${adviceID}`; }

        var html = await axios.get(link);
        var jsonAdvice = html.data;

        //originalan api vraca bez } na kraju ako zahtevamo preko ID-a
        //zbog nevalidnih ID-jeva moramo da proveravamo da li se zavrsava sa }} svaki put
        if(!JSON.stringify(jsonAdvice).endsWith("}}")) { jsonAdvice += "}"; jsonAdvice = JSON.parse(jsonAdvice); };

        if(jsonAdvice.slip) {
            //uspesno dobijena poruka
            finalJson.title = jsonAdvice.slip.advice;
            finalJson.fields = [
                {
                    name: 'ID',
                    value: jsonAdvice.slip.id,
                    inline: true
                }
            ];
        } else {
            //neka greska
            finalJson.title = jsonAdvice.message.text;
        }

    } catch(err) {
        //HANDLE ERROR
        finalJson.title = "Zovi gazdu!";
        finalJson.description = "Desila se greška!"
        console.log(err);
    };

    message.channel.createMessage({ embed: finalJson });
});

module.exports = advice;