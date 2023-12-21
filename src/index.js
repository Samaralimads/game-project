const buttonPlayerX = document.getElementById("playerX");
const buttonPlayerO = document.getElementById("playerO");
const boxes = Array.from(document.getElementsByClassName("box"));
const winnerAudio = document.getElementById("winnerAudio");
const tieAudio = document.getElementById("tieAudio");
const penWritingAudio = document.getElementById("penWriting");
const buttonClickAudio = document.getElementById("buttonClickAudio");
const currentPlayerText = document.getElementById("currentPlayerText");
const currentPlayerTurn = document.getElementById("currentPlayerTurn");

const playerX = "X";
const playerO = "O";
let currentPlayer = " ";
let space = Array(9).fill("");

const choosePlayer = () => {
  buttonPlayerX.addEventListener("click", function () {
    currentPlayer = playerX;
    disablePlayerButtons();
    playButtonClickAudio();
  });

  buttonPlayerO.addEventListener("click", function () {
    currentPlayer = playerO;
    disablePlayerButtons();
    playButtonClickAudio();
  });
};

function playButtonClickAudio() {
  buttonClickAudio.play();
}

const disablePlayerButtons = () => {
  buttonPlayerX.disabled = true;
  buttonPlayerO.disabled = true;
};

const enablePlayerButtons = () => {
  buttonPlayerX.disabled = false;
  buttonPlayerO.disabled = false;
};

const startGame = () => {
  boxes.forEach((box) => box.addEventListener("click", boxClicked));
};

function boxClicked(event) {
  const id = event.target.id;
  if (currentPlayer === " ") {
    return;
  }
  if (!space[id]) {
    space[id] = currentPlayer;
    event.target.innerText = currentPlayer;

    event.target.removeEventListener("click", boxClicked);
    playAudio();

    if (checkForWinner()) {
      gameOver("Player " + currentPlayer + " is the winner!");
    } else if (checkForTie()) {
      gameOver("It's a tie!");
    } else {
      togglePlayer();
    }
  }
}

function playAudio() {
  penWritingAudio.currentTime = 0;
  penWritingAudio.play();
}

const togglePlayer = () => {
  currentPlayerTurn.style.display = "initial";
  if (currentPlayer === playerX) {
    currentPlayer = playerO;
    currentPlayerTurn.textContent = "It's player O's turn";
  } else {
    currentPlayer = playerX;
    currentPlayerTurn.textContent = "It's player X's turn";
  }
};

const checkForWinner = () => {
  const winPatterns = [
    [0, 1, 2], // Rows
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6], // Columns
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8], // Diagonals
    [2, 4, 6],
  ];

  for (const pattern of winPatterns) {
    const [a, b, c] = pattern;
    if (space[a] && space[a] === space[b] && space[a] === space[c]) {
      pattern.forEach((index) => {
        boxes[index].classList.add("pulse");
      });

      return true;
    }
  }
  return false;
};

const checkForTie = () => {
  if (!space.includes("")) {
    return true;
  } else {
    return false;
  }
};

const gameOver = (message) => {
  console.log("Final Board State:", space);
  document
    .querySelectorAll(".box")
    .forEach((element) => element.removeEventListener("click", boxClicked));

  currentPlayerTurn.style.display = "none";
  setTimeout(() => {
    if (checkForWinner()) {
      playWinnerAudio();
      showModal(message);
    } else if (checkForTie()) {
      playTieAudio();
      showModal("It's a tie!");
    }
  }, 150);
};

const playWinnerAudio = () => {
  winnerAudio.play();
};
const playTieAudio = () => {
  tieAudio.play();
};

const showModal = (message) => {
  const modal = document.getElementById("customModal");
  const modalMessage = document.getElementById("modalMessage");
  const restartButton = document.getElementById("restartButton");

  modalMessage.textContent = message;
  modal.style.display = "block";

  restartButton.addEventListener("click", () => {
    modal.style.display = "none";
    resetGame();
  });
};

const resetGame = () => {
  space = Array(9).fill("");
  boxes.forEach((box) => {
    box.innerText = "";
    box.classList.remove("pulse");

    box.addEventListener("click", boxClicked);
  });

  enablePlayerButtons();
};

// pattern.forEach((index) => {
//   boxes[index].classList.add("pulse");
// });

// console.log(pattern);

choosePlayer();
startGame();
