var colors = [
  '#ff0512',
  '#ff6b05',
  '#fffa05',
  '#05ff1b',
  '#05e6ff',
  '#0554ff',
  '#a205ff',
  '#ff05e1'
];

var rowCount;
var cardCount;
var deck;
var starRating;

var board = document.querySelector('.board');
var guesses = document.querySelector('.guesses');
var stars = document.querySelectorAll('.feedback img');
var modal = document.querySelector('.success');
var results = document.querySelector('.success p');
var resetButton = document.querySelector('.success button');

var revealed = [];
var firstCard;
var clicks = 0;


/**
 * Creates cards and adds them to the deck.
 */
function populateDeck() {
  rowCount = 4;
  cardCount = rowCount*rowCount;
  deck = []
  var colorSelection = colors.slice(0, cardCount/2).concat(colors.slice(0, cardCount/2));
  for (let i = 0; i < cardCount; i++) {
    var newCard = document.createElement('button');
    newCard.className = 'card';
    colorIndex = Math.floor(Math.random() * colorSelection.length);
    newCard.name = colorSelection[colorIndex];
    colorSelection.splice(colorIndex, 1);
    newCard.addEventListener('click', function() {
      turnCard(deck[i]);
    })
    deck.push(newCard);
  }
}


/**
 * Places the cards in rows, then places rows on the board.
 */
function placeCards() {
  for (var i = 0; i < rowCount; i++) {
    var newRow = document.createElement('div');
    newRow.className = 'row';
    for(var e = 0; e < rowCount; e++) {
      newRow.appendChild(deck[i*rowCount + e]);
    }
    board.appendChild(newRow);
  }
}


/**
 * 'Flips' a card and, if another card has been flipped this turn, compares them.
 * @param {button} card - The card element that has been clicked.
 */
function turnCard(card) {
  card.style.backgroundColor = card.name;
  card.disabled = true;
  if (!(clicks % 2)) {
    firstCard = card;
    clicks++;
  } else {
    clicks++;
    disableAll(true);
    setTimeout(function () {
      compareCards(firstCard, card);
      disableAll(false);
      guesses.textContent = 'Moves: ' + (clicks / 2);
      updateStars()
      if (revealed.length === deck.length) {
        gameOver();
      }
    }, 400);
  }
}


/**
 * Sets the disabled property of all non-revealed cards to a boolean parameter.
 * @param {boolean} bool
 */
function disableAll(bool) {
  for (var i = 0; i < deck.length; i++) {
    if (revealed.indexOf(deck[i]) === -1) {
      deck[i].disabled = bool;
    }
  }
}


/**
 * Compares two cards. If they match, they are added to the revealed array.
 * @param {button} c1 - The first card.
 * @param {button} c2 - The second card.
 */
function compareCards(c1, c2) {
  if (c1.name === c2.name) {
    revealed.push(c1);
    revealed.push(c2);
  } else {
    c1.style.backgroundColor = '';
    c2.style.backgroundColor = '';
  }
}


/**
 * Updates the star rating according to the number of turns taken.
 */
function updateStars() {
  if (clicks/2 === 0) {
    starRating = 3;
    for (var i = 0; i < 3; i++) {
      stars[i].src = 'images/solid_star.png';
      stars[i].alt = 'solid star';
    }
  } else if (clicks/2 === 10) {
    starRating = 2;
    stars[2].src = 'images/empty_star.png';
    stars[2].alt = 'empty star';
  } else if (clicks/2 === 14) {
    starRating = 1;
    stars[1].src = 'images/empty_star.png';
    stars[1].alt = 'empty star';
  }
}


/**
 * Displays the game over modal with a reset button.
 */
function gameOver() {
  results.textContent = 'You finished in ' + clicks/2 + ' moves, ' +
                        'with a ' + starRating + '-star rating.'
  resetButton.addEventListener('click', resetGame);
  modal.style.visibility = 'visible';
}


/**
 * Resets all elements.
 */
function resetGame() {
  modal.style.visibility = 'hidden';
  while(board.firstChild) {
    board.removeChild(board.firstChild);
  }
  clicks = 0;
  revealed = [];
  guesses.textContent = 'Moves: 0';
  updateStars();
  populateDeck();
  placeCards();
}


populateDeck();
placeCards();
