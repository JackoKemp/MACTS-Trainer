let questionBank = [];

// Times tables from 1 to 20
for (let i = 1; i <= 20; i++) {
    for (let j = 1; j <= 20; j++) {
        questionBank.push({ question: `${i} x ${j}`, answer: i * j });
    }
}

// 50 x 50 to 59 x 59
for (let i = 50; i <= 59; i++) {
    for (let j = 50; j <= 59; j++) {
        questionBank.push({ question: `${i} x ${j}`, answer: i * j });
    }
}

// 100 x 100 to 110 x 110
for (let i = 100; i <= 110; i++) {
    for (let j = 100; j <= 110; j++) {
        questionBank.push({ question: `${i} x ${j}`, answer: i * j });
    }
}

let score = 0;
let highScore = localStorage.getItem('highScore') || 0;
let totalGameTime = 5;  // Game timer set to 60 seconds
let currentQuestion = 0;
let timer;
let answers = [];

// Function to shuffle an array
function shuffleArray(array) {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]]; // Swap elements
    }
}

// Initialize high score display when the page loads
document.addEventListener("DOMContentLoaded", function() {
    document.getElementById("highScoreValue").textContent = highScore;
});

// Start the game
function startGame() {
    score = 0;
    currentQuestion = 0;
    totalGameTime = 5;
    answers = [];

    // Hide the high score when the game starts
    document.getElementById("high-score").style.display = "none";

    // Shuffle the question bank
    shuffleArray(questionBank);

    document.getElementById("start-btn").style.display = "none";
    document.getElementById("question").style.display = "block";
    document.getElementById("answer").style.display = "block";
    document.getElementById("submit-btn").style.display = "block";

    startTimer();
    showQuestion();
    
    // Set focus to the answer input field
    document.getElementById("answer").focus();
}

// Timer function (keeps running in background)
function startTimer() {
    timer = setInterval(function() {
        totalGameTime--;
        if (totalGameTime <= 0) {
            clearInterval(timer);
            endGame();
        }
    }, 1000);
}

// Display the next question
function showQuestion() {
    if (currentQuestion < questionBank.length) {
        document.getElementById("question").innerHTML = questionBank[currentQuestion].question;
        document.getElementById("answer").value = '';
    } else {
        endGame();
    }
}

// Add event listener for the Enter key
document.getElementById("answer").addEventListener("keyup", function(event) {
    if (event.key === "Enter") {
        submitAnswer();
    }
});

// Submit the answer
function submitAnswer() {
    let userAnswer = document.getElementById("answer").value;
    let correct = userAnswer == questionBank[currentQuestion].answer;

    // Store user's answer and whether it's correct
    answers.push({ userAnswer, correct });

    currentQuestion++;
    showQuestion();
}

function endGame() {
    console.log("End Game function called");
    clearInterval(timer);

    let correctAnswers = answers.filter(answer => answer.correct).length;
    let totalAnswered = answers.length;

    // Create a results HTML string
    let resultsHtml = `<h2>Game Over!</h2>`;
    resultsHtml += `<p>Your score: ${correctAnswers}/${totalAnswered}</p>`;  // Display score as X/Y

    // Check for new high score
    if (correctAnswers > highScore) {
        highScore = correctAnswers;
        localStorage.setItem('highScore', highScore);  // Save high score
        alert(`Congratulations! You've set a new high score of ${highScore}!`);
    }

    // Show incorrect answers
    const incorrectAnswers = answers.filter(answer => !answer.correct);
    
    resultsHtml += `<h3>Incorrect Questions:</h3>`;
    resultsHtml += `<div style="border: 1px solid #ccc; padding: 10px; background-color: #f9f9f9;">`;

    if (incorrectAnswers.length > 0) {
        for (let i = 0; i < incorrectAnswers.length; i++) {
            resultsHtml += `<div style="margin: 5px 0; padding: 5px; border-bottom: 1px solid #ddd;">
                                <strong>Question:</strong> ${questionBank[answers.indexOf(incorrectAnswers[i])].question}<br>
                                <strong>Your answer:</strong> ${incorrectAnswers[i].userAnswer}<br>
                                <strong>Correct answer:</strong> ${questionBank[answers.indexOf(incorrectAnswers[i])].answer}
                            </div>`;
        }
    } else {
        resultsHtml += `<p>N/A</p>`; // N/A will be inside the box
    }

    resultsHtml += `</div>`; // Close the incorrect answers box

    // Get game elements to fade out
    const gameElements = [document.getElementById("question"), document.getElementById("answer"), document.getElementById("submit-btn")];

    // Apply fade class to game elements
    gameElements.forEach(element => {
        if (element) {
            element.classList.add("fade");
            console.log(`${element.id} faded out`);
        } else {
            console.warn("Game element not found!");
        }
    });

    // Delay showing results to allow fade-out effect
    setTimeout(() => {
        // Hide game elements after fade
        gameElements.forEach(element => {
            if (element) {
                element.style.display = "none"; // Completely hide elements after fade
                console.log(`${element.id} hidden`);
            }
        });

        // Create a div for the results
        const resultsDiv = document.createElement('div');
        resultsDiv.innerHTML = resultsHtml;

        // Append results to the game container
        document.getElementById("game-container").appendChild(resultsDiv);
        console.log("Results displayed");

        // Update the existing high-score element
        const highScoreElement = document.getElementById("high-score");
        if (highScoreElement) {
            highScoreElement.style.display = "block"; // Display high score
            document.getElementById("highScoreValue").textContent = highScore; // Update the displayed high score value
        } else {
            console.warn("High Score element not found!");
        }

        // Add buttons to go back to the menu or play again
        addEndGameButtons();
    }, 1000); // Shortened for quicker testing
}

function addEndGameButtons() {
    const buttonsDiv = document.createElement("div");
    buttonsDiv.style.marginTop = "20px"; // Add margin to make sure buttons aren't hidden
    
    let buttonsHtml = `<button onclick="window.location.href='menu.html'">Back to Main Menu</button>`;
    buttonsHtml += `<button onclick="window.location.href='numerical-operations-test.html'">Play Again</button>`;
    
    buttonsDiv.innerHTML = buttonsHtml;
    
    // Append buttons below the game results
    document.getElementById("game-container").appendChild(buttonsDiv);
}
