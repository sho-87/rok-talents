import React from 'react';
import data from './data.json';

//Sidebar and control panel
class Sidebar extends React.Component {
  constructor(props) {
    super(props);
  }

  copyURL() {
    var dummy = document.createElement('input'),
      url = window.location.href;

    document.body.appendChild(dummy);
    dummy.value = url;
    dummy.select();
    document.execCommand('copy');
    document.body.removeChild(dummy);
  }

  render() {
    //TODO: hide sidebar on smaller screens. unmount tree component?
    return (
      <div id="sidebar">
        <h1>Options</h1>
        <SidebarCommanderSelect
          changeCommander={this.props.changeCommander}
          commander={this.props.commander}
        />
        <br />
        <span>
          <button
            type="button"
            className="btn btn-sm btn-primary"
            onClick={this.copyURL}
          >
            Copy Build
          </button>
          <button
            type="button"
            className="btn btn-sm btn-danger"
            onClick={this.props.setEmptyState}
          >
            Reset Build
          </button>
        </span>
        <hr />
        <h1>Summary</h1>
        <p>Placeholder</p>
        <hr />
        <h1>Debug</h1>
        <p>Base64: {window.btoa(JSON.stringify(this.props))}</p>
        <p>Decoded: {window.atob(window.btoa(JSON.stringify(this.props)))}</p>
      </div>
    );
  }
}

class SidebarCommanderSelect extends React.Component {
  constructor(props) {
    super(props);
  }

  createSelectItems() {
    let items = [];
    items.push(
      <option key="" value="">
        ---
      </option>
    );

    Object.keys(data.commanders).forEach(c => {
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
      <div>
        <label htmlFor="select-commander">Commander:</label>
        <select
          id="select-commander"
          className="form-control form-control-sm"
          value={this.props.commander}
          onChange={this.props.changeCommander}
        >
          {this.createSelectItems()}
        </select>
      </div>
    );
  }
}

export default Sidebar;
