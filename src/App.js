import React, { Component } from 'react';
import card_background from "./seahorse.jpg";
import './App.css';


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
  }

  static newGame() {
    document.getElementById('choose-rule-screen')
      .classList.remove('hidden');

    document.getElementById('game-over')
      .classList.add('hidden');
  }

}

class Deck extends Component {
  constructor(props) {
    super(props)
    this.state = {
      cards:this.initDeck(),
      cardCount:52,
      kingCount:4,
      faceDown:true
    }
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
    let cardChoice = Math.floor(Math.random()*this.state.cardCount);
    let choice = this.state.cards[cardChoice];
    if (this.state.faceDown) {
      document.getElementById('card-background')
        .classList.add('hidden');
    }

    if (choice["rank"]==="K") {
      this.setState(
        this.state.kingCount===1?
        {
          cards:this.initDeck(),
          cardCount:52,
          kingCount:4,
          faceDown:true
        }:
        {kingCount:this.state.kingCount-1}
      );

      if (this.state.kingCount===1) {
        Scene.gameOver();
        return {suit:"$",rank:"K"}
      };
    }
    this.setState({cardCount:this.state.cardCount-1});
    this.state.cards.splice(cardChoice,1);
    return choice;
  }

  render() {
    return (
      <div id="game-container" className={this.props.styling}>
        <div id="game-stats">
          <span>Cards: {this.state.cardCount}</span>
          <span>Kings: {this.state.kingCount}</span>
        </div>
        <Card deck={this} />
        <div id="game-help">
          <span id="notes-btn" onClick={Scene.stuffScreen}>Stuff</span>
          <span id="final-rules-btn" onClick={Scene.finalRuleScreen}>Rules</span>
          <span id="about-btn" onClick={Scene.aboutScreen}>About</span>
        </div>
      </div>
    );
  }
}

class RuleBox extends Component {
  render() {
    return (
      <div className="ruleBox">
        <span className="ruleValue" id={"val"+this.props.rank}>{this.props.rank}</span>
        <input id={"rule"+this.props.rank} className="ruleForm"
          name={this.props.rank} type="text" defaultValue={this.props.rule}
        />
      </div>
    );
  }
}

class Card extends Component {
  constructor(props) {
    super(props)
    this.state = {
      dc:{suit:"$",rank:"K"},
    }
    this.draw = this.draw.bind(this);
  }
  draw() {
    this.setState({
      dc: this.props.deck.drawCard(),
    })
  }
  render() {
    let color = this.state.dc.suit==="♥"||this.state.dc.suit==="♦"?"red":"black";
    let longBody = Math.floor(rules[this.state.dc.rank].length/5)-1;
    let fontSize = longBody===-1?" xl-font":" l-font";
    return(
      <div className={color} id="card">
        <div className="card-tl">        
          <div className="card-num">{this.state.dc.rank}</div>
          <div className="card-suit">{this.state.dc.suit}</div>
        </div>
        <div className={"card-body"+(longBody<1?fontSize:"")}>       
        <div className="card-l">{rules[this.state.dc.rank]}</div>
        <div className="card-r">{rules[this.state.dc.rank]}</div>
        </div>
        <div className="card-br">        
          <div className="card-num">{this.state.dc.rank}</div>
          <div className="card-suit">{this.state.dc.suit}</div>
        </div>
        <div id="card-touch" onDoubleClick={this.draw}>
          <img id="card-background" alt="" src={card_background} />
        </div>
      </div>
    );
  }
}

class Start extends Component {
  render() {
    return (
      <div id="container-start" className="container-general" >
        <h1 className="header">King's Cup</h1>
        <button className='button' onClick={Scene.chooseRuleScreen}>
          <h2>PLAY</h2>
        </button>
        <h3><span onClick={Scene.aboutScreen}>About</span></h3>
      </div>
    );
  }
}

class ChooseRuleScreen extends Component {
  render() {
    return (
      <form id="rules">
        <span id="rules-cta">Play with traditional rules or create your own.</span>
        {ranks.map((k) => {
            return <RuleBox key={k} rank={k} rule={rules[k]} />;
        })}
        <button type="button" className='button' onClick={Scene.playGame}>
            Start Game
        </button>
      </form>
    )
  }
}

class StuffScreen extends Component {
  render() {
    return (
      <div><span className="window-title">Stuff</span>
        <textarea className="stuff-form" 
          placeholder="King's rules, last player before break, etc...">
        </textarea>
      </div>
    );
  }
}

class FinalRuleScreen extends Component {
  render() {
    return (
      <div id="final-rule-screen">
        <span className="window-title">Rules</span>
        {ranks.map((k) => {
          return (
            <div key={k} className="final-rule-container">
              <span id={"final-value-"+k} className="ruleValue">{k}</span>
              <span className="final-rule" id={"final-"+k}>
                {rules[k]}
                </span>
            </div>
          );
        })}
      </div>
    );
  }
}

class AboutScreen extends Component {
  render() {
    return (
      <div className="about-screen-container">
        <span className="window-title">About</span>
        <p>King's Cup is a drinking card game that's a surefire way to get the party going. The game starts off with an empty
          cup in the middle and everybody holding a drink. Each person takes a turn grabbing a card and each card has its own rule. The traditional rules are as follows:</p>
        <p><b>Ace is waterfall</b>: everybody chugs. The cardholder can stop whenever they want, then the person to their left can stop, then the person to their left, etc...</p>
        <p><b>2 is you</b>: cardholder decides who drinks.</p>
        <p><b>3 is me</b>: cardholder drinks.</p>
        <p><b>4 is whores</b>: not the best phrase to use but women drink.</p>
        <p><b>5 is thumbmaster</b>: the cardholder can decide to put his thumb on the table at any time and everyone else must follow. 
          Last person to do so drinks. This rule is live until the thumb master uses their turn or another 5 card is drawn.</p>
        <p><b>6 is dicks</b>: again not the best phrase but men drink.</p>
        <p><b>7 is heaven</b>: the last person to point to the sky drinks.</p>
        <p><b>8 is mate</b>: cardholder decides who drinks with them.</p>
        <p><b>9 is rhyme</b>: cardholder picks a word and everybody must rhyme. First person to make a mistake or pause drinks.</p>
        <p><b>10 is categories</b>: cardholder picks a category and everybody must name something within that category such as car brands, music genres, etc... 
          First person to make a mistake or pause drinks.</p>
        <p><b>Jack is never have I ever</b>: everybody puts up 3 to 5 fingers. Each person takes turns naming something they haven't done and whoever has done that drinks. 
          This goes on until somebody has all their fingers down.</p>
        <p><b>Queen is questions</b>: everybody goes in rotation asking questions. First person to say a statement or pause drinks.</p>
        <p><b>King is pour</b>: cardholder gets to pour whichever drink they'd like into the cup. Cardholder can also decide to make a rule everybody must follow. 
          Fourth person to grab a king must drink the contents.</p>
        <p>Of course, the fun behind King's Cup is to make the rules whatever your heart desires. Drink responsibility and keep on rocking! \m/ - Berto Moore</p>
      </div>
    );
  }
}

class GameOver extends Component {
  render() {
    return (
      <div id="game-over" className={this.props.styling}>
        <span id="game-over-content" className="container-general">
        Last king has been drawn!
          <button className='button' onClick={Scene.newGame}>
            Play Again
          </button>        
        </span>
      </div>
    )
  }
}

class WindowContainer extends Component {
  render() {
    return (
      <div className={
        "remove-touch"+(this.props.styling||"")
        } 
        id={this.props.idTag}>
        <div 
          className="window-container">
          <span className="exit" onClick={this.props.exitAction}>
            {'\u2715'}
          </span>
          {this.props.content}
        </div>
      </div>
    );
  }
}

class App extends Component {
  render() {
    return (
      <div>
        <Start />

        <WindowContainer
          idTag="about-screen"
          styling=" hidden"
          content={<AboutScreen />}
          exitAction={Scene.exitAboutScreen}
        />

        <WindowContainer 
          idTag="choose-rule-screen"
          styling=" hidden"
          content={<ChooseRuleScreen />}
          exitAction={Scene.exitChooseRuleScreen}
        />

        <WindowContainer
          idTag="stuff-screen"
          styling=" hidden"
          content={<StuffScreen />}
          exitAction={Scene.exitStuffScreen}
        />

        <WindowContainer 
          idTag="final-rule-screen"
          styling=" hidden"
          content={<FinalRuleScreen />}
          exitAction={Scene.exitFinalRuleScreen}
        />

        <GameOver styling=" hidden" />

        <Deck styling="hidden" />
      </div>
    )
  };
}

export default App;
