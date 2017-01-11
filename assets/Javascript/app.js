/* JavaScript for Star Wars Trivia Game */

// Variable with arrays of questions for our Trivia Game.
var questions = [{
    question: "What planet was Luke Skywalker raised on?",
    choices: ["Coruscant", "Tatooine", "Scarif", "Hoth"],
    correctAnswer: 1
}, {
    question: "What was the name of Han Solo's spaceship?",
    choices: ["Death Rider", "Dark Saber", "X-Wing", "Millennium Falcon"],
    correctAnswer: 3
}, {
    question: "Who was the leader of the Empire?",
    choices: ["Darth Vader", "Governor Tarkin", "ST-7224", "The Emperor"],
    correctAnswer: 3
}, {
    question: "How many Death Stars were created and destroyed in Episode 4-6?",
    choices: ["One", "Two", "Three", "Four"],
    correctAnswer: 1
}, {
    question: "Which of the following planets is a huge city?",
    choices: ["Alderran", "Yavin IV", "Coruscant", "Nar Shadda"],
    correctAnswer: 2
}];

var currentQuestion = 0;
var correctAnswers = 0;
var quizOver = false;

$(document).ready(function () {

    // Display the first question
    displayCurrentQuestion();
    $(this).find(".quizMessage").hide();

    // On clicking next, display the next question
    $(this).find(".nextButton").on("click", function () {
        if (!quizOver) {

            value = $("input[type='radio']:checked").val();

            if (value == undefined) {
                $(document).find(".quizMessage").text("Please select an answer");
                $(document).find(".quizMessage").show();
            } else {
                // TODO: Remove any message - not sure if this is efficient to call this each time....
                $(document).find(".quizMessage").hide();

                if (value == questions[currentQuestion].correctAnswer) {
                    correctAnswers++;
                }

                currentQuestion++; // Since we have already displayed the first question on DOM ready
                if (currentQuestion < questions.length) {
                    displayCurrentQuestion();
                } else {
                    displayScore();
                    //                    $(document).find(".nextButton").toggle();
                    //                    $(document).find(".playAgainButton").toggle();
                    // Change the text in the next button to ask if user wants to play again
                    $(document).find(".nextButton").text("Play Again?");
                    quizOver = true;
                }
            }
        } else { // quiz is over and clicked the next button (which now displays 'Play Again?'
            quizOver = false;
            $(document).find(".nextButton").text("Next Question");
            resetQuiz();
            displayCurrentQuestion();
            hideScore();
        }
    });

});

// This displays the current question AND the choices
function displayCurrentQuestion() {

    var question = questions[currentQuestion].question;
    var questionClass = $(document).find(".triviacontainer > .question");
    var choiceList = $(document).find(".triviacontainer > .choiceList");
    var numChoices = questions[currentQuestion].choices.length;

    // Set the questionClass text to the current question
    $(questionClass).text(question);

    // Remove all current <li> elements (if any)
    $(choiceList).find("li").remove();

    var choice;
    for (i = 0; i < numChoices; i++) {
        choice = questions[currentQuestion].choices[i];
        $('<li><input type="radio" value=' + i + ' name="dynradio" />' + choice + '</li>').appendTo(choiceList);
    }
}

/* This function resets the quiz upon the button click. */
function resetQuiz() {
    currentQuestion = 0;
    correctAnswers = 0;
    hideScore();
}

/* This function displays the games score. */
function displayScore() {
    $(document).find(".triviacontainer > .result").text("You scored: " + correctAnswers + " out of: " + questions.length);
    $(document).find(".triviacontainer > .result").show();
}

/* This hides the games score until the game is completed. */
function hideScore() {
    $(document).find(".result").hide();
}