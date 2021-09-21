const { randomList } = require('../../shared');
const data = require('../../../resources/commands/fun/generators/eightBall');

const eightBall = (req, res) => {
    const output = randomList(data.response);
    var color;

    switch(output.type) {
        case 'bad': color = 0xE74C3C; break;
        case 'neutral': color = 0xF1C40F; break;
        case 'good': color = 0x2ECC71; break;
    }

    var finalJson = {
        count: 1,
        items: [{
            author: "Magična 8Ball kugla kaže:",
            title: output.message,
            color: color,
            thumbnailUrl: data.image
        }]
    };

    res.json(finalJson);
};

module.exports = eightBall;