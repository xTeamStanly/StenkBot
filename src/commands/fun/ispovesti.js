const axios = require('axios');
const cheerio = require('cheerio');
const { Command } = require('yuuko');
const { getFooter, errNaslov, errSadrzaj, getMessageReference, customWebHookCheckAndCreate } = require('../../lib/tools');

const image = "https://i.imgur.com/qCzQHRV.png";

const ispovest2embeds2message = async (link, message, context) => {
    var ovaKomandaTrajePoruka = null;

    var finalJson = [];
    const brojIspovesti = 5; //LIMIT

    try {

        ovaKomandaTrajePoruka = await message.channel.createMessage({
            content: "Ispovesti su prilično spora i nestabilna komanda, pošto je sajt (i API) spor, a ponekad ni ne radi."
        });

        const html = await axios.get(link);
        var jsonIspovesti = html.data;

        for(let i = 0; i < brojIspovesti; i++) {

            var ispovestJson = jsonIspovesti[`isp${i+1}`];
            var id = ispovestJson['id'];

            finalJson.push({
                author: { name: "Ispovesti", url: 'http://ispovesti.com/' },
                title: `Ispovest: ${id}`,
                description: ispovestJson.text,
                color: 0x000000,
                url: `http://ispovesti.com/ispovest/${id}`,
                thumbnail: { url: image },
                fields: [
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
                        name: ":date: Datum",
                        value: ispovestJson.time,
                        inline: true
                    }
                ],
                footer: getFooter(message)
            });

        }

        const hook = await customWebHookCheckAndCreate(message, context);
        await context.client.executeWebhook(
            hook.id,
            hook.token,
            {
                content: `:warning: Ja sam WebHook i **ne mogu** da uradim **reply**, zato evo **[link ka poruci](${message.jumpLink})** :warning:`,
                embeds: finalJson
            }
        );
    } catch(err) {
        console.log(err);
        await message.channel.createMessage({
            messageReference: getMessageReference(message),
            embed: {
                author: { name: "Ispovesti", url: 'http://ispovesti.com/' },
                title: errNaslov,
                description: errSadrzaj,
                color: 0x000000,
                url: 'http://ispovesti.com/',
                thumbnail: { url: image },
                footer: getFooter(message)
            }
        });
    }

    if(ovaKomandaTrajePoruka != null) {
        ovaKomandaTrajePoruka.channel.deleteMessage(ovaKomandaTrajePoruka.id, "Ispovesti brisanje poruke.")
    }
}

const ispovestiRandom = new Command(['random', 'rand'], async (message, args, context) => {

    var pageNumber = Math.floor(Math.random() * Number.MAX_SAFE_INTEGER);
    if(Math.random() > 0.5) { pageNumber *= -1; }

    await ispovest2embeds2message(`https://ispovesti.com/api/main.php?sort=random&value=${pageNumber}&step=10`, message, context);
})

const ispovestiNovo = new Command(['novo', 'new'], async (message, args, context) => {
    await ispovest2embeds2message("https://ispovesti.com/api/main.php?sort=novo&value=1&step=10", message, context);
});

const ispovestiPopularno = new Command(['popularno', 'popular', 'pop'], async (message, args, context) => {
    await ispovest2embeds2message("http://ispovesti.com/api/main.php?sort=popularno&value=0&step=10", message, context);
});

const ispovestiNajbolje = new Command(['najbolje', 'best', 'naj'], async (message, args, context) => {
    await ispovest2embeds2message("https://ispovesti.com/api/main.php?popularno=najbolje&value=1&step=10", message, context);
});

const ispovestiDanNedeljaMesec = async (tip, message) => {
    var ovaKomandaTrajePoruka = null;
    try {

        ovaKomandaTrajePoruka = await message.channel.createMessage({
            content: "Ispovesti su prilično spora i nestabilna komanda, pošto je sajt (i API) spor, a ponekad ni ne radi."
        });

        var elementID = "#conf-of-day-wrap"; var title = "Ispovest dana";
        switch(tip) {
            case 'dan': elementID = "#conf-of-day-wrap"; title = "Ispovest dana"; break;
            case 'nedelja': elementID = "#conf-of-week-wrap"; title = "Ispovest nedelje"; break;
            case 'mesec': elementID = "#conf-of-month-wrap"; title = "Ispovest meseca"; break;
        }

        const html = await axios.get('http://ispovesti.com/');
        const $ = cheerio.load(html.data);

        const ispovest = $(elementID);

        //parsujemo osude i potvrde
        const osudePotvrde = ispovest.children('div.smallInfo').text().split('•');
        const potvrde = parseInt(osudePotvrde[0].replace('odobravam', ''));
        const osude = parseInt(osudePotvrde[1].replace('osuđujem', ''));

        ispovestJson = {
            author: { name: "Ispovesti", url: 'http://ispovesti.com/' },
            title: title,
            description: ispovest.children('p').text(),
            url: 'http://ispovesti.com' + ispovest.children('a.miniLink').prop('href'),
            thumbnail: { url: image },
            color: 0x000000,
            fields: [
                {
                    name: "👍",
                    value: potvrde,
                    inline: true
                },
                {
                    name: "👎",
                    value: osude,
                    inline: true
                },
            ],
            footer: getFooter(message)
        }

        await message.channel.createMessage({
            messageReference: getMessageReference(message),
            embed: ispovestJson
        });
    } catch(err) {
        console.log(err);
        await message.channel.createMessage({
            messageReference: getMessageReference(message),
            embed: {
                author: { name: "Ispovesti", url: 'http://ispovesti.com/' },
                title: errNaslov,
                description: errSadrzaj,
                color: 0x000000,
                url: 'http://ispovesti.com/',
                thumbnail: { url: image },
                footer: getFooter(message)
            }
        });
    }

    if(ovaKomandaTrajePoruka != null) {
        ovaKomandaTrajePoruka.channel.deleteMessage(ovaKomandaTrajePoruka.id, "Ispovesti brisanje poruke.")
    }

}

const ispovestDana = new Command(['dan', 'dana', 'day'], async (message, args, context) => {
    await ispovestiDanNedeljaMesec('dan', message);
});

const ispovestNedelje = new Command(['nedelja', 'nedelje', 'week'], async (message, args, context) => {
    await ispovestiDanNedeljaMesec('nedelja', message);
});

const ispovestMeseca = new Command(['mesec', 'meseca', 'month'], async (message, args, context) => {
    await ispovestiDanNedeljaMesec('mesec', message);
});

//ako ne navede nista, daj mu novo random
const ispovesti = new Command(['ispovesti', 'ispovest'], async (message, args, context) => {

    var pageNumber = Math.floor(Math.random() * Number.MAX_SAFE_INTEGER);
    if(Math.random() > 0.5) { pageNumber *= -1; }

    await ispovest2embeds2message(`https://ispovesti.com/api/main.php?sort=random&value=${pageNumber}&step=10`, message, context);
}).addSubcommand(ispovestiRandom)
  .addSubcommand(ispovestiNovo)
  .addSubcommand(ispovestiPopularno)
  .addSubcommand(ispovestiNajbolje)
  .addSubcommand(ispovestDana)
  .addSubcommand(ispovestNedelje)
  .addSubcommand(ispovestMeseca);

module.exports = ispovesti;