import React, { Component } from 'react';

import './styles/StatsPanel.css';

//TODO: add main stats to small stats (e.g. march speed peacekeeping)

/**
 * Stats panel component displaying stats about the current talent build
 *
 * @class StatsPanel
 * @extends {Component}
 */
class StatsPanel extends Component {
  // calcStats(stat) {
  //   const commander = this.props.commander;
  //   let statValue = 0;

  //   ['red', 'yellow', 'blue'].forEach(color => {
  //     const nodes = this.props[color];

  //     if (nodes.some(values => values !== 0)) {
  //       nodes.forEach((value, idx) => {
  //         const talentInfo = this.props.treeData[Commanders[commander][color]][
  //           idx + 1
  //         ];

  //         if (value > 0 && talentInfo.stats === stat) {
  //           statValue += talentInfo.values[value - 1];
  //         }
  //       });
  //     }
  //   });

  //   return statValue;
  // }

  render() {
    return (
      <div id="stats-panel" className="info-box">
        <h2>Stats</h2>
        <div id="stats-panel-stats">
          <p>Attack: {this.props.stats['Attack']}%</p>
          <p>Defense: {this.props.stats['Defense']}%</p>
          <p>Health: {this.props.stats['Health']}%</p>
          <p>March Speed: {this.props.stats['March Speed']}%</p>
        </div>
      </div>
    );
  }
}

export default StatsPanel;
