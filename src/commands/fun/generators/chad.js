const { Command } = require('yuuko');
const { randomList, getMessageReference, getFooter, errNaslov, errSadrzaj } = require('../../../lib/tools');
const data = require('../../../resources/commands/fun/generators/chad/chad');

//#region
//canvas dependencies
const { Image, createCanvas, registerFont } = require('canvas');
var canvasTxt = require('canvas-txt').default;

//setup image, font
registerFont('./src/resources/commands/fun/generators/chad/timesnewroman.ttf', { family: 'Times New Roman' });
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
            title: ':book: ??????????',
            description: "__***Opis:***__\n??? Generi??e sliku Chad-a sa tekstom.\n\n__***Sva imena komande:***__\n??? **chad**\n\n__***Kori????enje:***__\n??? **chad** - generi??e novu sliku\n??? **chad __<TEKST>__** - generi??e novu sliku sa __TEKST-om__\n\n__***??????????????:***__\n??? Vrlo ??esto mo??e da se desi da embed ne u??ita sliku, to je posledica hladnog starta (ke??itanje na diskordovim serverima) i nije ne??to na ??ta bot ima uticaj. Ako se ovo desi slobodno poku??avajte dok ne proradi, zato postoji mogu??nost unosa lokacije! Realno gledano diskord embedi ??udno linkuju sliku i onda se nekad desi da se ne poklopi url slike i url fajla u poruci.\n??? __Glavni razlog jeste na??in na koji embed hendluje linkovanje slike i poslatog fajla. Pogre??no ke??ira prvi put, sve slike koje se ne vide bi trebalo da budu bidljive posle ponovnog pokretanja diskorda na ra??unaru po??to se tad sigurno prazni ke??. Na neku foru su u ve??ini slu??ajeva slike vidljive na telefonu, po??to ispada da se na telefonu ??eka da se pravilno u??itaju. Ako se desi da se slika ne u??ita na telefonu, tu je makar lako da se diskord ponovo pokrene. Na??in da poslata slika uvek bude vidljiva jeste da se ??alje bez embeda, ali embed je lep??i.__"
        }
    });
}));

module.exports = chad;