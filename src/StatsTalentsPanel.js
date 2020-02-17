import React, { Component } from 'react';
import ReactGA from 'react-ga';
import Collapse from 'react-bootstrap/Collapse';
import { HelpTooltip } from './Tooltips';
import { getMaxTalentCount, replaceTalentText } from './utils';

import Commanders from './data/commanders.json';
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

    ReactGA.event({
      category: 'App',
      action: 'Toggle stats talents'
    });
  }

  /**
   * Calculate an array of main talents that don't belong in any of
   * the base stat categories
   *
   * @returns {DOMElement[]} Array of all selected main talents
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

          if (value > 0 && talentInfo.type === 'node-large') {
            talents.push(
              <div key={talentInfo.name} className={`stats-talents-main`}>
                <div className="stats-talents-title">
                  <span className={`bullet bg-${color}`}></span>

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
    const mainTalents = this.calcStatsTalents();
    return (
      <div
        id="stats-talents"
        className="info-box"
        onClick={this.toggleStatsTalents}
      >
        <h2 id="stats-talents-title">
          Main Talents{' '}
          <HelpTooltip tooltip="Expandable list of all selected main talents" />
        </h2>
        <div data-testid="stats-talents">
          {mainTalents.length === 0 ? 'None' : mainTalents}
        </div>
      </div>
    );
  }
}

export default StatsTalentsPanel;
