const { Command } = require("yuuko");
const { getMessageReference, customWebHookCheckAndCreate, errNaslov, errSadrzaj, getFooter } = require('../../lib/tools');
const { hookGetData, hookSetData } = require('../../lib/storage');

//const storage = require('node-persist');

const image = 'https://i.imgur.com/dyu12dZ.png';

const sipRegister = new Command('sip', async (message, args, context) => {

    try {

        var postoji = false;

        const hook = await customWebHookCheckAndCreate(message, context);

        //var currentHooks = await storage.getItem('sipHooks'); //svi trenutni hook-ovi iz fajla
        var currentHooks = await hookGetData();
        //console.log(currentHooks);

        //trazimo hook
        for (let i = 0; i < currentHooks.length && !postoji; i++) {
            if(currentHooks[i].channel_id == hook.channel_id) { postoji = true; break; }
        }

        //ako postoji, dodajemo ga u listu
        if(!postoji) {
            currentHooks.push(hook); //dodajemo u listu

            await hookSetData(currentHooks);
            //await storage.setItem('sipHooks', currentHooks); //dodajemo u storage

            //console.log("DODATA NEPOSTOJECA KUKA")

            //obavestimo korisnika da je hook aktivan
            await message.channel.createMessage({
                messageReference: getMessageReference(message),
                embed: {
                    author: { name: "SIP", url: 'https://sip.elfak.ni.ac.rs/' },
                    thumbnail: { url: image },
                    title: `:warning: WebHook registrovan :warning:`,
                    color: 0x65BD36,
                    footer: getFooter(message)
                }
            });

        } else {

            //pamtimo hook id od hook-a koji cemo da izbrisemo
            const hookChannelID = hook.channel_id;

            //izbrisemo webhook
            await context.client.deleteWebhook(hook.id, hook.token, "SIP Hook Delete");

            //izbrisemo ga sa liste hook-ova koje sluzimo
            for(let i = 0; i < currentHooks.length; i++) {
                if(currentHooks[i].channel_id == hookChannelID) { currentHooks.splice(i, 1); break; }
            }

            //sacuvamo promene na storage
            //await storage.setItem('sipHooks', currentHooks);

            await hookSetData(currentHooks);
            //console.log("OBRISANA KUKA");

            //obavestimo korisnika da smo obrisali
            await message.channel.createMessage({
                messageReference: getMessageReference(message),
                embed: {
                    author: { name: "SIP", url: 'https://sip.elfak.ni.ac.rs/' },
                    thumbnail: { url: image },
                    title: `:warning: WebHook obrisan :warning:`,
                    color: 0x65BD36,
                    footer: getFooter(message)
                }
            });
        }

    } catch(err) {
        //console.log("STA JE OVO BRE".rainbow)
        console.log(err);
        await message.channel.createMessage({
            messageReference: getMessageReference(message),
            embed: {
                author: { name: "SIP", url: 'https://sip.elfak.ni.ac.rs/' },
                thumbnail: { url: image },
                title: errNaslov,
                description: errSadrzaj,
                color: 0x65BD36,
                footer: getFooter(message)
            }
        });
    }
}).addSubcommand(new Command(['help', 'pomoc', '?', 'info'], async (message, args, context) => {
    await message.channel.createMessage({
        messageReference: getMessageReference(message),
        embed: {
            author: { name: "SIP", url: 'https://sip.elfak.ni.ac.rs/' },
            url: 'https://sip.elfak.ni.ac.rs/',
            color: 0x65BD36,
            thumbnail: { url: image },
            footer: getFooter(message),
            title: ':book: Pomo??',
            description: "__***Opis:***__\n??? Registruje ili uklanja SIP WebHook sa kanala.\n??? Registruje odre??eni kanal kako bi primao SIP obave??tenja.\n??? Radi na principu prekida??a.\n\n__***Sva imena komande:***__\n??? **sip**\n\n__***Kori????enje:***__\n??? **sip** - registruje/uklanja SIP WebHook kanal\n\n__***Dodatno:***__\n??? Koristi WebHook kako bi poslao vi??e embed-a odjednom (smanjuje spam)\n??? Samo gazda ima pravo na ovu komandu!\n??? Pre nego ??to izbacite bota sa servera po??eljno je da odjavite sve kanale."
        }
    });
}));

//! SAMO GAZDA MOZE DA POKRENE OVU KOMANDU
sipRegister.requirements = { owner: true }

module.exports = sipRegister;