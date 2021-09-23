const { Client, Command } = require('yuuko');
const path = require('path');
const dotenv = require('dotenv').config({ path: './src/config.env' })

//bot client
const bot = new Client({
	token: process.env.BOT_TOKEN,
	prefix: process.env.PREFIX
});

//bot.addDir(path.join(__dirname, 'commands'));

bot.addFile(path.join(__dirname, 'commands/ping.js'));

// const pingCommand = new Command('ping', (message, args, context) => {
// 	// message.channel.createMessage(
// 	// 	{
// 	// 		embed: {
// 	// 			title: "EMBED1",
// 	// 			description: 'embed1'
// 	// 		}
// 	// 	}
// 	// );

// 	bot.executeWebhook("889578583423594566", "8hNoCnvpuqO31wjMr8ptg-5UYWdafm1FP8zNEGAN7D8rVf_3JwXrkkZZMh7hZMx1jm-1", {
// 		embeds: [
// 			{ title: "EMBED1" },
// 			{ title: "EMBED2" }
// 		]
// 	})

// 	//https://discord.com/api/webhooks/889578583423594566/8hNoCnvpuqO31wjMr8ptg-5UYWdafm1FP8zNEGAN7D8rVf_3JwXrkkZZMh7hZMx1jm-1

// });

const colors = require('colors');
bot.on('ready', () => {
	console.log("READY".green);
});

bot.connect();
