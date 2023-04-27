

function shuffle(array) {
  array.sort(() => Math.random() - 0.5);
}

function getRandomIndex(n) {
  return Math.floor(Math.random() * n);
}

"use strict";
shuffle(questions);
var info = "Selecciona la respuesta correcta";

let timer = document.getElementById("timer");
let minutes = document.getElementById("minutes");
let startButton = document.getElementById("startButton");
let seconds = 60;
let roundNumber = 0;
let answerAmount = 4;
let score = 0;


let gamestart = function () {
  setRound();
  timer.innerHTML = seconds;
  let interval = setInterval(function () {
    timer.innerHTML = seconds;
    seconds -= 1;
    if (seconds < 0) {
      clearInterval(interval);
      finished.play();
      finishGame();
    }
  }, 1000);
};

function setRound() {
  roundNumber = getRandomIndex(questions.length);
  document.getElementById("answerBox").innerHTML = "";
  let selection = [];
  let questionsRef = [];
  var uniqueAnswersSet = new Set();

  for (let i = 0; i < questions.length; i++) {
    questionsRef.push(questions[i][1]);
  }

  questionsRef = Array.from(new Set(questionsRef));
  let correctAnswer = questions[roundNumber][1];
  selection.push(
    "<div class='answer good'>" +
      correctAnswer
  );
  questionsRef = questionsRef.filter((item) => item !== correctAnswer);
  shuffle(questionsRef);

  for (let i = 1; i < answerAmount; i++) {
    selection.push(
        "<div class='answer bad'>" +
          questionsRef[0] 
      );
    questionsRef.splice(0, 1);
  }
  document.getElementById("questionBox").innerHTML =
    "<img id='portrait' src='./assets/images/faces/" + questions[roundNumber][0] + "'>";
  shuffle(selection);
  selection.forEach((element) => {
    document.getElementById("answerBox").innerHTML += element;
  });
  makeButtonsClickable("answer");
}

function makeButtonsClickable(className) {
  var buttons = document.getElementsByClassName(className);
  for (let i = 0; i < buttons.length; i++) {
    buttons[i].onclick = function () {
      selectAnswer(this.textContent, this);
    };
  }
}

function selectAnswer(textContent, element) {
    let isCorrect = element.classList.contains("good");
    handleAnswerClick(isCorrect);
}
  

function handleAnswerClick(isCorrect) {
  if (isCorrect) {
    score++;
    right.play()
    // Reproducir sonido de respuesta correcta
  } else {
    wrong.play();
    // Reproducir sonido de respuesta incorrecta
  }

  // Comprobar si quedan preguntas
  if (questions.length > 1) {
    // Eliminar la pregunta actual
    questions.splice(roundNumber, 1);
    shuffle(questions);
    // Establecer la siguiente ronda
    setRound();
  } else {
    // Terminar el juego
    alert("Juego terminado. Tu puntuación es: " + score);
  }
}

Swal.fire({
    title: 'Empecemos el juego',
    icon: 'info',
    showCancelButton: false,
    confirmButtonText: 'OK'
  }).then((result) => {
    if (result.isConfirmed) {
      gamestart();
    }
  });

  function finishGame(){

    Swal.fire({
        title: `Tu puntuación es ${score}`,
        icon: 'info',
        confirmButtonText: 'Reiniciar'
      }).then(() => {
        location.reload();
      });
      
  }