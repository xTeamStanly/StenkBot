const { Command } = require('yuuko');
const { getMessageReference, getFooter, botAvatar, emptyEmbedField } = require('../../lib/tools');

//https://stackoverflow.com/questions/19700283/how-to-convert-time-in-milliseconds-to-hours-min-sec-format-in-javascript
function msToTime(ms) {
    let seconds = (ms / 1000).toFixed(1);
    let minutes = (ms / (1000 * 60)).toFixed(1);
    let hours = (ms / (1000 * 60 * 60)).toFixed(1);
    let days = (ms / (1000 * 60 * 60 * 24)).toFixed(1);
    if (seconds < 60) return seconds + " s";
    else if (minutes < 60) return minutes + " m";
    else if (hours < 24) return hours + " h";
    else return days + " d";
}

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
                    value: `- Eris\n- Yuuko (Modded)\n- Node.js\n- Cron\n- Axios\n- Cheerio`,
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