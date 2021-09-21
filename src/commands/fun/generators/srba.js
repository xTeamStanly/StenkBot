const { randomList } = require('../../shared');
const data = require('../../../resources/commands/fun/generators/srba');

const srba = (req, res) => {
    var output = req.query.poslovica ? req.query.poslovica : randomList(data.poslovica);

    //TODO SRBA MODULARNE AKCIJE
    const akcija = req.query.akcija ? req.query.akcija : randomList(data.akcija);

    const link = randomList(data.image);

    if(!output.endsWith('.') && !output.endsWith('!') && !output.endsWith('?')) {
        output += '.';
    }

    var finalJson = {
        count: 1,
        items: [{
            author: "Srba kaže:",
            title: output,
            description: akcija,
            color: 0x1F8B4C,
            thumbnailUrl: link
        }]
    };

    res.json(finalJson);
};

module.exports = srba;