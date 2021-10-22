const fs = require('fs');
const colors = require('colors');

//debug funkcija za evente, LOG funkcija
const stenkLog = async (type, color, message) => {
    const vreme = new Date();
    const vremeVreme = vreme.toLocaleTimeString('sr-RS');
    //const vremeDatum = vreme.toLocaleDateString('sr-RS');
    const logMessage = `[${type}] ${vremeVreme} `[color] + message;
    const logMessageClean = `[${type}] ${vremeVreme} ` + message + '\n';

    //ako log folder ne postoji, napravi ga
    if(!fs.existsSync('./log')) { fs.mkdirSync(`./log`); }

    //ako ne postoji danasnji log folder, napravi ga
    await fs.appendFile(`./log/${vreme.getDate()}.${vreme.getMonth() + 1}.${vreme.getFullYear()}.txt`, logMessageClean, (err) => {
        if(err) { console.log("[FILE] ".red + err) };
    });

    console.log(logMessage);
}

//SYNC - debug funkcija za evente, LOG funkcija
const stenkLogSync = (type, color, message) => {
    const vreme = new Date();
    const vremeVreme = vreme.toLocaleTimeString('sr-RS');
    //const vremeDatum = vreme.toLocaleDateString('sr-RS');
    const logMessage = `[${type}] ${vremeVreme} `[color] + message;
    const logMessageClean = `[${type}] ${vremeVreme} ` + message + '\n';

    //ako log folder ne postoji, napravi ga
    if(!fs.existsSync('./log')) { fs.mkdirSync(`./log`); }

    //ako ne postoji danasnji log folder, napravi ga
    fs.appendFileSync(`./log/${vreme.getDate()}.${vreme.getMonth() + 1}.${vreme.getFullYear()}.txt`, logMessageClean, (err) => {
        if(err) { console.log("[FILE] ".red + err) };
    });

    console.log(logMessage);
}

const printCommandNames = (bot) => {
	bot.commands.forEach(command => {
		console.log(command.names);
	});
};

// --- STATUSI ZA ELFAK ---
//0 is playing
//1 is streaming (url)
//2 is listening
//3 is watching
//// 4 custom
//5 is competing
const statusi = [

    // elfak statusi
    { name: "predavanja na MS Teams", type: 1 }, //is streaming predavanja ...
    { name: "predavanja na MS Teams", type: 2 }, //is listening predavanja ...
	{ name: "predavanja na MS Teams", type: 3 }, //is watching predavanja ...
	{ name: "u polaganju fizike kod Ristića", type: 5 }, //is competing u polaganju ...
    { name: "učenje za sledeći rok", type: 0 },
    { name: "upadanje na budžet", type: 0 },

    // smesni statusi
    { name: "Based Department", type: 3 },

    // igrice statusi - playing
    { name: 'Doom', type: 0 },
    { name: 'Doom Eternal', type: 0 },
    { name: 'Minecraft', type: 0 },

    // albumi statusi - listening
    { name: 'The Dark Side of the Moon', type: 2 },
    { name: 'The Wall', type: 2 },
    { name: 'Wish You Were Here', type: 2 },
    { name: 'Echoes', type: 2 },
    { name: 'Kost u grlu', type: 2 },
    { name: 'Buvlja pijaca', type: 2 },
    { name: 'The Jimi Hendrix Experience', type: 2 },
    { name: 'Plitka poezija', type: 2 },
    { name: 'In the Aeroplane Over the Sea', type: 2 },
    { name: 'Filosofem', type: 2 },
    { name: 'Odyssey', type: 2 }, //HOME 2014

    // bendovi/umetnici statusi - listening
    { name: 'Pink Floyd', type: 2 },
    { name: 'Led Zeppelin', type: 2 },
    { name: 'Metallica', type: 2 },
    { name: 'Aerosmith', type: 2 },
    { name: 'Deep Purple', type: 2 },
    { name: 'Goblini', type: 2 },
    { name: 'Riblja Čorba', type: 2 },
    { name: 'Jimi Hendrix', type: 2 },
    { name: 'Bob Dylan', type: 2 },
    { name: 'Smak', type: 2 },
    { name: 'Bijelo Dugme', type: 2 },
    { name: 'Azra', type: 2 },
    { name: 'EKV', type: 2 },
    { name: 'Deadmau5', type: 2 },
    { name: 'Blondie', type: 2 },
    { name: 'U2', type: 2 },
    { name: 'Skrillex', type: 2 },
    { name: 'Svemirko', type: 2 },
    { name: 'The Sisters of Mercy', type: 2 },
    { name: 'VIDEOSEX', type: 2 },
    { name: 'Joy Division', type: 2 },
    { name: 'Молчат Дома', type: 2 },
    { name: 'The White Stripes', type: 2 },
    { name: 'Pekinška Patka', type: 2 },
    { name: 'The Cure', type: 2 },
    { name: 'Crystal Castles', type: 2 },
    { name: 'Griva', type: 2 },
    { name: 'Film', type: 2 },
    { name: 'Delča', type: 2 },
    { name: 'Laki Pingvini', type: 2 },
    { name: 'Fit', type: 2 },
    { name: 'Boney M.', type: 2 },
    { name: 'Neutral Milk Hotel', type: 2 },
    { name: 'Ramones', type: 2 },
    { name: 'Daft Punk', type: 2 },
    { name: 'ZZ Top', type: 2 },
    { name: 'Parni Valjak', type: 2 },
    { name: 'Burzum', type: 2 },
    { name: 'Nirvana', type: 2 },
    { name: 'Daddy\'s Hands', type: 2 },
    { name: 'Negative XP', type: 2 },
    { name: 'Ozzy Osbourne', type: 2 },
    { name: 'Partibrejkers', type: 2 },
    { name: 'Queen', type: 2 },
    { name: 'Gorillaz', type: 2 },
    { name: 'Black Sabbath', type: 2 },
    { name: 'The Weeknd', type: 2 },
    { name: 'Joji', type: 2 },
    { name: 'PINK GUY', type: 2 },
    { name: 'The Prodigy', type: 2 },
    { name: 'Radiohead', type: 2 },
    { name: 'Sex Bob-omb', type: 2 },
    { name: 'Van Gogh', type: 2 },
    { name: 'Pixies', type: 2 },
    { name: 'The Glitch Mob', type: 2 },
    { name: 'Rammstein', type: 2 },
    { name: 'Južni Vetar', type: 2 },
    { name: 'Elvis Presley', type: 2 },
    { name: 'The Doors', type: 2 },
    { name: 'Duran Duran', type: 2 },
    { name: 'Dire Straits', type: 2 },
    { name: 'The Rolling Stones', type: 2 },
    { name: 'Toto', type: 2 },
    { name: 'Culture Club', type: 2 },
    { name: 'OMFO', type: 2 },
    { name: 'Chubby Checker', type: 2 },
    { name: 'Carpenter Brut', type: 2 },
    { name: 'Vangelis', type: 2 },
    { name: 'Massive Attack', type: 2 },
    { name: 'C418', type: 2 },
    { name: 'The Avalanches', type: 2 },
    { name: 'Oasis', type: 2 },
    { name: 'Ajs Nigrutin', type: 2 },
    { name: 'Sky Wikluh', type: 2 },
    { name: 'Bad Copy', type: 2 },
    { name: 'Eminem', type: 2 },
    { name: 'Twenty One Pilots', type: 2 },
    { name: 'Kenny Loggins', type: 2 },
    { name: 'Two Feet', type: 2 },
    { name: 'M|O|O|N', type: 2 },
    { name: 'Dead Or Alive', type: 2 },
    { name: 'The Police', type: 2 },
    { name: 'Divlje Jagode', type: 2 },
    { name: 'Divlji Anđeli', type: 2 },
    { name: 'HOME', type: 2 },
    { name: 'YU Grupa', type: 2 },
    { name: 'OKTOBAR 1864', type: 2 },
    { name: 'Denis & Denis', type: 2 },
    { name: 'Bitipatibi', type: 2 },
    { name: 'Zhu', type: 2 },
    { name: 'Eurythmics', type: 2 },
    { name: 'The Bangles', type: 2 },
    { name: 'Crvena Jabuka', type: 2 },
    { name: 'Zabranjeno Pušenje', type: 2 },
    { name: 'Johnny Cash', type: 2 }

];

const stenkBotTitle = `
  ____  _             _    ____        _
 / ___|| |_ ___ _ __ | | _| __ )  ___ | |_
 \\___ \\| __/ _ \\ '_ \\| |/ /  _ \\ / _ \\| __|
  ___) | ||  __/ | | |   <| |_) | (_) | |_
 |____/ \\__\\___|_| |_|_|\\_\\____/ \\___/ \\__|

`.green;

module.exports = {
    stenkLog,
    stenkLogSync,

    /*printCommandNames,*/
    colors,
    statusi,
    stenkBotTitle
}