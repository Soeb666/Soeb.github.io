const gameArea = document.getElementById('gameArea');
const paddleA = document.getElementById('paddleA');
const paddleB = document.getElementById('paddleB');
const ball = document.getElementById('ball');

let paddleA_Y = 50;
let paddleB_Y = 50;
let ball_X = 50;
let ball_Y = 50;
let ballSpeed_X = 4;
let ballSpeed_Y = 4;

const paddleHeight = 80;
const paddleWidth = 10;
const ballSize = 15;
const gameHeight = gameArea.clientHeight;
const gameWidth = gameArea.clientWidth;

function update() {
    // Update paddle positions
    paddleA.style.top = `${paddleA_Y}px`;
    paddleB.style.top = `${paddleB_Y}px`;

    // Update ball position
    ball_X += ballSpeed_X;
    ball_Y += ballSpeed_Y;
    ball.style.left = `${ball_X}px`;
    ball.style.top = `${ball_Y}px`;

    // Ball collision with top and bottom walls
    if (ball_Y <= 0 || ball_Y >= gameHeight - ballSize) {
        ballSpeed_Y = -ballSpeed_Y;
    }

    // Ball collision with paddles
    if (ball_X <= paddleWidth && ball_Y >= paddleA_Y && ball_Y <= paddleA_Y + paddleHeight) {
        ballSpeed_X = -ballSpeed_X;
    }
    if (ball_X >= gameWidth - paddleWidth - ballSize && ball_Y >= paddleB_Y && ball_Y <= paddleB_Y + paddleHeight) {
        ballSpeed_X = -ballSpeed_X;
    }

    // Ball out of bounds
    if (ball_X <= 0 || ball_X >= gameWidth - ballSize) {
        resetBall();
    }

    // Computer paddle movement
    if (paddleB_Y + paddleHeight / 2 < ball_Y) {
        paddleB_Y += 4;
    } else {
        paddleB_Y -= 4;
    }

    requestAnimationFrame(update);
}

function resetBall() {
    ball_X = gameWidth / 2;
    ball_Y = gameHeight / 2;
    ballSpeed_X = -ballSpeed_X;
}

// Touch controls for paddleA
gameArea.addEventListener('touchmove', (e) => {
    const touchY = e.touches[0].clientY - gameArea.getBoundingClientRect().top;
    paddleA_Y = touchY - paddleHeight / 2;
    if (paddleA_Y < 0) paddleA_Y = 0;
    if (paddleA_Y > gameHeight - paddleHeight) paddleA_Y = gameHeight - paddleHeight;
});

update();