let canvasWidth = 600;
let canvasHeight = 400;
let player;
let playerYPosition = 200;
let fallSpeed = 0;
let interval = setInterval(updateCanvas, 20);
let isJumping = false;
let jumpSpeed = 0;
let block;
let score = 0;
let scoreLabel;
let startAudio = new Audio('./sfx-magic2.mp3');
let jumpAudio = new Audio('./jump.mp3');
let collisionAudio = new Audio('./collision.mp3');

function startGame() {
    gameCanvas.start();
    player = new createPlayer(30, 30, 10);
    block = new createBlock();
    scoreLabel = new createScoreLabel(10, 30);
}

const gameCanvas = {
    canvas: document.createElement("canvas"),
    start: function() {
        startAudio.play();
        this.canvas.width = canvasWidth;
        this.canvas.height = canvasHeight;
        this.context = this.canvas.getContext("2d");
        document.body.insertBefore(this.canvas, document.body.childNodes[0]);
    }
}

function createPlayer(width, height, x) {
    this.width = width;
    this.height = height;
    this.x = x;
    this.y = playerYPosition;
    this.draw = function() {
        ctx = gameCanvas.context;
        ctx.fillStyle = "green";
        ctx.fillRect(this.x, this.y, this.width, this.height);
    }
    this.makeFall = function() {
        if (!isJumping) {
            this.y += fallSpeed;
            fallSpeed += 0.1;
            this.stopPlayer();
        }
    }
    this.stopPlayer = function() {
        let ground = canvasHeight - this.height;
        if (this.y > ground) {
            this.y = ground;
        }
    }
    this.jump = function() {
        if (isJumping) {
            this.y -= jumpSpeed;
            jumpSpeed += 0.3;
        }
    }
}

function createBlock() {
    let width = randomNumber(10, 50);
    let height = randomNumber(10, 200);
    let speed = randomNumber(2, 6);
    this.x = canvasWidth;
    this.y = canvasHeight - height;
    this.draw = function() {
        ctx = gameCanvas.context;
        ctx.fillStyle = "red";
        ctx.fillRect(this.x, this.y, width, height);
    }
    this.attackPlayer = function() {
        this.x -= speed;
        this.returnToAttackPosition();
    }
    this.returnToAttackPosition = function() {
        if (this.x < 0) {
            width = randomNumber(10, 50);
            height = randomNumber(50, 200);
            speed = randomNumber(4, 6);
            this.y = canvasHeight - height;
            this.x = canvasWidth;
            // Increase your score if your block made it to the edge
            score++;
        }
    }
}

function detectCollision() {
    let playerLeft = player.x
    let playerRight = player.x + player.width;
    let blockLeft = block.x;
    let playerBottom = player.y + player.height;
    let blockTop = block.y;
    if (playerRight > blockLeft && playerLeft < blockLeft && playerBottom > blockTop) {
        document.body.childNodes[0].style.backgroundColor="orange";
        collisionAudio.play();
        stopGame();
    }
}

function stopGame() {
    this.x = 0;
    this.y = 0;
}

function createScoreLabel(x, y) {
    this.score = 0;  
    this.x = x;
    this.y = y;
    this.draw = function() {
        ctx = gameCanvas.context;
        ctx.font = "25px Marker Felt";
        ctx.fillStyle = "black";
        ctx.fillText(this.text, this.x, this.y);
    }
}

function updateCanvas() {
    detectCollision();
    ctx = gameCanvas.context;
    ctx.clearRect(0, 0, canvasWidth, canvasHeight);
    player.makeFall();
    player.draw();
    player.jump();
    block.draw();
    block.attackPlayer();
    // Redraw your score and update the value
    scoreLabel.text = "SCORE: " + score;
    scoreLabel.draw();
}

function randomNumber(min, max) {
    return Math.floor(Math.random() * (max - min + 1) + min)
}

function resetJump() {
    jumpSpeed = 0;
    isJumping = false;
}

document.body.onkeyup = function(e) {
    jumpAudio.play();
    if (e.keyCode == 32) {
        isJumping = true;
        setTimeout(function() {
            resetJump();
        }, 1000);
    }
}

document.getElementById("jump").addEventListener('click', function() {
    jumpAudio.play();
    isJumping = true;
    setTimeout(function() {
        resetJump();
    }, 1000);
})

document.getElementById("restart").addEventListener('click', function() {
    document.location.reload();
})
