const { Client, Command } = require('yuuko');
const path = require('path');
const dotenv = require('dotenv').config({ path: './src/config.env' })

//!!! BOT INVITE LINK + PERMISSIONS
//https://discord.com/api/oauth2/authorize?client_id=871723684086296617&permissions=536995904&scope=bot

//bot client
const bot = new Client({
	token: process.env.BOT_TOKEN,
	prefix: process.env.PREFIX
});


bot.on('invalidCommand', async (message) => {
	await message.channel.createMessage({ content: 'komanda ne postoji!!!!' });
});

//bot.addDir(path.join(__dirname, 'commands'));

bot.addFile(path.join(__dirname, 'commands/ping.js'));

bot.addFile(path.join(__dirname, 'commands/fun/generators/balkanInfo.js'));
bot.addFile(path.join(__dirname, 'commands/fun/generators/beogradskePrice.js'));
bot.addFile(path.join(__dirname, 'commands/fun/generators/brkicajzer.js'));
bot.addFile(path.join(__dirname, 'commands/fun/generators/eightBall.js'));
bot.addFile(path.join(__dirname, 'commands/fun/generators/goliZivot.js'));
bot.addFile(path.join(__dirname, 'commands/fun/generators/kanyeTweet.js'));
bot.addFile(path.join(__dirname, 'commands/fun/generators/krizniStab.js'));

bot.addFile(path.join(__dirname, 'commands/fun/advice.js'));
bot.addFile(path.join(__dirname, 'commands/fun/ispovesti.js'));
bot.addFile(path.join(__dirname, 'commands/fun/urbanDictionary.js'));
bot.addFile(path.join(__dirname, 'commands/fun/vicevi.js'));
bot.addFile(path.join(__dirname, 'commands/fun/vukajlija.js'));
bot.addFile(path.join(__dirname, 'commands/fun/xkcd.js'));

bot.addFile(path.join(__dirname, 'commands/utility/covid19.js'));


//TODO STATUSI ZA ELFAK
//0 is playing
//1 is streaming (url)
//2 is listening
//3 is watching
//? 4 custom??
//5 is competing
const statusi = [
	{ name: "u polaganju fizike kod Ristića", type: 5 },
	{ name: "predavanja na MS Teams", type: 2 },
	{ name: "predavanja na MS Teams", type: 3 },
	{ name: "predavanja na MS Teams", type: 1 },
];

const colors = require('colors');
bot.on('debug', (msg, id) => { console.log(msg.magenta); } );
bot.on('info', (msg, id) => { console.log(msg.cyan); } );
bot.on('warn', (msg, id) => { console.log(msg.yellow); } );
bot.on('error', (msg, id) => { console.log(msg.red); } );

bot.on('ready', () => {
	//console.clear();

	console.log("READY".green);
	bot.commands.forEach(command => {
		console.log(command.names);
	});

});

bot.connect();
