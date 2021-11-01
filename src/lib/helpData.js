const { cooldownSeconds } = require('./cooldownConfig');
const { botAvatar, getFooter } = require('./tools');

const commandListString = `> __***• Generatori***__\n> \`automobil\`, \`balkaninfo\`, \`beogradskeprice\`,\n> \`brkicajzer\`, \`chad\`, \`boja\`, \`commit\`, \`programer\`,\n> \`8ball\`, \`eros\`, \`golizivot\`, \`kanye\`, \`kriznistab\`,\n> \`leet\`, \`maricajzer\`, \`mock\`, \`nibba\`, \`nis\`, \`naslov\`,\n> \`oldinsult\`, \`periodic\`, \`pirot\`, \`dedajodo\`,\n> \`polumenta\`, \`prica\`, \`psovka\`, \`seselj\`, \`socfirma\`,\n> \`srba\`, \`svetemisli\`, \`synthwave\`, \`workout\`, \`zalgo\`\n\n> __***• Zabava***__\n> \`advice\`, \`bored\`, \`breakingbad\`, \`cat\`, \`crypto\`,\n> \`dadjoke\`, \`dog\`, \`drumpf\`, \`fox\`, \`insult\`, \`ispovesti\`,\n> \`merkur\`, \`office\`, \`roll\`, \`ronswanson\`, \`rps\`, \`trivia\`,\n> \`urbandictionary\`, \`vicevi\`, \`vukajlija\`, \`xkcd\`\n\n> __***• Korisne***__\n> \`about\`, \`calculator\`, \`covid19\`, \`day\`, \`date\`,\n> \`kursnalista\`, \`who\`, \`wttr\``;

//generisi embed
const generateHelpEmbed = (prefix, message) => {
    return {
        author: { name: "Lista komandi - StenkBot" },
        title: ':book: Pomoć',
        thumbnail: { url: botAvatar },
        color: 0x5636a7,
        footer: getFooter(message),
        description: `• __*Prefix:*__ \`${prefix}\`\n• __*Cooldown:*__ \`${cooldownSeconds}s\`\n• Neke komande imaju više naziva, dole će biti naveden __samo jedan naziv__ po komandi.\n• Ostale nazive možete naći u samim informacijama o komandi.\n\n• Za informacije o određenoj komandi možete uneti:\n> • **${prefix}**(**help** | **pomoc** | **?** | **info**) <**NAZIV_KOMANDE**>\n> • **${prefix}**<**NAZIV_KOMANDE**> (**help** | **pomoc** | **?** | **info**)\n\n${commandListString}`
    }
}

module.exports = {
    generateHelpEmbed
}