const { Command } = require("yuuko");
const { getMessageReference } = require('../lib/tools');

const debug = new Command('debug', async (message, args, context) => {
    await message.channel.createMessage({
        messageReference: getMessageReference(message),
        content: 'a',
        "components": [
            {
                "type": 1,
                "components": [
                    {
                        "type": 2,
                        "label": "DOBAR DAN!",
                        "style": 1,
                        "custom_id": "dobardan"
                    }
                ]

            }
        ]
    })
});

module.exports = debug;