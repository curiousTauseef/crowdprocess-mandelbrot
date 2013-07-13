/**
 * Create an array of jobs to send to Crowdprocess.
 * @param size  the size of the side of the image
 * @param div   divides size into jobs (total = div * div)
 * @param x     center real coordinate
 * @param y     center imaginary coordinate
 * @param scale radius of the image
 * @param max   maximum iterations
 * @returns an array of jobs, to be turned into the input JSON
 */
function tasker(size, div, x, y, scale, max) {
    var tasks = [];
    var x0 = x - scale, y0 = y - scale, x1 = x + scale, y1 = y + scale;
    var cw = x1 - x0, ch = y1 - y0,
        cxs = cw / div, cys = ch / div;
    for (var yy = 0; yy < div; yy++) {
        for (var xx = 0; xx < div; xx++) {
            tasks.push({
                id: [xx, yy],
                max: max,
                w: size / div,
                h: size / div,
                x0: x0 + cxs * xx,
                y0: y0 + cys * yy,
                x1: x0 + cxs * (xx + 1),
                y1: y0 + cys * (yy + 1)
            });
        }
    }
    return tasks;
}

/**
 * Draw a results array onto a canvas. This assumes the canvas is
 * already the proper size.
 * @param s    the size of a single job
 * @param band the number of bands (modulus) in the output image
 */
function draw(canvas, results, s, max, band) {
    max = max || 64;
    band = band || 1;
    var ctx = canvas.getContext('2d');
    results.forEach(function(result) {
        console.log(result.id);
        var x = result.id[0] * s, y = result.id[1] * s;
        var vs = result.v;
        var img = ctx.getImageData(x, y, s, s);
        var data = img.data;
        for (var i = 0; i < vs.length; i++) {
            var v = vs[i] / (max - 1) * 255 * band % 255;
            data[i * 4 + 0] = v;
            data[i * 4 + 1] = v;
            data[i * 4 + 2] = v;
            data[i * 4 + 3] = 255;
        }
        ctx.putImageData(img, x, y);
    });
}
