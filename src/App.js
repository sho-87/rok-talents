import React, { Component, Suspense } from 'react';
import ReactGA from 'react-ga';
import Progress from './Progress';
import Spinner from 'react-bootstrap/Spinner';
import GuidedTour from './GuidedTour';
import NavBar from './NavBar';
import InfoPanel from './InfoPanel';
import { InvalidBuildModal, AnnouncementModal } from './Modals';
import ErrorBoundary from './Error';
import loadTreeData from './data/AllTrees';
import Commanders from './data/commanders.json';
import { maxPoints } from './values';
import { version, dataVersion } from '../package.json';
import {
  sumArray,
  getMaxTalentCount,
  getTreeName,
  setTitle,
  isTouchDevice,
  isUpgrade,
  isNewUser,
  encode,
  decode
} from './utils';

import './styles/App.css';
import './styles/fonts.css';

const TreePanel = React.lazy(() => import('./TreePanel'));
let treeData;

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

    // Set initial state from query string
    const urlParams = this.props.url.slice(1).split(';');

    if (this.props.isEmbed) {
      ReactGA.event({
        category: 'Load',
        action: 'Embed'
      });
    }

    switch (urlParams.length) {
      case 1: // blank url
        this.state = this.getEmptyState();
        treeData = loadTreeData(dataVersion);
        this.updateURL('clear');
        ReactGA.event({
          category: 'Load',
          action: 'New'
        });
        break;
      case 5: // complete url
      case 6: // embed url
        // eslint-disable-next-line
        let path, urlDataVersion, comID, red, yellow, blue;
        if (urlParams.length === 5) {
          [urlDataVersion, comID, red, yellow, blue] = urlParams;
        } else if (urlParams.length === 6) {
          [path, urlDataVersion, comID, red, yellow, blue] = urlParams;
        }
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
          this.state = this.getEmptyState();
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
              // Store color array in state
              this.state[color[1]] = talents;

              // Calculate stats for the color
              const treeName = getTreeName(color[1], commanderName);
              for (let i = 0; i < talents.length; i++) {
                const talentData = treeData[treeName][i + 1];
                const stat = talentData['stats'];

                if (talents[i] > 0 && stat) {
                  const multiStat = Array.isArray(stat);
                  if (multiStat) {
                    for (let j = 0; j < stat.length; j++) {
                      this.state.stats[stat[j]] +=
                        talentData['values'][talents[i] - 1];
                    }
                  } else {
                    this.state.stats[stat] +=
                      talentData['values'][talents[i] - 1];
                  }
                }
              }
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
          treeData = loadTreeData(dataVersion);
          this.updateURL('clear');
          ReactGA.event({
            category: 'Load',
            action: 'Error',
            label: this.props.url
          });
        } else {
          this.updateURL('update');
          ReactGA.event({
            category: 'Load',
            action: 'Existing',
            label: this.props.url
          });
        }
        break;
      default:
        // Incorrect number of url params
        this.invalidBuildMessage = `Incorrect number of build parameters (length: ${urlParams.length}, expected: 5)`;
        this.invalidModalFlag = true;
        this.state = this.getEmptyState();
        treeData = loadTreeData(dataVersion);
        this.updateURL('clear');
        ReactGA.event({
          category: 'Load',
          action: 'Error',
          label: this.props.url
        });
    }
  }

  componentDidMount() {
    if (!this.props.isEmbed) {
      localStorage.setItem('version', version);
    }

    if (isNewUser()) {
      localStorage.setItem('isNewUser', false);
    }

    this.setState({ showProgress: false });
  }

  /**
   * Get empty state values for new application instance. Also checks
   * local storage for saved settings
   *
   * @returns {object} Object containing blank state values
   * @memberof App
   */
  getEmptyState = () => {
    let storage;

    if (this.props.isEmbed) {
      // Set default settings for embedded mode
      storage = {
        nodeSize: 'L',
        isShownInfoPanel: false,
        isShownValues: true,
        isShownTotals: true,
        isScreenshotStats: false,
        isSpeedMode: false,
        isShownMouseXY: false,
        isShownTalentID: false
      };
    } else {
      // Get/set default settings for regular mode
      const isShownInfoPanel = JSON.parse(
        localStorage.getItem('isShownInfoPanel')
      );
      const isShownValues = JSON.parse(localStorage.getItem('isShownValues'));
      const isShownTotals = JSON.parse(localStorage.getItem('isShownTotals'));
      const isScreenshotStats = JSON.parse(
        localStorage.getItem('isScreenshotStats')
      );
      const isSpeedMode = JSON.parse(localStorage.getItem('isSpeedMode'));
      const isShownMouseXY = JSON.parse(localStorage.getItem('isShownMouseXY'));
      const isShownTalentID = JSON.parse(
        localStorage.getItem('isShownTalentID')
      );

      // Default values
      storage = {
        nodeSize: localStorage.getItem('nodeSize') || 'M',
        isShownInfoPanel: isShownInfoPanel === null ? true : isShownInfoPanel,
        isShownValues: isShownValues === null ? true : isShownValues,
        isShownTotals: isShownTotals === null ? true : isShownTotals,
        isScreenshotStats:
          isScreenshotStats === null ? false : isScreenshotStats,
        isSpeedMode: isSpeedMode === null ? false : isSpeedMode,
        isShownMouseXY: isShownMouseXY === null ? false : isShownMouseXY,
        isShownTalentID: isShownTalentID === null ? false : isShownTalentID
      };
    }

    return {
      showProgress: true,
      dataVersion: dataVersion,
      commander: '',
      red: [],
      yellow: [],
      blue: [],
      stats: this.getEmptyStats(),
      ...storage
    };
  };

  /**
   * Get object containing all stats and set them to 0
   *
   * @returns {object} Object containing stats with 0 values
   * @memberof App
   */
  getEmptyStats = () => {
    return { Attack: 0, Defense: 0, Health: 0, 'March Speed': 0 };
  };

  /**
   * Update the current URL
   *
   * @param {string} method {update | clear} Should the new URL be updated
   * with the new state or cleared (new app state)?
   * @memberof App
   */
  updateURL = method => {
    let queryString;

    switch (method) {
      case 'update':
        queryString =
          '?' +
          (this.props.isEmbed ? 'embed;' : '') +
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
  };

  /**
   * Set blank state object for the newly selected commander,
   * followed by `this.updateURL()`
   *
   * @param {string} commander Name of the commander being changed to
   * @memberof App
   */
  changeCommander = commander => {
    if (this.state.dataVersion !== dataVersion) {
      treeData = loadTreeData(dataVersion);
    }

    const zeroTalents = this.createZeroTalents(commander);
    this.setState(
      {
        dataVersion: dataVersion,
        commander: commander,
        ...zeroTalents,
        stats: this.getEmptyStats()
      },
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

    if (!isTouchDevice()) {
      this.treePanelRef.resetPanZoom();
    }
  };

  /**
   * Create a new/blank state object for a commander. The individual talent
   * tree arrays will be filled with an appropriate number of `0`
   *
   * @param {string} commander Name of commander to create empty talents for
   * @returns {object} Object containing `0` arrays for each tree color
   * @memberof App
   */
  createZeroTalents = commander => {
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
  };

  /**
   * Set all tree node values to `0` for the currently selected commander
   *
   * @memberof App
   */
  resetTalents = () => {
    ReactGA.event({
      category: 'App',
      action: 'Reset build'
    });
    this.changeCommander(this.state.commander);
  };

  /**
   * Change the value of a single talent node. Followed by `this.updateURL()`
   *
   * @param {string} color Color of the tree the node belongs to
   * @param {number} idx Index of the node in the tree/color array.
   * @param {number} valueIdx Index of the changed value.
   * @param {string} how {increase | decrease} Should node value be increased
   *  or decreased?
   * @memberof App
   */
  changeTalentValue = (color, idx, valueIdx, how) => {
    let talent = treeData[Commanders[this.state.commander][color]][idx];
    let stat = talent['stats'];
    let multiStat = Array.isArray(stat);
    let newArr = this.state[color];
    let newStats = { ...this.state.stats };

    if (how === 'increase') {
      newArr[idx - 1] += 1;

      // increase stat value
      if (stat) {
        if (multiStat) {
          // multi-stat
          stat.forEach(curStat => {
            if (valueIdx === 0) {
              newStats[curStat] += talent['values'][0];
            } else {
              newStats[curStat] +=
                talent['values'][valueIdx] - talent['values'][valueIdx - 1];
            }
          });
        } else {
          // single stat
          if (valueIdx === 0) {
            newStats[stat] += talent['values'][0];
          } else {
            newStats[stat] +=
              talent['values'][valueIdx] - talent['values'][valueIdx - 1];
          }
        }
      }
    } else if (how === 'decrease') {
      newArr[idx - 1] -= 1;

      // decrease stat value
      if (stat) {
        if (multiStat) {
          // multi-stat
          stat.forEach(curStat => {
            if (valueIdx <= 1) {
              newStats[curStat] -= talent['values'][0];
            } else {
              newStats[curStat] -=
                talent['values'][valueIdx - 1] - talent['values'][valueIdx - 2];
            }
          });
        } else {
          // single stat
          if (valueIdx <= 1) {
            newStats[stat] -= talent['values'][0];
          } else {
            newStats[stat] -=
              talent['values'][valueIdx - 1] - talent['values'][valueIdx - 2];
          }
        }
      }
    }

    this.setState({ [color]: newArr, stats: newStats }, () =>
      this.updateURL('update')
    );
  };

  /**
   * Get the maximum number of available points for each talent
   *
   * @param {string} commander Name of the commander
   * @param {string} color Color of the tree to get max values for
   * @returns {Number[]} Array of maximum available points for each talent in the tree
   * @memberof App
   */
  createMaxValueArray = (commander, color) => {
    let maxArray = [];

    Object.keys(treeData[Commanders[commander][color]]).forEach(id => {
      maxArray.push(
        getMaxTalentCount(treeData[Commanders[commander][color]][id]['values'])
      );
    });

    return maxArray;
  };

  /**
   * Calculate the total number of talent points spent. This is just a sum
   * of all the color/tree array values
   *
   * @param {string} color Color of the tree to sum. Omitting this param sums
   * across all trees
   * @returns {number} Total number of talent points spent
   * @memberof App
   */
  calcPointsSpent = (color = 'total') => {
    let points;

    if (color === 'total') {
      points = [...this.state.red, ...this.state.yellow, ...this.state.blue];
    } else {
      points = [...this.state[color]];
    }

    return sumArray(points);
  };

  /**
   * Calculate number of remaining talent points available to be spent
   *
   * @returns {number} Number of remaining talent points
   * @memberof App
   */
  calcPointsRemaining = () => {
    return maxPoints - this.calcPointsSpent();
  };

  /**
   * Toggle display of info panel
   *
   * @memberof App
   */
  toggleInfoPanel = () => {
    this.setState(
      prevState => ({
        isShownInfoPanel: !prevState.isShownInfoPanel
      }),
      () => {
        this.treePanelRef.repaint();
        localStorage.setItem('isShownInfoPanel', this.state.isShownInfoPanel);
      }
    );

    ReactGA.event({
      category: 'Settings',
      action: 'Toggle info panel'
    });
  };

  /**
   * Toggle display of total number of points spent in each tree
   *
   * @memberof App
   */
  toggleTotalDisplay = () => {
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
  };

  /**
   * Toggle display of node values
   *
   * @memberof App
   */
  toggleValueDisplay = () => {
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
  };

  /**
   * Toggle node size
   *
   * @param {string} size Desired node size
   * @memberof App
   */
  toggleNodeSize = size => {
    this.setState({ nodeSize: size }, () => {
      this.treePanelRef.repaint();
      localStorage.setItem('nodeSize', this.state.nodeSize);
    });

    ReactGA.event({
      category: 'Settings',
      action: 'Toggle node size',
      label: size
    });
  };

  /**
   * Toggle screenshot stats
   *
   * @memberof App
   */
  toggleScreenshotStats = () => {
    this.setState(
      prevState => ({
        isScreenshotStats: !prevState.isScreenshotStats
      }),
      () => {
        localStorage.setItem('isScreenshotStats', this.state.isScreenshotStats);
      }
    );

    ReactGA.event({
      category: 'Settings',
      action: 'Toggle screenshot stats'
    });
  };

  /**
   * Toggle speed mode
   *
   * @memberof App
   */
  toggleSpeedMode = () => {
    this.setState(
      prevState => ({
        isSpeedMode: !prevState.isSpeedMode
      }),
      () => {
        this.treePanelRef.drawLines();
        localStorage.setItem('isSpeedMode', this.state.isSpeedMode);
      }
    );

    ReactGA.event({
      category: 'Settings',
      action: 'Toggle speed mode'
    });
  };

  /**
   * Toggle mouse XY position display
   *
   * @memberof App
   */
  toggleMouseXY = () => {
    this.setState(
      prevState => ({
        isShownMouseXY: !prevState.isShownMouseXY
      }),
      () => {
        this.treePanelRef.toggleMouseListeners();
        localStorage.setItem('isShownMouseXY', this.state.isShownMouseXY);
      }
    );
  };

  /**
   * Toggle tooltip talent ID
   *
   * @memberof App
   */
  toggleTalentID = () => {
    this.setState(
      prevState => ({
        isShownTalentID: !prevState.isShownTalentID
      }),
      () => {
        localStorage.setItem('isShownTalentID', this.state.isShownTalentID);
      }
    );
  };

  /**
   * Toggle guided tour
   *
   * @memberof App
   */
  toggleTour = () => {
    this.tourRef.restartTour();
  };

  /**
   * Toggle announcement
   *
   * @memberof App
   */
  toggleAnnounce = () => {
    this.announceRef.show();
  };

  render() {
    return (
      <div id="app">
        {!this.props.isEmbed && (
          <GuidedTour ref={component => (this.tourRef = component)} />
        )}

        {this.invalidModalFlag && (
          <InvalidBuildModal message={this.invalidBuildMessage} />
        )}

        <AnnouncementModal
          ref={component => (this.announceRef = component)}
          isEmbed={this.props.isEmbed}
          isUpgrade={
            localStorage.getItem('version')
              ? isUpgrade(localStorage.getItem('version'), version)
              : true
          }
          isNewUser={isNewUser()}
          isInvalidBuild={this.invalidModalFlag}
        />

        <Progress
          isAnimating={this.state.showProgress}
          animationDuration={1000}
        />

        {!this.props.isEmbed && (
          <ErrorBoundary>
            <NavBar
              toggleInfoPanel={this.toggleInfoPanel}
              toggleTotalDisplay={this.toggleTotalDisplay}
              toggleValueDisplay={this.toggleValueDisplay}
              toggleNodeSize={this.toggleNodeSize}
              toggleScreenshotStats={this.toggleScreenshotStats}
              toggleSpeedMode={this.toggleSpeedMode}
              toggleMouseXY={this.toggleMouseXY}
              toggleTalentID={this.toggleTalentID}
              toggleAnnounce={this.toggleAnnounce}
              toggleTour={this.toggleTour}
              changeCommander={this.changeCommander}
              calcPointsSpent={this.calcPointsSpent}
              resetTalents={this.resetTalents}
              commander={this.state.commander}
              red={this.state.red}
              yellow={this.state.yellow}
              blue={this.state.blue}
              nodeSize={this.state.nodeSize}
              isShownInfoPanel={this.state.isShownInfoPanel}
              isShownValues={this.state.isShownValues}
              isShownTotals={this.state.isShownTotals}
              isScreenshotStats={this.state.isScreenshotStats}
              isSpeedMode={this.state.isSpeedMode}
              isShownMouseXY={this.state.isShownMouseXY}
              isShownTalentID={this.state.isShownTalentID}
            />
          </ErrorBoundary>
        )}

        <div id="main-container">
          <Suspense
            fallback={
              <div id="spinner">
                <Spinner size="lg" animation="border" variant="light" />
                <br />
                <span>Loading</span>
              </div>
            }
          >
            {!this.props.isEmbed && (
              <ErrorBoundary>
                <InfoPanel
                  ref={component => (this.infoPanelRef = component)}
                  calcPointsSpent={this.calcPointsSpent}
                  calcPointsRemaining={this.calcPointsRemaining}
                  treeData={treeData}
                  commander={this.state.commander}
                  red={this.state.red}
                  yellow={this.state.yellow}
                  blue={this.state.blue}
                  stats={this.state.stats}
                  isShownInfoPanel={this.state.isShownInfoPanel}
                />
              </ErrorBoundary>
            )}

            <ErrorBoundary>
              <TreePanel
                ref={component => (this.treePanelRef = component)}
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
                isSpeedMode={this.state.isSpeedMode}
                isShownMouseXY={this.state.isShownMouseXY}
                isShownTalentID={this.state.isShownTalentID}
                isEmbed={this.props.isEmbed}
              />
            </ErrorBoundary>
          </Suspense>
        </div>
      </div>
    );
  }
}

export default App;
