class Player {
    constructor(canvas, height, width, speed) {
        this.width = width;
        this.height = height;
        this.x = canvas.width / 2 - (width / 2);
        this.y = canvas.height / 2 - (height / 2);
        this.speed = speed;
        this.minX = 0;
        this.maxX = canvas.width - width;
        this.minY = 0;
        this.maxY = canvas.height - height;
    }
}

window.onload = function() {
    canvas = document.getElementById("canvas");
    player = new Player(canvas, 30, 30, 15);
    time = 0;
    flow = 1;
    ctx = canvas.getContext("2d");
    document.addEventListener("keydown", keyPush);
    setInterval(loop, 1000 / 60);
};

function drawBackground(ctx, time) {
    ctx.fillStyle = `hsl(${time}, 10%, 25%)`;
    ctx.fillRect(0, 0, canvas.width, canvas.height);
}

function drawPlayer(ctx) {
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

function loop() {
    time += flow / 20;
    if (time % 255 == 0) {
        flow *= -1;
    }
    drawBackground(ctx, time);
    drawPlayer(ctx, player.x, player.y);
}
