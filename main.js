const ROCK = 1;
const SCISSORS = 2;
const PAPER = 3;

let playerChoice = 0;
let computerChoice = 0;

let gifChoice = 0;

const choiceRock = document.getElementById('choice-rock');
const choiceScissors = document.getElementById('choice-scissors');
const choicePaper = document.getElementById('choice-paper');

const draw = document.getElementById('draw');
const drawComp = document.getElementById('draw-comp');
const rockIcon = document.getElementById('rock-icon');
const rockIconComp = document.getElementById('rock-icon-comp');
const scissorsIcon = document.getElementById('scissors-icon');
const scissorsIconComp = document.getElementById('scissors-icon-comp');
const paperIcon = document.getElementById('paper-icon');
const paperIconComp = document.getElementById('paper-icon-comp');

const resultContainer = document.getElementById('result-container');
const continueButton = document.getElementById('continue-button');
const winningContainer = document.getElementById('winning-container');
const losingContainer = document.getElementById('losing-container');

let playerPoints = document.getElementById('player-points');
let compPoints = document.getElementById('comp-points');

let statsPlayer = document.getElementById('stats-player');
let statsComputer = document.getElementById('stats-computer');
const refreshButton = document.getElementById('refresh-button');

const history1 = document.getElementById('history1');
const history2 = document.getElementById('history2');
const history3 = document.getElementById('history3');
const history4 = document.getElementById('history4');

playerPoints = 0;
compPoints = 0;

let stringPlayer = localStorage.getItem('playerWins');
let stringComp = localStorage.getItem('compWins');

statsPlayer = parseInt(stringPlayer);
statsComputer = parseInt(stringComp);


if (window.location.href === "http://127.0.0.1:5500/StenSaxP%C3%A5se/newgame.html") {
    choiceRock.addEventListener('click', playerChoiceRock);
    choiceScissors.addEventListener('click', playerChoiceScissors);
    choicePaper.addEventListener('click', playerChoicePaper);
    continueButton.addEventListener('click', continuePlaying);
}

if (window.location.href === 'http://127.0.0.1:5500/StenSaxP%C3%A5se/history.html') {
    history1.addEventListener('click', showSecond);
    history2.addEventListener('click', showThird);
    history3.addEventListener('click', showFourth);
    history4.addEventListener('click', showFirst);
}

if (window.location.href === 'http://127.0.0.1:5500/StenSaxP%C3%A5se/statistics.html') {
    refreshButton.addEventListener('click', clearStatistics);
    document.getElementById('stats-player').innerHTML = statsPlayer;
    document.getElementById('stats-computer').innerHTML = statsComputer;
}

function randomChoice() {
    return Math.floor(Math.random() * 3) + 1;
}

function randomGif() {
    return Math.floor(Math.random() * 4) + 1;
}


function playerChoiceRock() {
    playerChoice = ROCK;
    computerMakesChoice();
    computerChoice = randomChoice();

    if (computerChoice === ROCK) {
        resultContainer.textContent = "Datorn valde också sten. Det blev oavgjort!"
        draw.style.display = 'inline-block';
        drawComp.style.display = 'inline-block';

    } else if (computerChoice === SCISSORS) {
        playerPoints++;
        resultContainer.textContent = "Datorn valde sax. Grattis, du vann!"
        document.getElementById('player-points').innerHTML = playerPoints;
        document.getElementById('small-player-points').innerHTML = playerPoints;
        rockIcon.style.display = 'inline-block';
        scissorsIconComp.style.display = 'inline-block';


    } else if (computerChoice === PAPER) {
        compPoints++;
        resultContainer.textContent = "Attans! Datorn valde påse. Datorn vann."
        document.getElementById('comp-points').innerHTML = compPoints;
        document.getElementById('small-comp-points').innerHTML = compPoints;
        rockIcon.style.display = 'inline-block';
        paperIconComp.style.display = 'inline-block';
    }

    gameFinished();
}

function playerChoiceScissors() {
    playerChoice = SCISSORS;
    computerMakesChoice();
    computerChoice = randomChoice();

    if (computerChoice === SCISSORS) {
        resultContainer.textContent = "Datorn valde sax precis som du. Testa igen!"
        draw.style.display = 'inline-block';
        drawComp.style.display = 'inline-block';

    } else if (computerChoice === PAPER) {
        playerPoints++;
        resultContainer.textContent = "Datorn valde påse. Hurra! 1 poäng till dig."
        document.getElementById('player-points').innerHTML = playerPoints;
        document.getElementById('small-player-points').innerHTML = playerPoints;
        scissorsIcon.style.display = 'inline-block';
        paperIconComp.style.display = 'inline-block';

    } else if (computerChoice === ROCK) {
        compPoints++;
        resultContainer.textContent = "Otur! Datorn valde sten. Datorn vann."
        document.getElementById('comp-points').innerHTML = compPoints;
        document.getElementById('small-comp-points').innerHTML = compPoints;
        scissorsIcon.style.display = 'inline-block';
        rockIconComp.style.display = 'inline-block';
    }

    gameFinished();
}

function playerChoicePaper() {
    playerChoice = PAPER;
    computerMakesChoice();
    computerChoice = randomChoice()

    if (computerChoice === PAPER) {
        resultContainer.textContent = "Oavgjort! Datorn valde också påse."
        draw.style.display = 'inline-block';
        drawComp.style.display = 'inline-block';

    } else if (computerChoice === ROCK) {
        playerPoints++;
        resultContainer.textContent = "Grattis! Datorn valde sten. Det går bra nu!"
        document.getElementById('player-points').innerHTML = playerPoints;
        document.getElementById('small-player-points').innerHTML = playerPoints;
        paperIcon.style.display = 'inline-block';
        rockIconComp.style.display = 'inline-block';

    } else if (computerChoice === SCISSORS) {
        compPoints++;
        resultContainer.textContent = "Tusan! Datorn valde sax och klippte sönder din påse."
        document.getElementById('comp-points').innerHTML = compPoints;
        document.getElementById('small-comp-points').innerHTML = compPoints;
        paperIcon.style.display = 'inline-block';
        scissorsIconComp.style.display = 'inline-block';
    }

    gameFinished();
}


function computerMakesChoice() {
    choiceRock.remove();
    choiceScissors.remove();
    choicePaper.remove();
    resultContainer.style.display = 'flex';
    continueButton.style.display = 'flex';
}

function continuePlaying() {
    resultContainer.style.display = 'none';
    continueButton.style.display = 'none';

    clearPicsFromScoreBoards();

    document.getElementById('game-container').appendChild(choiceRock);
    document.getElementById('game-container').appendChild(choiceScissors);
    document.getElementById('game-container').appendChild(choicePaper);
}

function gameFinished() {

    if (compPoints === 3) {
        statsComputer++;
        losingContainer.style.display = 'block';
        showResultGif();
        clearGame();
        localStorage.setItem('compWins', statsComputer);

    } else if (playerPoints === 3) {
        statsPlayer++;
        winningContainer.style.display = 'block';
        showResultGif();
        clearGame();
        localStorage.setItem('playerWins', statsPlayer);
    }
}

function clearGame() {
    resultContainer.remove();
    continueButton.remove();
    choiceRock.remove();
    choiceScissors.remove();
    choicePaper.remove();
}

function clearPicsFromScoreBoards() {
    draw.style.display = 'none';
    drawComp.style.display = 'none';
    rockIcon.style.display = 'none';
    rockIconComp.style.display = 'none';
    scissorsIcon.style.display = 'none';
    scissorsIconComp.style.display = 'none';
    paperIcon.style.display = 'none'
    paperIconComp.style.display = 'none';
}

function showResultGif() {
    gifChoice = randomGif();

    if (gifChoice === 1) {
        document.getElementById('cheerGif').style.display = 'inline-block';
        document.getElementById('headshakeGif').style.display = 'inline-block';

    } else if (gifChoice === 2) {
        document.getElementById('applauseGif').style.display = 'inline-block';
        document.getElementById('rainGif').style.display = 'inline-block';

    } else if (gifChoice === 3) {
        document.getElementById('celebrationGif').style.display = 'inline-block';
        document.getElementById('cryGif').style.display = 'inline-block';

    } else {
        document.getElementById('trophyGif').style.display = 'inline-block';
        document.getElementById('sadDogGif').style.display = 'inline-block';
    }
}

//***HISTORY CODE***

function showSecond() {
    if (history1.style.display = 'inline-block') {
        history1.style.display = 'none';
        history2.style.display = 'inline-block';
    }
}

function showThird() {
    if (history2.style.display = 'inline-block') {
        history2.style.display = 'none';
        history3.style.display = 'inline-block';
    }
}

function showFourth() {
    if (history3.style.display = 'inline-block') {
        history3.style.display = 'none';
        history4.style.display = 'inline-block';
    }
}

function showFirst() {
    if (history4.style.display = 'inline-block') {
        history4.style.display = 'none';
        history1.style.display = 'inline-block';
    }
}

//***STATISTICS CODE***/

function clearStatistics() {
    localStorage.removeItem('compWins');
    localStorage.removeItem('playerWins');

    localStorage.setItem('compWins', '0')
    localStorage.setItem('playerWins', '0')

    document.getElementById('stats-player').innerHTML = localStorage.getItem('playerWins');
    document.getElementById('stats-computer').innerHTML = localStorage.getItem('compWins');
}