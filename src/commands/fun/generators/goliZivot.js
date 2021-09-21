const { randomList, countOccurrences } = require("../../shared");
const data = require('../../../resources/commands/fun/generators/goliZivot');

const goliZivot = (req, res) => {
    var output = randomList(data.output);
    output = output
        .replace("[lokacija]", randomList(data.lokacija))
        .replace("[takotada]", randomList(data.takotada))
        .replace("[citat]", randomList(data.citat))
        .replace("[desavanje]", randomList(data.desavanje));

    var count;

    count = countOccurrences(output, "[dogadjaj]");
    for(let i = 0; i < count; i++) { output = output.replace("[dogadjaj]", randomList(data.dogadjaj)); }

    count = countOccurrences(output, "[lik]");
    for(let i = 0; i < count; i++) { output = output.replace("[lik]", randomList(data.lik)); }

    var finalJson = {
        count: 1,
        items: [{
            author: "Goli Život",
            title: output,
            color: 0x992D22,
            thumbnailUrl: data.image
        }]
    };

    res.json(finalJson);
};

module.exports = goliZivot;