const randomList = (input) => {
    return input[Math.floor(Math.random() * input.length)];
};

const countOccurences = (input, value) => {
    return input.split(value).length - 1;
};

const randomBetweenIncluding = (min, max) => {
    return Math.floor(Math.random() * (max - min + 1)) + min;
};

module.exports = {
    randomList,
    countOccurences,
    randomBetweenIncluding
};
