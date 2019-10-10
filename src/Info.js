import React from 'react';
import data from './data.json';

//Info and control panel
class Info extends React.Component {
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
      <div className="Info">
        <h1>Options</h1>
        <label htmlFor="select-commander">Commander: </label>
        <select
          id="select-commander"
          value={this.props.commander}
          onChange={this.props.handleCommanderChange}
        >
          {this.createSelectItems()}
        </select>
        <hr />
        <h1>Summary</h1>
        <p>Commander: {this.props.commander}</p>
        <p>Link: {JSON.stringify(this.props)}</p>
      </div>
    );
  }
}

export default Info;