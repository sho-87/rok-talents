import React from 'react';
import { Container, Row, Col } from 'reactstrap';
import HexagonCommander from './Shapes.js';
import commanders from './data/commanders.json';

// Talent tree container
class Tree extends React.Component {
  getTreeName(color) {
    const commander = commanders[this.props.commander];
    if (commander) {
      return commander[color];
    }
  }

  render() {
    return (
      <div id="tree">
        <div className="container">
          <div className="row align-items-center sub-tree">
            <div className="col sub-tree-col"></div>
            <div id="tree-red" className="col-6 sub-tree-col"></div>
            <div className="col sub-tree-col"></div>
          </div>

          <div className="row align-items-center">
            <div id="tree-commander" className="col">
              <HexagonCommander commander={this.props.commander} />

              <div className="hexagon-label hexagon-label-red">
                {this.getTreeName('red')}
              </div>
              <div className="hexagon-label hexagon-label-yellow">
                {this.getTreeName('yellow')}
              </div>
              <div className="hexagon-label hexagon-label-blue">
                {this.getTreeName('blue')}
              </div>
            </div>
          </div>

          <div className="row align-items-center sub-tree">
            <div id="tree-yellow" className="col sub-tree-col"></div>
            <div id="tree-blue" className="col sub-tree-col"></div>
          </div>
        </div>
      </div>
    );
  }
}

export default Tree;
