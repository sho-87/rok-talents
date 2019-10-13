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
    // Move talent labels into hexagon component
    return (
      <div id="tree">
        <Container>
          <Row className="align-items-center sub-tree">
            <Col id="tree-red" className="sub-tree-col"></Col>
          </Row>

          <Row className="align-items-center">
            <Col id="tree-commander">
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
            </Col>
          </Row>

          <Row className="align-items-center sub-tree">
            <Col id="tree-yellow" className="sub-tree-col"></Col>
            <Col id="tree-blue" className="sub-tree-col"></Col>
          </Row>
        </Container>
      </div>
    );
  }
}

export default Tree;
