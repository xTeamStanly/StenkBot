

const { randomList, randomBetweenIncluding } = require('../../../lib/tools');
const data = require('../../../resources/commands/fun/generators/automobil');
const { Command } = require('yuuko');

const dvocifreni = () => { return randomBetweenIncluding(10, 99); }
const trocifren = () => { return randomBetweenIncluding(100, 999); }
const cetvorocifren = () => { return randomBetweenIncluding(1000, 9999); }
const petocifren = () => { return randomBetweenIncluding(10000, 99999); }
const latinicaSlovo = () => { return randomList(data.abeceda); }
const cirilicaSlovo = () => { return randomList(data.azbuka); }
const regionRandom = (cirilica) => { return (cirilica) ? randomList(data.azbuka) : randomList(data.abeceda); }
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
const trislova = (cirlica) => {
    if(cirilica) {
        return `${cirilicaSlovo()}${cirilicaSlovo()}${cirilicaSlovo()}`;
    } else {
        return `${latinicaSlovo()}${latinicaSlovo()}${latinicaSlovo()}`;
    }
};
const dvaslova = (cirlica) => {
    if(cirilica) {
        return `${cirilicaSlovo()}${cirilicaSlovo()}`;
    } else {
        return `${latinicaSlovo()}${latinicaSlovo()}`;
    }
};

const automobilIOIII = (req, res) => {

    var finalJson = {
        count: 1,
        items: [{
            title: "Automobil",
            //TODO thumbnailURL
            field: [ ]
        }]
    }

    //marka automobila
    const autoJson = randomList(data.modeliAutomobila);
    const autoMarka = autoJson.brand;
    const autoModel = randomList(autoJson.models);

    //registracija/tablica
    const cirilica = (Math.random() > 0.5); //random true/false
    const tipTablice = randomList(data.tipoviTablica);
    var tablica;
    switch(tipTablice) {
        case "civilna":
            tablica = `${regionRandom(cirilica)} ${generisi345()}∙${dvaslova(cirlica)}`;
            finalJson.items[0].color = 0xFAFAFA;
            break;

        case "agrokultura":
            tablica = agrokultura(cirilica);
            finalJson.items[0].color = 0x3FD5AE;
            break;
        case "moped":
            tablica = moped(cirilica);

    }

};


const automobil = new Command('auto', async (message, args, context) => {
    await message.channel.createMessage({content: "automobili xd"});
});
module.exports = automobil;