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

  if (numFlipped < 2) {
    activeCard.classList.remove("inactive");

    numFlipped++;

    cardOne = activeCard;
    cardOneFont = activeCard.style.fontFamily;

    console.log(cardOne);
    console.log(cardOneFont);

    if (cardOne != "") {
      console.log("One is clicked");
    }
  } else {
    console.log("IDK");
  }
};

startGame();
