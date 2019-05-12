var WIDTH = 500;
var HEIGHT = 500;
var SCALE = 225;
var SPEED = 0.002;
var K = 0.55;
var RADIUS = 25;

var canvas;
var context;
var color = 0;
var flow = 1;

function init() {
    canvas = document.createElement('canvas');
    canvas.width = WIDTH;
    canvas.height = HEIGHT;
    context = canvas.getContext('2d');
    document.body.appendChild(canvas);
}

function cycleColor() {
    if ((color > 255) || (color < 0)) {
        flow *= -1;
    }
    color += flow;
}

function drawCircle(z) {
    var time = Date.now() * SPEED;
    var x = (Math.sin(time + z) * SCALE) + (WIDTH / 2);
    var y = (Math.cos((time + z) * K) * SCALE) + (HEIGHT / 2);
    context.fillStyle = "hsl(" + String(color + z) + ", 75%, 65%)";
    context.beginPath();
    context.arc(x, y, RADIUS, 0, Math.PI * 2, true);
    context.closePath();
    context.fill();
}

function loop() {
    requestAnimationFrame(loop);
    context.clearRect(0, 0, canvas.width, canvas.height);
    drawCircle(0);
    drawCircle(10);
    drawCircle(50);
    drawCircle(100);
    drawCircle(105);
    drawCircle(200);
    drawCircle(250);
    drawCircle(255);
    cycleColor();
}

init();
loop();
