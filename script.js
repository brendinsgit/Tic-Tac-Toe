const board = document.getElementById('board');
const cells = document.querySelectorAll('.cell');
const messageEl = document.getElementById('message');
const playAgainButton = document.getElementById('play-again');

let currentPlayer = 'X';
let gameBoard = ['', '', '', '', '', '', '', '', ''];
let winner = null;

function checkWin() {
    const winPatterns = [
        [0, 1, 2],
        [3, 4, 5],
        [6, 7, 8],
        [0, 3, 6],
        [1, 4, 7],
        [2, 5, 8],
        [0, 4, 8],
        [2, 4, 6]
    ];

    for (const pattern of winPatterns) {
        const [a, b, c] = pattern;
        if (gameBoard[a] && gameBoard[a] === gameBoard[b] && gameBoard[a] === gameBoard[c]) {
            return gameBoard[a];
        }
    }

    return null;
}

function checkTie() {
    return gameBoard.every(cell => cell !== '');
}

function handleClick(index) {
    if (gameBoard[index] || winner) return;

    gameBoard[index] = currentPlayer;
    cells[index].innerText = currentPlayer;

    winner = checkWin();
    if (winner) {
        messageEl.innerText = `${winner} wins!`;
        const winSound = document.getElementById('winSound');
        winSound.play();
        playAgainButton.style.display = 'block';
    } else if (checkTie()) {
        messageEl.innerText = "It's a Tie!";
        playAgainButton.style.display = 'block';
        const tieSound = document.getElementById('tieSound');
        tieSound.play();
    } else {
        currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
        messageEl.innerText = `It's ${currentPlayer}'s turn`;
    }
}

function resetGame() {
    gameBoard = ['', '', '', '', '', '', '', '', ''];
    currentPlayer = 'X';
    winner = null;
    cells.forEach(cell => cell.innerText = '');
    messageEl.innerText = `It's ${currentPlayer}'s turn`;
    playAgainButton.style.display = 'none';
    const startSound = document.getElementById('startSound');
    startSound.play();
}

cells.forEach((cell, index) => {
    cell.addEventListener('click', () => handleClick(index));
});

playAgainButton.addEventListener('click', resetGame);

resetGame();
