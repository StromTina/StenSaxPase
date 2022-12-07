const ROCK = 1;
const SCISSORS = 2;
const PAPER = 3;

let playerChoice = 0;
let computerChoice = 0;

let choiceRock = document.getElementById('choiceRock');
let choiceScissors = document.getElementById('choiceScissors');
let choicePaper = document.getElementById('choicePaper');

let draw = document.getElementById('draw');
let drawComp = document.getElementById('drawComp');
let rockIcon = document.getElementById('rockIcon');
let rockIconComp = document.getElementById('rockIconComp');
let scissorsIcon = document.getElementById('scissorsIcon');
let scissorsIconComp = document.getElementById('scissorsIconComp');
let paperIcon = document.getElementById('paperIcon');
let paperIconComp = document.getElementById('paperIconComp');

let resultContainer = document.getElementById('resultContainer');
let rematchButton = document.getElementById('rematchButton');
let gameContainer = document.getElementById('gameContainer');
let winningContainer = document.getElementById('winningContainer');

let playerPoints = document.getElementById('playerPoints');
let compPoints = document.getElementById('compPoints');

let statsPlayer = document.getElementById('statsPlayer');
let statsComputer = document.getElementById('statsComputer');
let refreshButton = document.getElementById('refreshButton');

let history1 = document.getElementById('history1');
let history2 = document.getElementById('history2');
let history3 = document.getElementById('history3');
let history4 = document.getElementById('history4');


playerPoints = 0;
compPoints = 0;

statsPlayer = 0;
statsComputer = 0;

if (window.location.href === "http://127.0.0.1:5500/StenSaxP%C3%A5se/newgame.html") {
    choiceRock.addEventListener('click', playerChoiceRock);
    choiceScissors.addEventListener('click', playerChoiceScissors);
    choicePaper.addEventListener('click', playerChoicePaper);
    rematchButton.addEventListener('click', continuePlaying);
}

if (window.location.href === 'http://127.0.0.1:5500/StenSaxP%C3%A5se/history.html') {
    history1.addEventListener('click', showSecond);
    history2.addEventListener('click', showThird);
    history3.addEventListener('click', showFourth);
    history4.addEventListener('click', showFirst);
}

function randomChoice() {
    return Math.floor(Math.random() * 3) + 1;
}


function continuePlaying() {
    resultContainer.style.display = 'none';
    rematchButton.style.display = 'none';

    
    clearPicsFromScoreBoards();

    gameContainer.appendChild(choiceRock);
    gameContainer.appendChild(choiceScissors);
    gameContainer.appendChild(choicePaper);
}


function computerMakesChoice() {
    choiceRock.remove();
    choiceScissors.remove();
    choicePaper.remove();
    resultContainer.style.display = 'flex';
    rematchButton.style.display = 'flex';
}


function playerChoiceRock() {
    playerChoice = ROCK;
    setTimeout(computerMakesChoice, 200);
    computerChoice = randomChoice();

    if (computerChoice === ROCK) {
        resultContainer.textContent = "Datorn valde också sten. Det blev oavgjort!"
        draw.style.display = 'inline-block';
        drawComp.style.display = 'inline-block';

    } else if (computerChoice === SCISSORS) {
        playerPoints++;
        resultContainer.textContent = "Datorn valde sax. Grattis, du vann!"
        document.getElementById('playerPoints').innerHTML = playerPoints;
        rockIcon.style.display = 'inline-block';
        scissorsIconComp.style.display = 'inline-block';


    } else if (computerChoice === PAPER) {
        compPoints++;
        resultContainer.textContent = "Attans! Datorn valde påse. Datorn vann."
        document.getElementById('compPoints').innerHTML = compPoints;
        rockIcon.style.display = 'inline-block';
        paperIconComp.style.display = 'inline-block';
    }

    gameFinished();
}

function playerChoiceScissors() {
    playerChoice = SCISSORS;
    setTimeout(computerMakesChoice, 200);
    computerChoice = randomChoice();

    if (computerChoice === SCISSORS) {
        resultContainer.textContent = "Datorn valde sax precis som du. Testa igen!"
        draw.style.display = 'inline-block';
        drawComp.style.display = 'inline-block';

    } else if (computerChoice === PAPER) {
        playerPoints++;
        resultContainer.textContent = "Datorn valde påse. Hurra! 1 poäng till dig."
        document.getElementById('playerPoints').innerHTML = playerPoints;
        scissorsIcon.style.display = 'inline-block';
        paperIconComp.style.display = 'inline-block';

    } else if (computerChoice === ROCK) {
        compPoints++;
        resultContainer.textContent = "Otur! Datorn valde sten. Datorn vann."
        document.getElementById('compPoints').innerHTML = compPoints;
        scissorsIcon.style.display = 'inline-block';
        rockIconComp.style.display = 'inline-block';
    }

    gameFinished();
}

function playerChoicePaper() {
    playerChoice = PAPER;
    setTimeout(computerMakesChoice, 200);
    computerChoice = randomChoice()

    if (computerChoice === PAPER) {
        resultContainer.textContent = "Oavgjort! Datorn valde också påse."
        draw.style.display = 'inline-block';
        drawComp.style.display = 'inline-block';

    } else if (computerChoice === ROCK) {
        playerPoints++;
        resultContainer.textContent = "Grattis! Datorn valde sten. Det går bra nu!"
        document.getElementById('playerPoints').innerHTML = playerPoints;
        paperIcon.style.display = 'inline-block';
        rockIconComp.style.display = 'inline-block';

    } else if (computerChoice === SCISSORS) {
        compPoints++;
        resultContainer.textContent = "Tusan! Datorn valde sax och klippte sönder din påse."
        document.getElementById('compPoints').innerHTML = compPoints;
        paperIcon.style.display = 'inline-block';
        scissorsIconComp.style.display = 'inline-block';
    }

    gameFinished();
}

function gameFinished() {
    if (compPoints === 3) {
        statsComputer++;
        losingContainer.style.display = 'block'; //korrigera
        resultContainer.remove();
        rematchButton.remove();
        choiceRock.remove();
        choiceScissors.remove();
        choicePaper.remove();

        console.log('statsComp är ' + statsComputer)


    } else if (playerPoints === 3) {
        statsPlayer++;
        winningContainer.style.display = 'block'; //korrigera
        resultContainer.remove();
        rematchButton.remove();
        choiceRock.remove();
        choiceScissors.remove();
        choicePaper.remove();

        console.log('statsPlayer är ' + statsPlayer)
    }

    saveStats();
}

const saveStats = () => {
    localStorage.setItem('playerWins', statsPlayer);
    localStorage.setItem('compWins', statsComputer);
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

let storedPlayerWins = localStorage.getItem('playerWins');
let storedComputerWins = localStorage.getItem('compWins');



if (window.location.href === 'http://127.0.0.1:5500/StenSaxP%C3%A5se/statistics.html') {
    
        document.getElementById('statsPlayer').innerHTML = storedPlayerWins;
        document.getElementById('statsComputer').innerHTML = storedComputerWins;

}
