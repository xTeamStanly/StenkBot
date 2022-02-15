const { Command } = require("yuuko");
const { getFooter, errSadrzaj, errNaslov, getMessageReference } = require('../../lib/tools');
const evaluator = require('math-expression-evaluator');

const simboli =
`\`\`\`+-*/   Osnovne aritmetičke operacije

Mod    Moduo (%) - x Mod y

()     Zagrade

Sigma  Suma od x do y po N - Sigma(x, y, n)

Pi     Proizvod od x do y po n - Pi(x, y, n)

n      Promenljiva po kojoj se
       vrši suma/proizvod

pi     Konstanta π = 3.1415...

e      Konstanta e = 2.7182...

C      Binarni koeficijent (kombinaicje) - xCy

P      Permutacije - xPy

!      Faktorijel

log    Logaritam x za osnovu 10 - log(x)

ln     Prirodni logaritam broj x - ln(x)

pow    Stepen broja x na broj y - pow(x, y)

^      Stepen broja x na broj y - x^y

root   Kvadratni koren broja x - root(x)

sin    Sinus - sin(x)

cos    Kosinus - cos(x)

tan    Tangens - tan(x)

asin   Arkus sinus - asin(x)

acos   Arkus kosinus - acos(x)

atan   Arkus tangens - atan(x)

sinh   Hiperbolični sinus - sinh(x)

cosh   Hiperbolični kosinus - cosh(x)

tanh   Hiperbolični tangens - tanh(x)

asinh  Arkus sinus hiperbolični - asinh(x)

acosh  Arkus kosinus hiperbolični - acosh(x)

atanh  Arkus tangens hiperbolični - atanh(x)\`\`\``;

const calculatorSimboli = new Command(['simboli', 'podrzano', 'operacije'], async (message, args, context) => {
    await message.channel.createMessage({
        messageReference: getMessageReference(message),
        embed: {
            author: { name: 'Kalkulator' },
            thumbnail: { url: 'https://i.imgur.com/J9QCQrH.png' },
            color: 0x9DD164,
            footer: getFooter(message),
            title: "Podržane operacije",
            description: simboli
        }
    });
});

const calculator = new Command(['calculator', 'kalkulator', 'eval', 'calc', 'izracunaj', 'calculate'], async (message, args, context) => {
    var naslov; var sadrzaj;

    var finalJson = {
        author: { name: 'Kalkulator' },
        thumbnail: { url: 'https://i.imgur.com/J9QCQrH.png' },
        color: 0x9DD164,
        footer: getFooter(message)
    }

    try {
        var izraz = args.join('');
        if(izraz.length < 256) {
            naslov = izraz;
            sadrzaj = evaluator.eval(izraz).toString();
        } else {
            naslov = "Previše dugačak izraz!";
            sadrzaj = "***Dužina izraza mora biti ispod 256 karaktera!***";
        }
    } catch(err) {
        console.log(err);
        naslov = ":warning: Greška! :warning:";
        sadrzaj = err.message;
        sadrzaj = `***${sadrzaj.charAt(0).toUpperCase() + sadrzaj.slice(1)}***\n\nPodkomanda ***__podrzano__*** - prikazuje šta je sve podržano`;
    }

    finalJson.title = naslov;
    finalJson.description = sadrzaj;

    await message.channel.createMessage({
        messageReference: getMessageReference(message),
        embed: finalJson
    });

}).addSubcommand(calculatorSimboli).addSubcommand(new Command(['help', 'pomoc', '?', 'info'], async (message, args, context) => {
    await message.channel.createMessage({
        messageReference: getMessageReference(message),
        embed: {
            author: { name: 'Kalkulator' },
            thumbnail: { url: 'https://i.imgur.com/J9QCQrH.png' },
            color: 0x9DD164,
            footer: getFooter(message),
            title: ':book: Pomoć',
            description: "__***Opis:***__\n• Računa zadati izraz.\n\n__***Sva imena komande:***__\n• **kalkulator**\n• **calculator**\n• **eval**\n• **calc**\n• **izracunaj**\n• **calculate**\n\n__***Podkomande:***__\n• **podrzano**, **simboli**, **operacije** - prikazuje podržane simbole i operacije\n\n__***Korišćenje:***__\n• **calc podrzano** - prikazuje podržane simbole i operacije\n• **calc __<IZRAZ>__** - prikazuje rezultat __IZRAZ-a__"
        }
    });
}));

module.exports = calculator;