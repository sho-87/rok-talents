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
