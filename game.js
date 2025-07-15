const cells = document.querySelectorAll('[data-cell]');
const board = document.getElementById('board');
const restartButton = document.getElementById('restartButton');

let currentTurn = 'X';

const WINNING_COMBINATIONS = [
  [0, 1, 2], // Top row
  [3, 4, 5], // Middle row
  [6, 7, 8], // Bottom row
  [0, 3, 6], // Left column
  [1, 4, 7], // Middle column
  [2, 5, 8], // Right column
  [0, 4, 8], // Diagonal
  [2, 4, 6], // Anti-diagonal
];

function startGame() {
  cells.forEach(cell => {
    cell.classList.remove('x', 'o');
    cell.textContent = '';
    cell.addEventListener('click', handleClick, { once: true });
  });
  currentTurn = 'X';
}

function handleClick(e) {
  const cell = e.target;
  placeMark(cell, currentTurn);

  if (checkWin(currentTurn)) {
    endGame(false);
  } else if (isDraw()) {
    endGame(true);
  } else {
    swapTurns();
  }
}

function placeMark(cell, currentPlayer) {
  cell.classList.add(currentPlayer.toLowerCase());
  cell.textContent = currentPlayer;
}

function swapTurns() {
  currentTurn = currentTurn === 'X' ? 'O' : 'X';
}

function checkWin(currentPlayer) {
  return WINNING_COMBINATIONS.some(combination => {
    return combination.every(index => {
      return cells[index].classList.contains(currentPlayer.toLowerCase());
    });
  });
}

function isDraw() {
  return [...cells].every(cell => {
    return cell.classList.contains('x') || cell.classList.contains('o');
  });
}

function endGame(draw) {
  setTimeout(() => {
    if (draw) {
      alert("It's a draw!");
    } else {
      alert(`${currentTurn} wins!`);
    }
    startGame(); // Auto-restart after alert
  }, 100);
}

// Restart button
restartButton.addEventListener('click', startGame);

// Initial start
startGame();
