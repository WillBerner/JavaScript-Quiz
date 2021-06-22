var questionEl = document.querySelector(".question");
var timeEl = document.querySelector(".timer")

var timeRemaining = 10;

// Timer function
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




setTimeout(function () {
    var nextQuestion = document.createElement('h1');
    nextQuestion.textContent = "This is also a question";
    questionEl.textContent = "";
    questionEl.appendChild(nextQuestion);

}, 5000);