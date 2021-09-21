const { randomList } = require("../../shared");
const data = require('../../../resources/commands/fun/generators/novine');

const novine = (req, res) => {
    var output = randomList(data.output);
    output = output
        .replace("[intro]", randomList(data.intro))
        .replace("[celebmale]", randomList(data.celebmale))
        .replace("[celebfemale]", randomList(data.celebfemale))
        .replace("[location]", randomList(data.location))
        .replace("[verbfemale]", randomList(data.verbfemale))
        .replace("[verbmale]", randomList(data.verbmale))
        .replace("[object]", randomList(data.object))
        .replace("[whose]", randomList(data.whose))
        .replace("[postfix]", randomList(data.postfix))
        .replace("[objectPerson]", randomList(data.objectPerson));

    var finalJson = {
        count: 1,
        items: [{
            author: "StenkAI Novine!",
            title: output,
            color: 0x3498DB,
            thumbnailUrl: data.image
        }]
    };

    res.json(finalJson);
};

module.exports = novine;