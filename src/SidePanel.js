import React, { Component, Fragment } from 'react';
import { Collapse } from 'reactstrap';

import Commanders from './data/Commanders.json';
import Trees from './data/modules.js';

class SidePanel extends Component {
  render() {
    return (
      <div id="side-panel">
        <SideSummary
          calcPointsSpent={this.props.calcPointsSpent}
          calcPointsRemaining={this.props.calcPointsRemaining}
          commander={this.props.commander}
          red={this.props.red}
          yellow={this.props.yellow}
          blue={this.props.blue}
        />

        {process.env.NODE_ENV === 'development' && (
          <Fragment>
            <h1>Debug</h1>
            <p>Base64: {window.btoa(JSON.stringify(this.props))}</p>
            <p>
              Decoded: {window.atob(window.btoa(JSON.stringify(this.props)))}
            </p>
          </Fragment>
        )}
      </div>
    );
  }
}

class SideSummary extends Component {
  constructor(props) {
    super(props);
    this.toggleBonus = this.toggleBonus.bind(this);
    this.state = {
      bonusOpen: false
    };
  }

  toggleBonus() {
    this.setState({ bonusOpen: !this.state.bonusOpen });
  }

  calcStats(stat) {
    //FIXME: super inefficient. each node checked multiple times for each stat
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
              text = text.replace('$', talentInfo.values[value - 1]);
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
    let arrow;

    if (this.state.bonusOpen) {
      arrow = '\u25B2';
    } else {
      arrow = '\u25BC';
    }

    return (
      <Fragment>
        <h1>Summary</h1>
        <div id="side-panel-summary">
          <p>Points remaining: {this.props.calcPointsRemaining()}</p>
          <p>Points spent: {this.props.calcPointsSpent()}</p>
        </div>

        <h2>Stats</h2>
        <div id="side-panel-stats">
          <p>Attack: {this.calcStats('Attack')}%</p>
          <p>Defense: {this.calcStats('Defense')}%</p>
          <p>Health: {this.calcStats('Health')}%</p>
          <p>March Speed: {this.calcStats('March Speed')}%</p>
        </div>

        <h2 onClick={this.toggleBonus}>
          Bonus <span className="side-panel-arrow">{arrow}</span>
        </h2>
        <Collapse isOpen={this.state.bonusOpen}>
          <div id="side-panel-bonus">{this.calcStats('Bonus')}</div>
        </Collapse>
      </Fragment>
    );
  }
}

export default SidePanel;
