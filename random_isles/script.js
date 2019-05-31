var CANVAS = document.getElementById("canvas");
var N = 50;
var W = CANVAS.width / N;
var H = CANVAS.height / N;
var LAND = new HSL(120, 25, 50);
var SAND = new HSL(35, 30, 75);
var SURF = new HSL(210, 60, 55);
var SEA = new HSL(215, 50, 50);
var M = 3;
var LAG = 40;

var ctx = CANVAS.getContext("2d");
var time = new Time();
var points = randomPoints(M);
var threshold = randomThreshold();

function Time() {
    this.accu = 0;
    this.rate = 1;
    this.crest = LAG;
}

function HSL(h, s, l) {
    this.h = h;
    this.s = s;
    this.l = l;
}

function renderHSL(color) {
    return "hsl(" + color.h + ", " + color.s + "%, " + color.l + "%)";
}

function RandomPoint() {
    this.x = Math.floor(Math.random() * CANVAS.width);
    this.y = Math.floor(Math.random() * CANVAS.height);
}

function randomPoints(n) {
    var points = Array(n);
    for (i = 0; i < n; i++) {
        points[i] = new RandomPoint();
    }
    return points;
}

function randomNoise(x) {
    return (Math.random() * (x * 2)) + (1 - x);
}

function randomThreshold() {
    return Math.floor(Math.random() * (CANVAS.width - 300)) + 100;
}

function distance(ax, ay, bx, by) {
    return Math.sqrt(Math.pow(bx - ax, 2) + Math.pow(by - ay, 2));
}

function fz(points, x, y, n, d) {
    function f(point) {
        return distance(point.x, point.y, x, y);
    }
    function g(a, b) {
        return Math.min(a, b);
    }
    return (points.map(f).reduce(g) + ((d / n) * 2)) / 4;
}

function flowTerrain(x, y) {
    var n = points.length;
    var d = 0;
    for (k = 0; k < n; k++) {
        d += distance(points[k].x, points[k].y, x, y);
    }
    var z = fz(points, x, y, n, d);
    var t = (time.accu * randomNoise(0.05)) +
        ((threshold * (4 / 5)) * randomNoise(0.001));
    var color;
    if (z > (threshold * randomNoise(0.05)) + time.accu) {
        color = SEA;
    } else if (z > t) {
        color = SURF;
    } else if (z > (threshold * (2 / 5))) {
        color = SAND;
    } else {
        color = LAND;
    }
    return renderHSL(color);
}

function flowTime() {
    if (time.accu % 75 === 0) {
        if (time.crest === 0) {
            time.crest = LAG;
            time.rate *= -1;
            time.accu += time.rate;
        } else {
            time.crest -= 1;
        }
    } else {
        time.accu += time.rate;
    }
}

function drawMap() {
    for (i = 0; i < (N - 1); i++) {
        for (j = 0; j < (N - 1); j++) {
            x = (i * W) + (W / 2);
            y = (j * H) + (H / 2);
            ctx.fillStyle = flowTerrain(x, y);
            ctx.fillRect(x, y, W, H);
        }
    }
}

function loop() {
    drawMap();
    flowTime();
}

window.onload = function() {
    ctx.lineWidth = 5;
    ctx.strokeRect(0, 0, CANVAS.width, CANVAS.height);
    document.addEventListener("click", function() {
        points = randomPoints(M);
        threshold = randomThreshold();
    });
    setInterval(loop, 1000 / 10);
};
