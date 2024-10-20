let currentScore = 0;
let highScore = 0;
let currentSequence = [];
let playerAnswer = "";
let sequenceLength = 1;
let gameActive = false; // Track whether the game is currently active

// Load the high score from local storage
function loadHighScore() {
    const savedHighScore = localStorage.getItem('digitRetentionHighScore');
    if (savedHighScore) {
        highScore = parseInt(savedHighScore, 10);
        document.getElementById('highScoreValue').textContent = highScore;
    }
}

function startGame() {
    console.log("Starting game..."); // Debugging
    document.getElementById('start-btn').style.display = 'none';
    document.getElementById('play-again-btn').style.display = 'none';
    document.getElementById('return-home-btn').style.display = 'none';
    document.getElementById('end-game-buttons').style.display = 'none'; // Hide end game buttons
    document.getElementById('high-score').style.display = 'none'; // Hide high score at the start

    const questionElement = document.getElementById('question');
    questionElement.style.color = ''; // Reset to default color
    questionElement.textContent = ''; // Clear previous question text

    currentScore = 0;
    sequenceLength = 1; // Reset sequence length for each game
    currentSequence = [];
    gameActive = true; // Set game as active
    nextSequence(); // Start the game sequence

    // Add event listener for Enter key
    const answerInput = document.getElementById('answer');
    answerInput.value = ''; // Clear input field when starting
    answerInput.addEventListener('keydown', function(event) {
        if (event.key === 'Enter') {
            event.preventDefault(); // Prevent form submission if inside a form
            submitAnswer(); // Call the submit function
        }
    });
}

function nextSequence() {
    console.log("Current sequence length:", sequenceLength); // Debugging

    // Generate a new sequence of random digits of length equal to sequenceLength
    currentSequence = [];
    for (let i = 0; i < sequenceLength; i++) {
        // Generate a random digit between 0 and 9
        const randomDigit = Math.floor(Math.random() * 10); // Generates a number between 0 and 9
        currentSequence.push(randomDigit);
    }
    
    console.log("Current sequence:", currentSequence); // Debugging
    showSequence(); // Call to show the sequence
}

function showSequence() {
    const questionElement = document.getElementById('question');
    questionElement.style.display = 'block';
    questionElement.textContent = currentSequence.join(''); // Concatenate numbers without spaces
    document.getElementById('answer').style.display = 'none'; // Hide answer input initially
    document.getElementById('submit-btn').style.display = 'none'; // Hide submit button initially

    // Clear the question after 5 seconds
    setTimeout(() => {
        questionElement.style.display = 'none';
        document.getElementById('answer').style.display = 'block'; // Show input after the sequence disappears
        document.getElementById('submit-btn').style.display = 'block'; // Show submit button
        document.getElementById('answer').focus(); // Set focus to the input
    }, 5000); // Display for 5 seconds
}

function submitAnswer() {
    if (!gameActive) return; // Prevent submitting if the game is not active

    const answerInput = document.getElementById('answer');
    const highScoreDisplay = document.getElementById('high-score');
    const endGameButtons = document.getElementById('end-game-buttons');
    const returnHomeButton = document.getElementById('return-home-btn');
    const playAgainButton = document.getElementById('play-again-btn');
    const gameOverMessage = document.getElementById('game-over-message');
    const questionElement = document.getElementById('question');
    const incorrectAnswerBox = document.getElementById('incorrect-answer-box');

    playerAnswer = answerInput.value;

    // Check if the answer is correct
    if (playerAnswer === currentSequence.join('')) {
        currentScore++;
        // Update high score if needed
        if (currentScore > highScore) {
            highScore = currentScore;
            localStorage.setItem('digitRetentionHighScore', highScore); // Save high score
            document.getElementById('highScoreValue').textContent = highScore;
        }
        answerInput.value = ''; // Clear input
        answerInput.style.display = 'none'; // Hide input after correct answer
        document.getElementById('submit-btn').style.display = 'none'; // Hide submit button
        sequenceLength++; // Increase sequence length
        nextSequence(); // Go to next sequence only if the answer is correct
    } else {
        // Game over
        gameActive = false; // Set game as inactive
        gameOverMessage.style.display = 'block'; // Show the game over message
        gameOverMessage.textContent = `Incorrect! Game Over! Your score: ${currentScore}`;
        
        // Show the question and incorrect answer
        questionElement.textContent = `Question: ${currentSequence.join('')} (Your answer: ${playerAnswer})`;
        
        // Populate the incorrect answer box
        incorrectAnswerBox.innerHTML = `
            <strong>Digit Sequence:</strong> ${currentSequence.join('')} <br>
            <strong>Your answer:</strong> ${playerAnswer} <br>
        `;
        incorrectAnswerBox.style.display = 'block'; // Show the incorrect answer box

        // Show the end game buttons
        endGameButtons.style.display = 'flex'; // Ensure the buttons are shown
        returnHomeButton.style.display = 'block'; // Show back to main menu button
        playAgainButton.style.display = 'block'; // Show play again button
        answerInput.style.display = 'none'; // Hide input
        document.getElementById('submit-btn').style.display = 'none'; // Hide submit button
        highScoreDisplay.style.display = 'block'; // Show high score at game end
    }
}

function playAgain() {
    // Reset the game and go back to the start
    resetGame(); // Custom function to reset the game logic
    gameActive = true; // Reset game active state
    document.getElementById('end-game-buttons').style.display = 'none'; // Hide end game buttons
    document.getElementById('start-btn').style.display = 'block'; // Show start game button
}

function returnHome() {
    // Redirect to main menu
    window.location.href = 'index.html';
}

function resetGame() {
    console.log("Resetting game..."); // Debugging
    // Logic to reset the game (score, sequence, etc.)
    currentScore = 0;
    sequenceLength = 1; // Reset sequence length
    document.getElementById('high-score').style.display = 'block'; // Show high score
    document.getElementById('question').style.display = 'none'; // Hide question
    document.getElementById('answer').style.display = 'none'; // Hide answer input
    document.getElementById('submit-btn').style.display = 'none'; // Hide submit button
    document.getElementById('game-over-message').style.display = 'none'; // Hide game over message
    document.getElementById('incorrect-answer-box').style.display = 'none'; // Hide incorrect answer box

    const questionElement = document.getElementById('question');
    questionElement.style.color = ''; // Reset to default color
    console.log("Question color reset to:", questionElement.style.color); // Debugging
    questionElement.textContent = ''; // Clear previous question text
}

// Load high score on page load
window.onload = loadHighScore;
