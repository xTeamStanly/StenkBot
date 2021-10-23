const { Command } = require("yuuko");
const { getMessageReference, getFooter } = require('../../../lib/tools');

//engleska abeceda, brojke i specijalni znaci
const regexMatch = /^[a-zA-Z0-9!@#$%^&*()\s_+\-=\[\]{};':"\\|,.<>\/?]*$/;

const jesteValidno = (unos) => {
    return (unos != null && unos.trim() !== "" && regexMatch.test(unos) === true);
}

const leetConvert = (unos) => {
    var x = unos.toLowerCase();

    x = x
        .replace(/a/g, '4')
        .replace(/b/g, '8')
        .replace(/e/g, '3')
        .replace(/g/g, '6')
        .replace(/i/g, '1')
        .replace(/o/g, '0')
        .replace(/s/g, '5')
        .replace(/t/g, '7');

    return x.charAt(0).toUpperCase() + x.slice(1);
}

const leetDeconvert = (unos) => {
    var x = unos.toLowerCase();

    x = x
        .replace(/4/g, 'a')
        .replace(/8/g, 'b')
        .replace(/3/g, 'e')
        .replace(/6/g, 'g')
        .replace(/1/g, 'i')
        .replace(/0/g, 'o')
        .replace(/5/g, 's')
        .replace(/7/g, 't');

    return x.charAt(0).toUpperCase() + x.slice(1);
}

const validirajTekstIVrati = (input, encode) => {
    var naslov; var sadrzaj;

    if(jesteValidno(input)) {
        input = input.replace(/\s\s+/g, ' ').trim(); //vise razmaka u jedan + trim

        //nema input duzi od 1024 karaktera
        if(input.length > 1024) { input = input.substring(0, 1024) + '...'; }

        naslov = "Rezultat";
        sadrzaj = (encode) ? leetConvert(input) : leetDeconvert(input);
    } else {
        naslov = ":frowning2: Un05 n1j3 v4l1d4n!";

        if(input.length) {
            sadrzaj = "P0drž4n4 je 3n6l3ska 483c3d3 54 r4zm4cim4 1 5p3c1j4ln1m k4r4kt3r1m4!"
        } else {
            sadrzaj = "Un351t3 nešt0!";
        }
    }

    return [naslov, sadrzaj];
}

const leetEncode = new Command(['encode', 'encoder'], async (message, args, context) => {
    var rezultat = validirajTekstIVrati(args.join(' '), true);
    await message.channel.createMessage({
        messageReference: getMessageReference(message),
        embed: {
            author: { name: "L33TSP34K" },
            thumbnail: { url: 'https://i.imgur.com/EuAxIry.png' },
            color: 0x7EC2B0,
            footer: getFooter(message),
            title: rezultat[0],
            description: rezultat[1]
        }
    });
});

const leetDecode = new Command(['decode', 'decoder'], async (message, args, context) => {
    var rezultat = validirajTekstIVrati(args.join(' '), false);
    await message.channel.createMessage({
        messageReference: getMessageReference(message),
        embed: {
            author: { name: "L33TSP34K" },
            thumbnail: { url: 'https://i.imgur.com/EuAxIry.png' },
            color: 0x7EC2B0,
            footer: getFooter(message),
            title: rezultat[0],
            description: rezultat[1]
        }
    });
});

const leet = new Command(['leet','l33t'], async (message, args, context) => {
    var rezultat = validirajTekstIVrati(args.join(' '), true);
    await message.channel.createMessage({
        messageReference: getMessageReference(message),
        embed: {
            author: { name: "L33TSP34K" },
            thumbnail: { url: 'https://i.imgur.com/EuAxIry.png' },
            color: 0x7EC2B0,
            footer: getFooter(message),
            title: rezultat[0],
            description: rezultat[1]
        }
    });
}).addSubcommand(leetEncode).addSubcommand(leetDecode).addSubcommand(new Command(['help', 'pomoc', '?', 'info'], async (message, args, context) => {
    await message.channel.createMessage({
        messageReference: getMessageReference(message),
        embed: {
            author: { name: "L33TSP34K" },
            thumbnail: { url: 'https://i.imgur.com/EuAxIry.png' },
            color: 0x7EC2B0,
            footer: getFooter(message),
            title: ':book: Pomoć',
            description: "__***Opis:***__\n• Pretvara tekst u l33t tekst.\n\n__***Sva imena komande:***__\n• **leet**\n• **l33t**\n\n__***Podkomande:***__\n• **encode**, **encoder** - generiše l33t tekst\n• **decode**, **decoder** - dekodira l33t tekst\n\n__***Korišćenje:***__\n• **leet __<UNOS>__** - pretvara __UNOS__ u l33t tekst\n• **leet encode __<UNOS>__** - pretvara __UNOS__ u l33t tekst\n• **leet decode __<UNOS>__** - pretvara l33t __UNOS__ u običan tekst"
        }
    });
}));
'weather', 'vremenskaprognoza', 'vremenska', 'wttr', 'vreme'
module.exports = leet;