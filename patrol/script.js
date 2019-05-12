var WIDTH = 500;
var HEIGHT = 500;
var SCALE = 225;
var SPEED = 0.00025;
var K = 0.55;
var RADIUS = 25;

var canvas;
var context;
var color = 0;
var colorFlow = 1;
var alpha = 90;
var alphaFlow = 1;

function init() {
    canvas = document.createElement('canvas');
    canvas.width = WIDTH;
    canvas.height = HEIGHT;
    context = canvas.getContext('2d');
    document.body.appendChild(canvas);
}

function cycleColor() {
    if ((color > 255) || (color < 0)) {
        colorFlow *= -1;
    }
    color += colorFlow;
}

function cycleAlpha() {
    if ((alpha > 90) || (alpha < 20)) {
        alphaFlow *= -1;
    }
    alpha += alphaFlow;
}

function drawCircle(z) {
    var time = Date.now() * SPEED;
    var x = (Math.sin(time + z) * SCALE) + (WIDTH / 2);
    var y = (Math.cos((time + z) * K) * SCALE) + (HEIGHT / 2);
    context.fillStyle =
        "hsla(" + String(color) + ", 75%, 65%, " + String(alpha) + "%)";
    context.beginPath();
    context.arc(x, y, RADIUS, 0, Math.PI * 2, true);
    context.closePath();
    context.fill();
}

function loop() {
    requestAnimationFrame(loop);
    context.clearRect(0, 0, WIDTH, HEIGHT);
    drawCircle(0);
    drawCircle(10);
    drawCircle(25);
    drawCircle(50);
    drawCircle(75);
    drawCircle(90);
    drawCircle(200);
    drawCircle(250);
    cycleColor();
    cycleAlpha();
}

init();
loop();
