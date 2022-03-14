function random(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

const drawRandomPattern = (image, ctx) => {
    ctx.globalAlpha = 0.5;
    ctx.save();
    for (let i = 0; i < 100; i++) {
        ctx.rotate(random(0, 360) * Math.PI / 180);
        ctx.drawImage(image, random(0, ctx.canvas.width), random(0, ctx.canvas.height), 32, 32);
    }
    ctx.globalAlpha = 1;
    ctx.restore();
}
module.exports = { drawRandomPattern };