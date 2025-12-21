/*-------------------------------- Constants --------------------------------*/



/*---------------------------- Variables (state) ----------------------------*/



/*------------------------ Cached Element References ------------------------*/



/*-------------------------------- Functions --------------------------------*/



/*----------------------------- Event Listeners -----------------------------*/

//1) Define the required variables used to track the state of the game.

//2) Store cached element references.

//3) Upon loading, the game state should be initialized, and a function should 
//   be called to render this game state.

//4) The state of the game should be rendered to the user.

//5) Define the required constants.

//6) Handle a player clicking a square with a `handleClick` function.

//7) Create Reset functionality.


let board;
let turn;
let winner;
let tie;

const squareEls= document.querySelectorAll('.sqr');
const messageEl= document.querySelector('#message');
const resetBtnEl = document.querySelector('#reset');

function init() {
  board = ["", "", "", "", "", "", "", "", ""];
  turn = "X";
  winner = false;
  tie = false;
  render();
}


init();

function render(){
    updateBoard();
    updateMessage();
}

// create updateBoard function
function updateBoard(){
    board.forEach((cell, index) => {
        const square= squareEls[index];
        square.textContent= cell;
    });
}

function updateMessage() {
  if (winner === false && tie === false) {
    messageEl.textContent = `Player ${turn}'s Turn`;
  
  } else if (winner === false && tie === true) {
    messageEl.textContent = "It's a tie!";
  
  } else {
    messageEl.textContent = `Congratulations! Player ${turn === "O" ? "X" : "O"} Wins!`;


    
  }
}


const winningCombos = [
    //Rows
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8],
  //Columns
  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8],
  //Diagnols
  [0, 4, 8],
  [2, 4, 6]
];

function handleClick(event) {
  const index = event.target.id;
   if (board[index] !== '' || winner) return;
  
    placePiece(index);
    checkForWinner();
    checkForTie();
    switchPlayerTurn();
    render();
}

function placePiece(index) {
  board[index] = turn;      
}

squareEls.forEach(sq => {
    sq.addEventListener('click', handleClick);
});
resetBtnEl.addEventListener('click', init);

function checkForWinner() {
    // Loop through each winning combination
    winningCombos.forEach(combo => {
        const [a, b, c] = combo;  // indexes from the combo array

        // Check if the first position is NOT empty
        if (board[a] !== '' &&
            board[a] === board[b] &&
            board[a] === board[c]) {

            // We found a winner!
            winner = true;
        }
        
    });
}

function checkForTie(){
    if (winner === true){
        return;
    }
    else {
        if(board.includes('')) {
            tie = false;
        }
        else{
            tie = true;
        }
    }
}

function switchPlayerTurn(){
    if (winner === true){
        return;
    }
    else{
        if (turn === "X") {
            turn = "O";
        }
        else{
            turn = "X";
        }
    }
}
