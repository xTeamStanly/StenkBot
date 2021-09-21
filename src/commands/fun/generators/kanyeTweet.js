const { randomList } = require("../../shared");
const data = require('../../../resources/commands/fun/generators/kanyeTweet');

const kanyeTweet = (req, res) => {
    var finalJson = {
        count: 1,
        items: [{
            title: "Kanye kaže:",
            description: randomList(data.quotes),
            color: 0xC27C0E,
            thumbnailUrl: randomList(data.image)
        }]
    };

    res.json(finalJson);
};

module.exports = kanyeTweet;
