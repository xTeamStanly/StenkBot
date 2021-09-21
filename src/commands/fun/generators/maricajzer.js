const { randomList, countOccurrences } = require("../../shared");
const data = require('../../../resources/commands/fun/generators/maricajzer');

const maricajzer = (req, res) => {
    var output = randomList(data.output);
    output = output
        .replace("[citat]", randomList(data.citat))
        .replace("[takotada]", randomList(data.takotada))
        .replace("[desavanje]", randomList(data.desavanje))
        .replace("[lokacija]", randomList(data.lokacija));

    var count;

    count = countOccurrences(output, "[dogadjaj]");
    for(let i = 0; i < count; i++) { output = output.replace("[dogadjaj]", randomList(data.dogadjaj)); }

    count = countOccurrences(output, "[lik]");
    for(let i = 0; i < count; i++) { output = output.replace("[lik]", randomList(data.lik)); }

    var finalJson = {
        count: 1,
        items: [{
            title: "Marićajzer kaze:",
            description: output,
            color: 0xA84300,
            thumbnailUrl: data.image
        }]
    };

    res.json(finalJson);
};

module.exports = maricajzer;