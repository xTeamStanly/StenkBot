const { Command } = require('yuuko');
const axios = require('axios');
const { getTodaysDate, errNaslov, errSadrzaj, getMessageReference } = require('../../lib/tools');

const image = "https://i.imgur.com/U41S13T.png";

const advice = new Command(['advice', 'savet'], async (message, args, context) => {
    const finalJson = {
        author: { name: 'Advice', url: "https://adviceslip.com/" },
        url: "https://adviceslip.com/",
        color: 0xFE830E,
        thumbnail: { url: image },
        footer: {
            text: `Zahtevao ${message.author.username} - ${getTodaysDate()}`,
            icon_url: message.author.avatarURL
        },
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
                    name: ':id: Advice ID',
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
        finalJson.title = errNaslov;
        finalJson.description = errSadrzaj;
        console.log(err);
    };

    await message.channel.createMessage({messageReference: getMessageReference(message), embed: finalJson});
});

module.exports = advice;