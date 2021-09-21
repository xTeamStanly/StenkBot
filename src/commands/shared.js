const randomList = (input) => {
    return input[Math.floor(Math.random() * input.length)];
}

const countOccurrences = (string, delimeter) => {
    return string.split(delimeter).length - 1;
}

const randomBetweenIncluding = (min, max) => {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

module.exports = {
    randomList,
    countOccurrences,
    randomBetweenIncluding
};