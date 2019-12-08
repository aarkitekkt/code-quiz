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
var timeLeft = document.querySelector("#timer");
var ask = document.querySelector("#question");
var answers = document.querySelector("#answers");
var startBtn = document.querySelector("#startButton");
var nextBtn = document.querySelector("#nextBtn");
var result = document.createElement("h3");
var answerCheck = document.querySelector("#result");
var i = 0;



startBtn.addEventListener("click", startQuiz)

function startQuiz() {
    console.log("Quiz started")
    // Add class to hide once clicked
    // Add code to start Timer function
    askQuestion(i);
}

function askQuestion(x) {
    console.log("question asked")
    ask.textContent = q[x].title;
    console.log("choices shown")
    for (var c = 0; c < q[x].choices.length; c++) {
        var choice = document.createElement("button")
        choice.textContent = q[x].choices[c];
        answers.appendChild(choice);
    }
    // }
    answers.addEventListener("click", function (event) {
        console.log("answer selected")
        if (event.target.matches("button")) {
            var ans = event.target.innerHTML;
            console.log(ans);
            if (ans === q[x].answer) {
                result.textContent = "Good Job!";
                answerCheck.append(result);
            } else {
                result.textContent = "Try Again!";
                answerCheck.append(result);
            }
        }
    })
    nextBtn.addEventListener("click", function () {
        answers.innerHTML = "";
        result.innerHTML = "";
        x++;
        console.log(x);
        if (x === q.length) {
            alert("complete!")
            return
        } else {
            askQuestion(x);
        }
    })
}



function setTimer() {

}