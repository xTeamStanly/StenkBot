const { Command } = require('yuuko');
const { getMessageReference } = require('../lib/tools');
const { generateHelpEmbed } = require('../lib/helpData');

const help = new Command(['help', 'pomoc', '?', 'info'], async (message, args, context) => {

    const komanda = args[0];

    if(komanda) { //uneto nesto
        const commandForExecution = context.client.commandForName(komanda);
        if(commandForExecution) { //nadjena komanda
            await commandForExecution.subcommandForName('help').execute(message, args, context);
            return;
        }
    }

    //nije uneto nista ili komanda nije nadjena
    await message.channel.createMessage({
        messageReference: getMessageReference(message),
        embed: generateHelpEmbed(context.prefix, message)
    });

}).addSubcommand(new Command(['help', 'pomoc', '?', 'info'], async (message, args, context) => {
    await message.channel.createMessage({
        messageReference: getMessageReference(message),
        embed: generateHelpEmbed(context.prefix, message)
    });
}));

module.exports = help;