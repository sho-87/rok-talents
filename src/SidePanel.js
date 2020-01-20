import React, { Component } from 'react';
import SummaryPanel from './SummaryPanel';
import StatsPanel from './StatsPanel';

//TODO: make side panel draggable and resizable?

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
      showSidePanel: this.props.isMobile ? false : true
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
        <SummaryPanel
          commander={this.props.commander}
          calcPointsRemaining={this.props.calcPointsRemaining}
          calcPointsSpent={this.props.calcPointsSpent}
        />

        <StatsPanel
          commander={this.props.commander}
          treeData={this.props.treeData}
          red={this.props.red}
          yellow={this.props.yellow}
          blue={this.props.blue}
        />
      </div>
    );
  }
}

export default SidePanel;
