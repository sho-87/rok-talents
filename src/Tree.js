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
      <div id="tree">
        <div className="container d-flex flex-column">
          <div className="row align-items-center flex-fill">
            <div className="col"></div>
            <div id="tree-red" className="col-6 tree-col">
              a
            </div>
            <div className="col"></div>
          </div>

          <div className="row align-items-center">
            <HexagonCommander
              commander={this.props.commander}
              getTreeName={this.getTreeName}
            />
          </div>

          <div className="row align-items-center flex-fill">
            <div id="tree-yellow" className="col tree-col">
              b
            </div>
            <div id="tree-blue" className="col tree-col">
              c
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default Tree;
