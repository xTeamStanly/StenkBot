const { Command } = require("yuuko");
const { randomBetweenIncluding, getMessageReference, getFooter, emptyEmbedField } = require("../../lib/tools");
const { table } = require('table');

const roll = new Command(['kockica', 'roll', 'rolladie', 'rolladice'], async (message, args, context) => {

    var radnja = args[0] || '1d6'; //ako ne unese nista, onda rolamo 1d6
    radnja = radnja.split('d');

    var brojRolanja = parseInt(radnja[0]) || 1;
    var brojKockice = parseInt(radnja[1]) || 6;

    //minimalna kockica je 1d2
    if(brojRolanja < 0) { brojRolanja = 1; }
    if(brojKockice < 1) { brojKockice = 2; }

    //max kockica 64d64
    if(brojRolanja > 64) { brojRolanja = 64; }
    if(brojKockice > 64) { brojKockice = 64; }

    var rezultatiBrojke = []; var sumaSvih = 0;
    for(i = 1; i < brojRolanja + 1; i++) {
        generisanBroj = randomBetweenIncluding(1, brojKockice); sumaSvih += generisanBroj;
        if(generisanBroj < 10) { generisanBroj = `0${generisanBroj}`; }
        rezultatiBrojke.push(generisanBroj);
    }

    //koliko redova imamo
    var ostatak = brojRolanja % 4;
    var redovi = (brojRolanja - ostatak) / 4;
    var finalString = '';

    var temp;
    for(let i = 0; i < redovi; i++) {
        temp = 4 * i;
        finalString += `╔════╗╔════╗╔════╗╔════╗\n`;
        finalString += `║ ${rezultatiBrojke[temp]} ║║ ${rezultatiBrojke[temp+1]} ║║ ${rezultatiBrojke[temp+2]} ║║ ${rezultatiBrojke[temp+3]} ║\n`;
        finalString += `╚════╝╚════╝╚════╝╚════╝\n`;
    }

    temp = redovi * 4; var zadnjiDeo = ['', '', ''];
    for(let i = 0; i < ostatak; i++) {
        zadnjiDeo[0] += '╔════╗';
        zadnjiDeo[1] += `║ ${rezultatiBrojke[temp + i]} ║`;
        zadnjiDeo[2] += '╚════╝';
    }

    finalString = `${finalString}${zadnjiDeo[0]}\n${zadnjiDeo[1]}\n${zadnjiDeo[2]}`;

    await message.channel.createMessage({
        messageReference: getMessageReference(message),
        embed: {
            author: { name: "Kockica" },
            title: `Kockica sa ${brojKockice} lica je bačena ${brojRolanja} puta`,
            thumbnail: { url: 'https://i.imgur.com/NGMrS3S.png' },
            color: 0xAC2727,
            description: `__*Rezultat/i:*__\n\`\`\`${finalString}\`\`\``,
            fields: [
                {
                    name: ":abacus: Prosek",
                    value: `***${Math.round(sumaSvih / brojRolanja)}***`,
                    inline: true
                }
            ],
            footer: getFooter(message)
        }
    })


});

module.exports = roll;