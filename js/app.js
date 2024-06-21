/*-------------------------------- Constants --------------------------------*/
const winningCombos = [
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8],
  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8],
  [0, 4, 8],
  [2, 4, 6],
];

/*---------------------------- Variables (state) ----------------------------*/
let board;
let turn;
let winner;
let tie;
/*------------------------ Cached Element References ------------------------*/
const squareEls = document.querySelectorAll(".sqr");
const messageEl = document.querySelector("#message");
const resetButtonEl = document.querySelector("#reset")
/*-------------------------------- Functions --------------------------------*/
function init() {
  board = ["", "", "", "", "", "", "", "", ""];
  turn = "X";
  winner = false;
  tie = false;
  render();
  console.log("Initialized");
}
init();

function render() {
  updateBoard();
  updateMessage();
}

function updateBoard() {
  board.forEach((space, index) => {
    squareEls[index].innerHTML = board[index];
  });
}

function updateMessage() {
    if (winner) {
      messageEl.innerHTML = `${turn} wins! Game Over.`;
      return;
    }
  
    if (tie) {
      messageEl.innerHTML = "Tie, Game Over.";
      return
    }
  
    messageEl.innerHTML = `It is ${turn}'s turn.`;
  }

function handleClick(event) {
  const squareIdx = event.target.id;
  if (board[squareIdx] === "X" || board[squareIdx] === "O") {
    return;
  } else if (winner === true) {
    return;
  }
  placePiece(squareIdx)
  checkForWinner()
  checkForTie()
  switchPlayerTurn()
  render()
}

function placePiece(index) {
  if (squareEls[index] === null) {
    return;
  }
  squareEls[index].innerHTML = turn;
  board[index] = turn;
}

function checkForWinner() {
  winningCombos.forEach((combo) => {
    const space1 = combo[0];
    const space2 = combo[1];
    const space3 = combo[2];
    if (board[space1] === "") {
      return;
    }
    if (board[space1] === board[space2] && board[space2] === board[space3]) {
      winner = true;
    }
  });
}

function checkForTie() {
  if (winner === true) {
    return;
  }
  if (!board.some((space) => space === "")) {
    tie = true;
  }
}

function switchPlayerTurn() {
  if (winner === true) {
    return;
  } else {
    if (turn === "X") {
        turn = "O"
    } else if (turn === "O") {
        turn = "X"
    }
    }
  }

/*----------------------------- Event Listeners -----------------------------*/
document.querySelector(".board").addEventListener("click", handleClick);
resetButtonEl.addEventListener("click", init)