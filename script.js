SX = 200;
SY = 200;
PX = canvas.width / 2 - (SX / 2);
PY = canvas.height / 2 - (SY / 2);
V = 25;

window.onload = function() {
    canvas = document.getElementById("canvas");
    ctx = canvas.getContext("2d");
    document.addEventListener("keydown", keyPush);
    setInterval(game, 1000/60);
};

function keyPush(event) {
    switch(event.keyCode) {
        case 37:
            PX -= V;
            break;
        case 38:
            PY -= V;
            break;
        case 39:
            PX += V;
            break;
        case 40:
            PY += V;
            break;
    }
}

function background(ctx) {
    ctx.fillStyle = "hsl(255, 10%, 25%)";
    ctx.fillRect(0, 0, canvas.width, canvas.height);
}

function player(ctx) {
    ctx.strokeStyle = "white";
    ctx.lineWidth = 5;
    ctx.strokeRect(PX, PY, SX, SY);
}

function game() {
    background(ctx);
    player(ctx, PX, PY);
}
