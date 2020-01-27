import React, { Component } from 'react';
import Commanders from './data/Commanders.json';

//TODO: add colour coded tree names
//TODO: set background to faded commander image

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
          <div>Points remaining: {this.props.calcPointsRemaining()}</div>
          <div>Points spent: {this.props.calcPointsSpent()}</div>
        </div>
      </div>
    );
  }
}

export default SummaryPanel;
