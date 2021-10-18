const express = require('express');
const app = express();

const { Client } = require('yuuko');
const path = require('path');
const dotenv = require('dotenv').config({ path: './src/config.env' });
const { stenkLog, colors } = require('./lib/botHelper');
const { msToTime, getMessageReference, getFooter, botAvatar } = require('./lib/tools');

//cron job
const cron = require('node-cron');

//storage
const storage = require('node-persist');

//init bot client
var bot = new Client({
	token: process.env.BOT_TOKEN,
	prefix: process.env.PREFIX,
	maxShards: 'auto',
	ignoreBots: true,
	defaultImageFormat: 'jpg',
	disableDefaultMessageListener: true
});

//bot startup function
const botStart = async () => {

	//init storage
	//await storage.init({ dir: 'storage', ttl: 0 /*, logging: true*/ });

	await storage.create({ dir: 'storage', ttl: 0 /*, logging: true*/ });
	await storage.init();

	if(!await storage.getItem('sipHooks')) { await storage.setItem('sipHooks', []); };
	if(!await storage.getItem('stariPostoviDesni')) { await storage.setItem('stariPostoviDesni', []); };
	if(!await storage.getItem('noviPostoviLevi')) { await storage.setItem('noviPostoviLevi', []); };
	if(!await storage.getItem('stariPostoviDesni')) { await storage.setItem('stariPostoviDesni', []); };
	if(!await storage.getItem('noviPostoviDesni')) { await storage.setItem('noviPostoviDesni', []); };

	const { fetchPostovi } = require('./lib/sip-fetcher');

	//!!! BOT INVITE LINK + PERMISSIONS
	//https://discord.com/api/oauth2/authorize?client_id=871723684086296617&permissions=536995904&scope=bot

	try {

		//inicijalizacija bot klijenta
		/*bot = new Client({
			token: process.env.BOT_TOKEN,
			prefix: process.env.PREFIX,
			maxShards: 'auto',
			ignoreBots: true,
			defaultImageFormat: 'jpg',
			disableDefaultMessageListener: true
		});*/

		//message parser
		bot.on('messageCreate', (msg) => {
			//! STENKBOT ADD

    		//direktna poruka nema guildID,
    		//bot ne gleda direktne poruke
    		if(!msg.guildID && !msg.author.bot) {
        		return;
				//da ne trosi energiju za dzabe
        		//?msg.channel.createMessage({ content: "Nema DM-ova!" });
    		}

    		if (!msg.author)
        		return; // this is a bug and shouldn't really happen
    		if (bot.ignoreBots && msg.author.bot)
        		return;
				bot.processCommand(msg);
		});

		//#region
		//! ERIS EXPANZIJE
		//require('eris-components').Client(bot); require('eris-additions/lib/Channel/')
		//require('eris-additions')(Eris, { disabled: ["Channel.createCode"]/*, disabled: ["Channel.sendMessage", "Channel.sendCode", "Eris.Embed"]*/ })

		//!eris-components
		//!BETA STENKBOT
		//ErisComponents.Client(bot); //init za komponente
		/*bot.on('interactionCreate', (message) => {
			if(message.data.custom_id == 'dobardan') {
				bot.replyInteraction(message, [], { embeds: [{title: "EMBED1"}, {title: "EMBED2"}] }) // Type 5. See https://discord.com/developers/docs/interactions/slash-commands#interaction-response-object-interaction-callback-type

				//bot.replyInteraction(message, [], { embed: { title: 'aa' } }, );
			}
			console.log(message);
		});*/

		//bot.on('messageCreate', (message) => { if(message.author.id != bot.user.id) { message.channel.createCode("console.log('hi')", "js"); }	/*console.log("OVERRIDER")*/ })

		//#endregion

		//dodajemo sve komande
		bot.addDir(path.join(__dirname, 'commands'));


		//bot eventi + logging (manje performanse zbog fajla?)
		bot.on('debug', async (logMessage) => { await stenkLog('DEBUG', 'magenta', logMessage); }); //!debug event!
		bot.on('warn', async (logMessage) => { await stenkLog('WARN', 'yellow', logMessage); });
		bot.on('error', async (logMessage) => { await stenkLog('ERROR', 'red', logMessage); });
		bot.on('shardReady', async (shardID) => { await stenkLog('SHARD', 'cyan', `ID: ${shardID}`); });
		bot.on('postCommand', async (cmd, msg, args, ctx) => {
			const msgAuthor = msg.author;
			const logMessage = `${msgAuthor.username}#${msgAuthor.discriminator} (${ctx.commandName} - ${msg.guildID})`;
			await stenkLog(' CMD ', 'blue', logMessage);
		});

		bot.on('invalidCommand', async (message, args, context) => {
			await message.channel.createMessage({
				messageReference: getMessageReference(message),
				embed: {
					author: { name: "StenkBot" },
					title: "Nepostojeća komanda!",
					thumbnail: { url: botAvatar },
            		color: 0x5636a7,
					description: 'Ova komanda ne postoji, možda vam **help komanda** može pomoći!',
					footer: getFooter(message)
				}
			});
		});

		const sipFetcher = async () => {
			const hooks = await storage.getItem('sipHooks');

			if(hooks.length > 0) {

				const sviPostovi = await fetchPostovi();
				const postoviLevi = sviPostovi[0];
				const postoviDesni = sviPostovi[1];

				if(postoviDesni.length > 0) {
					const embedsDesni = [];

					postoviDesni.forEach(post => {
						embedsDesni.push({
							author: { name: 'Важна обавештења' },
							color: 0x65BD36,
							title: post.naslov,
							description: post.sadrzaj,
							url: post.link,
							thumbnail: { url: 'https://i.imgur.com/dyu12dZ.png' }
							// author: { text: post.link }
						});
					});

					var brojEmbedaDesni = postoviDesni.length;
					var sesijeDesni = Math.floor(brojEmbedaDesni / 10) + 1;

					hooks.forEach(async (hook) => {
						if(sesijeDesni == 1) { //ako je jedna sesija, dovoljan je 1 webhook
							await bot.executeWebhook(hook.id, hook.token, { embeds: embedsDesni } );
						} else if(sesijeDesni == 2) { //2 seseije, 1 webhook 10 embeda + 2 webhook ostatak
							await bot.executeWebhook(hook.id, hook.token, { embeds: embedsDesni.slice(0, 10) } );
							await bot.executeWebhook(hook.id, hook.token, { embeds: embedsDesni.slice(10, embedsDesni.length) } );
						}
					});
				}

				if(postoviLevi.length > 0) {
					const embedsLevi = [];

					postoviLevi.forEach(post => {
						embedsLevi.push({
							author: { name: 'Најновије вести' },
							title: post.naslov,
							description: post.sadrzaj,
							color: 0x65BD36,
							url: post.link,
							thumbnail: { url: 'https://i.imgur.com/dyu12dZ.png' }
							// footer: { text: post.link }
						});
					});

					var brojEmbedaLevi = postoviLevi.length;
					var sesijeLevi = Math.floor(brojEmbedaLevi / 10) + 1; //ili 1 ili 2

					hooks.forEach(async (hook) => {
						if(sesijeLevi == 1) { //ako je jedna sesija, dovoljan je 1 webhook
							await bot.executeWebhook(hook.id, hook.token, { embeds: embedsLevi } );
						} else if(sesijeLevi == 2) { //2 seseije, 1 webhook 10 embeda + 2 webhook ostatak
							await bot.executeWebhook(hook.id, hook.token, { embeds: embedsLevi.slice(0, 10) } );
							await bot.executeWebhook(hook.id, hook.token, { embeds: embedsLevi.slice(10, embedsLevi.length) } );
						}
					});
				}
			}
		};

		//SIP FETCH CRON
		const sipCronJob = cron.schedule('*/30 * * * *', sipFetcher, { scheduled: false });
		//0 */10 * * * *

		//BOT JE SPREMAN
		bot.on('ready', async () => {
			bot.setDefaultCommand('about'); //ako ga pinguju, ovo je defult komanda

			await stenkLog("READY", 'cyan', 'Bot is ready!');

			await sipFetcher(); //cim je ready neka proveri, a posle ide cron job
			sipCronJob.start(); //pokreni cron job
		});

		//BOT CONNECT
		bot.connect();

	} catch(err) {
		stenkLog("MAJOR ERROR", 'red', err.message);
	}
}


(async () => {
	await botStart();

	//EXPRESS SERVER
	app.listen(8080, async () => {
		await stenkLog('EXPRS', 'green', 'Express server active!');
	});

	app.get('/', (req, res) => {
		res.send("StenkBot!");
	});

	app.get('/info', async (req, res) => {
		if(bot) {
			const botUptime = bot.uptime;
			res.json({
				uptime: botUptime,
				uptimeFormatted: msToTime(botUptime),
				servers: bot.guilds.size,
				shards: bot.shards.size
			});

		} else {
			res.json({error: 'Try again - bot not initialised!'});
		}
	});

	app.get('/sip', async (req, res) => {
		var hooks = await storage.getItem('sipHooks');
		const result = {};

		hooks.forEach(hook => {
			Object.keys(hook).forEach((key) => {
				result[key] = hook[key];
			});
		});

		res.json(result);
	});

})();













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














