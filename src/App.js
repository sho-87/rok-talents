import React, { Component, Suspense } from 'react';
import { Spinner } from 'reactstrap';
import NavBar from './NavBar';
import SidePanel from './SidePanel';
import { InvalidBuildModal } from './Modals';
import ErrorBoundary from './Error';

import Trees from './data/AllTrees';
import Commanders from './data/Commanders.json';

import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';

const TreePanel = React.lazy(() => import('./TreePanel'));

//TODO: add tree/game/data version to state and data files
//TODO: add warning if loaded build is using old data version
//TODO: further shorten url - lzstring? base64? URI?
//TODO: manually encode/shorten state containing repeat characters?
//TODO: tree based data structure?
//FIXME: webpack hot module replacement (HMR) waiting for update

/**
 * Main application component. Contains high level logic for managing application state
 *
 * @class App
 * @extends {Component}
 */
class App extends Component {
  constructor(props) {
    super(props);

    /** Maximum number of talent points available in the game */
    this.MAXPOINTS = 74;
    /** Flag controlling the visibility of the "Invalid build" modal */
    this.invalidModalFlag = false;

    // Context bindings
    this.encode = this.encode.bind(this);
    this.decode = this.decode.bind(this);
    this.copyURL = this.copyURL.bind(this);
    this.toggleSidePanel = this.toggleSidePanel.bind(this);
    this.toggleTotalDisplay = this.toggleTotalDisplay.bind(this);
    this.toggleValueDisplay = this.toggleValueDisplay.bind(this);
    this.toggleSelect = this.toggleSelect.bind(this);
    this.changeCommander = this.changeCommander.bind(this);
    this.resetTalents = this.resetTalents.bind(this);
    this.changeTalentValue = this.changeTalentValue.bind(this);
    this.calcPointsSpent = this.calcPointsSpent.bind(this);
    this.calcPointsRemaining = this.calcPointsRemaining.bind(this);

    // Set initial state from query string
    const urlParams = window.location.search.slice(1).split(';');

    if (urlParams.length === 5) {
      const [version, comID, red, yellow, blue] = urlParams;

      const commanderName = Object.keys(Commanders).find(
        key => Commanders[key]['id'] === comID
      );

      this.state = {
        commander: commanderName,
        ...this.createZeroTalents(commanderName)
      };

      const colorPairs = [
        [red, 'red'],
        [yellow, 'yellow'],
        [blue, 'blue']
      ];

      for (let color of colorPairs) {
        // Decode and split talent string into array
        let talents = this.decode(color[0])
          .split('')
          .map(Number);
        const maxArray = this.getMaxValues(this.state.commander, color[1]);

        // Check querystring array is correct length and values are not too large
        if (
          (talents.length === this.state[color[1]].length) &
          talents.every(function(el, idx) {
            return el <= maxArray[idx];
          })
        ) {
          this.state[color[1]] = talents;
        } else {
          this.invalidModalFlag = true;
          break;
        }
      }

      // Check that the talent build has not overspent points
      if (this.calcPointsRemaining() < 0) {
        this.invalidModalFlag = true;
      }

      if (this.invalidModalFlag) {
        this.state = this.getEmptyState();
        this.updateURL('clear');
      } else {
        this.updateURL('update');
      }
    } else {
      this.state = this.getEmptyState();
    }
  }

  /**
   * Get empty state values for new application instance
   *
   * @returns {object} Object containing blank state values
   * @memberof App
   */
  getEmptyState() {
    return {
      commander: '',
      red: [],
      yellow: [],
      blue: []
    };
  }

  /**
   * Set app state to empty and update the current URL
   *
   * @memberof App
   */
  setEmptyState() {
    this.setState(this.getEmptyState(), () => {
      this.updateURL('clear');
    });
  }

  /**
   * Encode/compress the passed text
   *
   * @param {string} text Text to be encoded/compressed
   * @returns {string} Encoded/compressed version of the text
   * @memberof App
   */
  encode(text) {
    //return window.btoa(JSON.stringify(this.state));
    return text;
  }

  /**
   * Decode encoded text
   *
   * @param {string} encoded Encoded form of the text
   * @returns {string} Decoded string
   * @memberof App
   */
  decode(encoded) {
    // return window.atob(encoded);
    return encoded;
  }

  /**
   * Update the current URL
   *
   * @param {string} method {update | clear} Should the new URL be updated
   * with the new state or cleared (new app state)?
   * @memberof App
   */
  updateURL(method) {
    let queryString;

    switch (method) {
      case 'update':
        queryString =
          '?' +
          [
            1, //placeholder
            Commanders[this.state.commander].id,
            this.encode(this.state.red.join('')),
            this.encode(this.state.yellow.join('')),
            this.encode(this.state.blue.join(''))
          ].join(';');

        break;
      case 'clear':
        queryString = '/';
        break;
      default:
        break;
    }
    window.history.replaceState('', '', queryString);
  }

  /**
   * Copy the current application URL to clipboard
   *
   * @memberof App
   */
  copyURL() {
    this.treePanelRef.showCopyToast();

    const dummy = document.createElement('input');
    const url = window.location.href;

    document.body.appendChild(dummy);
    dummy.value = url;
    dummy.select();
    document.execCommand('copy');
    document.body.removeChild(dummy);
  }

  /**
   * Set blank state object for the newly selected commander,
   * followed by `this.updateURL()`
   *
   * @param {string} commander Name of the commander being changed to
   * @memberof App
   */
  changeCommander(commander) {
    const zeroTalents = this.createZeroTalents(commander);
    this.setState({ commander: commander, ...zeroTalents }, () => {
      this.updateURL('update');
      this.treePanelRef.drawLines();
    });
  }

  /**
   * Create a new/blank state object for a commander. The individual talent
   * tree arrays will be filled with an appropriate number of `0`
   *
   * @param {string} commander Name of commander to create empty talents for
   * @returns {object} Object containing `0` arrays for each tree color
   * @memberof App
   */
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

  /**
   * Set all tree node values to `0` for the currently selected commander. Followed
   * by `this.updateURL()`
   *
   * @memberof App
   */
  resetTalents() {
    this.setState(this.createZeroTalents(this.state.commander), () => {
      this.updateURL('update');
      this.treePanelRef.drawLines();
    });
  }

  /**
   * Change the value of a single talent node. Followed by `this.updateURL()`
   *
   * @param {string} color Color of the tree the node belongs to
   * @param {number} idx Index of the node in the tree/color array.
   * @param {string} how {increase | decrease} Should node value be increased
   *  or decreased?
   * @memberof App
   */
  changeTalentValue(color, idx, how) {
    let newArr = this.state[color];
    if (how === 'increase') {
      newArr[idx - 1] += 1;
    } else if (how === 'decrease') {
      newArr[idx - 1] -= 1;
    }
    this.setState({ [color]: newArr }, () => this.updateURL('update'));
  }

  /**
   * Get the maximum number of available points for each talent
   *
   * @param {string} commander Name of the commander
   * @param {string} color Color of the tree to get max values for
   * @returns {Number[]} Array of maximum available points for each talent in the tree
   * @memberof App
   */
  getMaxValues(commander, color) {
    let maxArray = [];

    Object.keys(Trees[Commanders[commander][color]]).forEach(key => {
      maxArray.push(Trees[Commanders[commander][color]][key]['values'].length);
    });

    return maxArray;
  }

  /**
   * Calculate the total number of talent points spent. This is just a sum
   * of all the color/tree array values
   *
   * @param {string} color Color of the tree to sum. Omitting this param sums
   * across all trees
   * @returns {number} Total number of talent points spent
   * @memberof App
   */
  calcPointsSpent(color = 'total') {
    let pointsSpent = 'NA';

    if (color === 'total') {
      pointsSpent = [
        ...this.state.red,
        ...this.state.yellow,
        ...this.state.blue
      ].reduce((partial, a) => partial + a, 0);
    } else {
      pointsSpent = [...this.state[color]].reduce(
        (partial, a) => partial + a,
        0
      );
    }

    return pointsSpent;
  }

  /**
   * Calculate number of remaining talent points available to be spent
   *
   * @returns {number} Number of remaining talent points
   * @memberof App
   */
  calcPointsRemaining() {
    return this.MAXPOINTS - this.calcPointsSpent();
  }

  /**
   * Toggle display of side panel. Uses a ref to the side panel
   *
   * @memberof App
   */
  toggleSidePanel() {
    this.sidePanelRef.toggleSidePanel();
  }

  /**
   * Toggle display of node values. Uses a ref to the tree panel
   *
   * @memberof App
   */
  toggleTotalDisplay() {
    this.treePanelRef.toggleTotalDisplay();
  }

  /**
   * Toggle display of total number of points spent in each tree. Uses a ref
   * to the tree panel
   *
   * @memberof App
   */
  toggleValueDisplay() {
    this.treePanelRef.toggleValueDisplay();
  }

  /**
   * Toggle commander select dropdown. Uses a ref to the navbar
   *
   * @memberof App
   */
  toggleSelect() {
    this.navBarRef.toggleSelect();
  }

  render() {
    return (
      <div id="app">
        {this.invalidModalFlag && <InvalidBuildModal />}

        <ErrorBoundary>
          <NavBar
            ref={component => (this.navBarRef = component)}
            copyURL={this.copyURL}
            toggleSidePanel={this.toggleSidePanel}
            toggleTotalDisplay={this.toggleTotalDisplay}
            toggleValueDisplay={this.toggleValueDisplay}
            changeCommander={this.changeCommander}
            calcPointsSpent={this.calcPointsSpent}
            resetTalents={this.resetTalents}
            commander={this.state.commander}
          />
        </ErrorBoundary>

        <div id="main-container">
          <Suspense
            fallback={
              <div id="spinner">
                <Spinner size="lg" color="primary" />
                <br />
                Loading...
              </div>
            }
          >
            <ErrorBoundary>
              <SidePanel
                ref={component => (this.sidePanelRef = component)}
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
                ref={component => (this.treePanelRef = component)}
                toggleSelect={this.toggleSelect}
                changeCommander={this.changeCommander}
                resetTalents={this.resetTalents}
                changeTalentValue={this.changeTalentValue}
                calcPointsSpent={this.calcPointsSpent}
                calcPointsRemaining={this.calcPointsRemaining}
                commander={this.state.commander}
                red={this.state.red}
                yellow={this.state.yellow}
                blue={this.state.blue}
              />
            </ErrorBoundary>
          </Suspense>
        </div>
      </div>
    );
  }
}

export default App;
