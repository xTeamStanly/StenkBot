const { Command } = require('yuuko');
const { randomList, getMessageReference, getFooter, errNaslov, errSadrzaj } = require('../../../lib/tools');
const data = require('../../../resources/commands/fun/generators/seselj/seselj');


//canvas dependencies
const { Image, createCanvas, registerFont } = require('canvas');
const canvasTxt = require('canvas-txt').default;
const color = require('color');

//setup image, font, canvas style
//registerFont('./../../../resources/commands/fun/generators/seselj/miroslav.ttf', { family: 'Miroslav' });
registerFont('./src/resources/commands/fun/generators/seselj/miroslav.ttf', { family: 'Miroslav' });
const templateImage = new Image();
templateImage.src = './src/resources/commands/fun/generators/seselj/template.png';
canvasTxt.font = 'Miroslav';
canvasTxt.fontSize = 42; //canvasTxt.fontSize = 64;
canvasTxt.align = 'center'; //canvasTxt.debug = true;

//boje gradijenta
const svetlija = "#E5CF56"; //#dbd5ba
const tamniija = "#d4c634"; //#8a7359

//dimenzije i racunica za poziciju
const width = 566;
const height = 800;
const kutija = {
    sirina: 480,
    visina: 450
}
const polutke = {
    x: width / 2,
    y: height / 2
}
const koordinateKutije = {
    x: polutke.x - (kutija.sirina / 2),
    y: polutke.y - (kutija.visina / 2)
}
const gradijentTacke = {
    x: koordinateKutije.x + kutija.sirina / 2, //x0 i x1
    y: 0
}

//generisanje naslova
const generisiNaslov = (sansaZaDvaPrideva = 0.2) => {
    //odaberi nasumicno
	let person = randomList(data.people);
	let titleObject = randomList(data.titles);
    let alt = titleObject.gendered && (titleObject.gender_main !== person.gender);

	//pogodi mu rod
    let title = (alt) ? titleObject.word_alt : titleObject.word_main;
	let title_gender = (alt) ? titleObject.gender_alt : titleObject.gender_main;

	//prvi i drugi pridev
    let first_adj = randomList(data.adjectives);
	let second_adj = randomList(data.adjectives);

	//prvi i drugi pridev + rod
    let adjOne = ""; let adjTwo = "";
    switch(title_gender) {
        case "n":
            adjOne = first_adj.n;
            adjTwo = second_adj.n;
            break;
        case "f":
            adjOne = first_adj.f;
            adjTwo = second_adj.f;
            break;
        case "m":
            adjOne = first_adj.m;
            adjTwo = second_adj.m;
            break;
    };

	//koristi samo prvi
    let titleFinal = `${adjOne} ${title} ${person.name}`;

	//dal da koristim i drugi?
    let usetwoadjectives = (Math.random() < sansaZaDvaPrideva) && (first_adj != second_adj);
    if(usetwoadjectives) { titleFinal = `${adjTwo} ${titleFinal}`; }

	titleFinal = titleFinal.charAt(0).toUpperCase() + titleFinal.slice(1); //prvo slovo je veliko

	return titleFinal;
}

//generisanje boje
const generisiBoju = () => {
    const h = Math.random() * 360;
    const s = (30 + 40 * Math.random()); //20 20
    const l = (20 + 40 * Math.random()); //10 30

    const hsl = color.hsl(h, s, l);

    return {
        integer: hsl.rgbNumber(),
        hex: hsl.hex()
    }
}

//generisanje knjige
const generisiSliku = (naslov, bojaHex) => {

    const canvas = createCanvas(width, height);
    const ctx = canvas.getContext('2d');

    const visinaTeksta = canvasTxt.drawText(ctx, naslov, koordinateKutije.x, koordinateKutije.y, kutija.sirina, kutija.visina).height;
    ctx.fillStyle = bojaHex;
    ctx.fillRect(0, 0, width, height);
    ctx.drawImage(templateImage, 0, 0);

    gradijentTacke.y =  koordinateKutije.y + (kutija.visina - visinaTeksta)*0.5;
    const gradient = ctx.createLinearGradient(
        gradijentTacke.x,
        gradijentTacke.y,
        gradijentTacke.x,
        gradijentTacke.y + 10 + visinaTeksta
    );

    gradient.addColorStop(0, svetlija);
    gradient.addColorStop(1, tamniija);
    ctx.fillStyle = gradient;
    ctx.shadowColor = 'black';
    ctx.shadowBlur = 2;
    ctx.shadowOffsetX = 2;
    ctx.shadowOffsetY = 2;
    canvasTxt.drawText(ctx, naslov, koordinateKutije.x, koordinateKutije.y, kutija.sirina, kutija.visina);

    return canvas.toBuffer('image/jpeg', { quality: 1 });
}

//komanda
const seselj = new Command('seselj', async (message, args, context) => {
    const thumbUrl = randomList(data.image);
    const boja = generisiBoju();
    const embedBoja = boja.integer;
    var naslov = generisiNaslov();

    var userTitle = args.join(' ');
    if(userTitle != '') {
        if(userTitle.length >= 100) { userTitle = userTitle.substring(0, 100) + '...'; }
        naslov = userTitle;
    }

    try {
        const slikaBuffer = generisiSliku(naslov, boja.hex);
        await message.channel.createMessage({
            messageReference: getMessageReference(message),
            embed: {
                author: { name: "Шешељ - Ново Шешељево дело!" },
                title: naslov,
                description: "*Пријатно читање!*\n\n\n***Због уплоад-а, може да се деси\nда нека слика неће да ради!***",
                color: embedBoja,
                thumbnail: { url: thumbUrl },
                image: { url: `attachment://knjiga.jpg` },
                footer: getFooter(message),
            }
        }, { name: 'knjiga.jpg', file: slikaBuffer });
    } catch(err) {
        console.log(err);
        await message.channel.createMessage({
            messageReference: getMessageReference(message),
            embed: {
                author: { name: "Шешељ - Ново Шешељево дело!" },
                title: errNaslov,
                description: errSadrzaj,
                color: embedBoja,
                footer: getFooter(message)
            }
        });
    }
});

module.exports = seselj;