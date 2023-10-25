document.addEventListener("DOMContentLoaded", function () {

let quiz;

// Define the Quiz constructor function
function Quiz(questions) {
  this.score = 0;
  this.questions = questions;
  this.questionIndex = 0;
}

// Add methods to the Quiz prototype
Quiz.prototype.getQuestionIndex = function() {
  return this.questions[this.questionIndex];
}

Quiz.prototype.guess = function(answer) {
  if (this.getQuestionIndex().isCorrectAnswer(answer)) {
    this.score++;
  }
  this.questionIndex++;
}

Quiz.prototype.isEnded = function() {
  return this.questionIndex === this.questions.length;
}

// Define the Question constructor function
function Question(text, choices, answer) {
  this.text = text;
  this.choices = choices;
  this.answer = answer;
}

// Add a method to the Question prototype to check if an answer is correct
Question.prototype.isCorrectAnswer = function(choice) {
  return this.answer === choice;
}

// Function to populate the quiz
function populate(quiz) {
  if (quiz.isEnded()) {
    showScores(quiz);
  } else {
    // Show the question
    const element = document.getElementById("question");
    element.innerHTML = quiz.getQuestionIndex().text;

    // Show answer options
    const choices = quiz.getQuestionIndex().choices;
    for (let i = 0; i < choices.length; i++) {
      const choiceElement = document.getElementById("choice" + i);
      choiceElement.innerHTML = choices[i];
      guess("btn" + i, choices[i]);
    }

    showProgress(quiz);
  }
};

// Function to handle a user's guess
function guess(id, guess) {
  const button = document.getElementById(id);
  button.onclick = function() {
    quiz.guess(guess);
    populate(quiz);
  }
};

// Function to show progress information
function showProgress(quiz) {
  const currentQuestionNumber = quiz.questionIndex + 1;
  const element = document.getElementById("progress");
  element.innerHTML = "Question " + currentQuestionNumber + " of " + quiz.questions.length;
};

// Function to display the final quiz scores
function showScores(quiz) {
  let gameOverHTML = "<h1>Results</h1>";
  gameOverHTML += "<h2 id='score'> Your score: " + quiz.score + "</h2";
  const element = document.getElementById("quiz");
  element.innerHTML = gameOverHTML;

  // Check the user's score and display a message
  if (quiz.score < 5) {
    // User scored less than 5/10, prompt to take the quiz again
    gameOverHTML += "<p id='retry'>You scored less than 5/10. Would you like to try again?</p>";
    gameOverHTML += "<button onclick='restartQuiz()'>Retry Quiz</button>";
    element.innerHTML = gameOverHTML;
  }
};


// Initialize the quiz when the DOM is fully loaded
  function initializeQuiz() {

// Define an array of Question objects for the quiz
const questions = [
  new Question("Which of the following is not a valid CSS selector?", [".my-class", "#my_id", "$invalid", "h1"], "$invalid"),
  new Question("What is the result of 5 + '5' in JavaScript?",[10,"'55'","5","Error"],"'55'"),
  new Question(" In JavaScript, what is the purpose of the 'typeof' operator?",["To determine the type of a value or variable","To check if a variable is defined","To create new variables","To assign a new type to a variable"],"To determine the type of a value or variable"),
  new Question ("Which of the following is not a programming language?",["Python","Java","C++","HTML"],"HTML"),
  new Question ("What does the CSS property 'display: none;' do?",["Makes an element transparent","Removes an element from the DOM","Hides an element and leaves a blank space","Centers an element on the page"],"Removes an element from the DOM"),
  new Question ("Choose the correct HTML element to define emphasized text?",["italic","i","em","br"],"em"),
  new Question("Which of the following is a version control system?", ["VSCode", "JavaScript", "Git", "Browser"], "Git"),
  new Question("Which is used to insert special character in JavaScript?", ["&", "/","%","-"], "/"),
  new Question("Which is one is a server-side JavaScript object?", ["File", "Function", "Data", "All"], "File"),
  new Question("What is the primary function of a constructor in JavaScript?", [" To remove properties from an object", "To create and initialize objects", "To add methods to an object", "To modify the prototype of an object"], "To create and initialize objects"),

];

// Create a new Quiz instance with the questions
quiz = new Quiz(questions);

// Display the quiz
populate(quiz);

}

// Call the initialization function
  initializeQuiz();
});


