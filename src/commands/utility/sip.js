const { Command, Client } = require("yuuko");
const { getMessageReference, customWebHookCheckAndCreate, errNaslov, errSadrzaj, getFooter } = require('../../lib/tools');
const storage = require('node-persist');

// const cron = require('node-cron');
// const { fetchPostovi } = require('./sip-fetcher');
// cron.schedule('0 */1 * * * *', async () => {
//     await fetchPostovi();
// });


const image = 'https://i.imgur.com/dyu12dZ.png';


const sipRegister = new Command('sip', async (message, args, context) => {

    try {

        var postoji = false;
        const hook = await customWebHookCheckAndCreate(message, context);

        var currentHooks = await storage.getItem('sipHooks'); //svi trenutni hook-ovi iz fajla

        //trazimo hook
        for (let i = 0; i < currentHooks.length && !postoji; i++) {
            if(currentHooks[i].id == hook.id) { postoji = true; break; }
        }

        //ako postoji, dodajemo ga u listu
        if(!postoji) {
            currentHooks.push(hook); //dodajemo u listu
            await storage.setItem('sipHooks', currentHooks); //dodajemo u storage

            //obavestimo korisnika da je hook aktivan
            await message.channel.createMessage({
                messageReference: getMessageReference(message),
                embed: {
                    author: { name: "SIP" },
                    thumbnail: { url: image },
                    title: `:warning: WebHook registrovan :warning:`,
                    color: 0x65BD36,
                    /*description: `**[Link ka poruci](${message.jumpLink})**`,*/
                    footer: getFooter(message)
                }
            });

        } else {

            //pamtimo hook id od hook-a koji cemo da izbrisemo
            const hookID = hook.id;

            //izbrisemo webhook
            await context.client.deleteWebhook(hook.id, hook.token, "SIP Hook Delete");

            //izbrisemo ga sa liste hook-ova koje sluzimo
            for(let i = 0; i < currentHooks.length; i++) {
                if(currentHooks[i].id == hookID) { currentHooks = currentHooks.splice(i, 1); break; }
            }

            //sacuvamo promene na storage
            await storage.setItem('sipHooks', currentHooks);

            //obavestimo korisnika da smo obrisali
            await message.channel.createMessage({
                messageReference: getMessageReference(message),
                embed: {
                    author: { name: "SIP" },
                    thumbnail: { url: image },
                    title: `:warning: WebHook obrisan :warning:`,
                    color: 0x65BD36,
                    /*description: `**[Link ka poruci](${message.jumpLink})**`,*/
                    footer: getFooter(message)
                }
            });



            //webhook postoji - STARA METODA NE KORISTI SE
            /*
            await context.client.executeWebhook(
                hook.id,
                hook.token,
                {
                    embeds: [{
                        author: { name: "SIP" },
                        thumbnail: { url: image },
                        title: `:warning: WebHook već postoji :warning:`,
                        color: 0x65BD36,
                        description: `**[Link ka poruci](${message.jumpLink})**`,
                        footer: getFooter(message)
                    }]
                }
            );*/
        }

    } catch(err) {
        console.log(err);
        await message.channel.createMessage({
            messageReference: getMessageReference(message),
            embed: {
                author: { name: "SIP" },
                thumbnail: { url: image },
                title: errNaslov,
                description: errSadrzaj,
                color: 0x65BD36,
                footer: getFooter(message)
            }
        });
    }
});

module.exports = sipRegister;