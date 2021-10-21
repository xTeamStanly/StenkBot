const { Client } = require('yuuko');
const path = require('path');
const dotenv = require('dotenv').config({ path: './src/config.env' });
const { stenkLog, colors, statusi, stenkBotTitle } = require('./botHelper');
const { getMessageReference, getFooter, botAvatar, randomList } = require('./tools'); //! RANDOM LIST JE ZA PROMENU STATUSA???

//cron job
const cron = require('node-cron');

//storage
//const { setupStorage } = require('./storage');
//const storage = require('node-persist');

const { cooldownMillis, cooldownUserSet  } = require('./cooldown');
const { hookGetData } = require('./storage');

//bot startup function
const botStart = async (bot) => {

	//init storage
	//await storage.init({ dir: 'storage', ttl: 0 /*, logging: true*/ });



	// await storage.create({ dir: 'storage', ttl: 0 /*, logging: true*/ });
	// await storage.init();

	// if(!await storage.getItem('sipHooks')) { await storage.setItem('sipHooks', []); };
	// if(!await storage.getItem('stariPostoviDesni')) { await storage.setItem('stariPostoviDesni', []); };
	// if(!await storage.getItem('noviPostoviLevi')) { await storage.setItem('noviPostoviLevi', []); };
	// if(!await storage.getItem('stariPostoviDesni')) { await storage.setItem('stariPostoviDesni', []); };
	// if(!await storage.getItem('noviPostoviDesni')) { await storage.setItem('noviPostoviDesni', []); };

	const { fetchPostovi } = require('./sip-fetcher');

	//!!! BOT INVITE LINK + PERMISSIONS
	//https://discord.com/api/oauth2/authorize?client_id=871723684086296617&permissions=536995904&scope=bot

	try {

		//message parser + cooldown
		bot.on('messageCreate', async (msg) => {
			//! STENKBOT ADD

    		//direktna poruka nema guildID,
    		//bot ne gleda direktne poruke
    		if(!msg.guildID && !msg.author.bot) {
				//da ne trosi energiju za dzabe
				return;

				//?msg.channel.createMessage({ content: "Nema DM-ova!" });
    		}

    		if (!msg.author) {
        		return; // this is a bug and shouldn't really happen
			}

			//ignorise sebe i druge botove
    		if (bot.ignoreBots && msg.author.bot) {
        		return;
			}

			//alternative
			// sporija - await bot.hasCommand(msg)
			// brza (bez mention-a) - msg.content.startsWith(bot.prefix)
			const jesteKomanda = await bot.splitPrefixFromContent(msg) != null;

			//! ----- COOLDOWN ZA KOMANDE-----
			if(jesteKomanda) { //ako jeste komanda radi cooldown logic

				//ako je user u cooldown-u ne odgovaraj mu na poruke
				if(cooldownUserSet.has(msg.author.id)) {
					//console.log("COOLDOWN JE AKTIVAN".red);
					return;
				}

				//izvrsi komandu i dodaj coveka u cooldown set
				bot.processCommand(msg);

				cooldownUserSet.add(msg.author.id);
				//console.log("COOLDOWN JE KRENUO".yellow);

				//stavi timeout da ga izbaci posle odredjenog vremena
				setTimeout(() => {
					cooldownUserSet.delete(msg.author.id);
					//console.log("COOLDOWN JE GOTOV".green)
				}, cooldownMillis);
			}

			//ostavljamo mogucnost za xp preko poruka ili tako nesto
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
		bot.addDir(path.join(__dirname, '../commands'));

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
			//const hooks = await storage.getItem('sipHooks');
			const hooks = hookGetData();

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

		//SIP FETCH CRON - svakih pola sata
		const sipCronJob = cron.schedule('*/30 * * * *', sipFetcher, { scheduled: false });

		//! AUTO AZURIRANJE BOT STATUSA
		// const botChangeStatus = async () => {
		// 	bot.editStatus('online', randomList(statusi));
		// }
		// const botStatusCronJob = cron.schedule('*/15 * * * *', botChangeStatus, { scheduled: false });


		//BOT JE SPREMAN
		bot.on('ready', async () => {

			//sitnica :D
			console.log(stenkBotTitle);

			bot.setDefaultCommand('about'); //ako ga pinguju, ovo je defult komanda

			await stenkLog("READY", 'cyan', 'Bot is ready!');

			//! botChangeStatus();
			//! botStatusCronJob.start();

			bot.editStatus('online', { name: `${bot.prefix}help za pomoć`, type: 0 });

			await sipFetcher(); //cim je ready neka proveri, a posle ide cron job
			sipCronJob.start(); //pokreni cron job
		});

		//BOT CONNECT
		//povezi bota na gateway
		bot.connect();

	} catch(err) {
		await stenkLog("MAJOR ERROR", 'red', err.message);
		console.log(err);
	}
}


module.exports = { botStart }