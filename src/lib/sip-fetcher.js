/* -- sip fetcher v2.1.0 -- */
const axios = require('axios');
const cheerio = require('cheerio'); require('colors');
const { stenkLog } = require('../lib/botHelper');
const { sipFetcherGetData, sipFetcherSetData } = require('./storage');

var stariPostoviLevi;
var noviPostoviLevi;
var stariPostoviDesni;
var noviPostoviDesni;

//ovo se prvo pokrece
(async () => {
    await stenkLog('SIP FETCHER', 'yellow', 'READING FROM DATABASE...');
    [stariPostoviLevi, noviPostoviLevi, stariPostoviDesni, noviPostoviDesni] = sipFetcherGetData();
    await stenkLog('SIP FETCHER', 'green', 'READ FROM DATABASE!');
})();

const fetchPostovi = async () => {

    await stenkLog('SIP FETCHER', 'red', 'TASK STARTED');

    const html = await axios.get('https://sip.elfak.ni.ac.rs/');
    await stenkLog('SIP FETCHER', 'yellow', 'FETCH ENDED');

    const $ = cheerio.load(html.data);
    await stenkLog('SIP FETCHER', 'blue', 'PARSE ENDED');

    stariPostoviLevi = noviPostoviLevi;
    noviPostoviLevi = [];

    stariPostoviDesni = noviPostoviDesni;
    noviPostoviDesni = [];

    $('div.news-box:eq(0)').children('ul').children('li').each((i, node) => {
        const item = $(node);
        const datum = item.children('p:first').text();
        const naslov = item.children('h4').text();
        const sadrzaj = item.children('p:eq(1)').text();
        const link = item.children('a').prop('href');

        noviPostoviLevi.push({
            datum: datum,
            naslov: naslov,
            sadrzaj: sadrzaj,
            link: link
        });
    });
    var levi = noviPostoviLevi.filter((obj) => {
        return !stariPostoviLevi.some((obj2) => {
            return obj.sadrzaj == obj2.sadrzaj;
        })
    });

    $('div.news-box:eq(1)').children('ul').children('li').each((i, node) => {
        const item = $(node);
        const datum = item.children('p:first').text();
        const naslov = item.children('h4').text();
        const sadrzaj = item.children('p:eq(1)').text();
        const link = item.children('a').prop('href');

        noviPostoviDesni.push({
            datum: datum,
            naslov: naslov,
            sadrzaj: sadrzaj,
            link: link
        });
    });
    var desni = noviPostoviDesni.filter((obj) => {
        return !stariPostoviDesni.some((obj2) => {
            return obj.sadrzaj == obj2.sadrzaj;
        })
    });

    await stenkLog('SIP FETCHER', 'green', `Novi postovi: ${desni.length + levi.length}`);
    await stenkLog('SIP FETCHER', 'green', 'TASK ENDED');

    await stenkLog('SIP FETCHER', 'yellow', 'SAVING TO DATABASE...');
    sipFetcherSetData(stariPostoviLevi, noviPostoviLevi, stariPostoviDesni, noviPostoviDesni);
    await stenkLog('SIP FETCHER', 'green', 'SAVED TO DATABASE!');

    return [levi, desni];
};

module.exports = { fetchPostovi };