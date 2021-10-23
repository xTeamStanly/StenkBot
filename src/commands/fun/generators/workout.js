const { Command } = require('yuuko');
const data = require('../../../resources/commands/fun/generators/workout');
const { getMessageReference, randomList, randomBetweenIncluding, getFooter } = require('../../../lib/tools');

const workout = new Command(['workout', '1minworkout'], async (message, args, context) => {
    var vezba = randomList(data.exercises).replace('random5', randomBetweenIncluding(1, 5));
    vezba = vezba.charAt(0).toUpperCase() + vezba.slice(1);
    vezba = vezba.trim();
    if(!vezba.endsWith('.') && !vezba.endsWith('!') && !vezba.endsWith('?')) { vezba += '.'; }

    await message.channel.createMessage({
        messageReference: getMessageReference(message),
        embed: {
            author: { name: 'Workout' },
            title: "1 Minute Workout",
            color: 0xED5564,
            description: vezba,
            thumbnail: { url: data.image },
            footer: getFooter(message)
        }
    });
}).addSubcommand(new Command(['help', 'pomoc', '?', 'info'], async (message, args, context) => {
    await message.channel.createMessage({
        messageReference: getMessageReference(message),
        embed: {
            author: { name: "Workout" },
            color: 0xED5564,
            thumbnail: { url: data.image },
            footer: getFooter(message),
            title: ':book: Pomoć',
            description: "__***Opis:***__\n• Prikazuje kratku nasumičnu vežbu.\n\n__***Sva imena komande:***__\n• **workout**\n• **1minworkout**\n\n__***Korišćenje:***__\n• **workout** - prikazuje nasumičnu vežbu koja se radi jedan minut"
        }
    });
}));

module.exports = workout;