import React, { Component } from 'react';
import { getTreeName } from './utils';

import Commanders from './data/commanders.json';
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
          src={`${process.env.PUBLIC_URL}/images/commanders/${this.props.commander}.png`}
          alt={this.props.commander}
        ></img>

        <h1>{this.props.commander ? this.props.commander : 'Summary'}</h1>
        <h3>
          {this.props.commander && Commanders[this.props.commander].title}
        </h3>
        {this.props.commander && (
          <div id="summary-panel-talents-container">
            <p className="summary-panel-talents bg-red">
              {getTreeName('red', this.props.commander)}
            </p>
            <p className="summary-panel-talents bg-yellow">
              {getTreeName('yellow', this.props.commander)}
            </p>
            <p className="summary-panel-talents bg-blue">
              {getTreeName('blue', this.props.commander)}
            </p>
          </div>
        )}

        <div id="summary-panel-summary">
          <p>Points remaining: {this.props.calcPointsRemaining()}</p>
          <p>Points spent: {this.props.calcPointsSpent()}</p>
        </div>
      </div>
    );
  }
}

export default SummaryPanel;
