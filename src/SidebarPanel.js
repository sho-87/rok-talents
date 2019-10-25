import React, { Component, Fragment } from 'react';
import { Collapse } from 'reactstrap';
import { CopyToast } from './Modals.js';
import ErrorBoundary from './Error.js';

import Commanders from './data/Commanders.json';
import Trees from './data/modules.js';

//Sidebar and control
// https://reactjs.org/docs/thinking-in-react.html#step-1-break-the-ui-into-a-component-hierarchy
//TODO: find library for dock/sidepanel
class SidebarPanel extends Component {
  constructor(props) {
    super(props);
    this.copyURL = this.copyURL.bind(this);
    this.state = {
      copyToastFlag: false
    };
  }

  copyURL() {
    this.setState({ copyToastFlag: true }, () => {
      window.setTimeout(() => {
        this.setState({ copyToastFlag: false });
      }, 2000);
    });

    const dummy = document.createElement('input');
    const url = window.location.href;

    document.body.appendChild(dummy);
    dummy.value = url;
    dummy.select();
    document.execCommand('copy');
    document.body.removeChild(dummy);
  }

  render() {
    //TODO: hide sidebar on smaller screens. unmount tree component?
    return (
      <div id="sidebar-panel">
        <CopyToast isOpen={this.state.copyToastFlag} />

        <ErrorBoundary>
          <SidebarControls
            copyURL={this.copyURL}
            changeCommander={this.props.changeCommander}
            commander={this.props.commander}
            resetTalents={this.props.resetTalents}
          />
        </ErrorBoundary>

        <hr />

        <ErrorBoundary>
          <SidebarSummary
            calcPointsSpent={this.props.calcPointsSpent}
            calcPointsRemaining={this.props.calcPointsRemaining}
            commander={this.props.commander}
            red={this.props.red}
            yellow={this.props.yellow}
            blue={this.props.blue}
          />
        </ErrorBoundary>

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

class SidebarControls extends Component {
  render() {
    return (
      <Fragment>
        <h1>Options</h1>
        <SidebarCommanderSelect
          changeCommander={this.props.changeCommander}
          commander={this.props.commander}
        />
        <br />
        <button
          type="button"
          disabled={this.props.commander ? false : true}
          className="btn btn-sm btn-primary"
          onClick={this.props.copyURL}
        >
          Copy Talents
        </button>
        <button
          type="button"
          disabled={this.props.commander ? false : true}
          className="btn btn-sm btn-danger"
          onClick={this.props.resetTalents}
        >
          Reset Talents
        </button>
      </Fragment>
    );
  }
}

class SidebarCommanderSelect extends Component {
  createSelectItems() {
    let items = [];
    items.push(
      <option key="" value="">
        ---
      </option>
    );

    Object.keys(Commanders).forEach(c => {
      items.push(
        <option key={c} value={c}>
          {c}
        </option>
      );
    });
    return items;
  }

  render() {
    return (
      <Fragment>
        <label htmlFor="select-commander">Commander:</label>
        <select
          autoFocus
          id="select-commander"
          className="form-control form-control-sm"
          value={this.props.commander}
          onChange={this.props.changeCommander}
        >
          {this.createSelectItems()}
        </select>
      </Fragment>
    );
  }
}

class SidebarSummary extends Component {
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
        <div id="sidebar-panel-summary">
          <p>Points remaining: {this.props.calcPointsRemaining()}</p>
          <p>Points spent: {this.props.calcPointsSpent()}</p>
        </div>

        <h2>Stats</h2>
        <div id="sidebar-panel-stats">
          <p>Attack: {this.calcStats('Attack')}%</p>
          <p>Defense: {this.calcStats('Defense')}%</p>
          <p>Health: {this.calcStats('Health')}%</p>
          <p>March Speed: {this.calcStats('March Speed')}%</p>
        </div>

        <h2 onClick={this.toggleBonus}>
          Bonus <span className="sidebar-panel-arrow">{arrow}</span>
        </h2>
        <Collapse isOpen={this.state.bonusOpen}>
          <div id="sidebar-panel-bonus">{this.calcStats('Bonus')}</div>
        </Collapse>
      </Fragment>
    );
  }
}

export default SidebarPanel;
