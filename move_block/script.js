var CANVAS = document.getElementById("canvas");

var fps = document.getElementById("fps");
var ctx = CANVAS.getContext("2d");
var player = new Player(90, 90, 15, 15, 15);
var time = new Time(0.2);

function Player(x, y, height, width, speed) {
    this.width = width;
    this.height = height;
    this.x = x;
    this.y = y;
    this.speed = speed;
    this.minX = 0;
    this.minY = 0;
    this.maxX = CANVAS.width - width;
    this.maxY = CANVAS.height - height;
}

function Time(rate) {
    this.accu = 0;
    this.rate = rate;
    this.now = Date.now();
}

function drawBackground() {
    ctx.fillStyle = "hsl(" + String(time.accu) + ", 30%, 30%)";
    ctx.fillRect(0, 0, CANVAS.width, CANVAS.height);
}

function drawPlayer() {
    ctx.strokeStyle = "white";
    ctx.lineWidth = 2;
    ctx.strokeRect(player.x, player.y, player.width, player.height);
}

function flowTime() {
    time.accu += time.rate;
    if (time.accu % 255 === 0) {
        time.rate *= -1;
    }
}

function updateFPS() {
    if (Math.floor(time.accu) % 30 === 0) {
        elapsed = 1 / ((Date.now() - time.now) / 1000);
        fps.innerHTML = String(Math.floor(elapsed)) + " fps";
    }
    time.now = Date.now();
}

function keyDown(event) {
    switch(event.keyCode) {
    case 37:
        if (player.x > player.minX) {
            player.x -= player.speed;
        }
        break;
    case 38:
        if (player.y > player.minY) {
            player.y -= player.speed;
        }
        break;
    case 39:
        if (player.x < player.maxX) {
            player.x += player.speed;
        }
        break;
    case 40:
        if (player.y < player.maxY) {
            player.y += player.speed;
        }
        break;
    }
}

function loop() {
    drawBackground();
    flowTime();
    updateFPS();
    drawPlayer();
}

window.onload = function() {
    document.addEventListener("keydown", keyDown);
    setInterval(loop, 1000 / 60);
};
