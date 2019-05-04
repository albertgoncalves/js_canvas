function Player(canvas, x, y, height, width, speed) {
    this.width = width;
    this.height = height;
    this.x = x;
    this.y = y;
    this.speed = speed;
    this.minX = 0;
    this.minY = 0;
    this.maxX = canvas.width - width;
    this.maxY = canvas.height - height;
}

function Time() {
    this.accu = 0;
    this.speed = 0.25;
}

function drawBackground() {
    ctx.fillStyle = "hsl(" + String(time.accu) + ", 10%, 25%)";
    ctx.fillRect(0, 0, canvas.width, canvas.height);
}

function drawPlayer() {
    ctx.strokeStyle = "white";
    ctx.lineWidth = 2;
    ctx.strokeRect(player.x, player.y, player.width, player.height);
}

function keyPush(event) {
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

function checkTime() {
    time.accu += time.speed;
    if (time.accu % 255 == 0) {
        time.speed *= -1;
    }
}

function loop() {
    checkTime();
    drawBackground();
    drawPlayer();
}

window.onload = function() {
    canvas = document.getElementById("canvas");
    player = new Player(canvas, 90, 90, 30, 30, 15);
    time = new Time();
    ctx = canvas.getContext("2d");
    document.addEventListener("keydown", keyPush);
    setInterval(loop, 1000 / 60);
};
