const { randomList } = require('../../shared');
const data = require('../../../resources/commands/fun/generators/brkicajzer');

const brkicajzer = (req, res) => {
    var output = data.output;
    output = output
        .replace("[stranac]", randomList(data.stranac))
        .replace("[uradio]", randomList(data.uradio))
        .replace("[ljubavnik]", randomList(data.ljubavnik))
        .replace("[faktori]", randomList(data.faktori))
        .replace("[olos]", randomList(data.olos))
        .replace("[zemlja]", randomList(data.zemlja))
        .replace("[tehnologija]", randomList(data.tehnologija))
        .replace("[tone]", randomList(data.tone))
        .replace("[pretvara]", randomList(data.pretvara))
        .replace("[bolest]", randomList(data.bolest));

    var finalJson = {
        count: 1,
        items: [{
            title: "Brkićajzer kaže",
            description: output,
            color: 0xC27C0E,
            thumbnailUrl: data.image
        }]
    };

    res.json(finalJson);
};

module.exports = brkicajzer;