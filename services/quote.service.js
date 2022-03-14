const { createCanvas, registerFont, loadImage } = require('canvas')
const fs = require("fs");
const { generateGradient } = require("../utils/gradient");
const { wrapText } = require("../utils/text");
const { randomQuote } = require("../utils/quotes");
const { drawRandomPattern } = require("../utils/pattern");
const { random } = require("../utils");

module.exports.generateImage = async () => {
    registerFont('./assets/Cardo-Regular.ttf', { family: 'Cardo' });
    registerFont('./assets/Oswald.ttf', { family: 'Oswald' });
    registerFont('./assets/DancingScript.ttf', { family: 'DancingScript' });
    const canvas = createCanvas(1080, 1350);
    const ctx = canvas.getContext('2d');

    // Gradient background
    let grdConfig = generateGradient();
    var grd = ctx.createLinearGradient(0, 0, 0, canvas.height);
    grd.addColorStop(0, grdConfig.c1);
    grd.addColorStop(1, grdConfig.c2);
    ctx.fillStyle = grd;
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    // pattern
    let image = await loadImage(`./assets/pattern${random(1, 5)}.png`);
    drawRandomPattern(image, ctx);

    // white overlay
    let margin = 80;
    ctx.fillStyle = "white";
    ctx.globalAlpha = 0.5;
    ctx.fillRect(margin, margin, canvas.width - margin * 2, canvas.height - margin * 2);
    ctx.globalAlpha = 1;

    // vertices
    let vMargin = margin + 50;
    ctx.strokeStyle = "#373737";
    ctx.lineWidth = 2;
    ctx.lineCap = "square";
    let size = 120;

    // top-left
    let x = vMargin;
    let y = vMargin;
    ctx.beginPath();
    ctx.moveTo(x, y);
    ctx.lineTo(x + size, y);
    ctx.moveTo(x, y);
    ctx.lineTo(x, y + size);
    ctx.stroke();

    // top-right
    x = canvas.width - vMargin;
    ctx.beginPath();
    ctx.moveTo(x, y);
    ctx.lineTo(x - size, y);
    ctx.moveTo(x, y);
    ctx.lineTo(x, y + size);
    ctx.stroke();

    // bottom-right
    y = canvas.height - vMargin;
    ctx.beginPath();
    ctx.moveTo(x, y);
    ctx.lineTo(x - size, y);
    ctx.moveTo(x, y);
    ctx.lineTo(x, y - size);
    ctx.stroke();

    // bottom-left
    x = vMargin;
    ctx.beginPath();
    ctx.moveTo(x, y);
    ctx.lineTo(x + size, y);
    ctx.moveTo(x, y);
    ctx.lineTo(x, y - size);
    ctx.stroke();

    // Text
    let quote = randomQuote();
    ctx.fillStyle = "black";
    ctx.font = '80px "Cardo"';
    ctx.textAlign = "center";
    wrapText(ctx, `${quote.q}`, 90, quote.a);
    fs.writeFileSync("./assets/latest_quote.txt", `${quote.q} ${quote.a ? ('\n - ' + quote.a) : ''}`);

    // Logo
    ctx.font = '54px "DancingScript"';
    ctx.fillText("positive thoughts", ctx.canvas.width / 2, 250);

    // save image
    const buffer = canvas.toBuffer("image/jpeg");
    fs.writeFileSync("./assets/quote.jpg", buffer);
}