const { Command } = require("yuuko");
const { randomList, getMessageReference, getFooter } = require('../../../lib/tools');
const data = require('../../../resources/commands/fun/generators/commit');

const commit = new Command(['commit', 'git'], async (message, args, context) => {

    const commitMessage = randomList(data.commitMessages);

    await message.channel.createMessage({
        messageReference: getMessageReference(message),
        embed: {
            author: { name: 'Commit', url: 'https://github.com/ngerakines/commitment' },
            title: commitMessage,
            color: 0xE84D2B,
            description: `git status\ngit add .\ngit status\n***git commit -m "${commitMessage}"***\ngit status\ngit push`,
            thumbnail: { url: 'https://i.imgur.com/ogfJ22t.png' },
            footer: getFooter(message)
        }
    });
});

module.exports = commit;