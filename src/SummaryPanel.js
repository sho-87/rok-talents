import React, { Component } from 'react';
import { getTreeName } from './utils';

import Commanders from './data/Commanders.json';
import './styles/SummaryPanel.css';

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
        <img
          src={`images/commanders/${this.props.commander}.png`}
          alt={this.props.commander}
        ></img>

        <h1>{this.props.commander ? this.props.commander : 'Summary'}</h1>
        <h3>
          {this.props.commander && Commanders[this.props.commander].title}
        </h3>
        {this.props.commander && (
          <div id="summary-panel-talents-container">
            <span className="summary-panel-talents bg-red">
              {getTreeName('red', this.props.commander)}
            </span>
            <span className="summary-panel-talents bg-yellow">
              {getTreeName('yellow', this.props.commander)}
            </span>
            <span className="summary-panel-talents bg-blue">
              {getTreeName('blue', this.props.commander)}
            </span>
          </div>
        )}

        <div id="summary-panel-summary">
          <div>Points remaining: {this.props.calcPointsRemaining()}</div>
          <div>Points spent: {this.props.calcPointsSpent()}</div>
        </div>
      </div>
    );
  }
}

export default SummaryPanel;
