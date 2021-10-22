//! COOLDOWN CONFIG

const cooldownMillis = 3000;
const cooldownSeconds = Math.round(cooldownMillis / 1000);

//cooldown se gleda po korisniku, nebitno na kojem je serveru
//ako hocemo da se gleda i server koristili bi HashMap<UserID, ServerID> (Map)
const cooldownUserSet = new Set();

module.exports = {
    cooldownMillis,
    cooldownSeconds,
    cooldownUserSet
}