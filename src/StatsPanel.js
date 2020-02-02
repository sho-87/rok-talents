import React, { Component } from 'react';

import Commanders from './data/Commanders.json';
import './styles/StatsPanel.css';

//FIXME: calcStats is inefficient. Iterate once over everything (instead of once for each stat)

/**
 * Stats panel component displaying stats about the current talent build
 *
 * @class StatsPanel
 * @extends {Component}
 */
class StatsPanel extends Component {
  /**
   * Calculate the total value of a given stat (e.g. attack, health)
   *
   * @param {string} stat Name of the stat to be calculated (e.g. Defense)
   * @returns {number} Calculated value of the stat
   * @memberof StatsPanel
   */
  calcStats(stat) {
    const commander = this.props.commander;
    let statValue = 0;

    ['red', 'yellow', 'blue'].forEach(color => {
      const nodes = this.props[color];

      if (nodes.some(values => values !== 0)) {
        nodes.forEach((value, idx) => {
          const talentInfo = this.props.treeData[Commanders[commander][color]][
            idx + 1
          ];

          if (value > 0 && talentInfo.stats === stat) {
            statValue += talentInfo.values[value - 1];
          }
        });
      }
    });

    return statValue;
  }

  render() {
    return (
      <div id="stats-panel" className="info-box">
        <h2>Stats</h2>
        <div id="stats-panel-stats">
          <p>Attack: {this.calcStats('Attack')}%</p>
          <p>Defense: {this.calcStats('Defense')}%</p>
          <p>Health: {this.calcStats('Health')}%</p>
          <p>March Speed: {this.calcStats('March Speed')}%</p>
        </div>
      </div>
    );
  }
}

export default StatsPanel;
