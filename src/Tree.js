import React from 'react';
import HexagonCommander from './Shapes.js';
import commanders from './data/commanders.json';

// Talent tree container
class Tree extends React.Component {
  constructor(props) {
    super(props);
    this.getTreeName = this.getTreeName.bind(this);
  }

  getTreeName(color) {
    const commander = commanders[this.props.commander];
    if (commander) {
      return commander[color];
    }
  }

  render() {
    return (
      <div id="tree-panel">
        <div id="tree-red" className="tree-container">a</div>
        <div id="tree-yellow" className="tree-container">b</div>
        <div id="tree-blue" className="tree-container">c</div>
        <HexagonCommander
          commander={this.props.commander}
          getTreeName={this.getTreeName}
        />
      </div>
    );
  }
}

export default Tree;
