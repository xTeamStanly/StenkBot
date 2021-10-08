

const { randomList, randomBetweenIncluding, getMessageReference, getFooter } = require('../../../lib/tools');
const data = require('../../../resources/commands/fun/generators/automobil');
const { Command } = require('yuuko');

const dvocifreni = () => { return randomBetweenIncluding(10, 99); }
const trocifren = () => { return randomBetweenIncluding(100, 999); }
const cetvorocifren = () => { return randomBetweenIncluding(1000, 9999); }
const petocifren = () => { return randomBetweenIncluding(10000, 99999); }
const latinicaSlovo = () => { return randomList(data.abeceda); }
const cirilicaSlovo = () => { return randomList(data.azbuka); }
const regionRandom = (cirilica) => { return (cirilica) ? randomList(data.regioniTablicaCYR) : randomList(data.regioniTablicaLAT); }
const generisi345 = () => {
    const cifre = randomBetweenIncluding(3, 5);
    switch(cifre) {
        case 3: return `${trocifren()}`;
        case 4: return  `${cetvorocifren()}`;
        case 5: return `${petocifren()}`;
    };

    //ako se nesto prejebe
    return "000";
};
const trislova = (cirilica) => { if(cirilica) { return `${cirilicaSlovo()}${cirilicaSlovo()}${cirilicaSlovo()}`; } else { return `${latinicaSlovo()}${latinicaSlovo()}${latinicaSlovo()}`; } };
const dvaslova = (cirilica) => { if(cirilica) { return `${cirilicaSlovo()}${cirilicaSlovo()}`; } else { return `${latinicaSlovo()}${latinicaSlovo()}`; } };

const automobil = new Command(['auto', 'automobil', 'kola'], async (message, args, context) => {

    var autoData = { brend: '', model: '', registracija: '' }

    //marka automobila
    const autoJson = randomList(data.modeliAutomobila);
    autoData.brend = autoJson.brand;
    autoData.model = randomList(autoJson.models);

    //registracija/tablica
    const cirilica = (Math.random() > 0.5); //random true/false
    const tipTablice = randomList(data.tipoviTablica);
    var tablica; var boja;
    switch(tipTablice) {
        case "civilna":
            tablica = `${regionRandom(cirilica)} ${generisi345()}∙${dvaslova(cirilica)}`;
            boja = 0xFAFAFA;
            break;
        case "agrokultura":
            tablica = `${regionRandom(cirilica)} ${dvocifreni()}∙${trislova()}`;
            boja = 0x3FD5AE;
            break;
        case "moped":
            tablica = `${regionRandom(cirilica)} ${trocifren()}∙${dvocifreni()}`;
            boja = 0xE6AA1B;
            break;
        case "prikolica":
            tablica = `${dvaslova()}∙${generisi345()} ${regionRandom(cirilica)}`;
            boja = 0xFAFAFA;
            break;
        case "taxi":
            tablica = `${regionRandom(cirilica)} ${generisi345()}∙TX`;
            boja = 0xFAFAFA;
            break;
        case "diplomatska":
            tablica = `${randomBetweenIncluding(10, 144)}∙${randomList(data.diplomatskiSimbol)}∙${trocifren()}`;
            boja = 0x010000;
            break;
        case "izvozna":
            tablica = `${trislova(cirilica)} ${regionRandom(cirilica)}∙${trocifren()}`;
            boja = 0xFAFAFA;
            break;
        case "vojna":
            tablica = `${randomList(data.vojniSimbol)} - ${cetvorocifren()}`;
            boja = 0xE6E2D9;
            break;
        case "policijska":
            tablica = `P ${trocifren()}∙${trocifren()}`;
            boja = 0x114080;
            break;
    }

    await message.channel.createMessage({
        messageReference: getMessageReference(message),
        embed: {
            author: { name: "Automobil", url: 'https://en.wikipedia.org/wiki/Vehicle_registration_plates_of_Serbia#Special_license_plates' },
            title: `${message.author.username}#${message.author.discriminator} vozi ...`,
            color: boja,
            thumbnail: { url: 'https://i.imgur.com/R118ElN.png' },
            fields: [
                {
                    name: ":race_car: Vozilo",
                    value: `${autoData.brend} ${autoData.model}`,
                    inline: true,
                },
                {
                    name: ":hash: Tablica",
                    value: `${tablica} (${tipTablice})`,
                    inline: true,
                }
            ],
            footer: getFooter(message)
        }
    });
});

module.exports = automobil;