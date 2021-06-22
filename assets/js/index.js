var questionEl = document.querySelector(".question");
var timeEl = document.querySelector(".time")

var timeRemaining = 30;

// Timer function
var countdown = setInterval(function() {
    if (timeRemaining > 1) {
        timeEl.textContent = timeRemaining;
        timeRemaining--;
    } else if (timeRemaining === 1) {
        timeEl.textContent = timeRemaining;
        timeRemaining--;
    } else {
        timeEl.textContent = timeRemaining;
        clearInterval(countdown);
    }
}, 1000);

countdown();

setTimeout(function () {
    var nextQuestion = document.createElement('h1');
    nextQuestion.textContent = "This is also a question";
    questionEl.textContent = "";
    questionEl.appendChild(nextQuestion);

}, 5000);