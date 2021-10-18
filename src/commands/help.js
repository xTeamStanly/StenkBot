const { Command } = require('yuuko');
const { getMessageReference, getFooter, botAvatar } = require('../lib/tools');

//TODO ADD COMMAND LIST
const commandListString =
`\`\`\`
• Zabava
  • Generatori
    • automobil
    • balkaninfo
    • ...
  • advice
  • bored
  • breakingbad
  • cat
  • crypto
  • dadjoke
  • dog
  • fox
  • insult
  • ISPOVESTI!!!
  • merkur
  • office
  • roll
  • ronswanson
  • rps
  • trivia
  • urbandictionary
  • vicevi
  • vukajlija
  • xkcd
• Korisne
  • about
  • calculator
  • covid19
  • date
  • kursnalista
  • who\`\`\``;

const help = new Command(['help', 'pomoc', '?'], async (message, args, context) => {

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
        embed: {
            author: { name: "Lista komandi - StenkBot" },
            title: ':book: Pomoć',
            thumbnail: { url: botAvatar },
            color: 0x5636a7,
            footer: getFooter(message),
            description: `• Neke komande imaju više imena, dole će biti navedeno samo jedno ime po komandi.\n• Ostala imena možete nađi u samim informacijama o komandi.\n\nZa informacije o određenoj komandi možete uneti:\n• (**help** | **pomoc** | **?**) **<IME_KOMANDE>**\n• **<IME_KOMANDE>** (**help** | **pomoc** | **?**)\n\n${commandListString}`
        }
    });

});

module.exports = help;