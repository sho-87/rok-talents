import React, { Component, Suspense } from 'react';
import { Spinner } from 'reactstrap';
import NavBar from './NavBar';
import SidePanel from './SidePanel';
import { InvalidBuildModal } from './Modals';
import ErrorBoundary from './Error';

import { sumArray, getMaxTalentCount, encode, decode } from './utils';
import loadTreeData from './data/AllTrees';
import Commanders from './data/Commanders.json';
import { maxPoints } from './values';
import { dataVersion } from '../package.json';

import './styles/App.css';
import 'bootstrap/dist/css/bootstrap.min.css';

const TreePanel = React.lazy(() => import('./TreePanel'));
let treeData;

//FIXME: only updateurl/encode if that particular tree has changed
//FIXME: use shouldComponentUpdate
//TODO: dynamically calculate data version

/**
 * Main application component. Contains high level logic for managing application state
 *
 * @class App
 * @extends {Component}
 */
class App extends Component {
  constructor(props) {
    super(props);
    this.invalidModalFlag = false;
    this.invalidBuildMessage = '';

    // Context bindings
    this.toggleSidePanel = this.toggleSidePanel.bind(this);
    this.toggleTotalDisplay = this.toggleTotalDisplay.bind(this);
    this.toggleValueDisplay = this.toggleValueDisplay.bind(this);
    this.toggleMousePosition = this.toggleMousePosition.bind(this);
    this.toggleSelect = this.toggleSelect.bind(this);
    this.changeCommander = this.changeCommander.bind(this);
    this.resetTalents = this.resetTalents.bind(this);
    this.changeTalentValue = this.changeTalentValue.bind(this);
    this.calcPointsSpent = this.calcPointsSpent.bind(this);
    this.calcPointsRemaining = this.calcPointsRemaining.bind(this);

    // Set initial state from query string
    const urlParams = this.props.url.slice(1).split(';');

    switch (urlParams.length) {
      case 1: // blank url
        this.state = this.getEmptyState();
        this.updateURL('clear');
        break;
      case 5: // complete url
        let [urlDataVersion, comID, red, yellow, blue] = urlParams;
        urlDataVersion = parseInt(urlDataVersion);

        const commanderName = Object.keys(Commanders).find(
          key => Commanders[key]['id'] === comID
        );

        // Check for invalid build
        if (urlDataVersion > dataVersion) {
          this.invalidBuildMessage = 'Incorrect game data version';
          this.invalidModalFlag = true;
        } else if (!commanderName) {
          this.invalidBuildMessage = 'Unknown commander ID';
          this.invalidModalFlag = true;
        } else {
          treeData = loadTreeData(urlDataVersion);
          this.state = {
            dataVersion: urlDataVersion,
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
            let talents = decode(color[0])
              .split('')
              .map(Number);
            const maxArray = this.createMaxValueArray(
              this.state.commander,
              color[1]
            );

            if (talents.length !== this.state[color[1]].length) {
              // Check talent array is correct length
              this.invalidBuildMessage = `Incorrect number of talents (${color[1]} tree)`;
              this.invalidModalFlag = true;
              break;
            } else if (
              // Check spent values are not too large
              talents.some(function(el, idx) {
                return el > maxArray[idx];
              })
            ) {
              this.invalidBuildMessage = `Too many points assigned in talent (${color[1]} tree)`;
              this.invalidModalFlag = true;
              break;
            } else {
              this.state[color[1]] = talents;
            }
          }

          // Check that the talent build has not overspent points
          if (this.calcPointsRemaining() < 0) {
            this.invalidBuildMessage = `Number of spent talent points exceeds maximum`;
            this.invalidModalFlag = true;
          }
        }

        if (this.invalidModalFlag) {
          this.state = this.getEmptyState();
          this.updateURL('clear');
        } else {
          this.updateURL('update');
        }
        break;
      default:
        // Incorrect number of url params
        this.invalidBuildMessage = `Incorrect number of build parameters (length: ${urlParams.length}, expected: 5)`;
        this.invalidModalFlag = true;
        this.state = this.getEmptyState();
        this.updateURL('clear');
    }
  }

  /**
   * Get empty state values for new application instance
   *
   * @returns {object} Object containing blank state values
   * @memberof App
   */
  getEmptyState() {
    treeData = loadTreeData(dataVersion);

    return {
      dataVersion: dataVersion,
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
            this.state.dataVersion,
            Commanders[this.state.commander].id,
            encode(this.state.red.join('')),
            encode(this.state.yellow.join('')),
            encode(this.state.blue.join(''))
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
   * Set blank state object for the newly selected commander,
   * followed by `this.updateURL()`
   *
   * @param {string} commander Name of the commander being changed to
   * @memberof App
   */
  changeCommander(commander) {
    if (this.state.dataVersion !== dataVersion) {
      treeData = loadTreeData(dataVersion);
    }

    const zeroTalents = this.createZeroTalents(commander);
    this.setState(
      { dataVersion: dataVersion, commander: commander, ...zeroTalents },
      () => {
        this.updateURL('update');
        this.treePanelRef.drawLines();
      }
    );

    this.treePanelRef.resetPanZoom();
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
    const numRed = Object.keys(treeData[Commanders[commander]['red']]).length;
    const numYellow = Object.keys(treeData[Commanders[commander]['yellow']])
      .length;
    const numBlue = Object.keys(treeData[Commanders[commander]['blue']]).length;

    const zeroTalents = {
      red: Array(numRed).fill(0),
      yellow: Array(numYellow).fill(0),
      blue: Array(numBlue).fill(0)
    };

    return zeroTalents;
  }

  /**
   * Set all tree node values to `0` for the currently selected commander
   *
   * @memberof App
   */
  resetTalents() {
    this.changeCommander(this.state.commander);
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
  createMaxValueArray(commander, color) {
    let maxArray = [];

    Object.keys(treeData[Commanders[commander][color]]).forEach(id => {
      maxArray.push(
        getMaxTalentCount(treeData[Commanders[commander][color]][id]['values'])
      );
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
    let points;

    if (color === 'total') {
      points = [...this.state.red, ...this.state.yellow, ...this.state.blue];
    } else {
      points = [...this.state[color]];
    }

    return sumArray(points);
  }

  /**
   * Calculate number of remaining talent points available to be spent
   *
   * @returns {number} Number of remaining talent points
   * @memberof App
   */
  calcPointsRemaining() {
    return maxPoints - this.calcPointsSpent();
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
   * Toggle mouse position display. Uses a ref to the tree panel
   *
   * @memberof App
   */
  toggleMousePosition() {
    this.treePanelRef.toggleMousePosition();
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
        {this.invalidModalFlag && (
          <InvalidBuildModal message={this.invalidBuildMessage} />
        )}

        <ErrorBoundary>
          <NavBar
            ref={component => (this.navBarRef = component)}
            toggleSidePanel={this.toggleSidePanel}
            toggleTotalDisplay={this.toggleTotalDisplay}
            toggleValueDisplay={this.toggleValueDisplay}
            toggleMousePosition={this.toggleMousePosition}
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
                treeData={treeData}
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
                treeData={treeData}
                dataVersion={this.state.dataVersion}
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
