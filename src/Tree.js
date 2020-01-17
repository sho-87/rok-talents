import React, { Component } from 'react';
import Node from './Node';
import ErrorBoundary from './Error';
import { getMaxTalentCount } from './utils';

/**
 * Component for the individual talent trees
 *
 * @class Tree
 * @extends {Component}
 */

 //TODO: make nodes/trees larger so theyre easier to click on small screens
class Tree extends Component {
  /**
   * Create an array of all talent nodes for the current commander
   *
   * @param {number[]} values Array containing the node values stored
   * in `this.state` for a given tree color
   * @param {string} color Color of the tree to generate nodes for
   * @returns {Array} Array of `Node`'s for a given tree
   * @memberof Tree
   */
  drawNodes() {
    let nodes = [];
    const treeName = this.props.treeName;

    for (let i = 1; i < this.props.data.length + 1; i++) {
      var curNode = this.props.treeData[treeName][i];

      nodes.push(
        <Node
          changeTalentValue={this.props.changeTalentValue}
          calcPointsRemaining={this.props.calcPointsRemaining}
          showPrereqToast={this.props.showPrereqToast}
          showPointLimitToast={this.props.showPointLimitToast}
          showValues={this.props.showValues}
          treeData={this.props.treeData}
          key={treeName + i}
          idx={i}
          treeName={treeName}
          talentName={curNode['name']}
          image={curNode['image']}
          tooltip={curNode['text']}
          type={curNode['type']}
          value={this.props.data[i - 1]}
          max={getMaxTalentCount(curNode['values'])}
          fullTree={this.props.data}
          x={curNode['pos'][0] + '%'}
          y={curNode['pos'][1] + '%'}
          color={this.props.color}
        />
      );
    }

    return nodes;
  }

  render() {
    return (
      <ErrorBoundary>
        <div id={`tree-${this.props.color}`} className="tree-container">
          {this.drawNodes()}

          {this.props.showMouse && (
            <div id={`tree-${this.props.color}-mouse`}>
              X: {parseFloat(this.props.mouseX).toFixed(1)} Y:{' '}
              {parseFloat(this.props.mouseY).toFixed(1)}
            </div>
          )}
        </div>
      </ErrorBoundary>
    );
  }
}

export default Tree;
