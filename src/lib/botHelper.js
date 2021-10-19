const fs = require('fs');
const colors = require('colors');

//debug funkcija za evente, LOG funkcija
const stenkLog = async (type, color, message) => {
    const vreme = new Date();
    const vremeVreme = vreme.toLocaleTimeString('sr-RS');
    //const vremeDatum = vreme.toLocaleDateString('sr-RS');
    const logMessage = `[${type}] ${vremeVreme} `[color] + message;
    const logMessageClean = `[${type}] ${vremeVreme} ` + message + '\n';

    //ako log folder ne postoji, napravi ga
    if(!fs.existsSync('./log')) { fs.mkdirSync(`./log`); }

    //ako ne postoji danasnji log folder, napravi ga
    await fs.appendFile(`./log/${vreme.getDay()}.${vreme.getMonth()}.${vreme.getFullYear()}.txt`, logMessageClean, (err) => {
        if(err) { console.log("[FILE] ".red + err) };
    });

    console.log(logMessage);

}

const printCommandNames = (bot) => {
	bot.commands.forEach(command => {
		console.log(command.names);
	});
};

// --- STATUSI ZA ELFAK ---
//0 is playing
//1 is streaming (url)
//2 is listening
//3 is watching
//// 4 custom
//5 is competing
const statusi = [
	{ name: "predavanja na MS Teams", type: 1 }, //is streaming predavanja ...
    { name: "predavanja na MS Teams", type: 2 }, //is listening predavanja ...
	{ name: "predavanja na MS Teams", type: 3 }, //is watching predavanja ...
	{ name: "u polaganju fizike kod Ristića", type: 5 }, //is competing u polaganju ...
    { name: "učenje za sledeći rok", type: 0 },
    { name: "upadanje na budžet", type: 0 },

    { name: "Based Department", type: 3 },

    { name: 'Doom', type: 0 },
    { name: 'Doom Eternal', type: 0 },
    { name: 'Minecraft', type: 0 },
];

module.exports = {
    stenkLog,
    /*printCommandNames,*/
    colors,
    statusi
}