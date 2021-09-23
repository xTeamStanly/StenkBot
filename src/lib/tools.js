const randomList = (input) => {
    return input[Math.floor(Math.random() * input.length)];
};

const countOccurrences = (input, value) => {
    return input.split(value).length - 1;
};

const randomBetweenIncluding = (min, max) => {
    return Math.floor(Math.random() * (max - min + 1)) + min;
};

const getTodaysDate = () => {
    const trenutnoVreme = new Date();
    return `${trenutnoVreme.toLocaleDateString('sr-RS')} ${trenutnoVreme.toLocaleTimeString('sr-RS')}` //!napravi format datuma
}

module.exports = {
    randomList,
    countOccurrences,
    randomBetweenIncluding,
    getTodaysDate
};
