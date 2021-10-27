const { Command } = require('yuuko');
const { getFooter, getMessageReference, errNaslov, errSadrzaj } = require('../../lib/tools');
const axios = require('axios');
const encodeUrl = require('encodeurl');
const { stenkLog } = require('../../lib/botHelper');

const jesteValidno = (unos) => {
    return (unos != null && unos.trim() !== "" && (/^[a-zA-Z\s]*$/).test(unos) === true); //!(/[^a-zA-Z]/.test(unos)) === true);
}

const vremenskaPrognoza = new Command(['weather', 'vremenskaprognoza', 'vremenska', 'wttr', 'vreme'], async (message, args, context) => {

    var lokacija = args.join(' ');
    var linkLokacija = null;

    //nije null i dobar je regex
    if(jesteValidno(lokacija)) {
        lokacija = lokacija.replace(/\s\s+/g, ' ').trim(); //vise razmaka u jedan + trim
        linkLokacija = `https://wttr.in/${encodeUrl(lokacija)}.png?p&lang=sr-lat&M&m`;
        if(lokacija.length > 64) { lokacija = lokacija.substring(0, 64) + '...'; }
    } else {
        if(lokacija) { //nije validan unos
            await message.channel.createMessage({
                messageReference: getMessageReference(message),
                embed: {
                    author: { name: 'Vremenska Prognoza - Wttr', url: 'https://wttr.in/' },
                    color: 0x13818D,
                    url: 'https://wttr.in/',
                    footer: getFooter(message),
                    title: ':frowning2: Unos nije validan',
                    description: 'Podržana je engleska abeceda sa razmacima!',
                    thumbnail: { url: 'https://i.imgur.com/qxpds3J.png' }
                }
            });
            return;
        } else { //nije uneto nista, znaci prognoza za nis
            lokacija = "Niš";
            linkLokacija = 'https://wttr.in/nis.png?p&lang=sr-lat&M&m';
        }
    }

    //ili imamo validan unos ili je lokacija nis
    try { //pokusavamo da gettujemo

        const html = await axios({
            method: 'get',
            url: linkLokacija,
            responseType: 'arraybuffer'
        });

        //ako imamo uspesan rezultat
        await message.channel.createMessage({
            messageReference: getMessageReference(message),
            embed: {
                author: { name: 'Vremenska Prognoza - Wttr', url: 'https://wttr.in/' },
                color: 0x13818D,
                url: linkLokacija,
                footer: getFooter(message),
                title: `Vremenska prognoza za ${lokacija}`,
                description: `Ako slika ne bude vidljiva, razlog se nalazi u informacijama o samoj komandi.`,
                image: { url: `attachment://prognoza.png` },
                thumbnail: { url: 'https://i.imgur.com/qxpds3J.png' }
            }
        }, { name: './prognoza.png', file: html.data });

    } catch(err) {


        //wttr.in malo cudno radi sa kes memorijom, ako vrati 404 prvi put onda ce
        //sledeci put za istu lokaciju da vrati 200 umesto 404 ali ce da napise
        //na slici 404 -.-'
        //ispada da kesira 404

        //ako nekesirana lokacija nije nadjena
        if (err.response && err.response.status == 404) {

            await stenkLog("WTHER", 'yellow', "Wttr - 404 Cache");
            await message.channel.createMessage({
                messageReference: getMessageReference(message),
                embed: {
                    author: { name: 'Vremenska Prognoza - Wttr', url: 'https://wttr.in/' },
                    color: 0x13818D,
                    url: linkLokacija,
                    footer: getFooter(message),
                    title: ":mag_right: Lokacija nije pronađena!",
                    description: 'Lokacija nije pronađena, ali je zato keširana tako da nema svrhe ponovo tražiti ovu lokaciju. Za dodatne informacije pogledajte informacije o samoj komande.',
                    thumbnail: { url: 'https://i.imgur.com/qxpds3J.png' }
                }
            });
            return;
        }

        console.log(err);
        //nesto drugo se desilo
        await message.channel.createMessage({
            messageReference: getMessageReference(message),
            embed: {
                author: { name: 'Vremenska Prognoza - Wttr', url: 'https://wttr.in/' },
                color: 0x13818D,
                url: linkLokacija,
                footer: getFooter(message),
                title: errNaslov,
                description: errSadrzaj,
                thumbnail: { url: 'https://i.imgur.com/qxpds3J.png' }
            }
        });
    }
}).addSubcommand(new Command(['help', 'pomoc', '?', 'info'], async (message, args, context) => {
    await message.channel.createMessage({
        messageReference: getMessageReference(message),
        embed: {
            author: { name: 'Vremenska Prognoza - Wttr', url: 'https://wttr.in/' },
            thumbnail: { url: 'https://i.imgur.com/qxpds3J.png' },
            url: 'https://wttr.in/',
            color: 0x13818D,
            footer: getFooter(message),
            title: ':book: Pomoć',
            description: "__***Opis:***__\n• Prikazuje vremensku prognozu.\n\n__***Sva imena komande:***__\n• **vremenska**\n• **vremenskaprognoza**\n• **vreme**\n• **wttr**\n• **weather**\n\n__***Korišćenje:***__\n• **wttr** - prikazuje vremensku prognozu za Niš\n• **wttr __<LOKACIJA>__** - prikazuje vremensku prognozu __LOKACIJE__\n\n__***Додатно:***__\n• Kada se zahteva neka lokacija koju [wttr.in](https://wttr.in/) ne može da nađe i pritom se ona ne nalazi u kešu, onda se vraća statusni kod 404, a ta lokacija se kešira. Kada ponovo probamo tu nevažeću lokaciju, koja je sada keširana, vraća se statusni kod 200 i slika sa 404 porukom, iako ta lokacija ne postoji. Skraćeno izdanje: [wttr.in](https://wttr.in/) kešira 404, da bi posle vratio 200 umesto 404.\n• Nema svrhe ponovo tražiti keširanu nepronađenu lokaciju.\n• Vrlo često može da se desi da embed ne učita sliku, to je posledica hladnog starta (kešitanje na diskordovim serverima) i nije nešto na šta bot ima uticaj. Ako se ovo desi slobodno pokušavajte dok ne proradi, zato postoji mogućnost unosa lokacije! Realno gledano diskord embedi čudno linkuju sliku i onda se nekad desi da se ne poklopi url slike i url fajla u poruci.\n• __Glavni razlog jeste način na koji embed hendluje linkovanje slike i poslatog fajla. Pogrešno kešira prvi put, sve slike koje se ne vide bi trebalo da budu bidljive posle ponovnog pokretanja diskorda na računaru pošto se tad sigurno prazni keš. Na neku foru su u većini slučajeva slike vidljive na telefonu, pošto ispada da se na telefonu čeka da se pravilno učitaju. Ako se desi da se slika ne učita na telefonu, tu je makar lako da se diskord ponovo pokrene. Način da poslata slika uvek bude vidljiva jeste da se šalje bez embeda, ali embed je lepši.__"
        }
    });
}));;

module.exports = vremenskaPrognoza;