import { questionArray } from "./questions.js"

var timeEl = document.querySelector(".timer")

var timeRemaining = 10;

// Get certain global elements
document.getElementById("startButton").addEventListener("click",function() {
    playQuiz();
});
document.getElementById("highscore-link").addEventListener("click", function() {
    showHighScores();
});

// Function to start playing the quiz
function playQuiz() {
    document.getElementById("startButton").style.display = "none";


    startClock();
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
    for (var i = 0; i < randomQuestion.answers.length; i++) {
        var ans = document.createElement("h6");
        ans.textContent = randomQuestion.answers[i];
        ansEl.appendChild(ans);
    }

}

// Timer function
function startClock() {
    var countdown = setInterval(function() {
        if (timeRemaining > 1) {
            timeEl.textContent = `${timeRemaining} seconds remaing`;
            timeRemaining--;
        } else if (timeRemaining === 1) {
            timeEl.textContent = `${timeRemaining} seconds remaing`;
            timeRemaining--;
        } else {
            timeEl.textContent = "Time is up";
            clearInterval(countdown);
        }
    }, 1000);
}