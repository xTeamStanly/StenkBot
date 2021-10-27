const express = require('express');
const app = express();
const { Client } = require('yuuko');
const { botStart } = require('./lib/bot');
const { stenkLog, stenkLogSync, botInviteLinkWithPerms } = require('./lib/botHelper');
const { msToTime } = require('./lib/tools');
const { setupStorage, hookGetData } = require('./lib/storage');
const onExit = require('signal-exit');
const { saveSipFetcher, readSipFetcher } = require('./lib/sip-fetcher');

//init bot client
const bot = new Client({
	token: process.env.BOT_TOKEN,
	prefix: process.env.PREFIX,
	maxShards: 'auto',
	ignoreBots: true,
	defaultImageFormat: 'jpg',
	disableDefaultMessageListener: true
});

(async () => {

	//save stuff on exit
	onExit(async () => {
		await saveSipFetcher(); //save current posts
	});

	//if fatal error happens
	process.on('uncaughtException', (err) => {
		stenkLogSync("MAJOR", 'red', "!FATAL ERROR!");
		stenkLogSync("MAJOR", 'red', err.message);
		console.log(err);
		process.exit(1);
	});

	try {

		//storage
		await setupStorage();
		await readSipFetcher();

		//main bot logic
		await botStart(bot);

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
				const used = process.memoryUsage();
				const usedMB = {};
				for (let key in used) {
  					usedMB[key] = `${(used[key] / 1024 / 1024).toFixed(2)} MB`;
				}

				res.json({
					//uptime: botUptime, //? nece li ovo da bude mnogo veliko hmm??
					uptime: msToTime(botUptime),
					memUsage: usedMB,
					servers: bot.guilds.size,
					shards: bot.shards.size,
					invite: botInviteLinkWithPerms
				});

			} else {
				res.json({error: 'Try again - bot not initialised!'});
			}
		});

		app.get('/sip', async (req, res) => {
			res.json(await hookGetData());
		});

	} catch (err) {
		await stenkLog("MAJOR ERROR", 'red', err.message);
		console.log(err);
	}

})();































