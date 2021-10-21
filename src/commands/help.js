const { Command } = require('yuuko');
const { getMessageReference, getFooter, botAvatar } = require('../lib/tools');
const { cooldownSeconds } = require('../lib/cooldown')

const commandListString =
`\`\`\`
• help
• Zabava
  • Generatori
    • automobil
    • balkaninfo
    • beogradskeprice
    • brkicajzer
    • boja
    • commit
    • programer
    • 8ball
    • eros
    • golizivot
    • kanye
    • kriznistab
    • maricajzer
    • mock
    • nibba
    • nis
    • naslov
    • oldinsult
    • periodic
    • pirot
    • dedajodo
    • polumenta
    • prica
    • psovka
    • seselj
    • socfirma
    • srba
    • svetemisli
    • synthwave
    • zalgo
  • advice
  • bored
  • breakingbad
  • cat
  • crypto
  • dadjoke
  • dog
  • fox
  • insult
  • ispovesti
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
        embed: {
            author: { name: "Lista komandi - StenkBot" },
            title: ':book: Pomoć',
            thumbnail: { url: botAvatar },
            color: 0x5636a7,
            footer: getFooter(message),
            description: `• Prefix: **${context.prefix}**\n• Cooldown: **${cooldownSeconds}s**\n• Neke komande imaju više imena, dole će biti navedeno samo jedno ime po komandi.\n• Ostala imena možete nađi u samim informacijama o komandi.\n\nZa informacije o određenoj komandi možete uneti:\n• (**help** | **pomoc** | **?**) **<IME_KOMANDE>**\n• **<IME_KOMANDE>** (**help** | **pomoc** | **?**)\n\n${commandListString}`
        }
    });

}).addSubcommand(new Command(['help', 'pomoc', '?', 'info'], async (message, args, context) => {
    await message.channel.createMessage({
      messageReference: getMessageReference(message),
      embed: {
          author: { name: "Lista komandi - StenkBot" },
          title: ':book: Pomoć',
          thumbnail: { url: botAvatar },
          color: 0x5636a7,
          footer: getFooter(message),
          description: `• Prefix: **${context.prefix}**\n• Cooldown: **${cooldownSeconds}s**\n• Neke komande imaju više imena, dole će biti navedeno samo jedno ime po komandi.\n• Ostala imena možete nađi u samim informacijama o komandi.\n\nZa informacije o određenoj komandi možete uneti:\n• (**help** | **pomoc** | **?**) **<IME_KOMANDE>**\n• **<IME_KOMANDE>** (**help** | **pomoc** | **?**)\n\n${commandListString}`
      }
    });
}));

module.exports = help;