const { Command } = require("yuuko");
const { randomList, getMessageReference, getFooter } = require('../../lib/tools');

const items = [
    { tip: 'Rock' , link: 'https://i.imgur.com/xA6fEdy.png' },
    { tip: 'Scissors', link: 'https://i.imgur.com/JyPRwHn.png' },
    { tip: 'Paper', link: 'https://i.imgur.com/1rE7wIz.png' }
];

const rezultatIgre = (ja, racunar) => {
    if(ja == 'Rock') {
        switch(racunar) {
            case 'Rock': return 'Draw!';
            case 'Paper': return 'Lose!';
            case 'Scissors': return 'Win!';
        }
    }

    if(ja == 'Paper') {
        switch(racunar) {
            case 'Rock': return 'Win!';
            case 'Paper': return 'Draw!';
            case 'Scissors': return 'Lose!';
        }
    }

    if(ja == 'Scissors') {
        switch(racunar) {
            case 'Rock': return 'Lose!';
            case 'Paper': return 'Win!';
            case 'Scissors': return 'Draw!';
        }
    }
}

const rps2message = async (ja, message, AIvsAI) => {
    const racunar = randomList(items);
    const racunarTip = racunar.tip;
    const rezultat = rezultatIgre(ja, racunarTip);

    var koSamJa = `:bust_in_silhouette:`;

    if(AIvsAI) { koSamJa = `:desktop:`; }

    await message.channel.createMessage({
        messageReference: getMessageReference(message),
        embed: {
            author: { name: "RPS" },
            footer: getFooter(message),
            color: 0x61E9FF,
            thumbnail: { url: racunar.link },
            title: rezultat,
            description: `${koSamJa} ${ja} - ${racunarTip} :desktop:`
        }
    });
}

const rpsRock = new Command(['rock', 'kamen'], async (message, args, context) => {
    await rps2message('Rock', message, false);
});

const rpsPaper = new Command(['paper', 'papir'], async (message, args, context) => {
    await rps2message('Paper', message, false);
});

const rpsScissors = new Command(['scissors', 'makaze'], async (message, args, context) => {
    await rps2message('Scissors', message, false);
});

const rps = new Command('rps', async (message, args, context) => {
    await rps2message(randomList(items).tip, message, true);
}).addSubcommand(rpsRock).addSubcommand(rpsPaper).addSubcommand(rpsScissors)
.addSubcommand(new Command(['help', 'pomoc', '?', 'info'], async (message, args, context) => {
    await message.channel.createMessage({
        messageReference: getMessageReference(message),
        embed: {
            author: { name: "RPS" },
            color: 0x61E9FF,
            thumbnail: { url: randomList(items).link },
            footer: getFooter(message),
            title: ':book: Pomoć',
            description: "__***Opis:***__\n• Igrica papir kamen makaze.\n\n__***Sva imena komande:***__\n• **rps**\n\n__***Podkomande:***__\n• **rock**, **kamen** - prikazuje 5 nasumičnih ispovesti\n• **paper**, **papir** - prikazuje 5 nasumičnih ispovesti\n• **scissors**, **makaze** - prikazuje 5 nasumičnih ispovesti\n\n__***Korišćenje:***__\n• **rps** - računar vs računar\n• **rps kamen** - čovek (kamen) vs računar\n• **rps papir** - čovek (papir) vs računar\n• **rps makaze** - čovek (makaze) vs računar"
        }
    })
}));

module.exports = rps;