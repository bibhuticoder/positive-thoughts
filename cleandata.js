const fs = require("fs");

let DATA = JSON.parse(fs.readFileSync('./assets/quotes.json'));

var funhash = function (s) {
    for (var i = 0, h = 0xdeadbeef; i < s.length; i++)
        h = Math.imul(h ^ s.charCodeAt(i), 2654435761);
    return (h ^ h >>> 16) >>> 0;
};

let cache = [];
for (let i = 0; i < DATA.quotes.length; i++) {
    const quote = DATA.quotes[i];

    if (quote.q.length <= 150) {
        let hash = funhash(quote.q + quote.a);
        if (!cache.includes(hash)) {
            cache.push(hash);
            fs.appendFileSync("./clean.json", JSON.stringify(quote) + ",");
        }
    }
    console.log(i, "out of", DATA.quotes.length);
}

