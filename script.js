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
            answerCheck.append(result);
            nextBtn.removeAttribute("class", "hide");
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
    yourScoreContainer.removeAttribute("class", "hide")
    score.innerHTML = timeLeft;
}

document.querySelector("#submitBtn").addEventListener("click", function () {
    console.log(playerName.value);
    console.log(timeLeft);
    localStorage.setItem("player", playerName.value);
    localStorage.setItem("score", timeLeft);
    viewHighScores();
})

function viewHighScores() {
    HighScoreContainer.removeAttribute("class", "hide");
    var playerInitials = document.createElement("li");
    var playerScore = document.createTextNode("score");
    playerInitials.textContent = localStorage.getItem("player");
    playerScore.textContent = localStorage.getItem("score");
    highScoresEl.appendChild(playerInitials);
    playerInitials.appendChild(playerScore);
    playerName.value = "";
}


