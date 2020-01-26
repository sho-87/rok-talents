import React, { Component } from 'react';

import Commanders from './data/Commanders.json';

/**
 * Summary panel component displaying commander info
 *
 * @class SummaryPanel
 * @extends {Component}
 */
class SummaryPanel extends Component {
  render() {
    return (
      <div id="summary-panel" className="info-box">
        <h1>{this.props.commander ? this.props.commander : 'Summary'}</h1>
        <h3>
          {this.props.commander ? Commanders[this.props.commander].title : ''}
        </h3>

        <div id="summary-panel-summary">
          <p>Points remaining: {this.props.calcPointsRemaining()}</p>
          <p>Points spent: {this.props.calcPointsSpent()}</p>
        </div>
      </div>
    );
  }
}

export default SummaryPanel;
