var q = [
    {
        title: "Commonly used data types DO NOT include:",
        choices: ["strings", "booleans", "alerts", "numbers"],
        answer: "alerts"
    },
    {
        title: "The condition in an if / else statement is enclosed within ____.",
        choices: ["quotes", "curly brackets", "parentheses", "square brackets"],
        answer: "parentheses"
    },
    {
        title: "Inside which HTML element do we put the JavaScript?",
        choices: ["<javascript>", "<link>", "<js>", "<script>"],
        answer: "&lt;script&gt;"
    },
    {
        title: "How do you define a function?",
        choices: ["function = myFunction", "function myFunction()", "function.myFunction", "fun myFunction()"],
        answer: "function myFunction()"
    },
    {
        title: "How do you define a string?",
        choices: ["(string)", "string = myString", "'string'", "string()"],
        answer: "'string'"
    }
]
var timeEl = document.querySelector("#timer");
var timeLeft = 25;
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
            nextBtn.setAttribute("class", "btn btn-info btn-lg btn-block")
        } else {
            result.textContent = "Try Again!";
            answerCheck.append(result);
            timeLeft += -5;
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

function completed() {
    console.log("Quiz Complete!");
    quizContainer.setAttribute("class", "hide");
    yourScoreContainer.removeAttribute("class", "hide");
    document.querySelector("#inputs").removeAttribute("class", "hide");
    document.querySelector("#newButtons").setAttribute("class", "hide");
    score.innerHTML = timeLeft;
}

document.querySelector("#submitBtn").addEventListener("click", function () {
    console.log(playerName.value);
    console.log(timeLeft);
    localStorage.setItem("player", playerName.value);
    localStorage.setItem("score", timeLeft);
    var playerInitials = document.createElement("li");
    var playerScore = document.createTextNode("score");
    playerInitials.textContent = localStorage.getItem("player");
    playerScore.textContent = localStorage.getItem("score");
    highScoresEl.appendChild(playerInitials);
    playerInitials.appendChild(playerScore);
    playerName.value = "";
    document.querySelector("#inputs").setAttribute("class", "hide");
    document.querySelector("#newButtons").removeAttribute("class", "hide");
})

document.querySelector("#highScoreNav").addEventListener("click", function () {
    viewHighScores();
})

document.querySelector("#viewScoresBtn").addEventListener("click", function () {
    viewHighScores();
})

document.querySelector("#tryAgainBtn").addEventListener("click", function () {
    i = 0;
    timeLeft = 25;
    yourScoreContainer.setAttribute("class", "hide");
    HighScoreContainer.setAttribute("class", "hide");
    startBtn.removeAttribute("class", "hide");
    startBtn.setAttribute("class", "btn btn-info btn-lg btn-block");
    answers.innerHTML = "";
})

document.querySelector("#takeQuiz").addEventListener("click", function () {
    i = 0;
    timeLeft = 25;
    yourScoreContainer.setAttribute("class", "hide");
    HighScoreContainer.setAttribute("class", "hide");
    startBtn.removeAttribute("class", "hide");
    startBtn.setAttribute("class", "btn btn-info btn-lg btn-block");
    answers.innerHTML = "";
})

function viewHighScores() {
    HighScoreContainer.removeAttribute("class", "hide");
    yourScoreContainer.setAttribute("class", "hide");
    quizContainer.setAttribute("class", "hide");
    startBtn.setAttribute("class", "hide");
}


