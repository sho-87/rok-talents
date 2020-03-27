import React, { Component } from 'react';
import MediaQuery from 'react-responsive';
import SummaryPanel from './SummaryPanel';
import StatsPanel from './StatsPanel';
import StatsTalentsPanel from './StatsTalentsPanel';
import ErrorBoundary from './Error';

import Commanders from './data/commanders.json';
import { getMaxTalentCount, replaceTalentText, isTouchDevice } from './utils';
import './styles/InfoPanel.css';

/**
 * Info panel component displaying stats about the current talent build
 *
 * @class InfoPanel
 * @extends {Component}
 */
class InfoPanel extends Component {
  /**
   * Calculate all stats on point assignment
   *
   * @returns {[Array, Object]} Calculated stats and object containing main talents
   * @memberof InfoPanel
   */
  calcStats() {
    let mainTalents = [];
    let stats = {};

    if (this.props.commander) {
      const commanderData = Commanders[this.props.commander];

      for (let color of ['red', 'yellow', 'blue']) {
        const talentData = this.props.treeData[commanderData[color]];
        const selectedValues = this.props[color];

        for (let i = 1; i < selectedValues.length + 1; i++) {
          const pointsAssigned = selectedValues[i - 1];

          if (pointsAssigned !== 0) {
            const talent = talentData[i];
            const statName = talent.stats;

            if (statName) {
              if (!(statName in stats)) {
                stats[statName] = 0;
              }
              stats[statName] += talent.values[pointsAssigned - 1];
            }

            if (talent.type === 'node-large') {
              mainTalents.push({
                name: talent.name,
                color: color,
                points: pointsAssigned,
                maxPoints: getMaxTalentCount(talent.values),
                text: replaceTalentText(
                  talent.text,
                  talent.values,
                  pointsAssigned - 1
                )
              });
            }
          }
        }
      }
    }
    return [stats, mainTalents];
  }

  render() {
    const [stats, mainTalents] = this.calcStats();

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
              <StatsPanel stats={stats} />
            </MediaQuery>
          </div>
        </ErrorBoundary>

        <MediaQuery orientation="landscape">
          <ErrorBoundary>
            <StatsPanel stats={stats} />
          </ErrorBoundary>

          {!isTouchDevice() && (
            <ErrorBoundary>
              <StatsTalentsPanel mainTalents={mainTalents} />
            </ErrorBoundary>
          )}
        </MediaQuery>
      </div>
    );
  }
}

export default InfoPanel;
