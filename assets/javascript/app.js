// Define variables for timer for each question, the current question, the right questions, wrong questions, and the variable to define the timer div.

let counter = 20;
let currentQuestion = 0;
let score = 0;
let lost = 0;
let timer;

// Define the questions, choices, and correct answers.

let allQuestions = [
    {
        question: "What is the name of the protagonist of <strong>Lord of the Rings</strong>?",
        choices: ["Bilbo Baggins", "Aragorn", "Frodo Baggins", "Gimli"],
        correctAnswer: "Frodo Baggins",
        image: "./assets/images/bilboParty.gif"
    },

    {
        question: "Where is the Fellowship ultimately going?",
        choices: ["Gondor", "The Two Towers", "Rohan", "Mordor"],
        correctAnswer: "Mordor",
        image: "./assets/images/mordor.gif"
        
    },

    {
        question: "What is the name of Elrond's home?",
        choices: ["Rivendell", "Rohan", "Dunedain", "Gondor"],
        correctAnswer: "Rivendell",
        image: "./assets/images/rivendell.gif"
    },

    {
        question: "Fill in the blanks: 'The Eye of ____'.",
        choices: ["Gondor", "Sauron", "Saruman", "Elrond"],
        correctAnswer: "Sauron",
        image: "./assets/images/eyeOfSauron.gif"
    },

    {
        question: "What is Gollum's true name?",
        choices: ["Deagol", "Frodo", "Bilbo", "Smeagol"],
        correctAnswer: "Smeagol",
        image: "./assets/images/smeagol.gif"
    },

    {
        question: "True or false: the Elves appeared at Helm's Deep in the original Tolkein book.",
        choices: ["True", "False"],
        correctAnswer: "False",
        image: "./assets/images/helm'sDeep.gif"
    },

    {
        question: "Treebeard is an _____.",
        choices: ["Elf",  "Ent", "Enemy", "Enigma"],
        correctAnswer: "Ent",
        image: "./assets/images/treebeard.gif"
    },

    {
        question: "True or fale: Saruman has always been evil.",
        choices: ["True", "False"],
        correctAnswer: "False",
        image: "./assets/images/saruman.gif",
    },

    {
        question: "What precious item is the Fellowship carrying?",
        choices: ["A bracelet", "A ring", "A necklace", "A sword"],
        correctAnswer: "A ring",
        item: "./assets/images/ring.gif"
    },

    {
        question: "Who is in the Fellowship?",
        choices: ["Gandalf, Aragorn, Gimli, Bilbo, Merry, Pip, Elrond, Sean Bean, Sam", "Frodo, Gimli, Aragorn, Merry, Gandalf, Pip, Legolas, Sam, Boromir", "Saruman, Legolas, Frodo, Bilbo, Gandalf, Aragorn, Elrond, Sam, Merry", "Aragorn, Gandalf, Elrond, Frodo, Sam, Pip, Merry, Legolas, Sauron"],
        correctAnswer: "Frodo, Gimli, Aragorn, Merry, Gandalf, Pip, Legolas, Sam, Boromir",
        image: "./assets/images/fellowship.gif"
    },
]

function loadMessage (status) {
    let correctAnswer = allQuestions[currentQuestion].correctAnswer;

    if (status === "win") {
        $("#game").html(`<p class="load-image">Yay, you won!</p>`)
    } else {
        $("#game").html(`<p class="load-image">Oh, no, you lost!</p>
                        <p class="load-image">The correct answer is ${correctAnswer}.`);
    }
};

// Define a function to display the image after the question.



// Define a function to pass the player to the next question.

function nextQuestion () {

    const questionsEnd = (allQuestions.length - 1) === currentQuestion;
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
    loadMessage("lost");
    setTimeout(nextQuestion, 3 * 1000);
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

function loadQuestion() {
    
    clearInterval(timer);
    counter = 20;
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
        loadMessage("win");
        setTimeout(nextQuestion, 3 * 1000);
    } else {
        lost ++;
        loadMessage("lost");
        setTimeout(nextQuestion, 3 * 1000);
    }

 });

});

// Define a function to display the end results of the game.

function displayResult() {
    let result = `<p>You got ${score} question(s) correct!</p>
                <p>You got ${lost} question(s) incorrect!</p>
                <p>Total Questions: ${allQuestions.length}</p>
                <label class="btn btn-secondary" id="restart"><p>Restart Game</p></label>`
    $("#game").html(result);
}

// Define a restart function.

$(document).on("click", "#restart", function () {
    counter = 20;
    currentQuestion = 0;
    score = 0;
    lost = 0;
    timer = null;

    loadQuestion();
});

// Define a start function.

$("#start").click(function() {
    $("#start").remove();
    $("#start").html(counter);
    loadQuestion();
});