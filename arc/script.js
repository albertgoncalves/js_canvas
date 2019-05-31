var WIDTH = 700;
var HEIGHT = 700;
var SCALE = 220;
var SPEED = 1 / 75;
var RADIUS = 10;
var COLOR = {"max": 255, "min": 0};
var ALPHA = {"max": 90, "min": 20};

var canvas;
var context;
var color = {"value": COLOR.min, "delta": 0.15};
var alpha = {"value": ALPHA.max, "delta": 0.15};
var destination = {"x": WIDTH / 2, "y": HEIGHT / 2};
var n = 1;
var square = new Square();

function Square() {
    this.x = Math.floor(Math.random() * (WIDTH - (RADIUS * 2))) + RADIUS;
    this.y = Math.floor(Math.random() * (HEIGHT - (RADIUS * 2))) + RADIUS;
}

function init() {
    canvas = document.createElement("canvas");
    canvas.width = WIDTH;
    canvas.height = HEIGHT;
    context = canvas.getContext("2d");
    document.body.appendChild(canvas);
}

function drawSquare(x, y) {
    context.fillRect(x - RADIUS, y - RADIUS, RADIUS * 2, RADIUS * 2);
}

function formatColor(h, a) {
    var _h = String(Math.floor(h));
    var _a = String(Math.floor(a));
    return "hsla(" + _h + ", 75%, 65%, " + _a + "%)";
}

// function distance(aX, aY, bX, bY) {
//     return Math.sqrt(Math.pow(bX - aX, 2) + Math.pow(bY - aY, 2));
// }

function checkBounds(position, limit) {
    if ((position + RADIUS) > limit) {
        return position - 1;
    } else if ((position - RADIUS) < 0) {
        return position + 1;
    } else {
        return position;
    }
}

function move(position, destination) {
    return {
        "x": position.x + Math.sin((destination.x - position.x) * SPEED),
        "y": position.y + ((destination.y - position.y) * SPEED),
    };
}

function animateSquare(square) {
    context.fillStyle = formatColor(color.value, alpha.value);
    var xy = move(square, destination);
    square.x = checkBounds(xy.x, WIDTH);
    square.y = checkBounds(xy.y, HEIGHT);
    drawSquare(square.x, square.y);
}

function cycle(value, delta, min, max) {
    if ((value > max) || (value < min)) {
        delta *= -1;
    }
    value += delta;
    return {"value": value, "delta": delta};
}

function loop() {
    requestAnimationFrame(loop);
    // context.clearRect(0, 0, WIDTH, HEIGHT);
    animateSquare(square)
    color = cycle(color.value, color.delta, COLOR.min, COLOR.max);
    alpha = cycle(alpha.value, alpha.delta, ALPHA.min, ALPHA.max);
}

window.onload = function() {
    init();
    loop();
};
