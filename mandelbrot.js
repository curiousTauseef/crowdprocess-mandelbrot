/**
 * Compute the escape "time".
 * @param x real coordinate
 * @param y imaginary coordinate
 * @param max   maximum iterations
 */
function mandelbrot(x, y, max) {
    var k = 0;
    var z = {r: 0, i: 0};
    while (k < max && (z.r * z.r + z.i + z.i) < 4) {
        z = {
            r: z.r * z.r - z.i * z.i + x,
            i: z.r * z.i * 2         + y
        };
        k = k + 1;
    }
    return k;
}

/**
 * Input should have these fields:
 *   id: to keep track of this chunk in final assembly
 *   w and h: total width and height of the image
 *   x0 and y0: top left complex coordinate
 *   x1 and y1: bottom right complex coordinate
 *   max: maximum iterations
 * Returns an object with:
 *   id: copied from before
 *   v: the output image, values are integers bound to [0, max)
 */
function Run(input) {
    var w = input.w, h = input.h;
    var x0 = input.x0, x1 = input.x1, y0 = input.y0, y1 = input.y1;
    var max = input.max;
    var output = [];
    for (var y = 0; y < h; y++) {
        for (var x = 0; x < w; x++) {
            var cx = x / w * (x1 - x0) + x0,
                cy = y / h * (y1 - y0) + y0;
            output.push(mandelbrot(cx, cy, max));
        }
    }
    return {
        id: input.id,
        v: output
    };
}
