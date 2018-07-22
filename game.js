const cardsContainer  = document.querySelector("#js-cards-container");
const nextRoundBtn    = document.querySelector("#js-next-round");
const newGameBtn      = document.querySelector("#js-new-game");
const scoreContainer  = document.querySelector("#js-score");
const letterContainer = document.querySelector("#js-letter");
const timeContainer   = document.querySelector("#js-timer");

const possibleLetters = 'abcdefghijklmnopqrstuvwxyz';
const maxCards        = data.length;
const gameLength      = 120000; // Two minutes
const tickAmount      = 1000;

let cardNumber = 0;
let score      = 0;
let letter     = '';
let timer      = null;
let timePassed = 0;


/**
 * ----------------------------------------------
 * Add Event Listeners
 * ----------------------------------------------
 */

// Start a new game
newGameBtn.addEventListener("click", startNewGame);

// Move on to the next round
nextRoundBtn.addEventListener("click", finishScoringRound);

/**
 * ----------------------------------------------
 * Event Callbacks
 * ----------------------------------------------
 */

// Starts a new game
function startNewGame() {
  score = 0;
  scoreContainer.innerText = score;

  startNewRound();
}

function startNewRound() {
  clearInterval(timer);
  timer      = null;
  timePassed = 0;

  removePreviousCard();
  displayNewLetter();
  loadNewCard();

  // Reset interactable elements
  enableAllInClass('.card__answer');
  disableAllInClass('.card__was-taken');
  disableAllInClass('label');

  // Hide the next round button while a round is in play
  nextRoundBtn.style.display = 'none';

  timer = setInterval(function(event) {
    tickGameCounter();
  }, tickAmount);
}

function tickGameCounter(event) {
  timePassed += tickAmount;
  if (timePassed >= gameLength) {
    beginScoringRound(event);
  }

  let displayTime = gameLength - timePassed;
  displayTime     = displayTime / 1000;
  
  timeContainer.innerHTML = Math.floor(displayTime / 60) + ':' + (displayTime % 60);
}

// Disable changing answers, and enable elements for scoring rounds
function beginScoringRound(event) {
  clearInterval(timer);
  timer = null;

  disableAllInClass('.card__answer');
  enableAllInClass('.card__was-taken');
  enableAllInClass('label');

  // display the next round button
  nextRoundBtn.style.display = 'inline';
}

function finishScoringRound(event) {
  var answers = document.querySelectorAll('.card__answer');
  answers.forEach((answer, index) => {
    const answerParts = answer.value.split(' ');
    answerParts.forEach((answerPart, innerIndex) => {
      if (answerPart.startsWith(letter)) {
        score++;
      }
    });
  });
  scoreContainer.innerText = score;
  startNewRound();
}

function displayNewLetter() {
  letter = getNewLetter();
  letterContainer.innerHTML = letter;
}

/**
 * ----------------------------------------------
 * Helper Methods
 * ----------------------------------------------
 */

// Get a new card to display
function getNewCard() {
  return Math.floor(Math.random() * maxCards);
}

function getNewLetter() {
  var letterIndex = Math.floor(Math.random() * possibleLetters.length);
  return possibleLetters.substring(letterIndex, letterIndex + 1);
}

// load card into the game "board"
function loadNewCard() {
  cardNumber = getNewCard();
  data[cardNumber].forEach((row, index) => {
    cardsContainer.innerHTML += `
      <div class="card">
        <div class="card__title">${row}</div>
        <input class="card__answer" />
        <div class="card__taken">
          <label for="card-taken-${index}">Yes</label>
          <input id="card-taken-${index}" class="card__was-taken" type="checkbox" />
        </div>
      </div>
    `;
  });
}

// Disable all elements with a given selector
function disableAllInClass(selector) {
  var elements = document.querySelectorAll(selector);
  elements.forEach((element, index) => {
    element.setAttribute('disabled', 'disabled');
  });
}

// Enable all the elements with a given selector
function enableAllInClass(selector) {
  var elements = document.querySelectorAll(selector);
  elements.forEach((element, index) => {
    element.removeAttribute('disabled');
  });
}

function removePreviousCard() {
  cardsContainer.innerHTML = ""; 
}