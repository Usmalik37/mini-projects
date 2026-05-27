//selectors for HUD
const pickOption = document.querySelector(".Pickoption");
const options = document.querySelector(".options");
const mainMenu = document.querySelector(".main-menu");
const menu = document.querySelector(".menu");
const container = document.querySelector(".container");
const playerScore = document.querySelector(".player-score");
const algoScore = document.querySelector(".algo-score");
const roundNumber = document.querySelector(".round");
const returnBtn = document.querySelector(".return-btn");
const endBtn = document.querySelector(".end-btn");
const scoreBoard = document.querySelector(".score-board");
const messageBox = document.querySelector(".message-box");

//selectors for boxes
const tl = document.querySelector(".tl");
const tc = document.querySelector(".tc");
const tr = document.querySelector(".tr");
const cl = document.querySelector(".cl");
const cc = document.querySelector(".cc");
const cr = document.querySelector(".cr");
const bl = document.querySelector(".bl");
const bc = document.querySelector(".bc");
const br = document.querySelector(".br");

//arrays
let gameArray = [tl, tc, tr, cl, cc, cr, bl, bc, br];
let referenceArray = [tl, tc, tr, cl, cc, cr, bl, bc, br];

//objects
let score = {
  player: 0,
  algo: 0,
  round: 1,
};

let crossReferences = {
  top_row: [tl, tc, tr],
  mid_row: [cl, cc, cr],
  btm_row: [bl, bc, br],
  lft_col: [tl, cl, bl],
  mid_col: [tc, cc, bc],
  rgt_col: [tr, cr, br],
  lft_dag: [tl, cc, br],
  rgt_dag: [tr, cc, bl],
};

//functions
play = () => {
  container.style.display = "grid";
  menu.classList.toggle("slide-up");
  container.classList.remove("blur");
  scoreBoard.classList.remove("blur");
};

returnMenu = () => {
  menu.classList.remove("slide-up");
  container.classList.add("blur");
  scoreBoard.classList.add("blur");
};

displayMessage = () => {
  messageBox.classList.toggle("enlarge");

  let winner;
  if (score.player == score.algo) {
    winner = "Its a draw";
  } else if (score.player > score.algo) {
    winner = "<em>Player</em> wins";
  } else {
    winner = "<em>Algo</em> wins";
  }
  messageBox.innerHTML = `<h1>${winner}</h1> <br> <h2>Scores</h2> Player: ${score.player} <br> Algo: ${score.algo} <br> Round: ${score.round}`;
};

// main function
playerTurn = true;
blockPlayer = true;
pickRandom = false;

checkOut = (e) => {
  function restartGamePlay(character) {
    if (character !== "draw") {
      score[character] += 1;
      score["round"] += 1;
    } else {
      score["round"] += 1;
    }

    gameArray = [];
    for (let box of referenceArray) {
      box.textContent = "";
    }

    referenceArray.forEach((el) => {
      gameArray.push(el);
    });

    playerScore.innerHTML = "PLAYER &nbsp;: " + score.player;
    algoScore.innerHTML = "ALGO &nbsp; &nbsp; &nbsp;: " + score.algo;
    roundNumber.innerHTML = "ROUND &nbsp; : " + score.round;
    console.log("1", playerTurn);

    if (playerTurn == false) {
      let gameIndex = gameArray.length - 1;
      randomIndex = Math.floor(Math.random() * (gameIndex - 0 + 1)) + 0;
      gameArray[randomIndex].textContent = "o";
      playerTurn = true;
    }

    gameArray = gameArray.filter(function (value) {
      return value !== gameArray[randomIndex];
    });
  }

  if (playerTurn == true && e.textContent == "") {
    e.textContent = "x";
    playerTurn = !playerTurn;

    //remove checked box from the gameArray
    if (gameArray.length !== 0) {
      gameArray = gameArray.filter((value) => {
        return value !== e;
      });
    } else {
      restartGamePlay("draw");
    }

    // controls the crossing in the left and right diagonal
  }

  if (playerTurn == false) {
    function crossingAndBlocking(type) {
      for (let crossBoxesKey in crossReferences) {
        let crossBoxes = crossReferences[crossBoxesKey];

        let boxes = [
          [crossBoxes[0], crossBoxes[0].innerHTML],
          [crossBoxes[1], crossBoxes[1].innerHTML],
          [crossBoxes[2], crossBoxes[2].innerHTML],
        ].sort();

        if (
          blockPlayer == true &&
          boxes[0][1] == "" &&
          boxes[1][1] == type &&
          boxes[2][1] == type
        ) {
          boxes[0][0].innerHTML = "o";
          playerTurn = true;
          pickRandom = false;
          blockPlayer = !blockPlayer;
          break;
        } else {
          pickRandom = true;
          playerTurn = false;
          blockPlayer = true;
        }
      }
    }

    crossingAndBlocking("o");
    crossingAndBlocking("x");

    if (pickRandom == true) {
      if (gameArray.length > 0) {
        let gameIndex = gameArray.length - 1;
        randomIndex = Math.floor(Math.random() * (gameIndex - 0 + 1)) + 0;
        gameArray[randomIndex].textContent = "o";
        playerTurn = true;
      }

      gameArray = gameArray.filter(function (value) {
        return value !== gameArray[randomIndex];
      });
    }
  }

  function checkingWinner() {
    for (let crossBoxesKey in crossReferences) {
      let crossBoxes = crossReferences[crossBoxesKey];

      let boxes = [
        [crossBoxes[0], crossBoxes[0].innerHTML],
        [crossBoxes[1], crossBoxes[1].innerHTML],
        [crossBoxes[2], crossBoxes[2].innerHTML],
      ];

      if (boxes[0][1] == "x" && boxes[1][1] == "x" && boxes[2][1] == "x") {
        playerTurn = true;
        restartGamePlay("player");
        break;
      }
      if (boxes[0][1] == "o" && boxes[1][1] == "o" && boxes[2][1] == "o") {
        playerTurn = false;
        restartGamePlay("algo");
        break;
      }
    }
  }
  checkingWinner();

  if (
    referenceArray[0].textContent !== "" &&
    referenceArray[1].textContent !== "" &&
    referenceArray[2].textContent !== "" &&
    referenceArray[3].textContent !== "" &&
    referenceArray[4].textContent !== "" &&
    referenceArray[5].textContent !== "" &&
    referenceArray[6].textContent !== "" &&
    referenceArray[7].textContent !== "" &&
    referenceArray[8].textContent !== ""
  ) {
    playerTurn = !playerTurn;
    restartGamePlay("draw");
  }
};

//event listeners
returnBtn.addEventListener("click", returnMenu);
endBtn.addEventListener("click", displayMessage);
