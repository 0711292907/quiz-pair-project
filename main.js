// code 
function Quiz(questions) {
  this.score = 0;
  this.questions = questions;
  this.questionIndex = 0;
}

Quiz.prototype.getQuestionIndex = function() {
  return this.questions[this.questionIndex];
}

Quiz.prototype.guess = function(answer) {
  if(this.getQuestionIndex().isCorrectAnswer(answer)) {
      this.score++;
  }

  this.questionIndex++;
}

Quiz.prototype.isEnded = function() {
  return this.questionIndex === this.questions.length;
}


function Question(text, choices, answer) {
  this.text = text;
  this.choices = choices;
  this.answer = answer;
}

Question.prototype.isCorrectAnswer = function(choice) {
  return this.answer === choice;
}


function populate() {
  if(quiz.isEnded()) {
      showScores();
  }
  else {
      // show question
      var element = document.getElementById("question");
      element.innerHTML = quiz.getQuestionIndex().text;

      // show options
      var choices = quiz.getQuestionIndex().choices;
      for(var i = 0; i < choices.length; i++) {
          var element = document.getElementById("choice" + i);
          element.innerHTML = choices[i];
          guess("btn" + i, choices[i]);
      }

      showProgress();
  }
};

function guess(id, guess) {
  var button = document.getElementById(id);
  button.onclick = function() {
      quiz.guess(guess);
      populate();
  }
};


function showProgress() {
  var currentQuestionNumber = quiz.questionIndex + 1;
  var element = document.getElementById("progress");
  element.innerHTML = "Question " + currentQuestionNumber + " of " + quiz.questions.length;
};

function showScores() {
  var gameOverHTML = "<h1>Result</h1>";
  gameOverHTML += "<h2 id='score'> Your scores: " + quiz.score + "</h2>";
  var element = document.getElementById("quiz");
  element.innerHTML = gameOverHTML;
};

// create questions here
var questions = [
  new Question("Which of the following is not a valid CSS selector?", [".my-class", "#my_id","$invalid", "h1"], "$invalid"),
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

// create quiz
var quiz = new Quiz(questions);

// display quiz
populate();
 