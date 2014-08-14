'use strict';
/* jshint evil:true */

(function mathArtLoop() {
    var mathArts = document.querySelectorAll('.math-art');
    for (var mathArtIndex = 0; mathArtIndex < mathArts.length; mathArtIndex++) {
        var mathArt = mathArts[mathArtIndex];
        new MathArt(mathArt);
    }
})();

function MathArt(root) {
    // Load elements
    var canvas = root.querySelector('canvas'),
        rebuildBtn = root.querySelector('button.rebuild'),
        widthInput = root.querySelector('input.width'),
        heightInput = root.querySelector('input.height'),
        clrFuncRed = root.querySelector('.color-functions .red'),
        clrFuncGreen = root.querySelector('.color-functions .green'),
        clrFuncBlue = root.querySelector('.color-functions .blue');

    // Setup defaults
    widthInput.value = canvas.offsetWidth;
    heightInput.value = canvas.offsetHeight;

    // Setup size change listeners
    widthInput.addEventListener('blur', function (event) {
        canvas.setAttribute('width', widthInput.value);
        canvasData = ctx.getImageData(0, 0, widthInput.value, heightInput.value);
    });
    heightInput.addEventListener('blur', function (event) {
        canvas.setAttribute('height', heightInput.value);
        canvasData = ctx.getImageData(0, 0, widthInput.value, heightInput.value);
    });

    // Get canvas context
    var ctx = canvas.getContext('2d'),
        canvasData = ctx.getImageData(0, 0, widthInput.value, heightInput.value);

    var buildColorFunction = function mathArtBuildColorFunction(input, color) {
        var func = new Function(['x', 'y'], input.value);
        return func;
    };

    rebuildBtn.addEventListener('click', function (event) {
        var redFunc = buildColorFunction(clrFuncRed, 'red'),
            greenFunc = buildColorFunction(clrFuncGreen, 'green'),
            blueFunc = buildColorFunction(clrFuncBlue, 'blue');
        render(redFunc, greenFunc, blueFunc);
    });

    // Redraw the
    var render = function mathArtRender(r, g, b) {
        for (var x = 0; x < widthInput.value; x++) {
            for (var y = 0; y < heightInput.value; y++) {
                var index = (x + y * widthInput.value) * 4;

                canvasData.data[index + 0] = r(x, y);
                canvasData.data[index + 1] = g(x, y);
                canvasData.data[index + 2] = b(x, y);
                canvasData.data[index + 3] = 255;
            }
        }
        ctx.putImageData(canvasData, 0, 0);
    };
}
