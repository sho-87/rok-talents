import React, { Component } from 'react';
import Commanders from './data/commanders.json';
import './styles/SummaryPanel.css';

/**
 * Summary panel component displaying commander info
 *
 * @class SummaryPanel
 * @extends {Component}
 */
class SummaryPanel extends Component {
  getHeader() {
    return (
      <>
        <span>{this.props.commander}</span>
        {Commanders[this.props.commander].guide && (
          <GuideIcon commander={this.props.commander} />
        )}
      </>
    );
  }

  render() {
    return (
      <div id="summary-panel" className="info-box">
        <h1>{this.props.commander ? this.getHeader() : 'Summary'}</h1>
        <h3>
          {this.props.commander && Commanders[this.props.commander].title}
        </h3>

        <div id="summary-panel-summary">
          <p>Points remaining: {this.props.calcPointsRemaining()}</p>
          <p>Points spent: {this.props.calcPointsSpent()}</p>
        </div>
      </div>
    );
  }
}

/**
 * Icon for commander guides
 *
 * @returns {DOMElement} Icon linking to the external commander guide
 */
function GuideIcon(props) {
  return (
    <a
      href={Commanders[props.commander].guide}
      target="_blank"
      rel="noopener noreferrer"
    >
      <img
        className="summary-panel-guide-icon"
        src={`${process.env.PUBLIC_URL}/images/guide-icon.png`}
        alt={`${props.commander} guide`}
      ></img>
    </a>
  );
}

export default SummaryPanel;
