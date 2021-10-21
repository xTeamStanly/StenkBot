//storage names
const storagePath = './storage';
const sipFetcherDatabaseName = 'sip-fetcher.db';
const hookDatabaseName = 'hooks.db';

const path = require('path');
const sipFetcherDatabasePath = path.join(storagePath, sipFetcherDatabaseName);
const hookDatabasePath = path.join(storagePath, hookDatabaseName);

//folder + database
const fs = require('fs-extra'); fs.ensureDirSync(storagePath);
const dbSip = require('better-sqlite3')(sipFetcherDatabasePath);
const dbHooks = require('better-sqlite3')(hookDatabasePath);

//setup za sipfetcher
const setupSipFetcherStorage = () => {
    dbSip.prepare("CREATE TABLE IF NOT EXISTS POSTOVI('ID' text, 'DATA' text);").run();
    var rezultat = dbSip.prepare("SELECT * FROM POSTOVI").all();

    //ako nemamo sve prvo brisemo, pa dodajemo ponovo sve ispocetka
    if(rezultat.length < 4) {
        dbSip.prepare("DELETE FROM POSTOVI").run();
        dbSip.prepare("INSERT INTO POSTOVI (ID, DATA) VALUES ('stariPostoviLevi', '[]'), ('noviPostoviLevi', '[]'), ('stariPostoviDesni', '[]'), ('noviPostoviDesni', '[]');").run();
    }
}

//setup za hooks
const setupHookStorage = () => {
    dbHooks.prepare("CREATE TABLE IF NOT EXISTS HOOKOVI('ID' text, 'DATA' text);").run();
    var rezultat = dbHooks.prepare("SELECT * FROM HOOKOVI").all();

    //ako nema nista dodaj prazan sip hook
    if(rezultat.length == 0) {
        dbHooks.prepare("INSERT INTO HOOKOVI (ID, DATA) VALUES ('sipHooks', '[]')").run();
    }
}


//setup za svaki storage
const setupStorage = () => {
    setupSipFetcherStorage();
    setupHookStorage();
};



const checkStorage = () => { return fs.existsSync(storagePath) && fs.existsSync(sipFetcherDatabasePath) && fs.existsSync(hookDatabasePath); }

const sipFetcherGetData = () => {
    return dbSip.prepare("SELECT DATA FROM POSTOVI").all().map((item) => { return JSON.parse(item.DATA); });
}

const hookGetData = () => {
    return dbHooks.prepare("SELECT DATA FROM HOOKOVI").all().map((item) => { return JSON.parse(item.DATA); })[0];;
}

const sipFetcherSetData = (stariLevi, noviLevi, stariDesni, noviDesni) => {
    dbSip.prepare(`UPDATE POSTOVI SET DATA = '${JSON.stringify(stariLevi)}' WHERE ID = 'stariPostoviLevi'`).run();
    dbSip.prepare(`UPDATE POSTOVI SET DATA = '${JSON.stringify(noviLevi)}' WHERE ID = 'noviPostoviLevi'`).run();
    dbSip.prepare(`UPDATE POSTOVI SET DATA = '${JSON.stringify(stariDesni)}' WHERE ID = 'stariPostoviDesni'`).run();
    dbSip.prepare(`UPDATE POSTOVI SET DATA = '${JSON.stringify(noviDesni)}' WHERE ID = 'noviPostoviDesni'`).run();
};

const hookSetData = (newHooks) => {
    dbHooks.prepare(`UPDATE HOOKOVI SET DATA = '${JSON.stringify(newHooks)}' WHERE ID = 'sipHooks'`).run();
}

module.exports = {
    setupStorage,
    checkStorage,
    sipFetcherGetData,
    sipFetcherSetData,
    hookGetData,
    hookSetData
};