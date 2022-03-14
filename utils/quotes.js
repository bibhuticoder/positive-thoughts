const fs = require("fs");

function random(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

const randomQuote = () => {
    try {
        const QUOTES = JSON.parse(fs.readFileSync("./assets/quotes.json")).quotes;
        return QUOTES[random(0, QUOTES.length - 1)];
    } catch (e) {
        console.log(e);
        return null;
    }
}

module.exports = { randomQuote };