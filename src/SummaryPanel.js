import React, { Component } from 'react';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import { getTreeName } from './utils';

import Commanders from './data/Commanders.json';

/**
 * Summary panel component displaying commander info
 *
 * @class SummaryPanel
 * @extends {Component}
 */
class SummaryPanel extends Component {
  render() {
    return (
        <div id="summary-panel" className="info-box">
          <h1>{this.props.commander ? this.props.commander : 'Summary'}</h1>
          <h2>
            {this.props.commander ? Commanders[this.props.commander].title : ''}
          </h2>
          {this.props.commander ? (
            <Container id="summary-panel-tree-icon-container">
              <Row>
                <Col className="summary-panel-tree-icon bg-red">
                  {getTreeName('red', this.props.commander)}
                </Col>
                <Col className="summary-panel-tree-icon bg-yellow">
                  {getTreeName('yellow', this.props.commander)}
                </Col>
                <Col className="summary-panel-tree-icon bg-blue">
                  {getTreeName('blue', this.props.commander)}
                </Col>
              </Row>
            </Container>
          ) : (
            ''
          )}

          <div id="summary-panel-summary">
            <p>Points remaining: {this.props.calcPointsRemaining()}</p>
            <p>Points spent: {this.props.calcPointsSpent()}</p>
          </div>
        </div>
    );
  }
}

export default SummaryPanel;
