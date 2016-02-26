var game = {
  numFlipped: 0,
  card: document.querySelectorAll(".card-back"),
  cardOne: "",
  cardTwo: "",
  cardOneFont: "",
  cardTwoFont: "",
  matches: 0,
  gameInProgress: true,
  timer: document.querySelector(".timer"),
  colorSelect: document.querySelectorAll(".color-select"),
  fontsHard: [ ["one", "Font"], ["one", "Font"], ["two", "Font"], ["two", "Font"], ["three", "Font"], ["three", "Font"], ["four", "Font"], ["four", "Font",], ["five", "Font"], ["five", "Font"], ["six", "Font"], ["six", "Font"] ],
  fontsEasy: [ ["one", "Arial"], ["one", "Arial"], ["two", "Courier New"], ["two", "Courier New"], ["three", "Times New Roman"], ["three", "Times New Roman"], ["four", "Georgia"], ["four", "Georgia"], ["five", "Arial Black"], ["five", "Arial Black"], ["six", "Impact"], ["six", "Impact"]],
  hardGame: document.querySelector(".hard"),
  easyGame: document.querySelector(".easy"),

  startGame: function() {
    for (var i=0; i<this.card.length; i++) {
      this.card[i].addEventListener("click", this.yourTurn);
    };

    this.timer.addEventListener("click", this.playTimedGame);

    for (var i=0; i<this.colorSelect.length; i++) {
      this.colorSelect[i].addEventListener("click", this.changeCardColor);
    };

    this.hardGame.addEventListener("click", this.shuffleFontsHard);

    this.easyGame.addEventListener("click", this.shuffleFontsEasy);
  },

  shuffleFonts: function(fontArray) {
    var self = game;

    fontArray.forEach(function() {
      fontArray.sort(function() {
        if (Math.random() > 0.5) {
          return 1;
        } else {
          return -1;
        };
      });
    });

    for (var i=0; i<fontArray.length; i++) {
      for (var j=0; j<self.card.length; j++) {
        self.card[i].firstElementChild.dataset.font = fontArray[i][0];

        self.card[i].firstElementChild.innerHTML = fontArray[i][1];
      };
    };
  },

  shuffleFontsHard: function() {
    var self = game;

    self.shuffleFonts(self.fontsHard);

    self.hardGame.removeEventListener("click", self.shuffleFontsHard, false);
    self.easyGame.removeEventListener("click", self.shuffleFontsEasy, false);
  },

  shuffleFontsEasy: function() {
    var self = game;

    self.shuffleFonts(self.fontsEasy);
  },

  changeCardColor: function() {
    var selectedColorBox = this.firstElementChild;
    var self = game;

    var newColor = selectedColorBox.getAttribute("data-color");

    var colorPairs = [
      ["deck-one", "#3fb0ac"],
      ["deck-two", "#a2aff7"],
      ["deck-three", "#b4e9e7"],
      ["deck-four", "#e5e5e5"]
    ];

    colorPairs.forEach(function(pair){
      if(newColor === pair[0]){
        for (var i=0; i<self.card.length; i++) {
          self.card[i].style.backgroundColor = pair[1];
        };
      }
    });
  },

  yourTurn: function() {
    var activeCard = this.firstElementChild;
    var self = game;

    if (self.numFlipped === 0) {
      activeCard.classList.remove("inactive");

      self.cardOne = activeCard;
      self.cardOneFont = activeCard.getAttribute("data-font");

      self.numFlipped++;
    } else if (self.numFlipped === 1 && self.cardOne != activeCard) {
      activeCard.classList.remove("inactive");

      self.numFlipped++;

      self.cardTwo = activeCard;
      self.cardTwoFont = activeCard.getAttribute("data-font");

      self.checkAnswer();
    };
  },

  checkAnswer: function() {
    if (this.cardOneFont === this.cardTwoFont) {
      var selectedCardOne = this.cardOne.parentNode;
      var selectedCardTwo = this.cardTwo.parentNode;
      var self = this;

      setTimeout(function() {
        selectedCardOne.classList.add("inactive");

        selectedCardTwo.classList.add("inactive");

        self.numFlipped = 0;

        self.matches++;

        self.winGame();

      }, 1000);
    } else {
      var self = this;

      setTimeout(function() {
        self.cardOne.classList.add("inactive");

        self.cardTwo.classList.add("inactive");

        self.numFlipped = 0;

      }, 1000);
    };
  },

  playTimedGame: function() {
    var loser = document.querySelector(".loser-outer");
    var countdown = document.querySelector(".countdown");
    var seconds = 29;
    var second = 0;
    var interval;
    var self = game;

    countdown.classList.remove("inactive");

    if (self.gameInProgress) {
      self.timer.style.display = 'none';

      self.interval = setInterval(function() {
        countdown.firstChild.data = (seconds - second);

        if (second >= seconds) {
          countdown.classList.add("inactive");

          if (self.gameInProgress) {
            loser.classList.remove("inactive");
          };
        };

        second++;
      }, 1000);;
    };
  },

  winGame: function() {
    var winner = document.querySelector(".winner-outer");
    var self = this;

    setTimeout(function() {
      if (self.matches === 6) {
        winner.classList.remove("inactive");

        self.gameInProgress = false;
      };
    }, 700);
  }
};

game.startGame();
