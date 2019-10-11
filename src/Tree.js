import React from 'react';
import { Container, Row, Col } from 'reactstrap';
import commanders from './data/commanders.json';

// Talent tree container
class Tree extends React.Component {
  constructor(props) {
    super(props);
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
        <Container>
          <Row className="align-items-center sub-tree">
            <Col id="tree-red" className="sub-tree-col">
              {this.getTreeName('red')}
            </Col>
          </Row>

          <Row className="align-items-center">
            <Col id="tree-commander">
              <img
                src={`images/commanders/${this.props.commander}.png`}
                alt={this.props.commander}
              ></img>
              <div id="commander-name">{this.props.commander}</div>
            </Col>
          </Row>

          <Row className="align-items-center sub-tree">
            <Col id="tree-yellow" className="sub-tree-col">
              {this.getTreeName('yellow')}
            </Col>
            <Col id="tree-blue" className="sub-tree-col">
              {this.getTreeName('blue')}
            </Col>
          </Row>
        </Container>
      </div>
    );
  }
}

export default Tree;
