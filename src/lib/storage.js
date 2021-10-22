//storage names
const storagePath = './storage';
const sipFetcherDatabaseName = 'sip-fetcher.db';
const hookDatabaseName = 'hooks.db';

const path = require('path');
const sipFetcherDatabasePath = path.join(storagePath, sipFetcherDatabaseName);
const hookDatabasePath = path.join(storagePath, hookDatabaseName);

//folder + database
const fs = require('fs-extra'); fs.ensureDirSync(storagePath);
const db = require('better-sqlite3');
const dbSip = db(sipFetcherDatabasePath);
const dbHooks = db(hookDatabasePath);

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

//check if all storage is valid
const checkStorage = () => { return fs.existsSync(storagePath) && fs.existsSync(sipFetcherDatabasePath) && fs.existsSync(hookDatabasePath); }

//sipfetch get
const sipFetcherGetData = () => {
    return dbSip.prepare("SELECT DATA FROM POSTOVI").all().map((item) => { return JSON.parse(item.DATA); });
}

//sipfetch set
const sipFetcherSetData = (stariLevi, noviLevi, stariDesni, noviDesni) => {
    dbSip.prepare(`UPDATE POSTOVI SET DATA = '${JSON.stringify(stariLevi)}' WHERE ID = 'stariPostoviLevi'`).run();
    dbSip.prepare(`UPDATE POSTOVI SET DATA = '${JSON.stringify(noviLevi)}' WHERE ID = 'noviPostoviLevi'`).run();
    dbSip.prepare(`UPDATE POSTOVI SET DATA = '${JSON.stringify(stariDesni)}' WHERE ID = 'stariPostoviDesni'`).run();
    dbSip.prepare(`UPDATE POSTOVI SET DATA = '${JSON.stringify(noviDesni)}' WHERE ID = 'noviPostoviDesni'`).run();
};

//hook get
const hookGetData = () => {
    return dbHooks.prepare("SELECT DATA FROM HOOKOVI").all().map((item) => { return JSON.parse(item.DATA); })[0];;
}

//hook set
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