const questions = [
    {
        question: "Which is the largest bird in the world?", 
        answers: [
            {text: "Cassowary", correct: false},
            {text: "Emu", correct: false},
            {text: "Ostrich", correct: true},
            {text: "Penguin", correct: false},
        ]
    },
    {
        question: "Which is the largest continet by area in the world?", 
        answers: [
            {text: "Africa", correct: false},
            {text: "Europe", correct: false},
            {text: "Asia", correct: true},
            {text: "Antarctica", correct: false},
        ]
    },
    {
        question: "Which is the largest desert in the world?", 
        answers: [
            {text: "Antarctic Desert", correct: true},
            {text: "Arctic Desert", correct: false},
            {text: "Saharan Desert", correct: false},
            {text: "Arabian Desert", correct: false},
        ]
    },
    {
        question: "Which is the largest ocean in the world?",
        answers: [
            {text:"Indian Ocean", correct: false},
            {text: "Southern Ocean", correct: false},
            {text: "Atlantic Ocean", correct: false},
            {text: "Pacific Ocean", correct: true},
        ]
    },
    {
        question: "Which is the tallest building in the world?",
        answers: [
            {text:"Shanghai Tower", correct: false},
            {text: "Burj Khalifa", correct: true},
            {text: "Makkah Clock Tower", correct: false},
            {text: "Lotte World Tower", correct: false},
        ]
    }  
];

const questionElement = document.getElementById("question");
const answerButtons = document.getElementById("answer-buttons");
const nextButton = document.getElementById("next-btn");


let currentQuestionIndex = 0;
let score = 0;

function startQuiz() {
    currentQuestionIndex = 0;
    score = 0;
    nextButton.innerHTML = "Next";
    showQuestion();    
}

function showQuestion() 
{
    resetState();
    let currentQuestion = questions[currentQuestionIndex];
    let questionNo = currentQuestionIndex + 1;
    questionElement.innerHTML = questionNo + " ." + currentQuestion.question;

    currentQuestion.answers.forEach(answer=>{
        const button = document.createElement("button");
        button.innerHTML = answer.text;
        button.classList.add("btn");
        answerButtons.appendChild(button);
        if(answer.correct)
        {
            button.dataset.correct = answer.correct; // Store "correct(true/false)" info in a custom data attribute
        }
        button.addEventListener("click", selectAnswer);
    });
}

function resetState()
{
    nextButton.style.display = "none";

    while(answerButtons.firstChild)
    {
        answerButtons.removeChild(answerButtons.firstChild);
    }
}

function selectAnswer(e) //When an event (like a button click) happens, the browser automatically passes an event object (e) to the function. 
{
    const selectedBtn = e.target; //e.target refers to the specific element that was clicked. 
    const inCorrect = selectedBtn.dataset.correct === "true";
    if(inCorrect)
    {
        selectedBtn.classList.add("correct");
        score++;
    }
    else 
    {
        selectedBtn.classList.add("incorrect");
    }

    Array.from(answerButtons.children).forEach(button =>{
        if(button.dataset.correct === "true")
        {
            button.classList.add("correct");
        }
        button.disabled = true;
    });

    nextButton.style.display = "block";
}


function showScore() 
{
    resetState();
    questionElement.innerHTML = `You scored ${score} out of ${questions.length}!`;
    nextButton.innerHTML = "Start Again";
    nextButton.style.display = "block";
}

function handleNextButton()
{
    currentQuestionIndex++;
    if(currentQuestionIndex < questions.length)
    {
        showQuestion();
    }
    else
    {
        showScore();
    }
}


nextButton.addEventListener("click", ()=>
{
    if(currentQuestionIndex < questions.length)
    {
        handleNextButton();
    }
    else {
        startQuiz();
    }
});



startQuiz();

