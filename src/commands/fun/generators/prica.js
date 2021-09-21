const { randomList } = require("../../shared");
const data = require('../../../resources/commands/fun/generators/prica');

const prica = (req, res) => {
    var output = data.output;
    output = output
        .replace("[ko]", randomList(data.ko))
        .replace("[radim]", randomList(data.radim))
        .replace("[kad]", randomList(data.kad))
        .replace("[vreme]", randomList(data.vreme))
        .replace("[sta]", randomList(data.sta))
        .replace("[opasnost]", randomList(data.opasnost))
        .replace("[zakljucak]", randomList(data.zakljucak))
        .replace("[kazem]", randomList(data.kazem))
        .replace("[kaze]", randomList(data.kaze))
        .replace("[kazem2]", randomList(data.kazem2))
        .replace("[staon]", randomList(data.staOn))
        .replace("[znaci]", randomList(data.znaci))
        .replace("[stacesad]", randomList(data.staCesSad));
        output = output.replace("[uzasna]", randomList(data.uzasna));
        output = output.replace("[uzasni]", randomList(data.uzasni));
        output = output.replace("[aktivnost]", randomList(data.aktivnost));
        output = output.replace("[setam]", randomList(data.setam));
        output = output.replace("[Popijem]", randomList(data.popijem));
        output = output.replace("[kolko]", randomList(data.kolko));

    var finalJson = {
        count: 1,
        items: [{
            title: "Kratka priča",
            description: output,
            color: 0x11806A,
            thumbnailUrl: data.image
        }]
    };

    res.json(finalJson);
};

module.exports = prica;