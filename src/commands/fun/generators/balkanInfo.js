const { randomList } = require('../../shared');
const data = require('../../../resources/commands/fun/generators/balkanInfo');

const balkanInfo = (req, res) => {
    var output = randomList(data.output);
    output = output
        .replace("[grupa]", randomList(data.grupa))
        .replace("[lokacija]", randomList(data.lokacija))
        .replace("[adjective]", randomList(data.adjective))
        .replace("[victims]", randomList(data.victims))
        .replace("[vek]", randomList(data.vek))
        .replace("[ostaci]", randomList(data.ostaci))
        .replace("[vrstaLobija]", randomList(data.vrstaLobija))
        .replace("[uradi]", randomList(data.uradi))
        .replace("[kome]", randomList(data.kome))
        .replace("[urucan]", randomList(data.urucan))
        .replace("[rucan]", randomList(data.rucan))
        .replace("[sila]", randomList(data.sila))
        .replace("[jado]", randomList(data.jado))
        .replace("[staCe]", randomList(data.staCe))
        .replace("[znalac]", randomList(data.znalac))
        .replace("[znanje]", randomList(data.znanje))
        .replace("[losUzor]", randomList(data.losUzor))
        .replace("[dobarUzor]", randomList(data.dobarUzor))
        .replace("[zlocinac]", randomList(data.zlocinac))
        .replace("[osporavaci]", randomList(data.osporavaci))
        .replace("[mesto]", randomList(data.mesto))
        .replace("[plen]", randomList(data.plen))
        .replace("[neki]", randomList(data.neki))
        .replace("[nauk]", randomList(data.nauk))
        .replace("[nenauk]", randomList(data.neNauk))
        .replace("[nagrde]", randomList(data.nagrde))
        .replace("[zastitnik]", randomList(data.zastitnik))
        .replace("[mocni]", randomList(data.mocni));

    var finalJson = {
        count: 1,
        items: [{
            author: "Dobar dan, ja sam Teša Tešanović, dobrodošli u današnju emisiju, tema ove emisije je ...",
            title: output,
            color: 0xAD1457,
            thumbnailUrl: data.image
        }]
    };

    res.json(finalJson);
};

module.exports = balkanInfo;