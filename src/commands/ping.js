const { Command } = require('yuuko');
module.exports = new Command('ping', async (message) => {
    await message.channel.createMessage('Pong');
});