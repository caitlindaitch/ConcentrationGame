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
  fonts: ["one", "one", "two", "two", "three", "three", "four", "four", "five", "five", "six", "six"],

  startGame: function() {
    for (var i=0; i<this.card.length; i++) {
      this.card[i].addEventListener("click", this.yourTurn);
    };

    this.timer.addEventListener("click", this.playTimedGame);

    for (var i=0; i<this.colorSelect.length; i++) {
      this.colorSelect[i].addEventListener("click", this.changeCardColor);
    };
  },

  shuffleFonts: function() {
    this.fonts.forEach(function(font) {
      this.fonts.sort(function() {
        if (Math.random() > 0.5) {
          return 1;
        } else {
          return -1;
        };
      });
    });

    for (var i=0; i<this.fonts.length; i++) {
      for (var i=0; i<this.card.length; i++) {
        this.card[i].firstElementChild.dataset.font = this.fonts[i];
      };
    };
  },

  shuffleFonts: function() {
    var self = game;

    self.fonts.forEach(function(font) {
      self.fonts.sort(function() {
        if (Math.random() > 0.5) {
          return 1;
        } else {
          return -1;
        };
      });
    });

    for (var i=0; i<self.fonts.length; i++) {
      for (var i=0; i<self.card.length; i++) {
        self.card[i].firstElementChild.dataset.font = self.fonts[i];
      };
    };
  },

  changeCardColor: function() {
    var selectedColorBox = this.firstElementChild;
    var self = game;

    var newColor = selectedColorBox.getAttribute("data-color");

    if (newColor === "deck-one") {
      for (var i=0; i<self.card.length; i++) {
        self.card[i].style.backgroundColor = "#3fb0ac";
      };
    } else if (newColor === "deck-two") {
      for (var i=0; i<self.card.length; i++) {
        self.card[i].style.backgroundColor = "#a2aff7";
      };
    } else if (newColor === "deck-three") {
      for (var i=0; i<self.card.length; i++) {
        self.card[i].style.backgroundColor = "#b4e9e7";
      };
    } else if (newColor === "deck-four") {
      for (var i=0; i<self.card.length; i++) {
        self.card[i].style.backgroundColor = "#e5e5e5";
      };
    };
  },

  yourTurn: function() {
    var activeCard = this.firstElementChild;
    var self = game;

    if (self.numFlipped === 0) {
      activeCard.classList.remove("inactive");

      self.numFlipped++;

      self.cardOne = activeCard;
      self.cardOneFont = activeCard.getAttribute("data-font");

    } else if (self.numFlipped === 1) {
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
game.shuffleFonts();
