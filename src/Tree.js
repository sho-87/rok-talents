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
      //FIXME: reactstrap grid is very slow compared to regular bootstrap
      //   <div id="tree">
      //   <div className="container">
      //     <div className="row align-items-center sub-tree">
      //       <div id="tree-red" className="col sub-tree-col">
      //         {this.props.redTree}
      //       </div>
      //     </div>

      //     <div className="row align-items-center">
      //       <div id="tree-commander" className="col">
      //         <img
      //           src={`images/commanders/${this.props.commander}.png`}
      //           alt={this.props.commander}
      //         ></img>
      //         <div id="commander-name">{this.props.commander}</div>
      //       </div>
      //     </div>

      //     <div className="row align-items-center sub-tree">
      //       <div id="tree-yellow" className="col sub-tree-col">
      //         {this.props.yellowTree}
      //       </div>
      //       <div id="tree-blue" className="col sub-tree-col">
      //         {this.props.blueTree}
      //       </div>
      //     </div>
      //   </div>
      // </div>

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
