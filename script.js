var numFlipped = 0;
var card = document.querySelectorAll(".card-back");
var cardOne = "";
var cardTwo = "";
var cardOneFont = "";
var cardTwoFont = "";
var matches = 0;

startGame = function() {
  for (var i=0; i<card.length; i++) {
    card[i].addEventListener("click", yourTurn);
  };
};

yourTurn = function() {
  var activeCard = this.firstElementChild;

  if (numFlipped === 0) {
    activeCard.classList.remove("inactive");

    numFlipped++;

    cardOne = activeCard;
    cardOneFont = activeCard.getAttribute("data-font");

  } else if (numFlipped === 1) {
    activeCard.classList.remove("inactive");

    numFlipped++;

    cardTwo = activeCard;
    cardTwoFont = activeCard.getAttribute("data-font");

    checkAnswer();
  };
};

checkAnswer = function() {
  if (cardOneFont === cardTwoFont) {
    var selectedCardOne = this.cardOne.parentNode;
    var selectedCardTwo = this.cardTwo.parentNode;

    setTimeout(function() {
      selectedCardOne.classList.add("inactive");

      selectedCardTwo.classList.add("inactive");

      numFlipped = 0;

      matches++;

      winGame();

    }, 1000);
  } else {
    setTimeout(function() {
      cardOne.classList.add("inactive");

      cardTwo.classList.add("inactive");

      numFlipped = 0;

    }, 1000);
  };
};

winGame = function() {
  if (matches === 6) {
    var winnerOverlay = document.querySelectorAll("winner-outer");
    var winnerText = document.querySelectorAll("winner");

    winnerOverlay.classList.remove("inactive");
    winner.classList.remove("inactive");
  }
}

startGame();
