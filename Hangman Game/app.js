let fruit_names = [
  "ORANGE",
  "APPLE",
  "BANANA",
  "CHERRY",
  "GRAPE",
  "LEMON",
  "PAPAYA",
  "STRAWBERRY",
  "PINEAPPLE",
  "PEACH",
  "MANGO",
  "KIWI",
];

let keyboard = document.getElementById("keyboard");
let chance = 6;
let picStatus = 0;
let answer = "";
let wordStatus = null;
let guessed_answer = [];

//button generate
function btnDiv() {
  keyboard.innerHTML = "";
  let keys = "ABCDEFGHIJKLMNOPQRSTUVWXYZ".split("").map((letter) => {
    keyboard.innerHTML += `<button class="btn btn-outline-secondary m-2" onclick='checkAnswer("${letter}")'id = "${letter}">${letter}</button>`;
  });
}

//answer generate
function generate_answer() {
  answer = fruit_names[Math.floor(Math.random() * fruit_names.length)];
  console.log(answer);
}
//answer_filed
function show_answerField() {
  wordStatus = answer
    .split("")
    .map((letter) => (guessed_answer.indexOf(letter) >= 0 ? letter : " _ "))
    .join("");
  document.getElementById("answer_field").innerHTML = wordStatus;
}

//check answer
function checkAnswer(letter) {
  guessed_answer.indexOf(letter) === -1 ? guessed_answer.push(letter) : null;
  document.getElementById(letter).setAttribute("disabled", true);

  if (answer.indexOf(letter) >= 0) {
    show_answerField();
    setTimeout(checkWin, 200);
  } else if (answer.indexOf(letter) === -1) {
    chance--;
    picStatus++;
    updateChance();
    checkHangMan();
    setTimeout(checkLose, 300);
    checkLose();
  }
}

//show chance
function updateChance() {
  document.getElementById("chance").innerHTML = chance;
}

function checkWin() {
  if (wordStatus === answer) {
    Swal.fire({
      title: "Congratulations !",
      text: "You won the game .",
      imageUrl: "./images/Congratulations.gif",
      imageWidth: 200,
      imageHeight: 200,
      imageAlt: "Custom image",
      confirmButtonText: "Play Again",
    }).then((_) => {
      restart();
    });
  }
}
function checkLose() {
  if (chance === 0) {
    Swal.fire({
      title: " You lost the game !! ",
      text: "Answer is " + answer,
      imageUrl: "./images/lost.png",
      imageWidth: 200,
      imageHeight: 200,
      imageAlt: "Custom image",
      confirmButtonText: "Play Again",
    }).then((_) => {
      restart();
    });
  }
}

function checkHangMan() {
  document.getElementById("hangMan").src = `./images/${picStatus}.jpg`;
}

function restart() {
  chance = 6;
  answer = "";
  wordStatus = null;
  guessed_answer = [];
  picStatus = 0;
  document.getElementById("hangMan").src = `./images/0.jpg`;
  generate_answer();
  show_answerField();
  updateChance();
  btnDiv();
}

updateChance();
generate_answer();
show_answerField();
btnDiv();
