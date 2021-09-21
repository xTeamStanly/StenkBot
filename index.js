const express = require('express');
const app = express();
const port = 8080;

/* --- FUNCTION IMPORTS --- */
const advice = require('./commands/fun/advice');
const balkanInfo = require('./commands/fun/generators/balkanInfo');
const beogradskePrice = require('./commands/fun/generators/beogradskePrice');
const brkicajzer = require('./commands/fun/generators/brkicajzer');
const eightBall = require('./commands/fun/generators/eightBall');
const goliZivot = require('./commands/fun/generators/goliZivot');
const kanyeTweet = require('./commands/fun/generators/kanyeTweet');
const krizniStab = require('./commands/fun/generators/krizniStab');
const maricajzer = require('./commands/fun/generators/maricajzer');
const niskePrice = require('./commands/fun/generators/niskePrice');
const novine = require('./commands/fun/generators/novine');
const oldInsult = require('./commands/fun/generators/oldInsult');
const periodic = require('./commands/fun/generators/periodic');
const pitajJodu = require('./commands/fun/generators/pitajJodu');
const polumenta = require('./commands/fun/generators/polumenta');
const prica = require('./commands/fun/generators/prica');
const psovkaZm = require('./commands/fun/generators/psovkaZm');
//const seselj = require('./commands/fun/generators/seselj');
const socFirma = require('./commands/fun/generators/socFirma');
const srba = require('./commands/fun/generators/srba');
const ispovesti = require('./commands/fun/ispovesti');
const urbanDictionary = require('./commands/fun/urbanDictionary');
const vicevi = require('./commands/fun/vicevi');
const vukajlija = require('./commands/fun/vukajlija');
const xkcd = require('./commands/fun/xkcd');
const covid19 = require('./commands/utility/covid19');


app.listen(port, () => { console.log(`radim na portu ${port}`); });

// -------------------- FUN -------------------- //
//advice ili advice?id=
app.get('/fun/advice', advice);

// ---------- GENERATORS ---------- //
//balkanInfo
app.get('/fun/balkaninfo', balkanInfo);

//beogradskePrice
app.get('/fun/beogradskeprice', beogradskePrice);

//brkicajzer
app.get('/fun/brkicajzer', brkicajzer);

//eigthBall
app.get('/fun/eightball', eightBall);

//goliZivot
app.get('/fun/golizivot', goliZivot);

//kanyeTweet
app.get('/fun/kanyetweet', kanyeTweet);

//krizniStab
app.get('/fun/kriznistab', krizniStab);

//maricajzer
app.get('/fun/maricajzer', maricajzer);

//niske price
app.get('/fun/niskeprice', niskePrice);

//novine
app.get('/fun/novine', novine);

//oldInsult
app.get('/fun/oldinsult', oldInsult);

//periodic
app.get('/fun/periodic', periodic);

//pitajJodu
app.get('/fun/pitajjodu', pitajJodu);

//polumenta
// - polumenta?tip=rado (default)
// - polumenta?tip=radodado
// - polumenta?tip=folotrolo
app.get('/fun/polumenta', polumenta);

//prica
app.get('/fun/prica', prica);

//psovkaZm
app.get('/fun/psovkazm', psovkaZm);

//TODO seselj
//! IMPORTANT
//app.get('/fun/seselj', seselj);

//socFirma
app.get('/fun/socfirma', socFirma);

//srba
// - srba?akcija=
// - srba?poslovica=
// - srba?akcija= & poslovica=
app.get('/fun/srba', srba);
// -------------------------------- //

//ispovesti
// - ispovesti?tip=random
// - ispovesti?tip=novo
// - ispovesti?tip=popularno
// - ispovesti?tip=najbolje
app.get('/fun/ispovesti', ispovesti);

//urbanDictionary
// - urbandictionary        ---> poslednja rec dana
// - urbandictionary?rec=   ---> definicija reci
// - urbandictionary?skockaj --> sredi za embed
app.get('/fun/urbandictionary', urbanDictionary);

//TODO
//vicevi
app.get('/fun/vicevi', vicevi);

//vukajlija
// - vukajlija 				--> Pokazuje 5 def sa pocetne
// - vukajlija?definisi=XXX	--> konkretna defka
// - vukajlija?pretrazi=XXX	--> pretrazi
app.get('/fun/vukajlija', vukajlija);

//xkcd
// - xkcd
// - xkcd?id=
app.get('/fun/xkcd', xkcd);

// -------------------- UTILITY -------------------- //
//covid19
app.get('/utility/covid19', covid19);



//nijedan path se ne poklapa
app.get('*', (req, res) => {
    res.status(404).send('molim?');
});