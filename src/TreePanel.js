import React from 'react';
import HexagonCommander from './Shapes.js';

import Trees from './data/modules.js';
import Commanders from './data/Commanders.json';

// Talent tree container
//TODO: add tree/game/data version to state and data files
class TreePanel extends React.Component {
  constructor(props) {
    super(props);
    this.getTreeName = this.getTreeName.bind(this);
  }

  getTreeName(color) {
    const commander = Commanders[this.props.commander];
    if (commander) {
      return commander[color];
    }
  }

  render() {
    return (
      <div id="tree-panel">
        <div id="tree-red" className="tree-container">
          {this.props.red}
        </div>
        <div id="tree-yellow" className="tree-container">
          {this.props.yellow}
        </div>
        <div id="tree-blue" className="tree-container">
          {this.props.blue}
        </div>
        <HexagonCommander
          commander={this.props.commander}
          getTreeName={this.getTreeName}
        />
      </div>
    );
  }
}

export default TreePanel;
