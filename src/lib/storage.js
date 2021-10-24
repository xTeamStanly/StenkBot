const storage = require('node-persist');
const storagePath = './storage'; //storage folder name

//storage init
const setupStorage = async () => {
    //console.log("CREATING STORAGE");
    await storage.init({ dir: storagePath, ttl: 0 });
    if(!await storage.getItem('sipHooks')) { await storage.setItem('sipHooks', []); };
	if(!await storage.getItem('stariPostoviLevi')) { await storage.setItem('stariPostoviLevi', []); };
	if(!await storage.getItem('noviPostoviLevi')) { await storage.setItem('noviPostoviLevi', []); };
	if(!await storage.getItem('stariPostoviDesni')) { await storage.setItem('stariPostoviDesni', []); };
	if(!await storage.getItem('noviPostoviDesni')) { await storage.setItem('noviPostoviDesni', []); };
    //console.log("STORAGE CREATED");
}

//sipfetch get
const sipFetcherGetData = async () => {
    //console.log("GETTING SIP FETCHER DATA");
    var a = await storage.getItem('stariPostoviLevi');
    var b = await storage.getItem('noviPostoviLevi');
    var c = await storage.getItem('stariPostoviDesni');
    var d = await storage.getItem('noviPostoviDesni');
    //console.log("SIP FETCHER DATA GOT");
    return [a, b, c, d];
}

//sipfetch set
const sipFetcherSetData = async (stariLevi, noviLevi, stariDesni, noviDesni) => {
    //console.log("SIPFETCHER SETTING DATA");
    await storage.setItem('stariPostoviLevi', stariLevi);
    await storage.setItem('noviPostoviLevi', noviLevi);
    await storage.setItem('stariPostoviDesni', stariDesni);
    await storage.setItem('noviPostoviDesni', noviDesni);
    //console.log("SIPFETCHER DONE SETTING DATA");
};

//hook get
const hookGetData = async () => {
    //console.log("GETTING HOOK DATA");
    //var x = await storage.getItem('sipHooks');
    //console.log("HOOK DATA GOT");
    return await storage.getItem('sipHooks');
}

//hook set
const hookSetData = async (newHooks) => {
    //console.log(newHooks);
    //console.log("SETTING HOOK DATA");
    await storage.setItem('sipHooks', newHooks);
    //console.log("HOOK DATA SET");
}

module.exports = {
    setupStorage,
    sipFetcherGetData,
    sipFetcherSetData,
    hookGetData,
    hookSetData
};