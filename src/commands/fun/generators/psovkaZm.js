const { randomList, countOccurrences } = require("../../shared");
const data = require('../../../resources/commands/fun/generators/psovkaZm');

const maxBrPrideva = 5;
const minBrPrideva = 1;

const psovkaZm = (req, res) => {
    //broj prideva izmedju 1 i 5
    const brojPrideva = Math.floor(Math.random() * (maxBrPrideva - minBrPrideva + 1) + minBrPrideva);

    var trenutniPridev;
    var i = 0;
    var psovka = '';

    //postoji minimalna sansa da zauvek ostane u ovoj petlji :/
    do {
        trenutniPridev = randomList(data.atribut);
        if(countOccurrences(psovka, trenutniPridev) == 0) {
            psovka += `${trenutniPridev} `;
            i++;
        }
    } while(i != brojPrideva);

    psovka += `${randomList(data.kraj)}!`;
    psovka = psovka.charAt(0).toUpperCase() + psovka.slice(1);

    var finalJson = {
        count: 1,
        items: [{
            author: "Ti si jedna...",
            title: psovka,
            color: 0x992D22
        }]
    };

    res.json(finalJson);
};

module.exports = psovkaZm;