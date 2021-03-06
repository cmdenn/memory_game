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
var startTime;
var endTime;
var firstCard;
var revealed;
var clicks;

var select = document.querySelector('.select');
var welcome = document.querySelector('.select h1');
var small = document.querySelector('.small');
var medium = document.querySelector('.medium');
var board = document.querySelector('.board');
var moves = document.querySelector('.moves');
var stars = document.querySelectorAll('.feedback img');
var modal = document.querySelector('.success');
var results = document.querySelectorAll('.success h3');
var rating = document.querySelectorAll('.success .solid-hidden');
var resetButton = document.querySelector('.success button');


/**
 * Start the game.
 */
function gameStart() {
  clicks = 0;
  revealed = [];
  populateDeck();
  placeCards();
  updateStars();
  startTime = new Date().getTime();
}


/**
 * Create cards and add them to the deck.
 */
function populateDeck() {
  cardCount = rowCount * rowCount;
  deck = []
  var colorSelection = colors.slice(0, cardCount/2).concat(colors.slice(0, cardCount/2));
  for (let i = 0; i < cardCount; i++) {
    var newCard = document.createElement('button');
    newCard.className = 'card-' + cardCount;
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
 * Place the cards in rows, then place rows on the board.
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
 * 'Flip' a card and, if another card has been flipped this turn, compare them.
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
      moves.textContent = 'Moves: ' + (clicks / 2);
      updateStars()
      if (revealed.length === deck.length) {
        gameOver();
      }
    }, 400);
  }
}


/**
 * Set the disabled property of all non-revealed cards to a boolean parameter.
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
 * Compare two cards. If they match, add them to the revealed array.
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
 * Update the star rating according to the number of turns taken.
 */
function updateStars() {
  if (clicks/2 === 0) {
    starRating = 3;
    for (var i = 0; i < 3; i++) {
      stars[i].src = 'images/solid_star.png';
      stars[i].alt = 'solid star';
    }
  } else if (clicks/2 === (cardCount/2) + (rowCount/2)) {
    starRating = 2;
    stars[2].src = 'images/empty_star.png';
    stars[2].alt = 'empty star';
  } else if (clicks/2 === (cardCount/2) + (rowCount/2) + (cardCount/4)) {
    starRating = 1;
    stars[1].src = 'images/empty_star.png';
    stars[1].alt = 'empty star';
  }
}


/**
 * Display the game over modal with a reset button.
 */
function gameOver() {
  var time = calculateTime();
  results[0].textContent = 'Moves: ' + clicks/2;
  results[1].textContent = 'Time: ' + time;
  modal.style.visibility = 'visible';
  for (var i = 0; i < starRating; i++) {
    rating[i].className = 'solid-visible';
  }
}


/**
 * Return a string representing the time taken to complete the game.
 */
function calculateTime() {
  endTime = new Date().getTime();
  var milliseconds = endTime - startTime;
  var minutes = Math.floor(milliseconds / 1000 / 60);
  var seconds = Math.floor(milliseconds / 1000 % 60);
  seconds = seconds < 10 ? '0' + seconds : seconds
  return minutes + ':' + seconds;
}


/**
 * Reset all elements.
 */
function resetGame() {
  while(board.firstChild) {
    board.removeChild(board.firstChild);
  }
  moves.textContent = 'Moves: 0';
  modal.style.visibility = 'hidden';
  for (var i = 0; i < starRating; i++) {
    rating[i].className = 'solid-hidden';
  }
  welcome.textContent = '';
  select.style.visibility = 'visible';
}


resetButton.addEventListener('click', resetGame);
small.addEventListener('click', function() {
  rowCount = 2;
  select.style.visibility = 'hidden';
  gameStart();
})
medium.addEventListener('click', function() {
  rowCount = 4;
  select.style.visibility = 'hidden';
  gameStart();
})
