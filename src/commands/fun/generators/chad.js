const { Command } = require('yuuko');
const { randomList, getMessageReference, getFooter, errNaslov, errSadrzaj } = require('../../../lib/tools');
const data = require('../../../resources/commands/fun/generators/chad/chad');

//#region
//canvas dependencies
const { Image, createCanvas } = require('canvas');
var canvasTxt = require('canvas-txt').default;
//canvasTxt.lineHeight
//setup image
const templateImage = new Image();
templateImage.src = './src/resources/commands/fun/generators/chad/template.jpg';

//dimenzije i racunica za poziciju
const width = 600;
const height = 800;
const kutija = {
    sirina: 450,
    visina: 140
}
const polutke = {
    x: width / 2,
    y: height / 2
}
const koordinateKutije = {
    x: polutke.x - (kutija.sirina / 2),
    y: 60//polutke.y - (kutija.visina / 2)
}

//generisanje knjige
const generisiSliku = (naslov) => {

    //canvas style
    canvasTxt.font = 'Times New Roman';
    canvasTxt.fontSize = 36;
    canvasTxt.align = 'center';
    //canvasTxt.lineHeight = 35;

    const canvas = createCanvas(width, height);
    const ctx = canvas.getContext('2d');
    ctx.drawImage(templateImage, 0, 0);

    //ctx.shadowColor = 'black';
    //ctx.shadowBlur = 2;
    //ctx.shadowOffsetX = 2;
    //ctx.shadowOffsetY = 2;

    canvasTxt.drawText(ctx, naslov, koordinateKutije.x, koordinateKutije.y, kutija.sirina, kutija.visina);

    return canvas.toBuffer('image/jpeg', { quality: 1 });
}
//#endregion

//komanda
const chad = new Command('chad', async (message, args, context) => {

    var naslov = args.join(' ');

    if(naslov != '') {
        naslov = naslov.replace(/\s\s+/g, ' ').trim(); //vise razmaka u jedan + trim
        if(naslov.length >= 80) { naslov = naslov.substring(0, 80) + '...'; }
    } else {
        naslov = randomList(data.citati);
    }

    try {

        var slika = generisiSliku(naslov);

        var embed = {
            author: { name: "Chad" },
            title: naslov,
            description: `Ako slika ne bude vidljiva, razlog se nalazi u informacijama o samoj komandi.`,
            color: 0x5D5D5D,
            thumbnail: { url: data.image },
            image: { url: `attachment://chad.jpg` },
            footer: getFooter(message),
        }

        await message.channel.createMessage({
            messageReference: getMessageReference(message),
            embed: embed
        }, { name: './chad.jpg', file: slika });

    } catch(err) {
        console.log(err);
        await message.channel.createMessage({
            messageReference: getMessageReference(message),
            embed: {
                author: { name: "Chad" },
                title: errNaslov,
                thumbnail: { url: data.image },
                description: errSadrzaj,
                color: 0x5D5D5D,
                footer: getFooter(message)
            }
        });
    }
}).addSubcommand(new Command(['help', 'pomoc', '?', 'info'], async (message, args, context) => {
    await message.channel.createMessage({
        messageReference: getMessageReference(message),
        embed: {
            author: { name: "Chad" },
            color: 0x5D5D5D,
            thumbnail: { url: data.image },
            footer: getFooter(message),
            title: ':book: Помоћ',
            description: "__***Opis:***__\n• Generiše sliku Chad-a sa tekstom.\n\n__***Sva imena komande:***__\n• **chad**\n\n__***Korišćenje:***__\n• **chad** - generiše novu sliku\n• **chad __<TEKST>__** - generiše novu sliku sa __TEKST-om__\n\n__***Додатно:***__\n• Vrlo često može da se desi da embed ne učita sliku, to je posledica hladnog starta (kešitanje na diskordovim serverima) i nije nešto na šta bot ima uticaj. Ako se ovo desi slobodno pokušavajte dok ne proradi, zato postoji mogućnost unosa lokacije! Realno gledano diskord embedi čudno linkuju sliku i onda se nekad desi da se ne poklopi url slike i url fajla u poruci.\n• __Glavni razlog jeste način na koji embed hendluje linkovanje slike i poslatog fajla. Pogrešno kešira prvi put, sve slike koje se ne vide bi trebalo da budu bidljive posle ponovnog pokretanja diskorda na računaru pošto se tad sigurno prazni keš. Na neku foru su u većini slučajeva slike vidljive na telefonu, pošto ispada da se na telefonu čeka da se pravilno učitaju. Ako se desi da se slika ne učita na telefonu, tu je makar lako da se diskord ponovo pokrene. Način da poslata slika uvek bude vidljiva jeste da se šalje bez embeda, ali embed je lepši.__"
        }
    });
}));

module.exports = chad;