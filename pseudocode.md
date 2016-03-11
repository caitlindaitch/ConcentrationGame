* HTML/CSS:
Create a 4 x 4 board with rectangles using FlexBox in each
Style different fonts in each box in pairs
Fonts need to be contained within an inner divs
Create separate display:none style for inactive state
Create separate display:none style for matched pairs
----
Phase 2:
Add a title
Add a timer
Randomize location of font divs within boxes

<!--I think it's great that you did pseudocode!!! It still reads a little too much like code though -->
* JS
variable numFlipped = 0;
variable card = DOM element selecting boxes;
variable cardOne = "";
variable cardTwo = "";
variable cardOneFont = "";
variable cardTwoFont = "";

addEventListener on card for clicks;
if numFlipped <= 2; {
  function selectCard();
    numFlipped++;
    display element on .this
    cardOneFont = this.card.style.fontFamily
    cardOne = this.card

    if cardOneFont != "" {
      cardTwoFont = this.card.style.fontFamily
      cardTwo = this.card
    }
}

if cardOneFont === cardTwoFont {
  Wait 5 seconds

  cardOne.classList.add("displayNone");
  cardTwo.classList.add("displayNone");

  cardOne = "";
  cardTwo = "";
  cardOneFont = "";
  cardTwoFont = "";

  numFlipped = 0;
} else {
  Wait 5 seconds

  run function turnMismatch();

  numFlipped = 0;
}

function turnMismatch() {
  cardOne.childNodes.addClass('inactive');
  cardTwo.childNodes.addClass('inactive');

  cardOne = "";
  cardTwo = "";
  cardOneFont = "";
  cardTwoFont = "";
}

<!-- Create an object that contains all the cards and their associated fonts
  cards = {
    1: {
      id: 1
      font: arial
    },
    2: {
      id: 2
      font: verdana
    },
    3: {
      id: 3
      font: impact
    },
    4: {
      id: 4
      font: garamond
    },
    5: {
      id: 5
      font: times new roman
    },
    6: {
      id: 6
      font: georgia
    },
    7: {
      id: 7
      font: calibri
    },
    8: {
      id: 8
      font: helvetica
    }
  } -->
