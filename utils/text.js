exports.wrapText = (ctx, text, lineHeight, author) => {
    var words = text.split(' ');
    var line = '';
    var maxWidth = ctx.canvas.width * 0.75;
    let x = ctx.canvas.width * 0.5;
    let y = ctx.canvas.height * 0.35;

    for (var n = 0; n < words.length; n++) {
        var testLine = line + words[n] + ' ';
        var metrics = ctx.measureText(testLine);
        var testWidth = metrics.width;
        if (testWidth > maxWidth && n > 0) {
            ctx.fillText(line, x, y);
            line = words[n] + ' ';
            y += lineHeight;
        }
        else line = testLine;
    }
    ctx.fillText(line, x, y);
    
    // author
    y += lineHeight + 40;
    ctx.font = '80px "Oswald"';
    ctx.fillText(author, x , y);
}
