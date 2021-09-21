const { randomList } = require("../../shared");
const data = require('../../../resources/commands/fun/generators/socFirma');

const socFirma = (req, res) => {
    const output = `${randomList(data.prvideo)}${randomList(data.drugideo)}`;

    var finalJson = {
        count: 1,
        items: [{
            author: "Socijalistička firma:",
            title: output,
            color: 0x940404,
            thumbnailUrl: data.image
        }]
    };

    res.json(finalJson);
};

module.exports = socFirma;
