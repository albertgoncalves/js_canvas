var CANVAS = document.getElementById("canvas");
var CTX = CANVAS.getContext("2d");
var PLAYER = new Player(90, 90, 15, 15, 15);
var TIME = new Time(0.2);
var FPS = document.getElementById("fps");

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
    CTX.fillStyle = "hsl(" + String(TIME.accu) + ", 30%, 30%)";
    CTX.fillRect(0, 0, CANVAS.width, CANVAS.height);
}

function drawPlayer() {
    CTX.strokeStyle = "white";
    CTX.lineWidth = 2;
    CTX.strokeRect(PLAYER.x, PLAYER.y, PLAYER.width, PLAYER.height);
}

function flowTime() {
    TIME.accu += TIME.rate;
    if (TIME.accu % 255 == 0) {
        TIME.rate *= -1;
    }
}

function updateFPS() {
    if (Math.floor(TIME.accu) % 30 == 0) {
        elapsed = 1 / ((Date.now() - TIME.now) / 1000);
        FPS.innerHTML = String(Math.floor(elapsed)) + " fps";
    }
    TIME.now = Date.now();
}

function keyDown(event) {
    switch(event.keyCode) {
    case 37:
        if (PLAYER.x > PLAYER.minX) {
            PLAYER.x -= PLAYER.speed;
        }
        break;
    case 38:
        if (PLAYER.y > PLAYER.minY) {
            PLAYER.y -= PLAYER.speed;
        }
        break;
    case 39:
        if (PLAYER.x < PLAYER.maxX) {
            PLAYER.x += PLAYER.speed;
        }
        break;
    case 40:
        if (PLAYER.y < PLAYER.maxY) {
            PLAYER.y += PLAYER.speed;
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
