import React from 'react';
import Menu from 'react-burger-menu/lib/menus/push';

import data from './data.json';

//Sidebar and control panel
class Sidebar extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <Menu
        id={'sidebar'}
        left
        noOverlay
        disableCloseOnEsc
        disableAutoFocus
        width={'20%'}
        isOpen={true}
        pageWrapId={'tree'}
        outerContainerId={'app'}
      >
        <h1>Options</h1>
        <SidebarCommanderSelect
          handleCommanderChange={this.props.handleCommanderChange}
          commander={this.props.commander}
        />
        <br />
        <span>
          <button type="button" className="btn btn-sm btn-primary">
            Copy Talents
          </button>
          <button type="button" className="btn btn-sm btn-danger">
            Reset Talents
          </button>
        </span>
        <hr />
        <h1>Summary</h1>
        <p>Commander: {this.props.commander}</p>
        <p>Link: {JSON.stringify(this.props)}</p>
      </Menu>
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
        <label htmlFor="select-commander">Commander: </label>
        <select
          id="select-commander"
          className="form-control form-control-sm"
          value={this.props.commander}
          onChange={this.props.handleCommanderChange}
        >
          {this.createSelectItems()}
        </select>
      </div>
    );
  }
}

export default Sidebar;
