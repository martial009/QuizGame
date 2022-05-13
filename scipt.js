'use strict';
const startBtn = document.querySelector(`.startBtn`);
const highScoreBtn = document.querySelector(`.highScoreBtn`);
const aboutBtn = document.querySelector(`.aboutBtn`);
const cancelBtn = document.querySelector(`.cancel`);
const cancelBtnTwo = document.querySelector(`.cancelTwo`);
const aboutPage = document.querySelector(`.aboutContainer`);
const blackBg = document.querySelector('.black-bg');
const greenBg = document.querySelector('.green-bg');
const questionPage = document.querySelector('.questionPage');
const splashScreen = document.querySelector('.splash-screen');
const highScoreContainer = document.querySelector('.highScore-container');
const timerDisplay = document.querySelector('.timerReader');
const loosePage = document.querySelector('.loosePage');
const walkAwayBtn = document.querySelector('.walkAway');
const tellAnswerBtn = document.querySelector('.tellAnswerBtn');
const yesBtn = document.querySelector('.yes-btn');
const noBtn = document.querySelector('.no-btn');
const areYouSure = document.querySelector('.areYouSure');
const tellAnswer = document.querySelector('.tellAnswer');
const unseenBg = document.querySelector('.unseen-bg');
const amount = document.querySelector('.amount-earned');
const cashOutBtn = document.querySelector('.cashOut');

let questionAsked = document.querySelector(".askedQuestion");
const opt1 = document.querySelector('.opt--1');
const opt2 = document.querySelector('.opt--2');
const opt3 = document.querySelector('.opt--3');
const opt4 = document.querySelector('.opt--4');
const opts = document.querySelectorAll('.opts');

const outBtn = document.querySelector('.walkout-btn');

// About Game
aboutBtn.addEventListener('click', function (e) {
  e.preventDefault;
  aboutPage.classList.remove('hidden');
  blackBg.classList.remove('hidden');
});
cancelBtn.addEventListener('click', function (e) {
  e.preventDefault;
  aboutPage.classList.add('hidden');
  blackBg.classList.add('hidden');
  highScoreContainer.classList.add('hidden');
});



// Heigh Score
highScoreBtn.addEventListener('click', function (e) {
  e.preventDefault;
  highScoreContainer.classList.remove('hidden');
  blackBg.classList.remove('hidden');
});

cancelBtnTwo.addEventListener('click', function (e) {
  e.preventDefault;
  blackBg.classList.add('hidden');
  highScoreContainer.classList.add('hidden');
});



// MAIN GAME


//TIMER
let timerld;
let timer = 25;
let warning = 4;
let currentTimer = timer;
timerld = setInterval(countdown, 1000);
clearInterval(timerld);


function countdown() {
  document.querySelector(".timerReader").textContent = timer;
  timer--;
  if (timer > warning) {
    document.querySelector(".timer").style.backgroundColor = "transparent";
    document.querySelector(".timerReader").classList.remove('timerWarning');
  }
  
  if (timer === warning) {
    document.querySelector(".timer").style.backgroundColor = " red";
    document.querySelector(".timerReader").classList.add('timerWarning');
  }

  if (timer == -1) {
    clearInterval(timerld);
    blackBg.classList.remove('hidden');
    loosePage.classList.remove('hidden');
    document.querySelector('.total-amount-earned').textContent = `${scorePoint}`;
  }
}


// Questions And Answer..

let quiz = [
  {
    question: "What is the full meaning of js? ",
    answer: ["JavaScript", "Jack and Sarah", "Java Scripture", "Java Speak"],
    correct: "JavaScript",
  },
  {
    question: "Who is the first Avenger? ",
    answer: ["Iron Man", "Captain America", "Thor", "Hulk"],
    correct: "Captain America",
  },
  {
    question: "Which of the following countries is not an Africa? ",
    answer: ["Nigeria", "cameroon", "England", "Ghana"],
    correct: "England",
  },
  {
    question: "CSS is mainly use for? ",
    answer: ["Mark Up", "Adding functions", "Styling", "Write Up"],
    correct: "Styling",
  },
  {
    question: "Which is the following is not an Europian Country? ",
    answer: ["Brazil", "Germany", "Spain", "Italy"],
    correct: "Brazil",
  },
];

let currentQuestion = Math.trunc(Math.random() * quiz.length);
startBtn.addEventListener('click', function (e) {
  e.preventDefault;
  questionPage.classList.remove('hidden');
  splashScreen.classList.add('hidden');
  timer = 25;
  timerld = setInterval(countdown, 1000);
  currentQuestion = Math.trunc(Math.random() * quiz.length);
  loadquiz();
  tellAnswerBtn.classList.remove('hidden');
  amount.textContent = 0;
  scorePoint = 0;
});

function loadquiz() {
  let currentQuizData = quiz[currentQuestion];
  questionAsked.textContent = currentQuizData.question;
  opt1.textContent = currentQuizData.answer[0];
  opt2.textContent = currentQuizData.answer[1];
  opt3.textContent = currentQuizData.answer[2];
  opt4.textContent = currentQuizData.answer[3];
  document.querySelector('.tellAnswer-ans').textContent = quiz[currentQuestion].correct;
}
loadquiz();
let scorePoint;
let currentScore;
let highScore = 0;
scorePoint = 0.00;
amount.textContent = `${scorePoint}`;

for (let i = 0; i < opts.length; i++) {
  opts[i].addEventListener('click', function(){
  opts[i].style.backgroundColor = "yellow";
  unseenBg.classList.remove('hidden');
    clearInterval(timerld);
    setTimeout( function () {
      if (opts[i].textContent === quiz[currentQuestion].correct) {
        opts[i].style.backgroundColor = "green";
        opts[i].style.color = "white";
        opts[i].classList.add('correct-answer');
        scorePoint = scorePoint + 5.00;
        amount.textContent = `${scorePoint}`;
        currentScore = scorePoint;
        if (currentScore >= highScore) {
          highScore = currentScore;
          document.querySelector('.highScore').textContent = highScore;
        }
        if (scorePoint === 100) {
          document.querySelector(`.winner`).classList.remove('hidden');
          greenBg.classList.remove('hidden');
          clearInterval(timerld);
        }
      }
      if(opts[i].textContent === quiz[currentQuestion].correct){
        setTimeout(function() {
          currentQuestion = Math.trunc(Math.random() * quiz.length);
          loadquiz();
          opts[i].style.backgroundColor = "white";
          opts[i].style.color = "black";
          opts[i].classList.remove('correct-answer');
          timer = 25;
          timerld = setInterval(countdown, 1000);
          opts[i].style.border = 'none';
          unseenBg.classList.add('hidden');
        }, 3000);
      }
      else {
        opts[i].style.backgroundColor = "red";
        opts[i].style.color = "white";
        blackBg.classList.remove('hidden');
        loosePage.classList.remove('hidden');
        unseenBg.classList.add('hidden');
        document.querySelector('.total-amount-earned').textContent = `${scorePoint}`;
      }

      if (opts[i].textContent !== quiz[currentQuestion].correct) {
        setTimeout(function() {
          opts[i].style.backgroundColor = "white";
          opts[i].style.color = "black";
        }, 3000);
      }
      
    }, 3000);

   
  });
}



tellAnswerBtn.addEventListener('click', function(){
  tellAnswer.classList.toggle('hidden');
  tellAnswerBtn.classList.add('hidden');
  setTimeout(function() {
    tellAnswer.classList.toggle('hidden');
}, 2000);
});

// Game Over
outBtn.addEventListener('click', function(e) {
  e.preventDefault;
  blackBg.classList.add('hidden');
  splashScreen.classList.remove('hidden');
  questionPage.classList.add('hidden');
  loosePage.classList.add('hidden');
});


// Walk away
walkAwayBtn.addEventListener('click', function(){
  areYouSure.classList.remove('hidden');
  blackBg.classList.remove('hidden');
  clearInterval(timerld);
});
yesBtn.addEventListener('click', function(){
  areYouSure.classList.add('hidden');
  blackBg.classList.add('hidden');
  questionPage.classList.add('hidden');
  splashScreen.classList.remove('hidden');
  timer = 25;
});


noBtn.addEventListener('click', function(){
  areYouSure.classList.add('hidden');
  blackBg.classList.add('hidden');
  timerld = setInterval(countdown, 1000);
});

cashOutBtn.addEventListener('click', function(){
  greenBg.classList.add('hidden');
  questionPage.classList.add('hidden');
  document.querySelector('.winner').classList.add('hidden');
  splashScreen.classList.remove('hidden');
  timer = 25;
});

// console.log();