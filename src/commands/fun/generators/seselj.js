const { Command } = require('yuuko');
const { randomList, getMessageReference, getFooter, errNaslov, errSadrzaj } = require('../../../lib/tools');
const data = require('../../../resources/commands/fun/generators/seselj/seselj');

//#region
//canvas dependencies
const { Image, createCanvas, registerFont } = require('canvas');
var canvasTxt = require('canvas-txt').default;
const color = require('color');

//setup image, font
registerFont('./src/resources/commands/fun/generators/seselj/miroslav.ttf', { family: 'Miroslav' });
const templateImage = new Image();
templateImage.src = './src/resources/commands/fun/generators/seselj/template.png';

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
    let titleFinal = `${adjOne} ${title}\n${person.name}`;

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

    //canvas style
    canvasTxt.font = 'Miroslav';
    canvasTxt.fontSize = 42; //canvasTxt.fontSize = 64;
    canvasTxt.align = 'center'; //canvasTxt.debug = true;
    //canvasTxt.lineHeight = null;

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
//#endregion

//komanda
const seselj = new Command('seselj', async (message, args, context) => {
    const thumbUrl = randomList(data.image);
    const boja = generisiBoju();
    const embedBoja = boja.integer;
    var naslov = generisiNaslov();

    var userTitle = args.join(' ');
    if(userTitle != '') {
        if(userTitle.length >= 128) { userTitle = userTitle.substring(0, 128) + '...'; }
        userTitle = userTitle.replace(/(\\n)/g, '\n'); //podrzava \n u strigu :)
        naslov = userTitle;
    }

    try {

        var slika = generisiSliku(naslov, boja.hex);

        var embed = {
            author: { name: "Шешељ - Ново Шешељево дело!" },
            title: naslov,
            description: "> *Пријатно читање!*\n***Због хладног старта код кеширања,\nначина како ембед хендлује слике\nи црне магије - може се десити\nда се некад слика не учита!\nЗа додатне информације\nпогледајте инфо саме команде.***",
            color: embedBoja,
            thumbnail: { url: thumbUrl },
            image: { url: `attachment://knjiga.jpeg` },
            footer: getFooter(message),
        }

        await message.channel.createMessage({
            messageReference: getMessageReference(message),
            embed: embed
        }, { name: './knjiga.jpeg', file: slika });

    } catch(err) {
        console.log(err);
        await message.channel.createMessage({
            messageReference: getMessageReference(message),
            embed: {
                author: { name: "Шешељ - Ново Шешељево дело!" },
                title: errNaslov,
                description: errSadrzaj,
                thumbnail: { url: thumbUrl },
                color: embedBoja,
                footer: getFooter(message)
            }
        });
    }
}).addSubcommand(new Command(['help', 'pomoc', '?', 'info'], async (message, args, context) => {
    await message.channel.createMessage({
        messageReference: getMessageReference(message),
        embed: {
            author: { name: "Шешељ - Ново Шешељево дело!" },
            color: generisiBoju().integer,
            thumbnail: { url: randomList(data.image) },
            footer: getFooter(message),
            title: ':book: Помоћ',
            description: `__***Опис:***__\n• Генерише ново Шешељево дело.\n\n__***Сва имена команде:***__\n• **seselj**\n\n__***Коришћење:***__\n• **seselj** - генерише ново Шешељево дело\n• **seselj __<НАСЛОВ>__** - генерише ново Шешељево дело са __НАСЛОВ-om__\n\n__***Додатно:***__\n• Наслов подржава убацивање нових редова, где желите нови ред упишите **\\n**\n• Врло често се дешава да ембед не учита слику, то је последица хладног старта (кеширање на дискордовим серверима) и није нешто на шта бот има утицај. Ако се ово деси слободно покушавајте док не проради, зато постоји могућност уноса наслова! Реално гледано дискорд ембеди чудно линкују слику и онда се некад деси да се не поклопи урл слике и урл фајла у поруци.\n• __Главни разлог јесте начин на који ембед хендлује линковање слике и послатог фајла. Погрешно кешира први пут, све слике које се не виде би требало да буду видљиве после поновног покретања дискорда на рачунару пошто се тад сигурно празни кеш. На неку фору су у већини случајева слике видљиве на телефону, пошто испада да се на телефону чека да се правилно учитају. Ако се деси да се слика не учита на телефону, ту је макар лако да се дискорд поново покрене. Начин да послата слика увек буде видљива јесте да се шаље без ембеда, али ембед је лепши.__`
        }
    });
}));

module.exports = seselj;