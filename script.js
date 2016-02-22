var numFlipped = 0;
var card = document.querySelectorAll(".card-back");
var cardOne = "";
var cardTwo = "";
var cardOneFont = "";
var cardTwoFont = "";

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
    }, 1000);

    numFlipped = 0;
  } else {
    setTimeout(function() {
      cardOne.classList.add("inactive");

      cardTwo.classList.add("inactive");
    }, 1000);

    numFlipped = 0;
  };
}

startGame();
