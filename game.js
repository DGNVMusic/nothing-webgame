let score = 0;
let gameActive = false;
let highScore = localStorage.getItem('highScore') || 0;
let version = "1.0.5";
const scoreElement = document.getElementById('score');
const highScoreElement = document.getElementById('highScore');
const startButton = document.getElementById('startButton');
const gameover = document.getElementById('gameover');
const finalscore = document.getElementById('finalscore');
const gameActiveElement = document.getElementById('gameActive');
const resetButton = document.getElementById('resetButton');
const mouseClickSound1 = new Audio('./sounds/Minimalist11.ogg');
const mouseClickSound2 = new Audio('./sounds/Minimalist4.ogg');
const mouseClickSound3 = new Audio('./sounds/Minimalist4.ogg');
const volumeSliderValue = document.getElementById('volumeSliderValue');
const bgm = new Audio('https://foxstudiolabs.s3.eu-west-2.amazonaws.com/nothing-game/Nothing.ogg'); // Had to offload it, otherwise the audio wouldn't load.
const versionElement = document.getElementById('version');


resetButton.hidden = true;
gameover.hidden = true;

//Check if the user is on a mobile device and if so, tell them that mobile devices are not targeted and might behave unexpectedly.
if (/Mobi/.test(navigator.userAgent)) {
    //create a div element with a notice id to inform the user that the game is not targeted for mobile devices.
    const noticeElement = document.createElement('div');
    noticeElement.id = 'notice';
    document.getElementById('main').appendChild(noticeElement);
    //alert the user that the game is not targeted for mobile devices.
    alert('This game is not targeted for mobile devices and might behave unexpectedly.');
    console.warn("[GAME] This game is not targeted to run on mobile browsers and might behave unexpectedly.");
    noticeElement.textContent = 'Note: This game is not targeted for mobile devices and might behave unexpectedly. To get the best experience, please play on a desktop browser.';
}


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
versionElement.textContent = 'Version: ' + version;

if ('mediaSession' in navigator) {
    navigator.mediaSession.metadata = new MediaMetadata({
        title: 'Nothing',
        artist: 'DGNVMusic',
        album: 'Nothing',
        artwork: [
            { src: 'https://foxstudiolabs.s3.eu-west-2.amazonaws.com/nothing-game/nothing.jpg', sizes: '1024x1024', type: 'image/jpeg' },
            { src: 'https://foxstudiolabs.s3.eu-west-2.amazonaws.com/nothing-game/nothing.jpg', sizes: '512x512', type: 'image/jpeg'},
            { src: 'https://foxstudiolabs.s3.eu-west-2.amazonaws.com/nothing-game/nothing.jpg', sizes: '256x256', type: 'image/jpeg'},
            { src: 'https://foxstudiolabs.s3.eu-west-2.amazonaws.com/nothing-game/nothing.jpg', sizes: '128x128', type: 'image/jpeg'}
        ]
    });
    navigator.mediaSession.setActionHandler('play', function() { bgm.play(); });
    navigator.mediaSession.setActionHandler('pause', function() { bgm.pause(); });
    navigator.mediaSession.setActionHandler('stop', function() { bgm.pause(); });
    navigator.mediaSession.setActionHandler('seekto', function(details) { bgm.currentTime = details.seekTime; });
    navigator.mediaSession.setActionHandler('previoustrack', function() { bgm.currentTime = 0; });
    navigator.mediaSession.setActionHandler('nexttrack', function() { bgm.currentTime = 0; });
}