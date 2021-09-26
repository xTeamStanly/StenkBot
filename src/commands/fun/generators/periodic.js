const { Command } = require('yuuko');
const elementsJson = require('../../../resources/commands/fun/generators/periodic');

const lista2json = (lista) => {
    var izlaz = { elementi: [] };
    for(let i = 0; i < lista.length; i++) {
        izlaz.elementi[i] = {
            simbol: lista[i][0],
            naziv: lista[i][1]
        }
    }
    return izlaz;
};

const lista2string = (lista, skockaj) => {
    var output = "";

    if(skockaj) {
        for(let i = 0; i < lista.length; i++) {
            output += `*${lista[i][0]}* - ${lista[i][1]}\n`;
        }
    } else {
        for(let i = 0; i < lista.length; i++) {
            output += `${lista[i][0]} - ${lista[i][1]}\n`;
        }
    }

    return output;
};


// const lista2string = (lista) => {
//     var izlaz = "";
//     for(let i = 0; i < lista.length; i++) {
//         izlaz += `${lista[i][0]} - ${lista[i][1]}\n`;
//     }
//     return izlaz;
// };

var pomocnaLista;
var finalnaLista;

const nadjiElementPrekoSimbola = (simbol) => {
    const slovo = simbol.toLowerCase();
    for(let i = 0; i < elementsJson.length; i++) {
        if(elementsJson[i].symbol.toLowerCase() == slovo) {
            return elementsJson[i];
        }
    }
    return null;
}

const filtrirajListu = (ulaz) => {
    var elementi = elementsJson;

    for(let i = 0; i < elementi.length; i++) {
        //proveri da li simbol elementa pripada (substring) ulazu
        var index = ulaz.search(elementi[i].symbol.toLowerCase());
        if(index != -1) {
            pomocnaLista.push([ //json bi mozda bio sporiji?
                elementi[i].symbol,
                elementi[i].name,
                index
            ]);
        }
    }

    //sortiranje po duzini stringa (opadajuce)
    pomocnaLista.sort((x, y) =>  { return y[0].length - x[0].length; })
}

const pretraziString = (string) => {
    var nadjen;

    //prazan string --> kraj
    if(string === '') { return true; }

    for(let i = 0; i < pomocnaLista.length; i++) {
        if(string.startsWith(pomocnaLista[i][0].toLowerCase()) == true) {
            nadjen = pretraziString(string.slice(pomocnaLista[i][0].length, string.length));
            if(nadjen == true) {
                finalnaLista.unshift(pomocnaLista[i]);
                return true;
            }
        }
    }

    //nije nadjen --> false
    return false;
};

const string2periodni = (string) => {
    pomocnaLista = []; finalnaLista = [];
    filtrirajListu(string);
    var final = "";

    if(pretraziString(string) == false) {
        //TODO
        var nemaPoruka = "Nema, al moz da probam!";

        //TODO da li uopste treba da pokazem pokusaj, ako nemam pravu kombinaciju??
        if(pomocnaLista.length != 0) {
            pomocnaLista.sort((x, y) => { return x[2] - y[2]; })
            //final += `${nemaPoruka}\n${lista2string(pomocnaLista)}`;

            //final = lista2json(pomocnaLista);
            final = lista2string(pomocnaLista);

            final.message = nemaPoruka;
        } else {
            final = nemaPoruka;
        }

    //todo da li je ovo potrebno??
    //nije jer imamo check za prazan string
    } else if(finalnaLista.length == 0) {
        final = "DIIBIDUS PRAZNO!";
    } else {
        //final = lista2string(finalnaLista);

        //final = lista2json(finalnaLista);
        final = lista2string(finalnaLista);

        final.unos = string;
        //todo ubaci da u pomocnoj listi budu nadjeni "sirovi" elementi iz json-a
        //nadjiElementPrekoSimbola funkcija


    }

    return final;
};

const jesteValidno = (unos) => {
    return (unos != null && unos !== "" && (/^[a-zA-Z\s]*$/).test(unos) === true); //!(/[^a-zA-Z]/.test(unos)) === true);
}

//TODO SLIKA ZA PERIODIC
const periodic = new Command('periodic', async (message, args, context) => {
    //TODO PARSE & HANDLE EMPTY INPUT MESSAGE
    //za sad pp da input nije empty

    var input = args.join(' ');
    if(jesteValidno(input)) {
        finalJson = string2periodni(input.toLowerCase());
    } else {
        //TODO HANDLE ERROR
        finalJson = 'error';
    }

    console.log(finalJson);

});

//TODO RESPONSE
//TODO VALIDIRAJ OUTPUT
//TODO SKOCKAJ
//TODO RECENICA
const periodic0 = (req, res) => {
    var input = req.query.input;
    const skockaj = (req.query.skockaj === "true");
    var finalJson;

    if (jesteValidno(input)) {

        //input = input.replace(/ /g, "");

        finalJson = string2periodni(input.toLowerCase());
        //finalJson.unos = input;
    } else {
        //TODO HANDLE ERROR

        finalJson = "error";
    }
    res.end(finalJson);
};

module.exports = periodic;