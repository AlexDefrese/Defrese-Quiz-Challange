const question = document.getElementById("question");
// creates array of answer choices
const choices = Array.from(document.getElementsByClassName("choice-text"));
const questionCounterText = document.getElementById("questionCounter");
const scoreText = document.getElementById("score");

// Define varibles
let currentQuestion = {};
let acceptingAnswers = false;
let score = 120;
let questionCounter = 0;
let availableQuestions = [];

// Creates array of questions
let questions = [
    {
        question: "What does HTML stand for?",
        choice1: "Home Tool Markup Language",
        choice2: "Hyperlinks and Text Markup Language",
        choice3: "Hyper Text Markup Language",
        choice4: "Hyper Text Makeup Language",
        answer: 3
    },
    {
        question: "What does CSS stand for?",
        choice1: "Computer Style Sheets",
        choice2: "Cascading Style Sheets",
        choice3: "Crazy Sliding Seals",
        choice4: "Can't Stand Styling",
        answer: 2
    },
    {
        question: "What is the correct HTML for referring to an external styling sheet?",
        choice1: "<link rel='stylesheet'",
        choice2: "<link relate='stylesheet'",
        choice3: "<link rel='go-to-stylesheet-plz'>",
        choice4: "What's a style sheet?",
        answer: 1
    },
    {
        question: "Inside which HTML element do we put the JavaScript?",
        choice1: "<link rel='script.js' href='./assets/script.js'>",
        choice2: "<js>",
        choice3: "<javascript>",
        choice4: "<script>",
        answer: 4
    },
    {
        question: "What is the correct HTML element for inserting a line break?",
        choice1: "<br>",
        choice2: "<break>",
        choice3: "<b>",
        choice4: "<ins-brk-plz>",
        answer: 1
    }
];

// create constants
const MAX_QUESTIONS = 5;

// starting the game, 'fat arrow syntax' provides more concise way to write functions
startGame = () => {
    questionCounter = 0;
    // score = 60;
    // shorthand for spreading one array into another array
    availableQuestions = [...questions]; 
    getNewQuestion();
    updateScore();
};
// // updates timer
updateScore =() => {
    console.log("hello");
    var scoreTimer = setInterval(function () {
        score--;
        if ( "selectedAnswer != selectedChoice", function (){
            score = (score - 20);
        })
        scoreText.innerHTML = score;
        if (score <= 0) {
            pleaseEnd ()
        };
    }, 1000);
}
// gets random question from array
getNewQuestion = () => {
// go to end of game if out of questions
    if (availableQuestions.length === 0 || questionCounter >= MAX_QUESTIONS) {
        // saves score
        localStorage.setItem('mostRecentScore', score);
        // redirects to end page
        return window.location.assign("./end.html");
    };
    questionCounter++;
    questionCounterText.innerText = questionCounter + "/" + MAX_QUESTIONS;
    // gets random question
    const questionIndex = Math.floor(Math.random() * availableQuestions.length);
    currentQuestion = availableQuestions[questionIndex];
    question.innerText = currentQuestion.question;
// adds choices
    choices.forEach( choice => {
        const number = choice.dataset['number'];
        choice.innerText = currentQuestion['choice' + number];
    })
    // gets rid of used question
    availableQuestions.splice(questionIndex, 1);

    acceptingAnswers = true;
};
// allows choices to be selected/check for correct answer
choices.forEach(choice => {
    choice.addEventListener("click", e => {
        // prevents answers before question is set
        if(!acceptingAnswers) return;

        acceptingAnswers = false;
        const selectedChoice = e.target;
        const selectedAnswer = selectedChoice.dataset["number"];
// check for correct answer
// ternary operator
        const classToApply = selectedAnswer == currentQuestion.answer ? 'correct' : 'incorrect';


        selectedChoice.parentElement.classList.add(classToApply);
// set delay between color switch /next question
        setTimeout ( () => {
           selectedChoice.parentElement.classList.remove(classToApply);
           getNewQuestion();
         }, 1000); 
    });
});

function pleaseEnd (){
    // score = 0;
    // scoreText.innerHTML = score;
    localStorage.setItem ("mostRecentScore", score);
    // setTimeout (function () {
        console.log ('hellothere');
        window.location.replace("./end.html");
    // }, 1000);
    clearInterval(scoreTimer);
};

startGame();