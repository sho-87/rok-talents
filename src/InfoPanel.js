import React, { Component } from 'react';
import MediaQuery from 'react-responsive';
import SummaryPanel from './SummaryPanel';
import StatsPanel from './StatsPanel';
import StatsTalentsPanel from './StatsTalentsPanel';
import ErrorBoundary from './Error';

import './styles/InfoPanel.css';

/**
 * Info panel component displaying stats about the current talent build
 *
 * @class InfoPanel
 * @extends {Component}
 */
class InfoPanel extends Component {
  render() {
    return (
      <div
        id="info-panel"
        data-testid="info-panel"
        className={
          this.props.isShownInfoPanel ? 'info-panel-open' : 'info-panel-closed'
        }
      >
        <ErrorBoundary>
          <div id="summary-panel-container">
            <SummaryPanel
              commander={this.props.commander}
              calcPointsRemaining={this.props.calcPointsRemaining}
              calcPointsSpent={this.props.calcPointsSpent}
            />
            <MediaQuery orientation="portrait">
              <StatsPanel stats={this.props.stats} />
            </MediaQuery>
          </div>
        </ErrorBoundary>

        <MediaQuery orientation="landscape">
          <ErrorBoundary>
            <StatsPanel stats={this.props.stats} />
          </ErrorBoundary>

          <ErrorBoundary>
            <StatsTalentsPanel
              calcPointsSpent={this.props.calcPointsSpent}
              commander={this.props.commander}
              treeData={this.props.treeData}
              red={this.props.red}
              yellow={this.props.yellow}
              blue={this.props.blue}
            />
          </ErrorBoundary>
        </MediaQuery>
      </div>
    );
  }
}

export default InfoPanel;
