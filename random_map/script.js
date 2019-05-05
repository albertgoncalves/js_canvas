var CANVAS = document.getElementById("canvas");
var CTX = CANVAS.getContext("2d");
var N = 18;
var X = CANVAS.width / N;
var Y = CANVAS.height / N;
var LAND = "hsl(125, 35%, 50%)";
var SEA = "hsl(215, 50%, 50%)";

function distance(ax, ay, bx, by) {
    return Math.sqrt(Math.pow(bx - ax, 2) + Math.pow(by - ay, 2));
}

function terrain(point, threshold, x, y) {
    var d = distance(point.x, point.y, x, y);
    var noise = (Math.random() * 0.2) + 0.9;
    if ((d *= noise) > threshold) {
        return SEA;
    } else {
        return LAND;
    }
}

function drawBackground() {
    var point =
        { x: Math.floor(Math.random() * CANVAS.width)
        , y: Math.floor(Math.random() * CANVAS.height)
        };
    var threshold = Math.floor(Math.random() * 200) + 100;
    for (i = 0; i < N; i++) {
        for (j = 0; j < N; j++) {
            x = i * X;
            y = j * Y;
            CTX.fillStyle = terrain(point, threshold, x, y);
            CTX.fillRect(x, y, X, Y);
        }
    }
}

window.onload = function() {
    CTX.fillStyle = "black";
    CTX.fillRect(0, 0, CANVAS.width, CANVAS.height);
    document.addEventListener("click", drawBackground);
};
