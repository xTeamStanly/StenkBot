const { Client, Command } = require('yuuko');
const path = require('path');
const dotenv = require('dotenv').config({ path: './src/config.env' })
const { stenkLog, colors } = require('./lib/botHelper')

//!!! BOT INVITE LINK + PERMISSIONS
//https://discord.com/api/oauth2/authorize?client_id=871723684086296617&permissions=536995904&scope=bot

try {

	//inicijalizacija bot klijenta
	const bot = new Client({
		token: process.env.BOT_TOKEN,
		prefix: process.env.PREFIX,
		maxShards: 'auto',
		ignoreBots: true,
		compress: true,
		defaultImageFormat: 'jpg'
	});

	//dodajemo sve komande
	bot.addDir(path.join(__dirname, 'commands'));

	//bot eventi + logging (manje performanse zbog fajla)
	bot.on('debug', async (logMessage) => { await stenkLog('DEBUG', 'magenta', logMessage); }); //!debug event!
	bot.on('warn', async (logMessage) => { await stenkLog('WARN ', 'yellow', logMessage); });
	bot.on('error', async (logMessage) => { await stenkLog('ERROR', 'red', logMessage); });
	bot.on('shardReady', async (shardID) => { await stenkLog('SHARD', 'cyan', `ID: ${shardID}`); });
	bot.on('postCommand', async (cmd, msg, args, ctx) => {
		const msgAuthor = msg.author;
		const logMessage = `${msgAuthor.username}#${msgAuthor.discriminator} (${ctx.commandName} - ${msg.guildID})`;
		await stenkLog(' CMD ', 'blue', logMessage);
	});

	bot.on('messageCreate', () => { console.log("OVERRIDER") })


	//todo help command
	bot.on('invalidCommand', async (message,args, context) => {
		await message.channel.createMessage({ content: 'komanda ne postoji!!!!' });
	});

	bot.on('ready', async () => {
		bot.setDefaultCommand('about');

		//await stenkLog('')
		console.log("READY".green);

	});

	bot.connect();





} catch(err) {
	stenkLog("MAJOR ERROR", 'red', err.message);
}











//povezi bota na gateway


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














