const TicTacToeGame = (function () {
  // Define game variables
  let currentPlayer = 'X';
  let gameBoard = ['', '', '', '', '', '', '', '', ''];
  let gameEnded = false;

  // Function to check for a win
  function checkForWin() {
    const winConditions = [
      [0, 1, 2],
      [3, 4, 5],
      [6, 7, 8], // Rows
      [0, 3, 6],
      [1, 4, 7],
      [2, 5, 8], // Columns
      [0, 4, 8],
      [2, 4, 6], // Diagonals
    ];

    for (let condition of winConditions) {
      const [a, b, c] = condition;
      if (
        gameBoard[a] &&
        gameBoard[a] === gameBoard[b] &&
        gameBoard[a] === gameBoard[c]
      ) {
        return true;
      }
    }
    return false;
  }

  // Function to check for a tie
  function checkForTie() {
    return !gameBoard.includes('');
  }

  // Function to handle player move
  function makeMove(index) {
    const playerTurnDisplay = document.querySelector('.player');
    if (!gameEnded && gameBoard[index] === '') {
      gameBoard[index] = currentPlayer;
      if (checkForWin()) {
        playerTurnDisplay.textContent = `Player ${currentPlayer} wins!`;
        gameEnded = true;
      } else if (checkForTie()) {
        playerTurnDisplay.textContent = `It's a tie!`;
        gameEnded = true;
      } else {
        currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
        updatePlayerTurn();
      }
      renderGameBoard();
    }
  }

  // Function to update player turn display
  function updatePlayerTurn() {
    const playerTurnDisplay = document.querySelector('.player');
    playerTurnDisplay.textContent = `Player ${currentPlayer}'s Turn`;
  }

  // Function to render game board
  function renderGameBoard() {
    const cells = document.querySelectorAll('.cell');
    cells.forEach((cell, index) => {
      cell.textContent = gameBoard[index];
    });
  }

  // Function to reset the game
  function resetGame() {
    gameBoard = ['', '', '', '', '', '', '', '', ''];
    gameEnded = false;
    currentPlayer = 'X';
    updatePlayerTurn();
    renderGameBoard();
  }

  // Function to initialize event listeners
  function init() {
    const cells = document.querySelectorAll('.cell');
    cells.forEach((cell, index) => {
      cell.addEventListener('click', () => {
        makeMove(index);
      });
    });

    const playAgainBtn = document.querySelector('.play-again');
    playAgainBtn.addEventListener('click', resetGame);
  }

  return {
    init: init,
  };
})();

// Initialize the game when the DOM content is loaded
document.addEventListener('DOMContentLoaded', TicTacToeGame.init);
