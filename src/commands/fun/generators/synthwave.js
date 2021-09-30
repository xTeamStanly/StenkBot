const { Command } = require("yuuko");
const { randomList, randomBetweenIncluding, getMessageReference, getFooter } = require('../../../lib/tools');
const data = require('../../../resources/commands/fun/generators/synthwave');

const pluralize = require('pluralize');

const getFirstWord = () => {
    var word = randomList(data.nouns);
    if(word.suffix) { return getFirstWord(); }
    return word;
}

const getSecondWord = (first) => {
    var word = randomList(data.nouns);

    if(word.not && word.not.includes(first.word)) { return getSecondWord(first); }

    if(word == first || (word.not && word.not.includes(first) || word.prefix)) {
        return getSecondWord(first);
    }

    return word;
};

const getSeparator = (first, second) => {
    const sep1 = first.separator;
    const sep2 = second.separator;
    if(sep1) { return sep1; }
    if(sep2) { return sep2; }

    return randomList(data.separators);
}

const generateName = () => {
    var first; var second; var name;
    var words = [];


    //get the first word
    first = getFirstWord(data.nouns);
    words.push(first.word);

    //get the second word
    second = getSecondWord(first);
    words.push(second.word);

    //join words
    var separator = getSeparator(first, second);

    name = words.join(separator);

    //decide if it should be a plural
    if(randomBetweenIncluding(1, 12) == 6 && second.plural) {
        name = pluralize(name);
    }

    //decide in there should be a year at the end
    if(randomBetweenIncluding(1, 5) == 3) {
        if(separator != '') { name += ' '; }
        name += randomList(data.years);
    }

    name = name.charAt(0).toUpperCase() + name.slice(1);

    return name;
};

const synthwave = new Command(['synth', 'synthwave'], async (message, args, context) => {

    await message.channel.createMessage({
        messageReference: getMessageReference(message),
        embed: {
            author: { name: "SynthWave band name", url: 'https://synthwavegenerator.com/' },
            title: generateName(),
            color: 0x371E57,
            thumbnail: { url: 'https://i.imgur.com/mAoTKas.jpg' },
            footer: getFooter(message)
        }
    });
});

module.exports = synthwave;