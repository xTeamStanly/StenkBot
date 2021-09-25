const axios = require('axios');
const cheerio = require('cheerio');

const { Command } = require('yuuko');



const covid19_1 = new Command('pingerino', (message, args, context) => {
    var rec = args.join(' ');


    if(rec != '') {

    } else {

    }


    message.channel.createMessage({content: "PINGERINO ENGAGED!"});
});

const covid19 = new Command('ping', async (message, args, context) => {
    console.log(args);
    message.channel.createMessage("PING COMMAND!");
}).addSubcommand(covid19_1);


module.exports = covid19;