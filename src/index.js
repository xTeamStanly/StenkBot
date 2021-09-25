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

//bot.addDir(path.join(__dirname, 'commands'));

bot.addFile(path.join(__dirname, 'commands/ping.js'));
bot.addFile(path.join(__dirname, 'commands/fun/advice.js'));
bot.addFile(path.join(__dirname, 'commands/fun/vicevi.js'));
bot.addFile(path.join(__dirname, 'commands/fun/xkcd.js'));
bot.addFile(path.join(__dirname, 'commands/fun/generators/balkanInfo.js'));
bot.addFile(path.join(__dirname, 'commands/fun/generators/beogradskePrice.js'));
bot.addFile(path.join(__dirname, 'commands/fun/urbanDictionary.js'));
bot.addFile(path.join(__dirname, 'commands/utility/covid19.js'));
bot.addFile(path.join(__dirname, 'commands/fun/vukajlija.js'));


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

bot.on('warn', () => {
	console.log("WARNING".yellow);
})

const colors = require('colors');
bot.on('ready', () => {
	console.log("READY".green);
	bot.commands.forEach(command => {
		console.log(command.names);
	});
});

bot.connect();
