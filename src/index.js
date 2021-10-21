const express = require('express');
const app = express();
const { Client } = require('yuuko');
const { botStart } = require('./lib/bot');
const { stenkLog } = require('./lib/botHelper');
const { msToTime } = require('./lib/tools');
const { setupStorage, checkStorage, hookGetData } = require('./lib/storage');


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
	try {

		//storage
		setupStorage(); if(!checkStorage()) { throw "Storage not valid!"; }

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
				res.json({
					uptime: botUptime, //? nece li ovo da bude mnogo veliko hmm??
					uptimeFormatted: msToTime(botUptime),
					servers: bot.guilds.size,
					shards: bot.shards.size
				});

			} else {
				res.json({error: 'Try again - bot not initialised!'});
			}
		});

		app.get('/sip', async (req, res) => {
			//var hooks = await storage.getItem('sipHooks');
			var hooks = hookGetData();

			res.json(hooks);
		});


	} catch (err) {
		await stenkLog("MAJOR ERROR", 'red', err.message);
		console.log(err);
	}
})();































