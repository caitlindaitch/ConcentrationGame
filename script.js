var numFlipped = 0;
var card = document.querySelectorAll(".card-back");
var cardOne = "";
var cardTwo = "";
var cardOneFont = "";
var cardTwoFont = "";
var matches = 0;
var timer = document.querySelector(".timer");

startGame = function() {
  for (var i=0; i<card.length; i++) {
    card[i].addEventListener("click", yourTurn);
  };

  timer.addEventListener("click", timedGame);
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

timedGame = function() {
  var loser = document.querySelector(".loser-outer");

  setTimeout(function() {
    loser.classList.remove("inactive");
  }, 15000);
};

winGame = function() {
  var winner = document.querySelector(".winner-outer");

  setTimeout(function() {
    if (matches === 6) {
      winner.classList.remove("inactive");
    };
  }, 700);
};

startGame();
