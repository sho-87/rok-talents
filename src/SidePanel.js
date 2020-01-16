import React, { Component } from 'react';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Collapse from 'react-bootstrap/Collapse';
import { getMaxTalentCount, replaceTalentText, getTreeName } from './utils';

import Commanders from './data/Commanders.json';

//TODO: make side panel draggable and resizable?
//TODO: split side panel into different "modules"?
//FIXME: calc stats is super inefficient. each node is checked multiple times for each stat
//FIXME: use shouldComponentUpdate

/**
 * Side panel component displaying stats about the current talent build
 *
 * @class SidePanel
 * @extends {Component}
 */
class SidePanel extends Component {
  constructor(props) {
    super(props);
    this.state = {
      showSidePanel: this.props.isMobile ? false : true,
      expandMainTalents: false
    };

    // Context bindings
    this.toggleMain = this.toggleMain.bind(this);
    this.toggleSidePanel = this.toggleSidePanel.bind(this);
  }

  /**
   * Toggles visibility of the side panel
   *
   * @memberof SidePanel
   */
  toggleSidePanel() {
    this.setState(prevState => ({
      showSidePanel: !prevState.showSidePanel
    }));
  }

  /**
   * Toggles visibility of the main talents section
   *
   * @memberof SidePanel
   */
  toggleMain() {
    this.setState(prevState => ({
      expandMainTalents: !prevState.expandMainTalents
    }));
  }

  /**
   * Calculate the total value of a given stat (e.g. attack, health). Additionally,
   * stores an array of the bonus stats that don't belong in any of the base state categories
   *
   * @param {string} stat Name of the stat to be calculated (e.g. Defense)
   * @returns {(String[]|number)} Calculated value of the stat, or array of all selected
   * bonus stats
   * @memberof SidePanel
   */
  calcStats(stat) {
    const commander = this.props.commander;
    let statValue = 0;
    let main = [];

    ['red', 'yellow', 'blue'].forEach(color => {
      const nodes = this.props[color];

      if (nodes.some(values => values !== 0)) {
        nodes.forEach((value, idx) => {
          const talentInfo = this.props.treeData[Commanders[commander][color]][
            idx + 1
          ];
          const talentStat = talentInfo.stats;
          if (value > 0) {
            if (talentStat === stat) {
              statValue += talentInfo.values[value - 1];
            } else if (stat === 'Main' && talentStat === '') {
              main.push(
                <div
                  key={talentInfo.name}
                  className={`side-panel-main`}
                  onClick={this.toggleMain}
                >
                  <div className="side-panel-main-title">
                    <span
                      className={`side-panel-main-bullet side-panel-main-${color}`}
                    ></span>
                    {`${talentInfo.name} (${value}/${getMaxTalentCount(
                      talentInfo.values
                    )})`}
                  </div>
                  <Collapse in={this.state.expandMainTalents}>
                    <div className="side-panel-main-text">
                      {replaceTalentText(
                        talentInfo.text,
                        talentInfo.values,
                        value - 1
                      )}
                    </div>
                  </Collapse>
                </div>
              );
            }
          }
        });
      }
    });

    if (stat === 'Main') {
      return main;
    } else {
      return statValue;
    }
  }

  render() {
    return (
      <div
        id="side-panel"
        className={
          this.state.showSidePanel ? 'side-panel-open' : 'side-panel-closed'
        }
      >
        <h2>{this.props.commander ? this.props.commander : 'Summary'}</h2>
        <h3>
          {this.props.commander ? Commanders[this.props.commander].title : ''}
        </h3>
        {this.props.commander ? (
          <Container id="side-panel-tree-icon-container">
            <Row>
              <Col className="side-panel-tree-icon bg-red">
                {getTreeName('red', this.props.commander)}
              </Col>
              <Col className="side-panel-tree-icon bg-yellow">
                {getTreeName('yellow', this.props.commander)}
              </Col>
              <Col className="side-panel-tree-icon bg-blue">
                {getTreeName('blue', this.props.commander)}
              </Col>
            </Row>
          </Container>
        ) : (
          ''
        )}

        <div id="side-panel-summary">
          <p>Points remaining: {this.props.calcPointsRemaining()}</p>
          <p>Points spent: {this.props.calcPointsSpent()}</p>
        </div>

        <h3>Stats</h3>
        <div id="side-panel-stats">
          <p>Attack: {this.calcStats('Attack')}%</p>
          <p>Defense: {this.calcStats('Defense')}%</p>
          <p>Health: {this.calcStats('Health')}%</p>
          <p>March Speed: {this.calcStats('March Speed')}%</p>
        </div>

        <h3 onClick={this.toggleMain}>
          Main Talents{' '}
          <span className="side-panel-expand">
            {this.state.expandMainTalents ? '(collapse)' : '(expand)'}
          </span>
        </h3>
        <div data-testid="side-panel-main-talents">
          {this.calcStats('Main')}
        </div>
      </div>
    );
  }
}

export default SidePanel;
