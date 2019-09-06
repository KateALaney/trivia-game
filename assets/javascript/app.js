// Define variables for timer for each question, the current question, the right questions, wrong questions, and the variable to define the timer div.

let counter = 25;
let currentQuestion = 0;
let score = 0;
let wrong = 0;
let timer;

// Define the questions, choices, and correct answers.

let allQuestions = [
    {
        question: "What is the name of the protagonist of <strong>Lord of the Rings</strong>?",
        choices: ["Bilbo Baggins", "Aragorn", "Frodo Baggins", "Gimli"],
        answer: "Frodo Baggins"
    },

    {
        question: "Where is the Fellowship ultimately going?",
        choices: ["Gondor", "The Two Towers", "Rohan", "Mordor"],
        correctAnswer: "Mordor"
    },

    {
        question: "What is the name of Elrond's home?",
        choices: ["Rivendell", "Rohan", "Dunedain", "Gondor"],
        correctAnswer: "Rivendell"
    },

    {
        question: "Fill in the blanks: 'The Eye of ____'.",
        choices: ["Gondor", "Sauron", "Saruman", "Elrond"],
        correctAnswer: "Sauron"
    },

    {
        question: "What is the Gollum's true name?",
        choices: ["Deagol", "Frodo", "Bilbo", "Smeagol"],
        correctAnswer: "Smeagol"
    },

    {
        question: "True or false: the Elves appeared at Helm's Deep in the original Tolkein book.",
        choices: ["True", "False"],
        correctAnswer: "False"
    },

    {
        question: "Treebeard is an _____.",
        choices: ["Elf",  "Ent", "Enemy", "Enigma"],
        correctAnswer: "Ent"
    },
]

// Define a function to stop the counter at 0.

function timeOut() {
    clearInterval(timer);
}

// Define a time function to time the user's answer.

function timeLeft () {
    counter--;

    $("#timer").html(`<h2>Time Left: ${counter}</h2>`);

    if (counter === 0) {
        timeOut();
    }
}


// Define load function for questions and choices.

function loadQuestion () {
    
    counter = 25;
    timer = setInterval(timeLeft, 1000);

    let askQuestion = allQuestions[currentQuestion].question;
    let choices = allQuestions[currentQuestion].choices;
    let answer = allQuestions[currentQuestion].answer;

    $("#game").html(`<h2>${askQuestion}</h2>
                    ${loadChoices(choices)}`);
    $("#timer").html(`<h2>Time Left: ${counter}</h2>`);

        
}

function loadChoices(choices) {
    let result = "";
    for (let i = 0; i < choices.length; i++) {
        result += `<p class="choice" data-answer="${choices[i]}">${choices[i]}</p>`;
    }
    return result;
}

loadQuestion ();

$(document).ready(function(){

 
});