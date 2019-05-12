var WIDTH = 500;
var HEIGHT = 500;
var SCALE = 220;
var SPEED = 2 / 10000;
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
var mouesX = 0;
var mouseY = 0;
var z = [25];

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

function animateSquare(z) {
    var time = ((Date.now() * SPEED) + z) * (z / 100);
    var x = (Math.sin(time * (1 / K)) * SCALE) + (WIDTH / 2);
    var y = (Math.cos(time * K) * SCALE) + (HEIGHT / 2);
    context.fillStyle = formatColor(color, alpha);
    drawSquare(x, y);
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
    for (var i in z) {
        animateSquare(z[i]);
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
    z.push(Math.floor(Math.random() * ((mouseX + mouseY) / 2)));
}

window.onload = function() {
    document.addEventListener("mousedown", mousePosition);
    init();
    loop();
};
