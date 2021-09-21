const { randomList } = require("../../shared");
const data = require('../../../resources/commands/fun/generators/niskePrice');

const niskePrice = (req, res) => {
    var output = randomList(data.output);
    output = output
        .replace("[animal]", randomList(data.animal))
        .replace("[adjective]", randomList(data.adjective))
        .replace("[verb]", randomList(data.verb))
        .replace("[location]", randomList(data.location))
        .replace("[object]", randomList(data.object))
        .replace("[object2]", randomList(data.object2));

    var finalJson = {
        count: 1,
        items: [{
            title: "Danas u Niš: ",
            description: output,
            color: 0xE91E63,
            thumbnailUrl: data.image
        }]
    };

    res.json(finalJson);
};

module.exports = niskePrice;