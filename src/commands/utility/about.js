const { Command } = require('yuuko');
const { getMessageReference, getFooter, botAvatar, emptyEmbedField, msToTime } = require('../../lib/tools');



const about = new Command(['about', 'gazda', 'stenk', 'stamen'], async (message, args, context) => {

    const rec = args.join(' ');

    await message.channel.createMessage({
        messageReference: getMessageReference(message),
        embed: {
            author: { name: "About", url: 'https://github.com/xTeamStanly/StenkBot' },
            title: "StenkBot",
            thumbnail: { url: botAvatar },
            color: 0x5636a7,
            description: `Uptime: ${msToTime(context.client.uptime)}`,
            fields: [
                {
                    name: ":notepad_spiral: Verzija",
                    value: "v1.2.1",
                    inline: true
                },
                {
                    name: ":desktop: Gazda",
                    value: "Stamen",
                    inline: true
                },
                {
                    name: ":zap: Powered by",
                    value: `• [Node.js](https://nodejs.org/)\n• [Eris](https://github.com/abalabahaha/eris)\n• [Yuuko](https://github.com/eritbh/yuuko)\n• [Cron](https://github.com/node-cron/node-cron)\n• [Axios](https://github.com/axios/axios)\n• [Cheerio](https://github.com/cheeriojs/cheerio)\n• [Moment](https://github.com/moment/moment)`,
                    inline: true
                }
            ],
            footer: getFooter(message)
        }
    });
}).addSubcommand(new Command(['help', 'pomoc', '?', 'info'], async (message, args, context) => {
    await message.channel.createMessage({
        messageReference: getMessageReference(message),
        embed: {
            author: { name: "About" },
            thumbnail: { url: botAvatar },
            color: 0x5636a7,
            footer: getFooter(message),
            title: ':book: Pomoć',
            description: "__***Opis:***__\n• Prikazuje informacije o botu.\n\n__***Sva imena komande:***__\n• **about**\n• **gazda**\n• **stamen**\n• **stenk**\n\n__***Korišćenje:***__\n• **about** - prikazuje informacije o botu"
        }
    });
}));

module.exports = about;