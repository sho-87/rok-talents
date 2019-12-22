import React, { Component, Fragment } from 'react';
import { Collapse } from 'reactstrap';

import Trees from './data/AllTrees';
import Commanders from './data/Commanders.json';

//TODO: add tree view for additional info
//TODO: make side panel draggable and resizable?
//TODO: hide side panel automatically on smaller screens
//FIXME: calc stats is super inefficient. each node is checked multiple times for each stat

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
      sidePanelOpen: true,
      bonusOpen: true
    };

    // Context bindings
    this.toggleBonus = this.toggleBonus.bind(this);
    this.toggleSidePanel = this.toggleSidePanel.bind(this);
  }

  /**
   * Toggles visibility of the side panel
   *
   * @memberof SidePanel
   */
  toggleSidePanel() {
    this.setState(prevState => ({
      sidePanelOpen: !prevState.sidePanelOpen
    }));
  }

  /**
   * Toggles visibility of the bonus/additional info section
   *
   * @memberof SidePanel
   */
  toggleBonus() {
    this.setState(prevState => ({
      bonusOpen: !prevState.bonusOpen
    }));
  }

  /**
   * Calculate the total value of a given stat (e.g. attack, health). Additionally,
   * stores an array of the bonus stats that don't belong in any of the base state categories
   *
   * @param {string} stat Name of the stat to be calculated (e.g. Defense)
   * @returns {(String[]|number)} Calculated value of the stat, or array of all selected
   * bonus stats
   * @memberof SidePanel
   */
  calcStats(stat) {
    const commander = this.props.commander;
    let statValue = 0;
    let bonuses = [];

    ['red', 'yellow', 'blue'].forEach(color => {
      const nodes = this.props[color];

      if (nodes.some(values => values !== 0)) {
        nodes.forEach((value, idx) => {
          const talentInfo = Trees[Commanders[commander][color]][idx + 1];
          const talentStat = talentInfo.stats;
          if (value > 0) {
            if (talentStat === stat) {
              statValue += talentInfo.values[value - 1];
            } else if ((stat === 'Bonus') & (talentStat === '')) {
              let text = talentInfo.text;
              text = text.replace(/\$/g, talentInfo.values[value - 1]);
              bonuses.push(<p key={color + idx}>{text}</p>);
            }
          }
        });
      }
    });

    if (stat === 'Bonus') {
      return bonuses;
    } else {
      return statValue;
    }
  }

  render() {
    return (
      <div
        id="side-panel"
        className={
          this.state.sidePanelOpen ? 'side-panel-open' : 'side-panel-closed'
        }
      >
        <h2>{this.props.commander ? this.props.commander : 'Summary'}</h2>
        <h3>
          {this.props.commander ? Commanders[this.props.commander].title : ''}
        </h3>
        <div id="side-panel-summary">
          <p>Points remaining: {this.props.calcPointsRemaining()}</p>
          <p>Points spent: {this.props.calcPointsSpent()}</p>
        </div>

        <h3>Stats</h3>
        <div id="side-panel-stats">
          <p>Attack: {this.calcStats('Attack')}%</p>
          <p>Defense: {this.calcStats('Defense')}%</p>
          <p>Health: {this.calcStats('Health')}%</p>
          <p>March Speed: {this.calcStats('March Speed')}%</p>
        </div>

        <h3 onClick={this.toggleBonus}>
          Main Talents{' '}
          <span className="side-panel-expand">
            {this.state.bonusOpen ? '(collapse)' : '(expand)'}
          </span>
        </h3>
        <Collapse isOpen={this.state.bonusOpen}>
          <div id="side-panel-bonus">{this.calcStats('Bonus')}</div>
        </Collapse>

        {process.env.NODE_ENV === 'development' && (
          <Fragment>
            <h2>Debug</h2>
            <p>
              URL length: {window.location.search.length}
            </p>
            <p>
              Encoded ({this.props.encodeState().length}):{' '}
              {this.props.encodeState()}
            </p>
            <p>
              Decoded (
              {this.props.decodeState(this.props.encodeState(), false).length}):{' '}
              {this.props.decodeState(this.props.encodeState(), false)}
            </p>
          </Fragment>
        )}
      </div>
    );
  }
}

export default SidePanel;
