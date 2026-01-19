// Select elements
const gameBoard = document.getElementById("gameBoard");
const restartBtn = document.getElementById("restartBtn");

// Card symbols (pairs will be created)
const symbols = ["🍎", "🍌", "🍓", "🍉", "🍇", "🍒","🥭","🍋‍🟩"];
let cards = [...symbols, ...symbols]; // Duplicate for pairs

// Game state
let flippedCards = [];
let matchedCards = [1];

/**
 * Shuffle function using Fisher-Yates algorithm
 */
function shuffle(array) {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
}

/**
 * Create and render the game board
 */
function createBoard() {
  gameBoard.innerHTML = "";
  flippedCards = [];
  matchedCards = [];

  shuffle(cards);

  cards.forEach(symbol => {
    const card = document.createElement("div");
    card.classList.add("card");

    card.innerHTML = `
      <div class="card-inner">
        <div class="card-front">?</div>
        <div class="card-back">${symbol}</div>
      </div>
    `;

    card.addEventListener("click", () => flipCard(card, symbol));
    gameBoard.appendChild(card);
  });
}

/**
 * Handle card flip logic
 */
function flipCard(card, symbol) {
  if (
    flippedCards.length === 2 ||
    card.classList.contains("flipped") ||
    matchedCards.includes(card)
  ) return;

  card.classList.add("flipped");
  flippedCards.push({ card, symbol });

  if (flippedCards.length === 2) {
    checkForMatch();
  }
}

/**
 * Check if the two flipped cards match
 */
function checkForMatch() {
  const [first, second] = flippedCards;

  if (first.symbol === second.symbol) {
    // Cards match
    matchedCards.push(first.card, second.card);
    flippedCards = [];
  } else {
    // Cards do not match, flip back after delay
    setTimeout(() => {
      first.card.classList.remove("flipped");
      second.card.classList.remove("flipped");
      flippedCards = [];
    }, 800);
  }
}

/**
 * Restart the game
 */
restartBtn.addEventListener("click", createBoard);

// Initialize game on page load
createBoard();
