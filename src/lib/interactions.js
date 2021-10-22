//TODO INTERACTIONS
const { Button } = require('eris-components');

const interactionLibrary = new Map([
    [ 'helpButton', new Button().setID('helpButton').setStyle('green').setLabel('Help') ],
    [ 'srbaButton', new Button().setID('srbaButton').setStyle('red').setLabel('Srba') ],
    [ 'dobrojutro', new Button().setID('dobrojutro').setStyle('blurple').setLabel('GUDMORNING') ],
]);

module.exports = {
    interactionLibrary
}