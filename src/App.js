import React, { Component, Suspense } from 'react';
import ReactGA from 'react-ga';
import Spinner from 'react-bootstrap/Spinner';
import NavBar from './NavBar';
import SidePanel from './SidePanel';
import { InvalidBuildModal } from './Modals';
import ErrorBoundary from './Error';
import loadTreeData from './data/AllTrees';
import Commanders from './data/commanders.json';
import { sumArray, getMaxTalentCount, setTitle, encode, decode } from './utils';
import { maxPoints } from './values';
import { dataVersion } from '../package.json';

import './styles/App.css';
import './styles/fonts.css';

const TreePanel = React.lazy(() => import('./TreePanel'));
let treeData;

//TODO: shouldComponentUpdate pass
//FIXME: only updateurl/encode if that particular tree has changed

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
    this.toggleNodeSize = this.toggleNodeSize.bind(this);
    this.toggleMouseXY = this.toggleMouseXY.bind(this);
    this.toggleTalentID = this.toggleTalentID.bind(this);
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
        //FIXME: this loads treeData twice if url is valid
        this.state = this.getEmptyState();
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
            ...this.state,
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
   * Get empty state values for new application instance. Also checks
   * local storage for saved settings
   *
   * @returns {object} Object containing blank state values
   * @memberof App
   */
  getEmptyState() {
    treeData = loadTreeData(dataVersion);

    const isShownSidePanel = JSON.parse(
      localStorage.getItem('isShownSidePanel')
    );
    const isShownValues = JSON.parse(localStorage.getItem('isShownValues'));
    const isShownTotals = JSON.parse(localStorage.getItem('isShownTotals'));
    const isShownMouseXY = JSON.parse(localStorage.getItem('isShownMouseXY'));
    const isShownTalentID = JSON.parse(localStorage.getItem('isShownTalentID'));

    return {
      dataVersion: dataVersion,
      commander: '',
      red: [],
      yellow: [],
      blue: [],
      nodeSize: localStorage.getItem('nodeSize') || 'M',
      isShownSidePanel: isShownSidePanel === null ? true : isShownSidePanel,
      isShownValues: isShownValues === null ? true : isShownValues,
      isShownTotals: isShownTotals === null ? true : isShownTotals,
      isShownMouseXY: isShownMouseXY === null ? false : isShownMouseXY,
      isShownTalentID: isShownTalentID === null ? false : isShownTalentID
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

        setTitle(
          this.state.commander,
          this.state.red,
          this.state.yellow,
          this.state.blue
        );
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

        ReactGA.event({
          category: 'Navigation',
          action: 'Change commander',
          label: commander
        });
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
    ReactGA.event({
      category: 'App',
      action: 'Reset build'
    });
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
   * Toggle display of side panel
   *
   * @memberof App
   */
  toggleSidePanel() {
    this.setState(
      prevState => ({
        isShownSidePanel: !prevState.isShownSidePanel
      }),
      () => {
        this.treePanelRef.repaint();
        localStorage.setItem('isShownSidePanel', this.state.isShownSidePanel);
      }
    );

    ReactGA.event({
      category: 'Settings',
      action: 'Toggle side panel'
    });
  }

  /**
   * Toggle display of total number of points spent in each tree
   *
   * @memberof App
   */
  toggleTotalDisplay() {
    this.setState(
      prevState => ({
        isShownTotals: !prevState.isShownTotals
      }),
      () => {
        localStorage.setItem('isShownTotals', this.state.isShownTotals);
      }
    );

    ReactGA.event({
      category: 'Settings',
      action: 'Toggle tree totals'
    });
  }

  /**
   * Toggle display of node values
   *
   * @memberof App
   */
  toggleValueDisplay() {
    this.setState(
      prevState => ({
        isShownValues: !prevState.isShownValues
      }),
      () => {
        localStorage.setItem('isShownValues', this.state.isShownValues);
      }
    );

    ReactGA.event({
      category: 'Settings',
      action: 'Toggle node values'
    });
  }

  /**
   * Toggle node size
   *
   * @param {string} size Desired node size
   * @memberof App
   */
  toggleNodeSize(size) {
    this.setState({ nodeSize: size }, () => {
      this.treePanelRef.repaint();
      localStorage.setItem('nodeSize', this.state.nodeSize);
    });

    ReactGA.event({
      category: 'Settings',
      action: 'Toggle node size',
      label: size
    });
  }

  /**
   * Toggle mouse XY position display
   *
   * @memberof App
   */
  toggleMouseXY() {
    this.setState(
      prevState => ({
        isShownMouseXY: !prevState.isShownMouseXY
      }),
      () => {
        this.treePanelRef.toggleMouseListeners();
        localStorage.setItem('isShownMouseXY', this.state.isShownMouseXY);
      }
    );
  }

  /**
   * Toggle tooltip talent ID
   *
   * @memberof App
   */
  toggleTalentID() {
    this.setState(
      prevState => ({
        isShownTalentID: !prevState.isShownTalentID
      }),
      () => {
        localStorage.setItem('isShownTalentID', this.state.isShownTalentID);
      }
    );
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
            toggleNodeSize={this.toggleNodeSize}
            toggleMouseXY={this.toggleMouseXY}
            toggleTalentID={this.toggleTalentID}
            changeCommander={this.changeCommander}
            calcPointsSpent={this.calcPointsSpent}
            resetTalents={this.resetTalents}
            commander={this.state.commander}
            nodeSize={this.state.nodeSize}
            isShownSidePanel={this.state.isShownSidePanel}
            isShownValues={this.state.isShownValues}
            isShownTotals={this.state.isShownTotals}
            isShownMouseXY={this.state.isShownMouseXY}
            isShownTalentID={this.state.isShownTalentID}
          />
        </ErrorBoundary>

        <div id="main-container">
          <Suspense
            fallback={
              <div id="spinner">
                <Spinner size="lg" animation="border" variant="light" />
                <br />
                <span className="sr-only">Loading...</span>
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
                isShownSidePanel={this.state.isShownSidePanel}
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
                nodeSize={this.state.nodeSize}
                isShownValues={this.state.isShownValues}
                isShownTotals={this.state.isShownTotals}
                isShownMouseXY={this.state.isShownMouseXY}
                isShownTalentID={this.state.isShownTalentID}
              />
            </ErrorBoundary>
          </Suspense>
        </div>
      </div>
    );
  }
}

export default App;
