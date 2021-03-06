/* -- sip fetcher v2.1.0 -- */
const axios = require('axios');
const cheerio = require('cheerio'); require('colors');
const { stenkLog } = require('../lib/botHelper');
const { sipFetcherGetData, sipFetcherSetData } = require('./storage');

var stariPostoviLevi;
var noviPostoviLevi;
var stariPostoviDesni;
var noviPostoviDesni;

const fetchPostovi = async () => {

    await stenkLog('SPFCH', 'red', 'TASK STARTED');

    const html = await axios.get('https://sip.elfak.ni.ac.rs/');
    await stenkLog('SPFCH', 'yellow', 'FETCH ENDED');

    const $ = cheerio.load(html.data);
    await stenkLog('SPFCH', 'blue', 'PARSE ENDED');

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

    await stenkLog('SPFCH', 'green', `Novi postovi: ${desni.length + levi.length}`);
    await saveSipFetcher();
    await stenkLog('SPFCH', 'green', 'TASK ENDED');

    return [levi, desni];
};

const readSipFetcher = async () => {
    await stenkLog('SPFCH', 'yellow', 'READING FROM DATABASE...');
    [stariPostoviLevi, noviPostoviLevi, stariPostoviDesni, noviPostoviDesni] = await sipFetcherGetData();
    await stenkLog('SPFCH', 'green', 'READ FROM DATABASE!');
}

const saveSipFetcher = async () => {
    await stenkLog("SPFCH", 'yellow', "SAVING POSTS...");
    await sipFetcherSetData(stariPostoviLevi, noviPostoviLevi, stariPostoviDesni, noviPostoviDesni);
    await stenkLog("SPFCH", 'green', "POSTS SAVED!");
}

module.exports = { fetchPostovi, saveSipFetcher, readSipFetcher };