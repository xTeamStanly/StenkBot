const { randomList } = require("../../shared");
const data = require('../../../resources/commands/fun/generators/oldInsult');

const oldInsult = (req, res) => {
    const output = `Thou ${randomList(data.firstPhrase)} ${randomList(data.secondPhrase)} ${randomList(data.thirdPhrase)}!`;
    var finalJson = {
        count: 1,
        items: [{
            author: "Shakespearean Insults",
            title: output,
            color: 0xF1C40F,
            thumbnailUrl: data.image
        }]
    };

    res.json(finalJson);
};

module.exports = oldInsult;