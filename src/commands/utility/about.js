const { Command } = require('yuuko');
const { getMessageReference, getFooter, botAvatar, emptyEmbedField, msToTime } = require('../../lib/tools');



const about = new Command(['about', 'gazda', 'stenk', 'stamen'], async (message, args, context) => {

    const rec = args.join(' ');

    await message.channel.createMessage({
        messageReference: getMessageReference(message),
        embed: {
            author: { name: "About" },
            title: "StenkBot",
            thumbnail: { url: botAvatar },
            color: 0x5636a7,
            description: `Uptime: ${msToTime(context.client.uptime)}`,
            fields: [
                {
                    name: ":notepad_spiral: Verzija",
                    value: "1.1.0",
                    inline: true
                },
                {
                    name: ":zap: Powered by",
                    value: `- Eris\n- Yuuko\n- Node.js\n- Cron\n- Axios\n- Cheerio`,
                    inline: true
                },
                {
                    name: ":desktop: Gazda",
                    value: "Stamen",
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