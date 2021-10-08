const { Command } = require("yuuko");
const { getMessageReference, getFooter } = require('../../../lib/tools');
const elementsJson = require('../../../resources/commands/fun/generators/periodicData');

const jesteValidno = (unos) => {
    return (unos != null && unos !== "" && (/^[a-zA-Z\s]*$/).test(unos) === true); //!(/[^a-zA-Z]/.test(unos)) === true);
}

/**
 * @param {string} string
 * @param {string[]} pomLista
 * @param {string[]} finLista
 */
 const pretraziString = (string, pomLista, finLista) => {
    var nadjen; //pomocna promenljiva

    //prazan string, return
    if(string == "") { return true; }

    //za svaki element koji se nalazi u stringu (pomLista)
    for(let i = 0 ; i < pomLista.length; i++) {


        var simbol = pomLista[i][0];

        //ako string pocinje tim simbolom
        if(string.startsWith(simbol.toLowerCase()) == true) {

            nadjen = pretraziString(string.slice(simbol.length, string.length), pomLista, finLista);


            if(nadjen == true) {
                finLista.unshift(pomLista[i]);
                return true;
            }
        }
    }

    //nije nadjen
    return false;
};

/**
 * @param {string} string
 */
 const string2periodni = (string) => {
    var pomocnaLista = [];
    var finalnaLista = [];

    //filtriraj listu
    var elementi = elementsJson;
    for(let i = 0; i < elementsJson.length; i++) {
        //proveri da li simbol elemenata pripada (substringu) ulazu
        var index = string.search(elementi[i].symbol.toLowerCase());
        if(index != -1) {
            pomocnaLista.push([
                elementi[i].symbol,
                elementi[i].name,
                index
            ]);
        }
    }

    //sortiraj po duzini
    pomocnaLista.sort((x, y) =>  { return y[0].length - x[0].length; })

    //rekurzija
    pretraziString(string, pomocnaLista, finalnaLista);

    //array to string
    var finalnaListaLen = finalnaLista.length;
    if(finalnaListaLen != 0) {
        var title = '';
        var content = '';

        finalnaLista.forEach((item) => {
            var simbol = item[0];
            title += simbol;
            if(simbol == ' ') { content += `\n`; } else { content += `${item[0].padEnd(2, ' ')} - ${item[1]}\n`; }
        });

        return {
            naslov: title,
            sadrzaj: `\`\`\`${content}\`\`\``
        };

    } else {
        return {
            naslov: ':frowning2: Nemoguće!',
            sadrzaj: 'Ova kombinacija se ne može napraviti!'
        };
    }
}

const periodic = new Command(['periodni', 'periodic', 'chem'], async (message, args, context) => {
    var input = args.join(' ');

    var naslov;
    var sadrzaj;

    if(jesteValidno(input)) {
        if(input.length > 128) {
            naslov = ":frowning2: Previše dugačak unos";
            sadrzaj = "Unos mora biti manji od 128 karaktera!"
        } else {
            var periodni = string2periodni(input.toLowerCase());
            naslov = periodni.naslov;
            sadrzaj = periodni.sadrzaj;
        }
    } else {
        output = ':frowning2: Unos nije validan';

        if(input.length == 0) {
            sadrzaj = "Podržana je abeceda sa razmacima!";
        } else {
            sadrzaj = "Unesite nešto!"
        }

    }

    await message.channel.createMessage({
        messageReference: getMessageReference(message),
        embed: {
            author: { name: 'Periodni' },
            footer: getFooter(message),
            title: naslov,
            description: sadrzaj,
            color: 0x43A5F7,
            thumbnail: { url: 'https://i.imgur.com/xHCuCW1.png' }
        }
    });

});

module.exports = periodic;