import React, { Component } from 'react';
import MediaQuery from 'react-responsive';
import SummaryPanel from './SummaryPanel';
import StatsPanel from './StatsPanel';
import StatsTalentsPanel from './StatsTalentsPanel';
import ErrorBoundary from './Error';

//TODO: dynamic/responsive typography

/**
 * Side panel component displaying stats about the current talent build
 *
 * @class SidePanel
 * @extends {Component}
 */
class SidePanel extends Component {
  constructor(props) {
    super(props);
    this.state = {
      showSidePanel: true
    };

    // Context bindings
    this.toggleSidePanel = this.toggleSidePanel.bind(this);
  }

  /**
   * Toggles visibility of the side panel
   *
   * @memberof SidePanel
   */
  toggleSidePanel() {
    this.setState(prevState => ({
      showSidePanel: !prevState.showSidePanel
    }));
  }

  render() {
    return (
      <div
        id="side-panel"
        data-testid="side-panel"
        className={
          this.state.showSidePanel ? 'side-panel-open' : 'side-panel-closed'
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
              <StatsPanel
                commander={this.props.commander}
                treeData={this.props.treeData}
                red={this.props.red}
                yellow={this.props.yellow}
                blue={this.props.blue}
              />
            </MediaQuery>
          </div>
        </ErrorBoundary>

        <MediaQuery orientation="landscape">
          <ErrorBoundary>
            <StatsPanel
              commander={this.props.commander}
              treeData={this.props.treeData}
              red={this.props.red}
              yellow={this.props.yellow}
              blue={this.props.blue}
            />
          </ErrorBoundary>

          <ErrorBoundary>
            <StatsTalentsPanel
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

export default SidePanel;
