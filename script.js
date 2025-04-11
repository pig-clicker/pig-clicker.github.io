// Variables to track the game state
let currentPlayer = 'X';  // 'X' starts the game
let gameBoard = ['', '', '', '', '', '', '', '', ''];  // Represents the 3x3 grid
let gameOver = false;

// DOM elements
const board = document.getElementById('board');
const status = document.getElementById('status');
const restartButton = document.getElementById('restart');

// Create the grid dynamically
function createBoard() {
    for (let i = 0; i < 9; i++) {
        const cell = document.createElement('div');
        cell.classList.add('cell');
        cell.setAttribute('data-index', i);
        cell.addEventListener('click', handleCellClick);
        board.appendChild(cell);
    }
}

// Handle a cell click
function handleCellClick(event) {
    if (gameOver) return;  // Do nothing if the game is over

    const index = event.target.getAttribute('data-index');
    if (gameBoard[index] !== '') return;  // Don't allow overwriting a cell

    // Update the board and UI
    gameBoard[index] = currentPlayer;
    event.target.textContent = currentPlayer;

    // Check for a win or a draw
    if (checkWinner()) {
        status.textContent = `Player ${currentPlayer} wins!`;
        gameOver = true;
    } else if (gameBoard.every(cell => cell !== '')) {
        status.textContent = "It's a draw!";
        gameOver = true;
    } else {
        // Switch player turn
        currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
        status.textContent = `Player ${currentPlayer}'s turn`;
    }
}

// Check if there is a winner
function checkWinner() {
    const winningCombinations = [
        [0, 1, 2], [3, 4, 5], [6, 7, 8], // Rows
        [0, 3, 6], [1, 4, 7], [2, 5, 8], // Columns
        [0, 4, 8], [2, 4, 6]  // Diagonals
    ];

    return winningCombinations.some(combination => {
        const [a, b, c] = combination;
        return gameBoard[a] && gameBoard[a] === gameBoard[b] && gameBoard[a] === gameBoard[c];
    });
}

// Restart the game
function restartGame() {
    gameBoard = ['', '', '', '', '', '', '', '', ''];
    currentPlayer = 'X';
    gameOver = false;
    status.textContent = `Player ${currentPlayer}'s turn`;

    // Clear the grid
    document.querySelectorAll('.cell').forEach(cell => {
        cell.textContent = '';
    });
}

// Initialize the game
createBoard();

// Attach event listener for the restart button
restartButton.addEventListener('click', restartGame);
