const questions = [
    {
        question: "If A is taller than B, and B is taller than C, who is the shortest?",
        options: ["A", "B", "C", "Cannot determine"],
        correct: 2
    },
    {
        question: "What comes next in the series: 2, 4, 8, 16, __?",
        options: ["24", "32", "30", "28"],
        correct: 1
    },
    {
        question: "If all flowers are plants, and some plants are trees, then:",
        options: ["All flowers are trees", "Some flowers are trees", "No flowers are trees", "Cannot determine"],
        correct: 3
    },
    {
        question: "Which word does NOT belong? Apple, Orange, Potato, Banana",
        options: ["Apple", "Orange", "Potato", "Banana"],
        correct: 2
    },
    {
        question: "Complete the pattern: 1, 3, 6, 10, __",
        options: ["13", "14", "15", "16"],
        correct: 2
    },
    {
        question: "If today is Monday, what day will it be after 100 days?",
        options: ["Monday", "Tuesday", "Wednesday", "Thursday"],
        correct: 0
    },
    {
        question: "What is the next letter in the series: A, C, E, G, __?",
        options: ["H", "I", "J", "K"],
        correct: 1
    },
    {
        question: "If RED is coded as 27, then BLUE is coded as:",
        options: ["37", "38", "39", "40"],
        correct: 1
    },
    {
        question: "Which number does not belong? 2, 4, 8, 14, 32",
        options: ["2", "4", "14", "32"],
        correct: 2
    },
    {
        question: "If South becomes North, East becomes West, then Northeast becomes:",
        options: ["Southwest", "Southeast", "Northwest", "None of these"],
        correct: 0
    },
    {
        question: "Complete: 25, 36, 49, __",
        options: ["64", "71", "81", "100"],
        correct: 0
    },
    {
        question: "If PALM is MQBN, then TASK is:",
        options: ["UBTL", "UBTK", "UBSL", "VBTK"],
        correct: 2
    },
    {
        question: "Which shape comes next? Circle, Triangle, Square, Circle, Triangle, __",
        options: ["Circle", "Triangle", "Square", "Pentagon"],
        correct: 2
    },
    {
        question: "If 5 cats catch 5 mice in 5 minutes, how many cats catch 100 mice in 100 minutes?",
        options: ["5", "50", "100", "500"],
        correct: 0
    },
    {
        question: "What is the missing number: 7, 12, 19, 28, __",
        options: ["35", "39", "41", "45"],
        correct: 2
    },
    {
        question: "If ROSE = 1234 and THORN = 56278, then STONE = ?",
        options: ["35274", "35284", "35674", "35684"],
        correct: 0
    },
    {
        question: "Which word is the odd one out? Run, Walk, Jump, Chair, Skip",
        options: ["Run", "Walk", "Chair", "Skip"],
        correct: 2
    },
    {
        question: "If X + Y = Z and X - Y = 5, and Z = 11, then X = ?",
        options: ["6", "7", "8", "9"],
        correct: 2
    },
    {
        question: "Complete the series: 2, 6, 12, 20, __",
        options: ["28", "30", "32", "35"],
        correct: 1
    },
    {
        question: "If all Xs are Ys, and no Ys are Zs, then:",
        options: ["All Xs are Zs", "No Xs are Zs", "Some Xs are Zs", "Cannot determine"],
        correct: 1
    }
];

let currentQuestion = 0;
let score = 0;
let timeLeft = 30;
let timer;

function loadQuestion() {
    const question = questions[currentQuestion];
    document.getElementById('question').textContent = question.question;
    document.getElementById('question-number').textContent = `Question ${currentQuestion + 1}/20`;
    
    const options = document.getElementsByClassName('option');
    for(let i = 0; i < options.length; i++) {
        options[i].textContent = question.options[i];
        options[i].disabled = false;
    }
    
    document.getElementById('next-btn').style.display = 'none';
    startTimer();
}

function startTimer() {
    timeLeft = 30;
    clearInterval(timer);
    timer = setInterval(() => {
        timeLeft--;
        document.getElementById('timer').textContent = `Time: ${timeLeft}s`;
        if(timeLeft <= 0) {
            clearInterval(timer);
            handleTimeout();
        }
    }, 1000);
}

function handleTimeout() {
    const options = document.getElementsByClassName('option');
    for(let i = 0; i < options.length; i++) {
        options[i].disabled = true;
    }
    document.getElementById('next-btn').style.display = 'block';
}

function checkAnswer(optionIndex) {
    clearInterval(timer);
    const options = document.getElementsByClassName('option');
    for(let i = 0; i < options.length; i++) {
        options[i].disabled = true;
    }
    
    if(optionIndex === questions[currentQuestion].correct) {
        score++;
        document.getElementById('score').textContent = `Score: ${score}`;
    }
    
    document.getElementById('next-btn').style.display = 'block';
}

function nextQuestion() {
    currentQuestion++;
    if(currentQuestion < questions.length) {
        loadQuestion();
    } else {
        endQuiz();
    }
}

function endQuiz() {
    const quizContainer = document.querySelector('.quiz-container');
    quizContainer.innerHTML = `
        <h1>Quiz Completed!</h1>
        <p>Your final score: ${score} out of 20</p>
        <button onclick="location.reload()">Try Again</button>
    `;
}

// Start the quiz when the page loads
window.onload = loadQuestion;
