let buttonPlayerX = document.getElementById("playerX");
let buttonPlayerO = document.getElementById("playerO");
let boxes = Array.from(document.getElementsByClassName("box"));

const playerX = "X";
const playerO = "O";
let currentPlayer = " ";

// console.log(boxes);

const choosePlayer = () => {
  buttonPlayerX.addEventListener("click", function () {
    currentPlayer = playerX;
    console.log("X chosen");
  });

  buttonPlayerO.addEventListener("click", function () {
    currentPlayer = playerO;
    console.log("O chosen");
  });
};

const startGame = () => {
  boxes.forEach((box) => box.addEventListener("click", boxClicked));
};

function boxClicked(event) {
  //   event.target.innerText = currentPlayer;
  console.log(event.target);
}

startGame();
choosePlayer();
console.log(currentPlayer);
