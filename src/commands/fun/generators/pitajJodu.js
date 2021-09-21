const { randomList } = require('../../shared');
const data = require('../../../resources/commands/fun/generators/pitajJodu');

const pitajJodu = (req, res) => {
    const output = randomList(data.response);

    var finalJson = {
        count: 1,
        items: [{
            author: "Hmmmm",
            title: output.type,
            description: output.message,
            color: 0x2ECC71,
            thumbnailUrl: data.image
        }]
    };

    res.json(finalJson);
};

module.exports = pitajJodu;