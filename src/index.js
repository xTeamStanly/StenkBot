const { Client, Command } = require('yuuko');
const path = require('path');

const bot = new Client({
	token: 'ODcxNzIzNjg0MDg2Mjk2NjE3.YQfd8g.rU9OAP4uwlTp9T-pbQ8CBwOVTkA',
	prefix: '!'
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
