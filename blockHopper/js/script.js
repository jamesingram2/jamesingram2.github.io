let canvasWidth = 600;
let canvasHeight = 400;
let playArea = document.getElementById("canvas");
let player;
let playerYPosition = 200;
let fallSpeed = 0;
let interval = setInterval(updateCanvas, 20);
let isJumping = false;
let jumpSpeed = 0;
let block;
let score = 0;
let scoreLabel;
let lives = 50;
let livesLabel;
let startAudio = new Audio('./sounds/sfx-magic2.mp3');
let jumpAudio = new Audio('./sounds/jump.mp3');
let successAudio = new Audio('./sounds/sfx-voice10.mp3')
let scoreAudio = new Audio('./sounds/sfx-voice9.mp3');
let collisionAudio = new Audio('./sounds/collision.mp3');
let ouchAudio = new Audio('./sounds/ouch.mp3');
let gameOverAudio = new Audio('./sounds/gameOver.mp3');
let deathAudio = new Audio('./sounds/death.mp3');

function startGame() {
    gameCanvas.start();
    player = new createPlayer(25, 25, 15);
    block = new createBlock();
    scoreLabel = new createScoreLabel(460, 30);
    livesLabel = new createLivesLabel(10, 30);
    startAudio.play();
}

const gameCanvas = {
    canvas: document.createElement("canvas"),
    start: function() {
        this.canvas.width = canvasWidth;
        this.canvas.height = canvasHeight;
        this.context = this.canvas.getContext("2d");
        playArea.appendChild(this.canvas);
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
    let height = randomNumber(25, 200);
    let speed = randomNumber(2, 4);
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
            height = randomNumber(25, 200);
            speed = randomNumber(3, 6);
            this.y = canvasHeight - height;
            this.x = canvasWidth;
            score++;
            if (score % 5 == 0) {
                scoreAudio.play();
            } else {
                successAudio.play();
            }
         }
    }
}

function loseLife() {
   collisionAudio.play();
   lives--
   let width = randomNumber(10, 50);
   let height = randomNumber(25, 200);
   let speed = randomNumber(2, 4);
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
           height = randomNumber(25, 200);
           speed = randomNumber(3, 6);
           this.y = canvasHeight - height;
           this.x = canvasWidth;
           score++;
           if (score % 5 == 0) {
               scoreAudio.play();
           } else {
               successAudio.play();
           }
        }
   }
}

function detectCollision() {
   let playerLeft = player.x;
   let playerRight = player.x + player.width;
   let blockLeft = block.x;
   let playerBottom = player.y + player.height;
   let blockTop = block.y;
   if (playerRight >=  blockLeft && playerLeft <= blockLeft && playerBottom >= blockTop) {
      loseLife();
      if (lives <= 0) {
         playArea.childNodes[0].style.backgroundImage = "linear-gradient(to top left, black, lightgray, darkgray)";
         let jumpEl = document.getElementById("jump");
         let restartEl = document.getElementById("restart");
         jumpEl.disabled = true;
         jumpEl.style = "background-color: rgba(255, 0, 0, 0.3); color: #eee; border: 2px solid black; cursor: auto;";
         restartEl.style = "background-color: green; color: white; border: 2px solid black; cursor: pointer;"
         collisionAudio.play();
         deathAudio.play();
         setTimeout(function() {
            collisionAudio.muted = true;
            deathAudio.muted = true;
         }, 400);
         setTimeout(function() {
            gameOverAudio.play();
         }, 500)
         setTimeout(function() {
            gameOverAudio.muted = true; 
         }, 3700);
         gameCanvas.stop();
      } else if (lives < 10) {
         playArea.childNodes[0].style.backgroundImage = "linear-gradient(to top left, orangered, yellow, orangered)";
         scoreAudio.muted = true;
         successAudio.muted = true;
         setTimeout(function() {
            scoreAudio.muted = false;
            successAudio.muted = false;
         }, 1200);
         setTimeout(function() {
            ouchAudio.play();
         }, 200);
      } else if (lives < 20) {
         playArea.childNodes[0].style.backgroundImage = "linear-gradient(to top left, orange, yellow, orange)";
         scoreAudio.muted = true;
         successAudio.muted = true;
         setTimeout(function() {
            scoreAudio.muted = false;
            successAudio.muted = false;
         }, 1200);
         setTimeout(function() {
            ouchAudio.play();
         }, 200);
      } else if (lives < 30) {
         playArea.childNodes[0].style.backgroundImage = "linear-gradient(to top left, yellow, white, yellow)"
         scoreAudio.muted = true;
         successAudio.muted = true;
         setTimeout(function() {
            scoreAudio.muted = false;
            successAudio.muted = false;
         }, 1200);
         setTimeout(function() {
            ouchAudio.play();
         }, 200);
      } else if (lives < 40) {
         scoreAudio.muted = true;
         successAudio.muted = true;
         setTimeout(function() {
            scoreAudio.muted = false;
            successAudio.muted = false;
         }, 1200);
         setTimeout(function() {
            ouchAudio.play();
         }, 200);
      } else if (lives < 50) {
         scoreAudio.muted = true;
         successAudio.muted = true;
         setTimeout(function() {
            scoreAudio.muted = false;
            successAudio.muted = false;
         }, 1200);
         setTimeout(function() {
            ouchAudio.play();
         }, 200);
      }
   }
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

function createLivesLabel(x, y) {
   this.lives = 0;
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
    if (lives <= 50 && lives >= 40) {
       livesLabel.text = "HEALTH: ❤️️❤️️❤️️❤️️❤️️";
       livesLabel.draw();
    } else if (lives < 40 && lives >= 30) {
       livesLabel.text = "HEALTH: ❤️️❤️️❤️️❤️️";
       livesLabel.draw();
    } else if (lives < 30 && lives >= 20) {
       livesLabel.text = "HEALTH: ❤️️❤️️❤️️";
       livesLabel.draw();
    } else if (lives < 20 && lives >= 10) {
       livesLabel.text = "HEALTH: ❤️️❤️️";
       livesLabel.draw();
    } else if (lives < 10 && lives > 1) {
       livesLabel.text = "HEALTH: ❤️️";
       livesLabel.draw();
    } else {
       livesLabel.text = "💀 GAME OVER";
       livesLabel.draw();
    }
}

function randomNumber(min, max) {
    return Math.floor(Math.random() * (max - min + 1) + min)
}

function resetJump() {
    jumpSpeed = 0.05;
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

let buttonEl = document.getElementsByClassName("button")[0];
buttonEl.addEventListener("click", function() {
    buttonEl.style = "box-shadow: 1px 1px 1px gray; text-shadow: 0 0 0 black; border: 1px solid black; color: #ccc; background-color: rgba(255, 0, 0, 0.5";
    setTimeout(function() {
        buttonEl.style = "";
    }, 200);
})