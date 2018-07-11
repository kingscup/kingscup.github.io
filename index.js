/**
 * Make cards themed (either for each card value or for each deck in  total)
 * Add animations
 */

const ranks = ["A","2","3","4","5","6","7","8","9","10","J","Q","K"];
let rules = {
  "A":"Waterfall",
  "2":"You",
  "3":"Me",
  "4":"Whores",
  "5":"Jive",
  "6":"Dicks",
  "7":"Heaven",
  "8":"Mate",
  "9":"Rhyme",
  "10":"Categories",
  "J":"Never Have I Ever",
  "Q":"Questions",
  "K":"Pour"
};

class Scene {
  static aboutScreen() {
    document.getElementById('about-screen')
      .classList.remove('hidden');
  }

  static exitAboutScreen() {
    document.getElementById('about-screen')
      .classList.add('hidden');
  }

  static chooseRuleScreen() {
    document.getElementById('choose-rule-screen')
      .classList.remove('hidden');
  }

  static exitChooseRuleScreen() {
    document.getElementById('choose-rule-screen')
      .classList.add('hidden');
  }

  static playGame() {
    document.getElementById('container-start')
      .classList.add('hidden');

    document.getElementById('choose-rule-screen')
      .classList.add('hidden');

    for (var x=0;x<ranks.length;x++) {
      rules[ranks[x]] = document.forms["rules"][x].value;
      document.getElementById('final-'+ranks[x])
        .innerHTML = document.forms["rules"][x].value
    }

    document.getElementById('game-container')
      .classList.remove('hidden');
  }

  static finalRuleScreen() {
    document.getElementById('final-rule-screen')
      .classList.remove('hidden');
  }

  static exitFinalRuleScreen() {
    document.getElementById('final-rule-screen')
      .classList.add('hidden');
  }

  static stuffScreen() {
    document.getElementById('stuff-screen')
      .classList.remove('hidden');
  }

  static exitStuffScreen() {
    document.getElementById('stuff-screen')
      .classList.add('hidden');
  }

  static gameOver() {
    document.getElementById('card-background')
      .classList.remove('hidden');

    document.getElementById('game-over')
      .classList.remove('hidden');

    document.getElementById('game-container')
      .classList.add('hidden');

    document.getElementById('king-count').innerHTML = 4;
    document.getElementById('card-count').innerHTML = 52;
  }

  static newGame() {
    document.getElementById('choose-rule-screen')
      .classList.remove('hidden');

    document.getElementById('game-over')
      .classList.add('hidden');
  }

}

class Deck {
  constructor(styling) {
    this.styling = styling,
    this.cards = this.initDeck(),
    this.cardCount = 52,
    this.kingCount = 4,
    this.faceDown = true
  }

  initDeck() {
    let suit = ["♣","♦","♥","♠"];
    let temp = [];
    for (var x=0;x<52;x++) {
      temp.push({"rank":ranks[x%13],"suit":suit[Math.floor(x/13)]});
    }
    return temp;
  }

  drawCard() {
    let cardChoice = Math.floor(Math.random()*this.cardCount);
    let choice = this.cards[cardChoice];
    if (this.faceDown) {
      document.getElementById('card-background')
        .classList.add('hidden');
      this.faceDown = false;
    }

    if (choice["rank"]==="K") {
      if (this.kingCount===1)
        {
          d = new Deck();
          return Scene.gameOver();
        } else {
            this.kingCount--;
            document.getElementById('king-count').innerHTML = this.kingCount;
        }
    }
    this.cardCount--;
    this.cards.splice(cardChoice,1);
    document.getElementById('card-count').innerHTML = this.cardCount;
    document.getElementById('card').className = (choice.suit==="♥"||choice.suit==="♦"?"red":"black");
    document.getElementsByClassName('card-l')[0].innerHTML = rules[choice.rank];
    document.getElementsByClassName('card-r')[0].innerHTML = rules[choice.rank];
    for (let n=0;n<2;n++) document.getElementsByClassName('card-num')[n].innerHTML = choice.rank;
    for (let s=0;s<2;s++) document.getElementsByClassName('card-suit')[s].innerHTML = choice.suit;
  }

}

let d = new Deck();
