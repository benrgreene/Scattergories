let cardsContainer = document.querySelector("#js-cards-container");
let maxCards       = 0;
let cardNumber     = 0;

document.addEventListener("DOMContentLoaded", function(event) {
  maxCards   = data.length;
  cardNumber = getNewCard();
  loadCard();
});

// Get a new card to display
function getNewCard() {
  return cardNumber;
}

// load card into the game "board"
function loadCard() {
  data[cardNumber].forEach((row) => {
    cardsContainer.innerHTML += `
      <div class="card">
        <div class="card__title">${row}</div>
        <input class="card__answer" />
        <input class="card__was-taken" type="checkbox" />
      </div>
    `;
  });
}

// Load a single row of a card
function loadCardRow() {

}