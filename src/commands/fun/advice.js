const axios = require('axios');

//TODO ADVICE IMAGE
const advice = async (req, res) => {
    var finalJson;

    try {
        const adviceID = req.query.id || null;
        var link = `https://api.adviceslip.com/advice`;

        if(adviceID != null) { link += `/${adviceID}`; }

        var html = await axios.get(link);
        var jsonAdvice = html.data;

        //originalan api vraca bez } na kraju ako zahtevamo preko ID-a
        //zbog nevalidnih ID-jeva moramo da proveravamo da li se zavrsava sa }} svaki put
        if(!JSON.stringify(jsonAdvice).endsWith("}}")) { jsonAdvice += "}"; jsonAdvice = JSON.parse(jsonAdvice); };

        if(jsonAdvice.slip) {
            //uspesno dobijena poruka
            finalJson = {
                count: 1,
                items: [{
                    title: jsonAdvice.slip.advice,
                    description: `Advice ID: ${jsonAdvice.slip.id}`,
                    color: 0x3498DB
                }]
            };
        } else {
            //neka greska
            finalJson = {
                count: 1,
                items: [{
                    title: jsonAdvice.message.text,
                    color: 0x3498DB
                }]
            };
        }
    } catch(err) {
        //HANDLE ERROR
        finalJson = {
            count: 1,
            items: [{
                title: "Desila se greška!.",
                description: "Greška!",
                color: 0x3498DB
            }]
        };
    }

    res.json(finalJson);
}

module.exports = advice;