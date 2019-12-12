//Delcare global Variables

var timeEl = document.querySelector("#timer");
var timeLeft = 75;
var ask = document.querySelector("#question");
var answers = document.querySelector("#answers");
var startBtn = document.querySelector("#startButton");
var nextBtn = document.querySelector("#nextBtn");
var result = document.createElement("h3");
var answerCheck = document.querySelector("#result");
var i = 0;
var quizContainer = document.querySelector("#quiz");
var yourScoreContainer = document.querySelector("#yourScore")
var score = document.querySelector("#finalScore");
var playerName = document.querySelector("#player");
var HighScoreContainer = document.querySelector("#highScores");
var highScoresEl = document.querySelector("#scoreList");
var highScoreList = [];
//Start Quiz on button click

startBtn.addEventListener("click", startQuiz)

function startQuiz() {
    console.log("Quiz started")
    quizContainer.removeAttribute("class", "hide");
    startTimer();
    askQuestion();
    startBtn.setAttribute("class", "hide");
}

function askQuestion() {
    console.log("question asked");
    ask.textContent = q[i].title;
    nextBtn.setAttribute("class", "hide");
    showChoices();
    checkAnswer();
    nextBtn.addEventListener("click", nextQuestion);
}

function showChoices() {
    console.log("choices shown");
    for (c = 0; c < q[i].choices.length; c++) {
        var choice = document.createElement("button")
        choice.textContent = q[i].choices[c];
        choice.setAttribute("class", "btn btn-secondary");
        answers.appendChild(choice);
    }
}

function checkAnswer() {
    answers.addEventListener("click", grade)
}

function grade() {
    console.log("answer selected")
    if (event.target.matches("button")) {
        var ans = event.target.innerHTML;
        console.log(ans);
        if (ans === q[i].answer) {
            result.textContent = "Good Job!";
            result.setAttribute("class", "pt-2");
            answerCheck.append(result);
            nextBtn.removeAttribute("class", "hide");
            nextBtn.setAttribute("class", "btn btn-danger btn-lg btn-block")
        } else {
            result.textContent = "Try Again!";
            answerCheck.append(result);
            timeLeft += -15;
        }
    }
}

function nextQuestion() {
    console.log("next question");
    answers.innerHTML = "";
    result.innerHTML = "";
    i++;
    console.log(i);
    if (i === q.length) {
        question.innerHTML = "";
        nextBtn.setAttribute("class", "hide");
        completed();
    } else {
        askQuestion(i);
    }
}

function startTimer() {
    var timerInterval = setInterval(function () {
        timeLeft--;
        timeEl.textContent = " " + timeLeft;
        if (timeLeft <= 0) {
            timeEl.textContent = " " + 0;
            timeLeft = 0;
            clearInterval(timerInterval);
            completed();
        }
        if (i === q.length) {
            clearInterval(timerInterval);
        }
    }, 1000);
}

//Present player with score after quiz is complete

function completed() {
    console.log("Quiz Complete!");
    quizContainer.setAttribute("class", "hide");
    yourScoreContainer.removeAttribute("class", "hide");
    document.querySelector("#inputs").removeAttribute("class", "hide");
    document.querySelector("#newButtons").setAttribute("class", "hide");
    score.innerHTML = timeLeft;
}

//Take player input and save to local storage, then render it into high score list

document.querySelector("#submitBtn").addEventListener("click", function () {
    console.log(playerName.value);
    console.log(timeLeft);
    highScoresEl.innerHTML = "";
    highScoreList.push({ player: playerName.value, score: timeLeft });
    localStorage.setItem("High Scores", JSON.stringify(highScoreList));
    var storedScores = JSON.parse(localStorage.getItem("High Scores"));
    highScoreList = storedScores;
    for (var i = 0; i < highScoreList.length; i++) {
        var playerLi = highScoreList[i].player + " - " + highScoreList[i].score;
        var li = document.createElement("li");
        li.textContent = playerLi;
        li.setAttribute("data-index", i);
        highScoresEl.appendChild(li);
    }
    playerName.value = "";
    console.log(highScoreList);
    console.log(li);
    document.querySelector("#inputs").setAttribute("class", "hide");
    document.querySelector("#newButtons").removeAttribute("class", "hide");
})

//Give player options to retake quiz or view high scores

document.querySelector("#highScoreNav").addEventListener("click", function () {
    viewHighScores();
})

document.querySelector("#viewScoresBtn").addEventListener("click", function () {
    viewHighScores();
})

document.querySelector("#tryAgainBtn").addEventListener("click", retakeQuiz);

document.querySelector("#takeQuiz").addEventListener("click", retakeQuiz);


function retakeQuiz() {
    i = 0;
    timeLeft = 75;
    yourScoreContainer.setAttribute("class", "hide");
    HighScoreContainer.setAttribute("class", "hide");
    startBtn.removeAttribute("class", "hide");
    startBtn.setAttribute("class", "btn btn-danger btn-lg btn-block");
    answers.innerHTML = "";
}

function viewHighScores() {
    HighScoreContainer.removeAttribute("class", "hide");
    yourScoreContainer.setAttribute("class", "hide");
    quizContainer.setAttribute("class", "hide");
    startBtn.setAttribute("class", "hide");
}


