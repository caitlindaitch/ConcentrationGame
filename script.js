//Awesome job putting this all into one object
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

  selectLevel: function() {
    // I think you could have one callback function for both of these event listeners:
    // for example since they have a class of hard and easy maybe change the name of your fonts arrays property to easy & hard
    // and write a function like this:

    // this.hardGame.addEventListener("click", this.shuffleFonts);
    // this.easyGame.addEventListener("click", this.shuffleFontsHard);

    // shuffleFonts: function(){
    //   var type = this.classList[0];
    //   var self = game;
    //   self.shuffleFonts(self.type);
    // }

    this.hardGame.addEventListener("click", this.shuffleFontsHard);

    this.easyGame.addEventListener("click", this.shuffleFontsEasy);

    for (var i=0; i<this.colorSelect.length; i++) {
      this.colorSelect[i].addEventListener("click", this.changeCardColor);
    };
  },

  startGame: function() {
    for (var i=0; i<this.card.length; i++) {
      this.card[i].addEventListener("click", this.yourTurn);
    };

    this.timer.addEventListener("click", this.playTimedGame);
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

    this.startGame();
  },

  shuffleFontsHard: function() {
    // I actually really liked that you used self for this instance, it might help in the future iterating on this code
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

      // I would abstract this into a separate function and call it here:
      // self.cardOne = activeCard;
      // changeActiveClass(activeCard, self);

    //   changeActiveClass = function(activeCard, self){
      //   activeCard.classList.remove("inactive");
      //   self.cardOne = activeCard;
      //   self.cardOneFont = activeCard.getAttribute("data-font");
      //   self.numFlipped++;
    // }
      activeCard.classList.remove("inactive");

      self.cardOne = activeCard;
      self.cardOneFont = activeCard.getAttribute("data-font");

      self.numFlipped++;
    } else if (self.numFlipped === 1 && self.cardOne != activeCard) {
      // I would do the same thing here in this case:
      // self.cardTwo = activeCard;
      // changeActiveClass(activeCard, self);
      // self.checkAnswer();
      //
      activeCard.classList.remove("inactive");

      self.numFlipped++;

      self.cardTwo = activeCard;
      self.cardTwoFont = activeCard.getAttribute("data-font");

      self.checkAnswer();
    };
  },

  checkAnswer: function() {
    // I would separate the setTimeout into a separate method/function from checkAnswer
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
    // I would try to break this function down further as well, it's a little dificult to read and understand
    // exactly what your trying to achieve
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

          setTimeout(function() {
            if (self.gameInProgress) {
              loser.classList.remove("inactive");
            };
          }, 500);
        };

        second++;
      }, 1000);;
    };
  },

  winGame: function() {
    var winner = document.querySelector(".winner-outer");
    var self = this;

    if (self.matches === 6) {
      winner.classList.remove("inactive");

      self.gameInProgress = false;
    };
  }
};

game.selectLevel();
