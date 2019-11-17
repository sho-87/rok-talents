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
//TODO: hide side panel on smaller screens. unmount tree component?

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
    this.encodeState = this.encodeState.bind(this);
    this.decodeState = this.decodeState.bind(this);
    this.copyURL = this.copyURL.bind(this);
    this.toggleSidePanel = this.toggleSidePanel.bind(this);
    this.toggleTotalDisplay = this.toggleTotalDisplay.bind(this);
    this.toggleValueDisplay = this.toggleValueDisplay.bind(this);
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
   * Encode the app `this.state` object
   *
   * @returns {string} Encoded version of the current application state
   * @memberof App
   */
  encodeState() {
    // returns a string
    return window.btoa(JSON.stringify(this.state));
  }

  /**
   * Decode an encoded application state string
   *
   * @param {string} encoded Encoded form of the application state (`this.state`)
   * @param {boolean} [parse=true] Should the decoded string be parsed as an object?
   * @returns {(object|string)} Decode state as a string, or parsed as an object
   * @memberof App
   */
  decodeState(encoded, parse = true) {
    // returns a string or an object (parsed)
    const decoded = window.atob(encoded);
    if (parse) {
      return JSON.parse(decoded);
    } else {
      return decoded;
    }
  }

  /**
   * Update the current URL
   *
   * @param {string} method {update | clear} Should the new URL be updated
   * with the new encoded state or cleared (new app state)?
   * @memberof App
   */
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
    this.setState({ commander: commander, ...zeroTalents }, () =>
      this.updateURL('update')
    );
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
    this.setState(this.createZeroTalents(this.state.commander), () =>
      this.updateURL('update')
    );
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

  render() {
    return (
      <div id="app">
        {this.invalidModalFlag && <InvalidBuildModal />}

        <ErrorBoundary>
          <NavBar
            copyURL={this.copyURL}
            toggleSidePanel={this.toggleSidePanel}
            toggleTotalDisplay={this.toggleTotalDisplay}
            toggleValueDisplay={this.toggleValueDisplay}
            changeCommander={this.changeCommander}
            resetTalents={this.resetTalents}
            commander={this.state.commander}
          />
        </ErrorBoundary>

        <div id="main-container">
          <ErrorBoundary>
            <SidePanel
              ref={component => (this.sidePanelRef = component)}
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
              ref={component => (this.treePanelRef = component)}
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
        </div>
      </div>
    );
  }
}

export default App;
