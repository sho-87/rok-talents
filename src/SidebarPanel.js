import React from 'react';
import { CopyToast } from './Modals.js';
import ErrorBoundary from './Error.js';

import Commanders from './data/Commanders.json';

//Sidebar and control
// https://reactjs.org/docs/thinking-in-react.html#step-1-break-the-ui-into-a-component-hierarchy
class SidebarPanel extends React.Component {
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
      }, 5000);
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
          <SidebarSummary />
        </ErrorBoundary>

        <hr />
        <h1>Debug</h1>
        <p>Base64: {window.btoa(JSON.stringify(this.props))}</p>
        <p>Decoded: {window.atob(window.btoa(JSON.stringify(this.props)))}</p>
      </div>
    );
  }
}

class SidebarControls extends React.Component {
  render() {
    return (
      <React.Fragment>
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
      </React.Fragment>
    );
  }
}

//TODO: focus select on new build
class SidebarCommanderSelect extends React.Component {
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
      <React.Fragment>
        <label htmlFor="select-commander">Commander:</label>
        <select
          id="select-commander"
          className="form-control form-control-sm"
          value={this.props.commander}
          onChange={this.props.changeCommander}
        >
          {this.createSelectItems()}
        </select>
      </React.Fragment>
    );
  }
}

class SidebarSummary extends React.Component {
  render() {
    return (
      <React.Fragment>
        <h1>Summary</h1>
        <p>Placeholder</p>
      </React.Fragment>
    );
  }
}

export default SidebarPanel;
