const response = [
    //good
    { type: 'good', message: 'It is Certain.' },
    { type: 'good', message: 'It is decidedly so.'},
    { type: 'good', message: 'Without a doubt.'},
    { type: 'good', message: 'Yes – definitely.' },
    { type: 'good', message: 'You may rely on it.' },
    { type: 'good', message: 'As I see it, yes.' },
    { type: 'good', message: 'Most likely.' },
    { type: 'good', message: 'Outlook good.' },
    { type: 'good', message: 'Yes.' },
    { type: 'good', message: 'Signs point to yes.' },

    //neutral
    { type: 'neutral', message: 'Reply hazy, try again.' },
    { type: 'neutral', message: 'Ask again later.' },
    { type: 'neutral', message: 'Better not tell you now.' },
    { type: 'neutral', message: 'Cannot predict now.' },
    { type: 'neutral', message: 'Concentrate and ask again.' },

    //bad
    { type: 'bad', message: 'Don’t count on it.' },
    { type: 'bad', message: 'My reply is no.' },
    { type: 'bad', message: 'My sources say no.' },
    { type: 'bad', message: 'Outlook not so good.' },
    { type: 'bad', message: 'Very doubtful.' }
];

const image = "https://i.imgur.com/ClrZmXl.png";

module.exports = {
    response,
    image
}