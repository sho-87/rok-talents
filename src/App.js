import React, { Component } from 'react';
import NavBar from './NavBar.js';
import SidePanel from './SidePanel.js';
import TreePanel from './TreePanel.js';
import { InvalidBuildModal } from './Modals.js';
import ErrorBoundary from './Error.js';

import Trees from './data/modules.js';
import Commanders from './data/Commanders.json';

import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';

//TODO: add tree/game/data version to state and data files
//TODO: add app version?
//TODO: change encoding method? base64, URI, lz-string, url safe
// or use multiple query params instead of full object to save chars?
//TODO: url shortening using sqlite?
//TODO: manually encode/shorten state containing repeat characters?
//TODO: react router to store state/version as path instead of query?
//TODO: find library for dock/sidepanel?
//TODO: hide side panel on smaller screens. unmount tree component?
class App extends Component {
  constructor(props) {
    super(props);
    this.MAXPOINTS = 74; // max number of points available in-game
    this.invalidModalFlag = false;

    // Context bindings
    this.encodeState = this.encodeState.bind(this);
    this.decodeState = this.decodeState.bind(this);
    this.changeCommander = this.changeCommander.bind(this);
    this.resetTalents = this.resetTalents.bind(this);
    this.changeTalentValue = this.changeTalentValue.bind(this);
    this.calcPointsSpent = this.calcPointsSpent.bind(this);
    this.calcPointsRemaining = this.calcPointsRemaining.bind(this);

    // Set initial state from query string
    const urlParams = new URLSearchParams(window.location.search);
    if (urlParams.has('build')) {
      const build = urlParams.get('build');
      try {
        this.state = this.decodeState(build);
      } catch (err) {
        // Invalid build
        this.invalidModalFlag = true;
        this.state = this.getEmptyState();
        this.updateURL('clear');
      }
    } else {
      this.state = this.getEmptyState();
    }
  }

  getEmptyState() {
    return {
      commander: '',
      red: [],
      yellow: [],
      blue: []
    };
  }

  setEmptyState() {
    this.setState(this.getEmptyState(), () => {
      this.updateURL('clear');
    });
  }

  encodeState() {
    // returns a string
    return window.btoa(JSON.stringify(this.state));
  }

  decodeState(encoded, parse = true) {
    // returns a string or an object (parsed)
    const decoded = window.atob(encoded);
    if (parse) {
      return JSON.parse(decoded);
    } else {
      return decoded;
    }
  }

  updateURL(method) {
    const url = new URL(window.location.href);
    switch (method) {
      case 'update':
        url.searchParams.set('build', this.encodeState());
        break;
      case 'clear':
        url.searchParams.delete('build');
        break;
      default:
        break;
    }
    window.history.pushState({ path: url.href }, '', url.href);
  }

  changeCommander(commander) {
    const zeroTalents = this.createZeroTalents(commander);
    this.setState({ commander: commander, ...zeroTalents }, () =>
      this.updateURL('update')
    );
  }

  createZeroTalents(commander) {
    const numRed = Object.keys(Trees[Commanders[commander]['red']]).length;
    const numYellow = Object.keys(Trees[Commanders[commander]['yellow']])
      .length;
    const numBlue = Object.keys(Trees[Commanders[commander]['blue']]).length;

    const zeroTalents = {
      red: Array(numRed).fill(0),
      yellow: Array(numYellow).fill(0),
      blue: Array(numBlue).fill(0)
    };

    return zeroTalents;
  }

  resetTalents() {
    this.setState(this.createZeroTalents(this.state.commander), () =>
      this.updateURL('update')
    );
  }

  changeTalentValue(color, idx, how) {
    let newArr = this.state[color];
    if (how === 'increase') {
      newArr[idx - 1] += 1;
    } else if (how === 'decrease') {
      newArr[idx - 1] -= 1;
    }
    this.setState({ [color]: newArr }, () => this.updateURL('update'));
  }

  calcPointsSpent() {
    const pointsSpent = [
      ...this.state.red,
      ...this.state.yellow,
      ...this.state.blue
    ].reduce((partial_sum, a) => partial_sum + a, 0);

    return pointsSpent;
  }

  calcPointsRemaining() {
    return this.MAXPOINTS - this.calcPointsSpent();
  }

  render() {
    return (
      <div id="app">
        {this.invalidModalFlag && <InvalidBuildModal />}

        <ErrorBoundary>
          <NavBar
            changeCommander={this.changeCommander}
            resetTalents={this.resetTalents}
            commander={this.state.commander}
          />
        </ErrorBoundary>

        <div id="main-container">
          <ErrorBoundary>
            <SidePanel
              encodeState={this.encodeState}
              decodeState={this.decodeState}
              calcPointsSpent={this.calcPointsSpent}
              calcPointsRemaining={this.calcPointsRemaining}
              commander={this.state.commander}
              red={this.state.red}
              yellow={this.state.yellow}
              blue={this.state.blue}
            />
          </ErrorBoundary>

          <ErrorBoundary>
            <TreePanel
              changeCommander={this.changeCommander}
              resetTalents={this.resetTalents}
              changeTalentValue={this.changeTalentValue}
              calcPointsRemaining={this.calcPointsRemaining}
              commander={this.state.commander}
              red={this.state.red}
              yellow={this.state.yellow}
              blue={this.state.blue}
            />
          </ErrorBoundary>
        </div>
      </div>
    );
  }
}

export default App;
