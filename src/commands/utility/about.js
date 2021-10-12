const { Command } = require('yuuko');
const { getMessageReference, getFooter, botAvatar, emptyEmbedField, msToTime } = require('../../lib/tools');



const about = new Command(['about', 'gazda', 'stenk'], async (message, args, context) => {

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
                    value: "0.0.1",
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
});

module.exports = about;