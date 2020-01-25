import React, { Component } from 'react';
import Collapse from 'react-bootstrap/Collapse';
import { getMaxTalentCount, replaceTalentText } from './utils';

import Commanders from './data/Commanders.json';

//FIXME: calc stats is super inefficient. each node is checked multiple times for each stat

/**
 * Stats panel component displaying stats about the current talent build
 *
 * @class StatsPanel
 * @extends {Component}
 */
class StatsPanel extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isShownMainStats: false
    };

    // Context bindings
    this.toggleMainStats = this.toggleMainStats.bind(this);
  }

  /**
   * Toggles visibility of the main talents section
   *
   * @memberof StatsPanel
   */
  toggleMainStats() {
    this.setState(prevState => ({
      isShownMainStats: !prevState.isShownMainStats
    }));
  }

  /**
   * Calculate the total value of a given stat (e.g. attack, health). Additionally,
   * stores an array of the bonus stats that don't belong in any of the base state categories
   *
   * @param {string} stat Name of the stat to be calculated (e.g. Defense)
   * @returns {(String[]|number)} Calculated value of the stat, or array of all selected
   * bonus stats
   * @memberof StatsPanel
   */
  calcStats(stat) {
    const commander = this.props.commander;
    let statValue = 0;
    let main = [];

    ['red', 'yellow', 'blue'].forEach(color => {
      const nodes = this.props[color];

      if (nodes.some(values => values !== 0)) {
        nodes.forEach((value, idx) => {
          const talentInfo = this.props.treeData[Commanders[commander][color]][
            idx + 1
          ];
          const talentStat = talentInfo.stats;
          if (value > 0) {
            if (talentStat === stat) {
              statValue += talentInfo.values[value - 1];
            } else if (stat === 'Main' && talentStat === '') {
              main.push(
                <div
                  key={talentInfo.name}
                  className={`stats-panel-main`}
                  onClick={this.toggleMainStats}
                >
                  <div className="stats-panel-main-title">
                    <span
                      className={`stats-panel-main-bullet bg-${color}`}
                    ></span>
                    {`${talentInfo.name} (${value}/${getMaxTalentCount(
                      talentInfo.values
                    )})`}
                  </div>
                  <Collapse in={this.state.isShownMainStats}>
                    <div className="stats-panel-main-text">
                      {replaceTalentText(
                        talentInfo.text,
                        talentInfo.values,
                        value - 1
                      )}
                    </div>
                  </Collapse>
                </div>
              );
            }
          }
        });
      }
    });

    if (stat === 'Main') {
      return main;
    } else {
      return statValue;
    }
  }

  render() {
    return (
      <div id="stats-panel">
        <div className="info-box">
          <h1>Stats</h1>
          <div id="stats-panel-stats">
            <p>Attack: {this.calcStats('Attack')}%</p>
            <p>Defense: {this.calcStats('Defense')}%</p>
            <p>Health: {this.calcStats('Health')}%</p>
            <p>March Speed: {this.calcStats('March Speed')}%</p>
          </div>
        </div>

        <div className="info-box">
          <h1 onClick={this.toggleMainStats}>
            Main Talents{' '}
            <span className="stats-panel-expand">
              {this.state.isShownMainStats ? '(collapse)' : '(expand)'}
            </span>
          </h1>
          <div data-testid="stats-panel-main-talents">
            {this.calcStats('Main')}
          </div>
        </div>
      </div>
    );
  }
}

export default StatsPanel;
