const { randomList } = require("../../shared");
const data = require('../../../resources/commands/fun/generators/polumenta');

const rado = () => {
    var A;
    var B;
    var C;
    var D;
    var final = "";
    for(let i = 0; i < 5; i++) {
        A = randomList(data.A); A = A.charAt(0).toUpperCase() + A.slice(1);
        B = randomList(data.B);
        C = randomList(data.C);
        D = randomList(data.D);
        final += `${A}${B}${C}${D} Polumenta\n`;
    };
    return final;
};

const radodado = () => {
    var A;
    var B;
    var C;
    var D;
    var final = "";
    for(let i = 0; i < 5; i++) {
        A = randomList(data.A); A = A.charAt(0).toUpperCase() + A.slice(1);
        B = randomList(data.B);
        C = randomList(data.C);
        D = randomList(data.D);
        final += `${A}${B}${C}${D}${C}${B}${C}${D} Polumenta\n`;
    };
    return final;
};

const folotrolo = () => {
    var A;
    var B;
    var C;
    var D;
    var E;
    var final = "";
    for(let i = 0; i < 5; i++) {
        A = randomList(data.A); A = A.charAt(0).toUpperCase() + A.slice(1);
        B = randomList(data.B);
        C = randomList(data.C);
        D = randomList(data.D);
        E = randomList(data.E);
        final += `${A}${B}${C}${D}${E}${B}${C}${D} Polumenta\n`;
    };
    return final;
};

const tipovi = [ 'rado', 'radodado', 'folotrolo' ];

const polumenta = (req, res) => {
    var polumentaTip = req.query.tip;
    if(!tipovi.includes(polumentaTip)) { polumentaTip = 'rado'; }

    var output;
    switch(polumentaTip) {
        case 'rado': output = rado(); break;
        case 'radodado': output = radodado(); break;
        case 'folotrolo': output = folotrolo(); break;
    }

    var finalJson = {
        count: 1,
        items: [{
            author: "Dalje idu, dalje idu, dalje idu...",
            title: output,
            color: 0x3498DB,
            thumbnailUrl: data.image
        }]
    };

    res.json(finalJson);
}

module.exports = polumenta;