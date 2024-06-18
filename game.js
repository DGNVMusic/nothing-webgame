let score = 0;
let gameActive = false;
let highScore = localStorage.getItem('highScore') || 0;
const scoreElement = document.getElementById('score');
const highScoreElement = document.getElementById('highScore');
const startButton = document.getElementById('startButton');
const gameover = document.getElementById('gameover');
const finalscore = document.getElementById('finalscore');
const gameActiveElement = document.getElementById('gameActive');
const resetButton = document.getElementById('resetButton');
const mouseClickSound1 = new Audio('/sounds/Minimalist11.ogg');
const mouseClickSound2 = new Audio('/sounds/Minimalist4.ogg');
const mouseClickSound3 = new Audio('/sounds/Minimalist4.ogg');
const volumeSliderValue = document.getElementById('volumeSliderValue');
const bgm = new Audio('/sounds/BGM.ogg');

resetButton.hidden = true;
gameover.hidden = true;

highScoreElement.textContent = 'High Score: ' + highScore;

function toggleMusic() {
    mouseClickSound1.cloneNode().play();
    if (bgm.paused) {
        bgm.loop = true;
        bgm.play();
        musicButton.textContent = 'Music: On';
    } else {
        bgm.pause();
        musicButton.textContent = 'Music: Off';
    }
}

function startGame() {
    mouseClickSound1.cloneNode().play();
    gameActive = true;
    score = 0;
    finalscore.textContent = score;
    startButton.hidden = true;
    incrementScore();
}

function incrementScore() {
    if (gameActive) {
        mouseClickSound2.cloneNode().play();
        score += 10;
        scoreElement.textContent = 'Score: ' + score;
        setTimeout(incrementScore, 1000);
    }
}

function endGame() {
    if (gameActive) {
        gameActive = false;
        finalscore.textContent = score;
        scoreElement.hidden = true;
        gameActiveElement.hidden = true;
        gameover.hidden = false;
        if (score > highScore) {
            highScore = score;
            highScoreElement.textContent = 'High Score: ' + highScore;
            localStorage.setItem('highScore', highScore);
        }
        resetButton.hidden = false;
    }
}

function resetGame() {
    mouseClickSound1.cloneNode().play();
    gameActive = false;
    score = 0;
    scoreElement.textContent = 'Score: ' + score;
    startButton.hidden = false;
    resetButton.hidden = true;
    scoreElement.hidden = false;
    gameActiveElement.hidden = false;
    gameover.hidden = true;
}

startButton.addEventListener('click', startGame);
window.addEventListener('mousemove', endGame);
window.addEventListener('keydown', endGame);
