const { Command } = require("yuuko");
const { getMessageReference, getFooter } = require('../../../lib/tools');

const mock = new Command(['mock','spongebob'], async (message, args, context) => {

    var input = args.join(' ');
    var naslov; var sadrzaj;

    //imamo unos
    if(input != '') {
        var output = '';

        //nema input duzi od 1024 karaktera
        if(input.length > 1024) { input = input.substring(0, 1024) + '...'; }

        for(let i = 0; i < input.length; i++) {
            output += ((Math.random() > 0.5) ? input.charAt(i).toLowerCase() : input.charAt(i).toUpperCase());
        }

        naslov = 'Rezultat';
        sadrzaj = output;

    } else { //nemamo unos
        naslov = "Prazan unos";
        sadrzaj = "UnESiTe NeŠtO!";
    }

    await message.channel.createMessage({
        messageReference: getMessageReference(message),
        embed: {
            author: { name: "Mocking" },
            thumbnail: { url: 'https://i.imgur.com/kzauus7.png' },
            color: 0xF9FB45,
            footer: getFooter(message),
            title: naslov,
            description: sadrzaj
        }
    });
});

module.exports = mock;