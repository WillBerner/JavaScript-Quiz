import { questionArray } from "./questions.js"

let score = 0;
let timeRemaining = 0;
let correctIndex = null;

var timeEl = document.querySelector(".timer");
var scoreEl = document.querySelector(".score")
var descriptionEl = document.getElementById("description");
var choicesEl = document.getElementById("choices");
var quizEl = document.getElementById("quiz");

var countdown = null;


// Function to start playing the quiz
function playQuiz() {
    document.getElementById("startButton").style.display = "none";

    startClock(10);
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
    countdown = setInterval(function() {
        if (timeRemaining > 1) {
            updateTimer();
            timeRemaining--;
        } else if (timeRemaining === 1) {
            updateTimer();
            timeRemaining--;
        } else {
            timeEl.textContent = "Time is up";
            stopGame();
            clearInterval(countdown);
        }
    }, 1000);
}

function updateTimer(wrongAnswer = false) {
    if (timeRemaining === 0) {
        clearInterval(countdown);
        stopGame();
        return;
    }
    timeEl.textContent = `${timeRemaining} seconds remaing`;
    if (wrongAnswer) {
        timeEl.setAttribute("style", "color: red;");
    } else {
        timeEl.setAttribute("style", "color: black;");
    }
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
                changeScore(1);
                updateTimer();
                updateScore();
                showQuestion();
            } else {
                changeScore(-1);
                if (timeRemaining >= 10) {
                    timeRemaining = timeRemaining - 10;
                } else {
                    timeRemaining = 0;
                }
                updateTimer(true);
                updateScore();
            }
        }
    });

}

function updateScore() {
    scoreEl.textContent = score;
}

function stopGame() {

    // Clear html of choices div to display play again message
    choicesEl.innerHTML = "";

    // Display large end game message
    descriptionEl.textContent = "All Done!";

    // Create score message and play again button
    var thanksMessageEl = document.createElement("h3");
    thanksMessageEl.textContent = `Your final score was ${score}.`;

    var saveDivEl = document.createElement("div");
    saveDivEl.className = "saveGameDiv";

    var saveMessageEl = document.createElement("h4");
    saveMessageEl.textContent = "Enter Initials:";
    saveMessageEl.setAttribute("style", "margin-right: 10px;");

    var saveNameInputEl = document.createElement("input");
    saveNameInputEl.setAttribute("type", "text");
    saveNameInputEl.setAttribute("style", "margin-right: 10px;");

    var saveButtonEl = document.createElement("button");
    saveButtonEl.textContent = "Submit";


    
    saveDivEl.appendChild(saveMessageEl);
    saveDivEl.appendChild(saveNameInputEl);
    saveDivEl.appendChild(saveButtonEl);

    choicesEl.appendChild(thanksMessageEl);
    quizEl.appendChild(saveDivEl);
}

function changeScore(value) {
    score = score + value;
    if (score < 0) {
        score = 0;
    }
    updateScore();
}

function createSaveGame() {

}

setEventListeners();