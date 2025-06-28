const board = document.getElementById('board');
const cells = document.querySelectorAll('[data-cell]');
const restartButton = document.getElementById('restartButton');
const modal = document.getElementById('modal');
const winnerMessage = document.getElementById('winnerMessage');
const newGameButton = document.getElementById('newGameButton');
const xScoreDisplay = document.getElementById('xScore');
const oScoreDisplay = document.getElementById('oScore');
const drawScoreDisplay = document.getElementById('drawScore');
const X_CLASS = 'x';
const O_CLASS = 'o';
let isOTurn = false;

// Skorlar
let xScore = 0;
let oScore = 0;
let drawScore = 0;

const WINNING_COMBINATIONS = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6]
];

function startGame() {
    isOTurn = false;
    cells.forEach(cell => {
        cell.classList.remove(X_CLASS);
        cell.classList.remove(O_CLASS);
        cell.removeEventListener('click', handleClick);
        cell.addEventListener('click', handleClick, { once: true });
    });
    closeModal();
}

function handleClick(e) {
    const cell = e.target;
    const currentClass = isOTurn ? O_CLASS : X_CLASS;
    placeMark(cell, currentClass);
    if (checkWin(currentClass)) {
        updateScore(currentClass);
        displayWinner(currentClass);
    } else if (isDraw()) {
        updateScore('draw');
        displayWinner('Berabere');
    } else {
        swapTurns();
    }
}

function placeMark(cell, currentClass) {
    cell.classList.add(currentClass);
}

function swapTurns() {
    isOTurn = !isOTurn;
}

function checkWin(currentClass) {
    return WINNING_COMBINATIONS.some(combination => {
        return combination.every(index => {
            return cells[index].classList.contains(currentClass);
        });
    });
}

function isDraw() {
    return [...cells].every(cell => {
        return cell.classList.contains(X_CLASS) || cell.classList.contains(O_CLASS);
    });
}

function displayWinner(winner) {
    if (winner === 'Berabere') {
        winnerMessage.innerText = 'Berabere!';
    } else {
        winnerMessage.innerText = `${winner.toUpperCase()} Kazandı!`;
    }
    openModal();
}

function openModal() {
    modal.style.display = 'flex';
}

function closeModal() {
    modal.style.display = 'none';
}

function updateScore(winner) {
    if (winner === X_CLASS) {
        xScore++;
        xScoreDisplay.innerText = `X: ${xScore}`;
    } else if (winner === O_CLASS) {
        oScore++;
        oScoreDisplay.innerText = `O: ${oScore}`;
    } else if (winner === 'draw') {
        drawScore++;
        drawScoreDisplay.innerText = `Berabere: ${drawScore}`;
    }
}

function resetScores() {
    xScore = 0;
    oScore = 0;
    drawScore = 0;
    xScoreDisplay.innerText = `X: ${xScore}`;
    oScoreDisplay.innerText = `O: ${oScore}`;
    drawScoreDisplay.innerText = `Berabere: ${drawScore}`;
}

restartButton.addEventListener('click', () => {
    resetScores();
    startGame();
});

newGameButton.addEventListener('click', startGame);

startGame();
