var numFlipped = 0;
var card = document.querySelectorAll(".card-back");
var cardOne = "";
var cardTwo = "";
var cardOneFont = "";
var cardTwoFont = "";
var matches = 0;
var gameInProgress = true;
var timer = document.querySelector(".timer");
var colorSelect = document.querySelectorAll(".color-select");
var fonts = ["one", "one", "two", "two", "three", "three", "four", "four", "five", "five", "six", "six"];

startGame = function() {
  for (var i=0; i<card.length; i++) {
    card[i].addEventListener("click", yourTurn);
  };

  timer.addEventListener("click", playTimedGame);

  for (var i=0; i<colorSelect.length; i++) {
    colorSelect[i].addEventListener("click", changeCardColor);
  };
};

shuffleFonts = function() {
  fonts.forEach(function(font) {
    fonts.sort(function() {
      if (Math.random() > 0.5) {
        return 1;
      } else {
        return -1;
      };
    });
  });

  for (var i=0; i<fonts.length; i++) {
    for (var i=0; i<card.length; i++) {
      card[i].firstElementChild.dataset.font = fonts[i];
    };
  };
};

changeCardColor = function() {
  var selectedColorBox = this.firstElementChild;

  var newColor = selectedColorBox.getAttribute("data-color");

  if (newColor === "deck-one") {
    for (var i=0; i<card.length; i++) {
      card[i].style.backgroundColor = "#3fb0ac";
    };
  } else if (newColor === "deck-two") {
    for (var i=0; i<card.length; i++) {
      card[i].style.backgroundColor = "#a2aff7";
    };
  } else if (newColor === "deck-three") {
    for (var i=0; i<card.length; i++) {
      card[i].style.backgroundColor = "#b4e9e7";
    };
  } else if (newColor === "deck-four") {
    for (var i=0; i<card.length; i++) {
      card[i].style.backgroundColor = "#e5e5e5";
    };
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

playTimedGame = function() {
  var loser = document.querySelector(".loser-outer");
  var countdown = document.querySelector(".countdown");
  var seconds = 29;
  var second = 0;
  var interval;

  countdown.classList.remove("inactive");

  if (gameInProgress) {
    timer.style.display = 'none';

    interval = setInterval(function() {
      countdown.firstChild.data = (seconds - second);

      if (second >= seconds && gameInProgress === false) {
        countdown.classList.add("inactive");
      } else if (second >= seconds) {
        loser.classList.remove("inactive");

        countdown.classList.add("inactive");
      };

      second++;
    }, 1000);;
  };
};

winGame = function() {
  var winner = document.querySelector(".winner-outer");

  setTimeout(function() {
    if (matches === 6) {
      winner.classList.remove("inactive");

      gameInProgress = false;
    };
  }, 700);
};

startGame();
shuffleFonts();
