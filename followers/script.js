var WIDTH = 700;
var HEIGHT = 700;
var SCALE = 220;
var SPEED = 1 / 150;
var K = 0.55;
var RADIUS = 50;
var COLOR = {"max": 255, "min": 0};
var ALPHA = {"max": 90, "min": 20};

var canvas;
var context;
var color = {"value": COLOR.min, "delta": 0.15};
var alpha = {"value": ALPHA.max, "delta": 0.15};
var mouse = {"x": WIDTH / 2, "y": HEIGHT / 2};
var n = 9;
var squares = new Array(n);
for (var i = 0; i < n; i++) {
    squares[i] = new Square();
}

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

function distance(aX, aY, bX, bY) {
    return Math.sqrt(Math.pow(bX - aX, 2) + Math.pow(bY - aY, 2));
}

function checkBounds(pos, limit) {
    if ((pos + RADIUS) > limit) {
        return pos - 1;
    } else if ((pos - RADIUS) < 0) {
        return pos + 1;
    } else {
        return pos;
    }
}

function move(pos, near, mouse) {
    var next = {
        "x": pos.x + Math.sin((mouse.x - pos.x) * SPEED),
        "y": pos.y + ((mouse.y - pos.y) * SPEED),
    };
    var threshold = distance(pos.x, pos.y, mouse.x, mouse.y);
    var gap = distance(pos.x, pos.y, near.x, near.y);
    if (Math.random() < ((RADIUS * 2) / (threshold + gap))) {
        if (distance(pos.x, pos.y, near.x, near.y) < (RADIUS * 2)) {
            return {
                "x": pos.x - ((near.x - pos.x) * SPEED * 3),
                "y": pos.y - ((near.y - pos.y) * SPEED * 3),
            };
        }
    }
    return next;
}

function animateSquare(square) {
    context.fillStyle = formatColor(color.value, alpha.value);
    drawSquare(square.x, square.y);
    var delta = distance(0, 0, WIDTH, HEIGHT);
    var j = 0;
    for (var i in squares) {
        if (square != squares[i]) {
            next = distance(square.x, square.y, squares[i].x, squares[i].y);
            if (next < delta) {
                delta = next;
                j = i;
            }
        }
    }
    var xy = move(square, squares[j], mouse);
    square.x = checkBounds(xy.x, WIDTH);
    square.y = checkBounds(xy.y, HEIGHT);
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
    color = cycle(color.value, color.delta, COLOR.min, COLOR.max);
    alpha = cycle(alpha.value, alpha.delta, ALPHA.min, ALPHA.max);
}

function mousePosition(event) {
    bounds = canvas.getBoundingClientRect();
    mouse.x = event.clientX - bounds.left;
    mouse.y = event.clientY - bounds.top;
}

window.onload = function() {
    document.addEventListener("mousedown", mousePosition);
    init();
    loop();
};
