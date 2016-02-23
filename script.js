var numFlipped = 0;
var card = document.querySelectorAll(".card-back");
var cardOne = "";
var cardTwo = "";
var cardOneFont = "";
var cardTwoFont = "";
var matches = 0;
var gameInProgress = true;
var timer = document.querySelector(".timer");

startGame = function() {
  for (var i=0; i<card.length; i++) {
    card[i].addEventListener("click", yourTurn);
  };

  timer.addEventListener("click", playTimedGame);
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

playTimedGame = function() {
  var loser = document.querySelector(".loser-outer");
  var countdown = document.querySelector(".countdown");
  var seconds = 9;
  var second = 0;
  var interval;

  countdown.classList.remove("inactive");

  if (gameInProgress === true) {
    timer.style.display = 'none';

    interval = setInterval(function() {
      countdown.firstChild.data = (seconds - second);

      if (second >=seconds) {
        loser.classList.remove("inactive");

        countdown.classList.add("inactive");
      };

      second++;
    }, 1000);;
  };
};

winGame = function() {
  var winner = document.querySelector(".winner-outer");

  gameInProgress = false;

  setTimeout(function() {
    if (matches === 6) {
      winner.classList.remove("inactive");
    };
  }, 700);
};

startGame();
