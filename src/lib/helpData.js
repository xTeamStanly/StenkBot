const { cooldownSeconds } = require('./cooldownConfig');
const { botAvatar, getFooter } = require('./tools');

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
    • leet
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
  • day
  • date
  • kursnalista
  • weather
  • who\`\`\``;

//generisi embed
const generateHelpEmbed = (prefix, message) => {
    return {
        author: { name: "Lista komandi - StenkBot" },
        title: ':book: Pomoć',
        thumbnail: { url: botAvatar },
        color: 0x5636a7,
        footer: getFooter(message),
        description: `• Prefix: **${prefix}**\n• Cooldown: **${cooldownSeconds}s**\n• Neke komande imaju više imena, dole će biti navedeno samo jedno ime po komandi.\n• Ostala imena možete nađi u samim informacijama o komandi.\n\nZa informacije o određenoj komandi možete uneti:\n• (**help** | **pomoc** | **?**) **<IME_KOMANDE>**\n• **<IME_KOMANDE>** (**help** | **pomoc** | **?**)\n\n${commandListString}`
    }
}

module.exports = {
    generateHelpEmbed
}