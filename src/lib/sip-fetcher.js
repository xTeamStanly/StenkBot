/* -- sip fetcher -- */
const axios = require('axios');
const cheerio = require('cheerio'); require('colors');

const storage = require('node-persist');

var stariPostoviLevi;
var noviPostoviLevi;
var stariPostoviDesni;
var noviPostoviDesni;

(async () => {
    stariPostoviLevi = await storage.getItem('stariPostoviDesni');
    noviPostoviLevi = await storage.getItem('noviPostoviLevi');
    stariPostoviDesni = await storage.getItem('stariPostoviDesni');
    noviPostoviDesni = await storage.getItem('noviPostoviDesni');
})();


const fetchPostovi = async () => {

    console.log('TASK STARTED'.red);

    const html = await axios.get('https://sip.elfak.ni.ac.rs/');
    console.log('FETCH ENDED'.yellow);

    const $ = cheerio.load(html.data);
    console.log('PARSE ENDED'.blue);

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

    console.log('TASK ENDED\n\n'.green);

    await storage.setItem('stariPostoviDesni', stariPostoviDesni);
    await storage.setItem('noviPostoviDesni', noviPostoviDesni);
    await storage.setItem('stariPostoviLevi', stariPostoviLevi);
    await storage.setItem('noviPostoviLevi', noviPostoviLevi);

    return [levi, desni];
};

module.exports = { fetchPostovi };