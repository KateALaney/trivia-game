// Define variables for timer for each question, the current question, the right questions, wrong questions, and the variable to define the timer div.

let counter = 5;
let currentQuestion = 0;
let score = 0;
let lost = 0;
let timer;

// Define the questions, choices, and correct answers.

let allQuestions = [
    {
        question: "What is the name of the protagonist of <strong>Lord of the Rings</strong>?",
        choices: ["Bilbo Baggins", "Aragorn", "Frodo Baggins", "Gimli"],
        correctAnswer: "Frodo Baggins"
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
        question: "What is Gollum's true name?",
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

// Define a function to pass the player to the next question.

function nextQuestion () {

    let questionsEnd = (allQuestions.length - 1) === currentQuestion;
    if (questionsEnd) {
        displayResult();
    } else {
        currentQuestion++;
        loadQuestion();
    }
    
}

// Define a function to stop the counter at 0.

function timeOut() {
    clearInterval(timer);

    lost++;

    nextQuestion();
}

// Define a time function to time the player's answer.

function timeLeft () {
    counter--;

    $("#timer").html(`<h2>Time Left: ${counter}</h2>`);

    if (counter === 0) {
        timeOut();
    }
}


// Define load function for questions.

function loadQuestion () {
    
    clearInterval(timer);
    counter = 5;
    timer = setInterval(timeLeft, 1000);

    let askQuestion = allQuestions[currentQuestion].question;
    let choices = allQuestions[currentQuestion].choices;

    $("#game").html(`<h2>${askQuestion}</h2>
                    ${loadChoices(choices)}`);
    $("#timer").html(`<h2>Time Left: ${counter}</h2>`);

}

// Define load function for choices.

function loadChoices(choices) {
    let result = "";
    for (let i = 0; i < choices.length; i++) {
        result += `<p class="choice" data-answer="${choices[i]}">${choices[i]}</p>`;
    }
    return result;
}

$(document).ready(function(){

// Define a function for when the answer is selected to move on to the next question.

 $(document).on("click", ".choice", function () {
     let chosenAnswer = $(this).attr("data-answer");
     let correctAnswer = allQuestions[currentQuestion].correctAnswer;

    if (correctAnswer === chosenAnswer) {
        score ++;
        nextQuestion();
    } else {
        lost ++;
        nextQuestion();
    }

 });

});

function displayResult() {
    let result = `<p>You got ${score} question(s) correct!</p>
                <p>You got ${lost} question(s) incorrect!</p>
                <p>Total Questions: ${allQuestions.length}</p>
                <button>Reset Game</button>`
    $("#game").html(result);
}

loadQuestion ();