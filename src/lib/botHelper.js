const fs = require('fs');
const colors = require('colors');

//debug funkcija za evente, LOG funkcija
const stenkLog = async (type, color, message) => {
    const vreme = new Date();
    const vremeVreme = vreme.toLocaleTimeString('sr-RS');
    const vremeDatum = vreme.toLocaleDateString('sr-RS');
    const logMessage = `[${type}] ${vremeVreme} `[color] + message;
    const logMessageClean = `[${type}] ${vremeVreme} ` + message + '\n';

    //ako log folder ne postoji, napravi ga
    if(!fs.existsSync('./log')) { fs.mkdirSync(`./log`); }

    //ako ne postoji danasnji log folder, napravi ga
    await fs.appendFile(`./log/${vremeDatum}txt`, logMessageClean, (err) => {
        if(err) { console.log("[FILE] ".red + err) };
    });

    console.log(logMessage);

}

const printCommandNames = (bot) => {
	bot.commands.forEach(command => {
		console.log(command.names);
	});
};


module.exports = { stenkLog, printCommandNames, colors }