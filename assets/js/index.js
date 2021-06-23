import { questionArray } from "./questions.js"

let score = 0;
let timeRemaining = 0;
let correctIndex = null;

var timeEl = document.querySelector(".timer")

// Function to start playing the quiz
function playQuiz() {
    document.getElementById("startButton").style.display = "none";

    startClock(75);
    showQuestion();
}

// Function called when View Highscores is clicked
function showHighScores() {
}

// Show a question on the screen
function showQuestion() { 

    // Get a random question from an imported array
    var randomQuestion = questionArray[Math.floor(Math.random() * questionArray.length)];
    
    // Show that random question on screen
    var questionEl = document.getElementById("description");
    questionEl.textContent = randomQuestion.question;

    // Add answers based on the question to the DOM
    var ansEl = document.getElementById("choiceDescription");
    ansEl.textContent = "";

    randomQuestion.answers.forEach((answer, index) => {
        var ans = document.createElement("button");
        ans.textContent = ((index + 1) + ": " + answer);
        ans.setAttribute("style", "display: block; height: 40px;")
        ans.setAttribute("index", index);
        ansEl.appendChild(ans);
    })

    correctIndex = randomQuestion.correctAnsIndex;

}

// Timer function
function startClock(duractionInSeconds) {

timeRemaining = duractionInSeconds;
    var countdown = setInterval(function() {
        if (timeRemaining > 1) {
            updateTimer();
            timeRemaining--;
        } else if (timeRemaining === 1) {
            updateTimer();
            timeRemaining--;
        } else {
            timeEl.textContent = "Time is up";
            clearInterval(countdown);
        }
    }, 1000);
}

function updateTimer() {
    timeEl.textContent = `${timeRemaining} seconds remaing`;
}

// Sets up event listeners
function setEventListeners() {
    // Get certain global elements
    document.getElementById("startButton").addEventListener("click",function() {
        playQuiz();
    });
    document.getElementById("highscore-link").addEventListener("click", function() {
        showHighScores();
    });
    document.getElementById("choiceDescription").addEventListener("click", function(event) {
        var element = event.target;

        if (element.matches("button")) {
            if (parseInt(element.getAttribute('index')) === correctIndex) {
                score++;
                showQuestion();
            } else {
                score--;
                if (timeRemaining >= 10) {
                    timeRemaining = timeRemaining - 10;
                } else {
                    timeRemaining = 0;
                }
                updateTimer();
            }
        }
    });

}

setEventListeners();