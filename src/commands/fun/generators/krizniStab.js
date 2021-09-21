const { randomList } = require("../../shared");
const data = require('../../../resources/commands/fun/generators/krizniStab');

const krizniStab = (req, res) => {
    const output = `${randomList(data.mesec)} ${randomList(data.dan)} ${randomList(data.godina)}!`;
    var finalJson = {
        count: 1,
        items: [{
            author: "Nova Covid19 mera glasi: ",
            title: output,
            color: 0x2ECC71,
            thumbnailUrl: data.image
        }]
    };

    res.json(finalJson);
};

module.exports = krizniStab;