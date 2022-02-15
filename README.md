# StenkBot - Diskord Bot

<!-- bedzevi -->
![Version](https://img.shields.io/badge/verzija-1.2.1-blue)
![JavaScript](https://img.shields.io/badge/javascript-%23323330.svg?logo=javascript&logoColor=%23F7DF1E)
![NodeJS](https://img.shields.io/badge/node.js-6DA55F?logo=node.js&logoColor=white)

Nastao kao druga "_poboljšana_" iteracija ***StenkAI***.

## 🤔 Kako da pokrenem?
Prvenstveno morate da imate instaliran [Node.js](https://nodejs.org/) i [Discord Aplikaciju](https://discord.com/developers/applications) u [Discord Developer Portal-u](https://discord.com/developers).

1. U [`src`](https://github.com/xTeamStanly/StenkBot/tree/main/src) folderu potrebno je kreirati `config.env` fajl.
2. Dodati `BOT_TOKEN` i `PREFIX` u `config.env` fajl, primer:
```
BOT_TOKEN = 'MOJ BOT TOKEN' # <--- string
PREFIX = 'MOJ PREFIX'       # <--- string
```
3. Instalirati sve node module komandom `npm install`.
4. Poželjno je personalizujete [`src/lib/botHelper.js`](https://github.com/xTeamStanly/StenkBot/blob/main/src/lib/botHelper.js) (`botAvatar`, `botAvatarBase64`).
5. Cooldown možete da podesite u [`src/lib/cooldownConfig.js`](https://github.com/xTeamStanly/StenkBot/blob/main/src/lib/cooldownConfig.js) (nula znači da cooldown ne postoji).
6. Pokrenuti aplikaciju preko `npm run start` ili `node .`.
7. Za više informacija pogledati `help` komandu u samom botu.

## 🧰 Dodatno

### ⚡ Powered by
- [Node.js](https://nodejs.org/)
- [Eris](https://www.npmjs.com/package/eris)
- [Yuuko](https://www.npmjs.com/package/yuuko)
- [Cron](https://www.npmjs.com/package/node-cron)
- [Axios](https://www.npmjs.com/package/axios)
- [Cheerio](https://www.npmjs.com/package/cheerio)
- [Moment](https://www.npmjs.com/package/moment)

### 📒 ToDo

### 👋 Pozdrav
