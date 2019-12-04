import React, { Component } from 'react';
import { HexagonCommander, Node } from './Shapes.js';
import { PrereqToast, PointLimitToast, CopyToast } from './Modals.js';
import ErrorBoundary from './Error.js';

import Trees from './data/modules.js';
import Commanders from './data/Commanders.json';

//TODO: lazy load large data modules
//TODO: use media queries to set element sizes instead of vw/vh/%
//FIXME: screenshot does not support certain CSS props (e.g. blend mode, filter)
//FIXME: don't use unsupported props to style nodes. use small node images?

/**
 * Component for the main tree panel. Controls the display of all nodes and
 * node selections
 *
 * @class TreePanel
 * @extends {Component}
 */
class TreePanel extends Component {
  constructor(props) {
    super(props);
    this.state = {
      copyToastFlag: false,
      pointLimitToastFlag: false,
      prereqToastFlag: false,
      prereqMsg: '',
      showTotals: true,
      showValues: true
    };

    // Context bindings
    this.getTreeName = this.getTreeName.bind(this);
    this.showPrereqToast = this.showPrereqToast.bind(this);
    this.showPointLimitToast = this.showPointLimitToast.bind(this);
  }

  /**
   * Toggle display of node values
   *
   * @memberof TreePanel
   */
  toggleTotalDisplay() {
    this.setState(prevState => ({
      showTotals: !prevState.showTotals
    }));
  }

  /**
   * Toggle display of total number of points spent in each tree
   *
   * @memberof TreePanel
   */
  toggleValueDisplay() {
    this.setState(prevState => ({
      showValues: !prevState.showValues
    }));
  }

  /**
   * Get the full name of a talent tree (e.g. Skill, Garrison). The name
   * depends on the tree color and the currently selected commander
   *
   * @param {string} color Color of the tree to retrieve the name for
   * @returns
   * @memberof TreePanel
   */
  getTreeName(color) {
    const commander = Commanders[this.props.commander];
    if (commander) {
      return commander[color];
    }
  }

  /**
   * Show a toast containing a list of missing prerequisite talents. Toast is
   * hidden automatically after a delay.
   *
   * @param {Array} msg Array of `li` elements containing the names of
   *  the missing talents
   * @memberof TreePanel
   */
  showPrereqToast(msg) {
    this.setState({ prereqToastFlag: true, prereqMsg: msg }, () => {
      window.setTimeout(() => {
        this.setState({ prereqToastFlag: false, prereqMsg: '' });
      }, 5000);
    });
  }

  /**
   * Show toast warning about reaching the maximum talent point limit. Toast
   * is hidden automatically after a delay.
   *
   * @memberof TreePanel
   */
  showPointLimitToast() {
    this.setState({ pointLimitToastFlag: true }, () => {
      window.setTimeout(() => {
        this.setState({ pointLimitToastFlag: false });
      }, 2000);
    });
  }

  /**
   * Control visibility of a toast indicating that the talent build
   * has been copied/saved. Toast is automatically hidden after a delay
   *
   * @memberof TreePanel
   */
  showCopyToast() {
    this.setState({ copyToastFlag: true }, () => {
      window.setTimeout(() => {
        this.setState({ copyToastFlag: false });
      }, 2000);
    });
  }

  /**
   * Create an array of all talent nodes for the current commander
   *
   * @param {number[]} values Array containing the node values stored
   * in `this.state` for a given tree color
   * @param {string} color Color of the tree to generate nodes for
   * @returns {Array} Array of `Node`'s for a given tree
   * @memberof TreePanel
   */
  drawNodes(values, color) {
    let nodes = [];
    const treeName = this.getTreeName(color);

    for (let i = 1; i < values.length + 1; i++) {
      nodes.push(
        <Node
          changeTalentValue={this.props.changeTalentValue}
          calcPointsRemaining={this.props.calcPointsRemaining}
          showPrereqToast={this.showPrereqToast}
          showPointLimitToast={this.showPointLimitToast}
          showValues={this.state.showValues}
          key={treeName + i}
          id={treeName + i}
          idx={i}
          treeName={treeName}
          talentName={Trees[treeName][i]['name']}
          image={Trees[treeName][i]['image']}
          tooltip={Trees[treeName][i]['text']}
          type={Trees[treeName][i]['type']}
          value={values[i - 1]}
          max={Trees[treeName][i]['values'].length}
          fullTree={this.props[color]}
          top={Trees[treeName][i]['pos'][0] + '%'}
          left={Trees[treeName][i]['pos'][1] + '%'}
          color={color}
        />
      );
    }

    return nodes;
  }

  render() {
    let showTotals = this.state.showTotals && this.props.commander;

    return (
      <div id="tree-panel">
        <PrereqToast
          isOpen={this.state.prereqToastFlag}
          msg={this.state.prereqMsg}
        />
        <PointLimitToast isOpen={this.state.pointLimitToastFlag} />
        <CopyToast isOpen={this.state.copyToastFlag} />

        {!this.props.commander && <Instructions />}
        
        <div id="tree-square-container">
          <div id="tree-square-section">
            <div id="tree-square-content">
              <ErrorBoundary>
                <div id="tree-red" className="tree-container">
                  {showTotals && (
                    <span id="tree-red-total">{`${this.props.calcPointsSpent(
                      'red'
                    )} point${
                      this.props.calcPointsSpent('red') !== 1 ? 's' : ''
                    }`}</span>
                  )}
                  {this.drawNodes(this.props.red, 'red')}
                </div>
              </ErrorBoundary>

              <ErrorBoundary>
                <div id="tree-yellow" className="tree-container">
                  {showTotals && (
                    <span id="tree-yellow-total">
                      {`${this.props.calcPointsSpent('yellow')} point${
                        this.props.calcPointsSpent('yellow') !== 1 ? 's' : ''
                      }`}
                    </span>
                  )}
                  {this.drawNodes(this.props.yellow, 'yellow')}
                </div>
              </ErrorBoundary>

              <ErrorBoundary>
                <div id="tree-blue" className="tree-container">
                  {showTotals && (
                    <span id="tree-blue-total">
                      {`${this.props.calcPointsSpent('blue')} point${
                        this.props.calcPointsSpent('blue') !== 1 ? 's' : ''
                      }`}
                    </span>
                  )}
                  {this.drawNodes(this.props.blue, 'blue')}
                </div>
              </ErrorBoundary>

              <ErrorBoundary>
                <HexagonCommander
                  commander={this.props.commander}
                  getTreeName={this.getTreeName}
                />
              </ErrorBoundary>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

function Instructions(props) {
  return (
    <div id="instructions">
      <ol>
        <li>Select commander in the top right</li>
        <li>Left click to add talent points</li>
        <li>Right click to remove talent points</li>
        <li>Check your build stats on the left</li>
        <li>Copy and share your build</li>
      </ol>
    </div>
  );
}

export default TreePanel;
