const { randomList, countOccurrences } = require('../../shared');
const data = require('../../../resources/commands/fun/generators/beogradskePrice');

const beogradskePrice = (req, res) => {
    var output = data.output;

    //nezavisni
    output = output
        .replace("[fiksa]", randomList(data.fiksa))
        .replace("[cime]", randomList(data.cime))
        .replace("[kada]", randomList(data.kada))
        .replace("[kakvim]", randomList(data.kakvim))
        .replace("[kojim]", randomList(data.kojim))
        .replace("[lokacija]", randomList(data.lokacija))
        .replace("[oni]", randomList(data.oni));

    //normalne zamene
    output = output
        .replace("[rade]", randomList(data.rade))
        .replace("[zakljucak]", randomList(data.zakljucak))
        .replace("[inat]", randomList(data.inat))
        .replace("[primer]", randomList(data.primer))
        .replace("[reminiscencija]", randomList(data.reminiscencija))
        .replace("[zemlju]", randomList(data.zemlju))
        .replace("[protest]", randomList(data.protest))
        .replace("[bend]", randomList(data.bend))
        .replace("[nekoga]", randomList(data.nekoga));

    var count;

    //zameni [uradili]
    count = countOccurrences(output, "[uradili]");
    for(let i = 0; i < count; i++) { output = output.replace("[uradili]", randomList(data.uradili)); }

    //zameni [nema]
    count = countOccurrences(output, "[nema]");
    for(let i = 0; i < count; i++) { output = output.replace("[nema]", randomList(data.uradili)); }

    //zameni [lokacija2]
    count = countOccurrences(output, "[lokacija2]");
    for(let i = 0; i < count; i++) { output = output.replace("[lokacija2]", randomList(data.lokacija2)); }

    //zameni [pretvorili]
    count = countOccurrences(output, "[pretvorili]");
    for(let i = 0; i < count; i++) { output = output.replace("[pretvorili]", randomList(data.pretvorili)); }

    //zameni [pretvorili2]
    count = countOccurrences(output, "[pretvorili2]");
    for(let i = 0; i < count; i++) { output = output.replace("[pretvorili2]", randomList(data.pretvorili2)); }

    //zameni [lik]
    count = countOccurrences(output, "[lik]");
    for(let i = 0; i < count; i++) { output = output.replace("[lik]", randomList(data.lik)); }

    //zameni [dzoni]
    count = countOccurrences(output, "[dzoni]");
    for(let i = 0; i < count; i++) { output = output.replace("[dzoni]", randomList(data.dzoni)); }

    //zameni [benda]
    count = countOccurrences(output, "[benda]");
    for(let i = 0; i < count; i++) { output = output.replace("[benda]", randomList(data.benda)); }

    //zameni [predgradje]
    count = countOccurrences(output, "[predgradje]");
    for(let i = 0; i < count; i++) { output = output.replace("[predgradje]", randomList(data.predgradje)); }

    //zameni [koga]
    count = countOccurrences(output, "[koga]");
    for(let i = 0; i < count; i++) { output = output.replace("[koga]", randomList(data.koga)); }

    var finalJson = {
        count: 1,
        items: [{
            title: "Beogradske priče",
            description: output,
            color: 0xAD1457,
            thumbnailUrl: data.image
        }]
    };

    res.json(finalJson);
};

module.exports = beogradskePrice;