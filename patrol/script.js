var WIDTH = 500;
var HEIGHT = 500;
var canvas;
var context;
var request;
var color = 0;
var flow = 1;

function init() {
    canvas = document.createElement('canvas');
    canvas.width = WIDTH;
    canvas.height = HEIGHT;
    context = canvas.getContext('2d');
    document.body.appendChild(canvas);
}

function animate() {
    requestAnimationFrame(animate);
    draw();
}

function draw() {
    var time = Date.now() * 0.003;
    var x = (Math.sin(time) * 100) + (WIDTH / 2);
    var y = (Math.cos(time * 0.42) * 100) + (HEIGHT / 2);
    context.clearRect(0, 0, canvas.width, canvas.height);
    context.fillStyle = "hsl(" + String(color) + ", 50%, 50%)";
    context.beginPath();
    context.arc(x, y, 10, 0, Math.PI * 2, true);
    context.closePath();
    context.fill();
    if ((color > 255) || (color < 0)) {
        flow *= -1;
    }
    color += flow;
}

init();
animate();
