import React, { Component } from 'react';
import Collapse from 'react-bootstrap/Collapse';
import { getMaxTalentCount, replaceTalentText } from './utils';

import Commanders from './data/Commanders.json';
import './styles/StatsTalentsPanel.css';

/**
 * Stats talents panel component containing selected main talents
 *
 * @class StatsTalentsPanel
 * @extends {Component}
 */
class StatsTalentsPanel extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isShownStatsTalents: false
    };

    // Context bindings
    this.toggleStatsTalents = this.toggleStatsTalents.bind(this);
  }

  /**
   * Toggles visibility of the main talents descriptions
   *
   * @memberof StatsTalentsPanel
   */
  toggleStatsTalents() {
    this.setState(prevState => ({
      isShownStatsTalents: !prevState.isShownStatsTalents
    }));
  }

  /**
   * Calculate an array of the bonus stats that don't belong in any of
   * the base state categories
   *
   * @param {string} stat Name of the stat to be calculated (e.g. Defense)
   * @returns {String[]} Array of all selected main talents
   * @memberof StatsTalentsPanel
   */
  calcStatsTalents() {
    const commander = this.props.commander;
    let talents = [];

    ['red', 'yellow', 'blue'].forEach(color => {
      const nodes = this.props[color];

      if (nodes.some(values => values !== 0)) {
        nodes.forEach((value, idx) => {
          const talentInfo = this.props.treeData[Commanders[commander][color]][
            idx + 1
          ];

          if (value > 0 && !talentInfo.stats) {
            talents.push(
              <div key={talentInfo.name} className={`stats-talents-main`}>
                <div className="stats-talents-title">
                  <span className={`stats-talents-bullet bg-${color}`}></span>

                  {`${talentInfo.name} (${value}/${getMaxTalentCount(
                    talentInfo.values
                  )})`}
                </div>

                <Collapse in={this.state.isShownStatsTalents}>
                  <div className="stats-talents-text">
                    {replaceTalentText(
                      talentInfo.text,
                      talentInfo.values,
                      value - 1
                    )}
                  </div>
                </Collapse>
              </div>
            );
          }
        });
      }
    });

    return talents;
  }

  render() {
    return (
      <div className="info-box" onClick={this.toggleStatsTalents}>
        <h2>
          Main Talents{' '}
          <span className="stats-talents-expand">
            {this.state.isShownStatsTalents ? '(collapse)' : '(expand)'}
          </span>
        </h2>
        <div data-testid="stats-talents">{this.calcStatsTalents()}</div>
      </div>
    );
  }
}

export default StatsTalentsPanel;
