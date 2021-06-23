import { questionArray } from "./questions.js"

let score = 0;
let timeRemaining = 0;

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

    var correctIndex = randomQuestion.correctAnsIndex;
    setUpChoices(correctIndex);

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
}

function setUpChoices(correctAnsIndex) {
    document.getElementById("choiceDescription").addEventListener("click", function(event) {
        console.log(parseInt(event.target.getAttribute('index')));
        console.log(correctAnsIndex);
        if (parseInt(event.target.getAttribute('index')) === correctAnsIndex) {
            score++;
        } else {
            score--;
            timeRemaining = timeRemaining - 10;
            updateTimer();
        }
    });
}

setEventListeners();