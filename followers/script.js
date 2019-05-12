var WIDTH = 700;
var HEIGHT = 700;
var SCALE = 220;
var SPEED = 1 / 250;
var K = 0.55;
var RADIUS = 30;
var COLOR = {"max": 255, "min": 0};
var ALPHA = {"max": 90, "min": 20};

var canvas;
var context;
var color = COLOR.min;
var colorDelta = 0.15;
var alpha = ALPHA.max;
var alphaDelta = 0.15;
var mouseX = WIDTH / 2;
var mouseY = HEIGHT / 2;
var n = 25;
var squares = new Array(n);
for (var i = 0; i < n; i++) {
    squares[i] = new Square();
}

function Square() {
    this.x = Math.floor(Math.random() * WIDTH);
    this.y = Math.floor(Math.random() * HEIGHT);
    this.targetX = Math.floor(Math.random() * WIDTH);
    this.targetY = Math.floor(Math.random() * HEIGHT);
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

function distance(aX, aY, bX, bY) {
    return Math.sqrt(Math.pow(bX - aX, 2) + Math.pow(bY - aY, 2));
}

function move(a, b, c, d, limit) {
    if ((a + RADIUS) > limit) {
        return a - 1;
    } else if ((a - RADIUS) < 0) {
        return a + 1;
    } else {
        var r = Math.random();
        if (r > 0.85) {
            return a + ((b - a) * SPEED);
        } else if (r > 0.55) {
            return a - ((c - a) * SPEED);
        } else {
            return a + ((d - a) * SPEED);
        }
    }
}

function animateSquare(square) {
    context.fillStyle = formatColor(color, alpha);
    drawSquare(square.x, square.y);
    var delta = 0;
    j = 0;
    for (var i in squares) {
        if (square != squares[i]) {
            next = distance(square.x, square.y, squares[i].x, squares[i].y);
            if (next > delta) {
                delta = next;
                j = i;
            }
        }
    }
    square.x = move(square.x, square.targetX, squares[j].x, mouseX, WIDTH);
    square.y = move(square.y, square.targetY, squares[j].y, mouseY, HEIGHT);
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
    context.clearRect(0, 0, WIDTH, HEIGHT);
    for (var i in squares) {
        animateSquare(squares[i]);
    }
    colorCycle = cycle(color, colorDelta, COLOR.min, COLOR.max);
    color = colorCycle.value;
    colorDelta = colorCycle.delta;
    alphaCycle = cycle(alpha, alphaDelta, ALPHA.min, ALPHA.max);
    alpha = alphaCycle.value;
    alphaDelta = alphaCycle.delta;
}

function mousePosition(event) {
    bounds = canvas.getBoundingClientRect();
    mouseX = event.clientX - bounds.left;
    mouseY = event.clientY - bounds.top;
}

window.onload = function() {
    document.addEventListener("mousedown", mousePosition);
    init();
    loop();
};
